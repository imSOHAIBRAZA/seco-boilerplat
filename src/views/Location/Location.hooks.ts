import * as React from "react";
import { useFormik } from "formik";
import { serverErrorHandlers, useAppDispatch, useAppSelector, useSnackbar } from "../../lib";
import { LocationSchema, LocationFieldValues } from "./Location.types";
import {
  addLocation,
  deleteLocation,
  editLocation,
  fetchAllLocations,
  fetchLocations,
  searchLocations,
} from "../../features/location/location-thunk";
import _ from "lodash";
import { setLocationSelected } from "../../features/location/location-slice";
import { Location, SearchPromiseT, SearchTimeoutT } from "../../types";

let searchPromise: SearchPromiseT ;
let searchTimeout: SearchTimeoutT ;

export const useLocation = () => {
  const { snackbar } = useSnackbar();

  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const rowsPerPage = useAppSelector((state) => state.locations.rowsPerPage);
  const pageNo = useAppSelector((state) => state.locations.pageNo);
  const selectedLocations = useAppSelector((state) => state.locations.selectedLocations);
  const orderBy = useAppSelector((state) => state.locations.ordering);

  const [addModal, setAddModal] = React.useState<boolean>(false);
  const [editModal, setEditModal] = React.useState<boolean>(false);
  const [deleteModal, setDeleteModal] = React.useState<boolean>(false);
  const [searchFilter, setSearchFilter] = React.useState<string[]>([
    "location_name",
    "operator_name",
    "country",
    "city",
    "latitude",
    "longitude",
    "detailed_address",
    "status",
  ]);

  const handleSelectFilter = (value: string[]) => setSearchFilter(value);

  const dispatch = useAppDispatch();

  const handleFormSubmit = (values?: LocationFieldValues) => {
    if (addModal === true) {
      onAddLocation(values as LocationFieldValues);
    } else if (editModal === true) {
      onEditLocation(values as LocationFieldValues);
    } else if (deleteModal === true) {
      onDeleteLocation();
    }
  };

  const formik = useFormik({
    initialValues: {
      location_name: "",
      country: "",
      city: "",
      latitude: "",
      longitude: "",
      province: "",
      detailed_address: "",
      status: "Enable",
    },
    onSubmit: handleFormSubmit,
    validationSchema: LocationSchema,
  });

  const toggleAddModal = () => {
    setAddModal((prevState) => !prevState);
  };
  const toggleEditModal = React.useCallback(() => {
    formik.setValues({
      location_name: selectedLocations[0]?.location_name,
      country: selectedLocations[0]?.country,
      city: selectedLocations[0]?.city,
      latitude: selectedLocations[0]?.latitude,
      longitude: selectedLocations[0]?.longitude,
      province: selectedLocations[0]?.province,
      detailed_address: selectedLocations[0]?.detailed_address,
      status: "Enable",
    });

    if (editModal) {
      formik.resetForm();
    }
    setEditModal((prevState) => !prevState);
  }, [formik, selectedLocations, editModal]);

  const toggleDeleteModal = () => setDeleteModal((prevState) => !prevState);

  const onAddLocation = React.useCallback(
    async (values: LocationFieldValues) => {
      try {
        await dispatch(addLocation(values)).unwrap();
        toggleAddModal();
        snackbar({ message: "Operator Added Successfully", type: "success" });
      } catch (err: unknown) {
        serverErrorHandlers(err, snackbar);
      } finally {
        dispatch(fetchLocations({ query: "" }));
      }
    },
    [dispatch, snackbar],
  );

  const onEditLocation = React.useCallback(
    async (values: LocationFieldValues) => {
      try {
        await dispatch(
          editLocation({
            ...values,
            id: selectedLocations[0]?.location_id,
          }),
        ).unwrap();
        toggleEditModal();
        snackbar({ message: "Operator Saved Successfully", type: "success" });
      } catch (err: unknown) {
        serverErrorHandlers(err, snackbar);
      } finally {
        dispatch(fetchLocations({ query: "" }));
      }
    },
    [dispatch, snackbar, selectedLocations, toggleEditModal],
  );

  const onDeleteLocation = React.useCallback(async () => {
    try {
      await Promise.all(
        _.map(selectedLocations, (value: Location) =>
          dispatch(deleteLocation(value.location_id)).unwrap(),
        ),
      );
      toggleDeleteModal();
      snackbar({
        message: "Operator(s) Deleted Successfully",
        type: "success",
      });
    } catch (err: unknown) {
      serverErrorHandlers(err, snackbar);
    } finally {
      dispatch(fetchLocations({ query: "" }));
    }
  }, [dispatch, snackbar, selectedLocations]);

  const handleSearch: React.ChangeEventHandler<HTMLInputElement> = ({
    target: { value: query },
  }) => {
    clearTimeout(searchTimeout);

    setSearchQuery(query);

    searchTimeout = window.setTimeout(() => {
      searchPromise?.abort?.();
      searchPromise = dispatch(searchLocations({ query, filter: searchFilter }));
    }, 500);
  };

  React.useEffect(() => {
    dispatch(fetchLocations({ query: searchQuery, filter: searchFilter }));
    dispatch(fetchAllLocations({ query: searchQuery, filter: searchFilter }));
    dispatch(setLocationSelected([]))

    return () => {
      searchPromise = undefined;
      clearTimeout(searchTimeout);
      searchTimeout = undefined;
    };
  }, [dispatch, rowsPerPage, pageNo, orderBy]);

  return {
    onAddLocation,
    onEditLocation,
    onDeleteLocation,
    handleSearch,
    searchQuery,
    selectedLocations,
    toggleAddModal,
    toggleEditModal,
    toggleDeleteModal,
    addModal,
    editModal,
    deleteModal,
    formik,
    handleFormSubmit,
    handleSelectFilter,
    searchFilter,
  };
};
