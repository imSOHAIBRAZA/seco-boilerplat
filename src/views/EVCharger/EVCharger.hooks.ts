import * as React from "react";
import { useFormik } from "formik";
import { serverErrorHandlers, useAppDispatch, useAppSelector, useSnackbar } from "../../lib";
import { EVChargerSchema, EVChargerFieldValues } from "./EVCharger.types";
import {
  fetchEVChargers,
  addEVCharger,
  editEVCharger,
  deleteEVCharger,
  searchEVChargers,
  fetchAllEVChargers,
} from "../../features/ev-charger/ev-charger-thunk";
import _ from "lodash";
import {
  fetchAllDeviceTypes,
  fetchAllOperators,
} from "../../features/dropdown-data/dropdown-slice";
import {
  resetEVChargerState,
  setEVChargerSelected,
} from "../../features/ev-charger/ev-charger-slice";
import { EVCharger, SearchPromiseT, SearchTimeoutT } from "../../types";

let searchPromise: SearchPromiseT;
let searchTimeout: SearchTimeoutT;

export const useEVChargers = () => {
  const { snackbar } = useSnackbar();

  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const rowsPerPage = useAppSelector((state) => state.evchargers.rowsPerPage);
  const pageNo = useAppSelector((state) => state.evchargers.pageNo);
  const orderBy = useAppSelector((state) => state.evchargers.ordering);
  const selectedEVChargers = useAppSelector((state) => state.evchargers.selectedEVChargers);

  const [addModal, setAddModal] = React.useState<boolean>(false);
  const [editModal, setEditModal] = React.useState<boolean>(false);
  const [deleteModal, setDeleteModal] = React.useState<boolean>(false);

  const [searchFilter, setSearchFilter] = React.useState<string[]>([
    "serial_number",
    "vm_name",
    "company",
    "device_type",
    "status",
  ]);

  const handleSelectFilter = (value: string[]) => setSearchFilter(value);

  const dispatch = useAppDispatch();

  const handleFormSubmit = (values?: EVChargerFieldValues) => {
    if (addModal === true) {
      onAddEvCharger(values as EVChargerFieldValues);
    } else if (editModal === true) {
      onEditEvCharger(values as EVChargerFieldValues);
    } else if (deleteModal === true) {
      onDeleteEvCharger();
    }
  };

  const formik = useFormik({
    initialValues: {
      serial_number: "",
      vm_name: "",
      company: 0,
      device_type: 0,
      latitude: NaN,
      longitude: NaN,
      address_text: "",
      max_power: 0,
      connector_type: "",
    },
    onSubmit: handleFormSubmit,
    validationSchema: EVChargerSchema,
  });

  const toggleAddModal = () => {
    setAddModal((prevState) => !prevState);
  };
  const toggleEditModal = React.useCallback(() => {
    formik.setValues({
      serial_number: selectedEVChargers[0]?.serial_number,
      vm_name: selectedEVChargers[0]?.vm_name,
      company: selectedEVChargers[0]?.company?.id,
      device_type: selectedEVChargers[0]?.device_type_id,
      latitude: selectedEVChargers[0]?.address?.latitude,
      longitude: selectedEVChargers[0]?.address?.longitude,
      address_text: selectedEVChargers[0]?.address?.address,
      max_power: selectedEVChargers[0]?.max_power,
      connector_type: selectedEVChargers[0]?.connector_type,
    });

    if (editModal) {
      formik.resetForm();
    }
    setEditModal((prevState) => !prevState); 
  }, [formik, selectedEVChargers, editModal]);

  const toggleDeleteModal = () => setDeleteModal((prevState) => !prevState);

  const onAddEvCharger = React.useCallback(
    async (values: EVChargerFieldValues) => {
      try {
        const { latitude, longitude, address_text: addressText, ...rest } = values;
        const newValues = {
          address: { latitude: Number(latitude), longitude: Number(longitude), address: addressText },
          ...rest,
        };
        await dispatch(addEVCharger(newValues)).unwrap();
        toggleAddModal();
        snackbar({ message: "EV Charger Added Successfully", type: "success" });
      } catch (err: unknown) {
        serverErrorHandlers(err, snackbar);
      } finally {
        dispatch(fetchEVChargers({ query: "" }));
      }
    },
    [dispatch, snackbar],
  );

  const onEditEvCharger = React.useCallback(
    async (values: EVChargerFieldValues) => {
      try {
        const { latitude, longitude, address_text: addressText, ...rest } = values;
        const newValues = {
          address: { latitude: Number(latitude), longitude: Number(longitude), address: addressText },
          ...rest,
        };
        await dispatch(
          editEVCharger({
            ...newValues,
            id: selectedEVChargers[0]?.id,
          }),
        ).unwrap();
        toggleEditModal();
        snackbar({ message: "EV Charger Saved Successfully", type: "success" });
      } catch (err: unknown) {
        serverErrorHandlers(err, snackbar);
      } finally {
        dispatch(fetchEVChargers({ query: "" }));
      }
    },
    [dispatch, snackbar, selectedEVChargers, toggleEditModal],
  );

  const onDeleteEvCharger = React.useCallback(async () => {
    try {
      await Promise.all(
        _.map(selectedEVChargers, (value: EVCharger) =>
          dispatch(deleteEVCharger(value.id)).unwrap(),
        ),
      );
      toggleDeleteModal();
      snackbar({
        message: "EV Charger(s) Deleted Successfully",
        type: "success",
      });
    } catch (err: unknown) {
      serverErrorHandlers(err, snackbar);
    } finally {
      dispatch(fetchEVChargers({ query: "" }));
    }
  }, [dispatch, snackbar, selectedEVChargers]);

  const handleSearch: React.ChangeEventHandler<HTMLInputElement> = ({
    target: { value: query },
  }) => {
    clearTimeout(searchTimeout);

    setSearchQuery(query);

    searchTimeout = window.setTimeout(() => {
      searchPromise?.abort?.();
      searchPromise = dispatch(searchEVChargers({ query, filter: searchFilter }));
    }, 500);
  };

  const handleFetchEVChargers = () => {
    dispatch(fetchEVChargers({ query: "" }));
  };

  React.useEffect(() => {
    dispatch(fetchEVChargers({ query: searchQuery, filter: searchFilter }));
    dispatch(fetchAllEVChargers({ query: searchQuery, filter: searchFilter }));
    dispatch(fetchAllOperators());
    dispatch(fetchAllDeviceTypes());
    dispatch(setEVChargerSelected([]));

    return () => {
      searchPromise = undefined;
      clearTimeout(searchTimeout);
      searchTimeout = undefined;
    };
  }, [dispatch, rowsPerPage, pageNo, orderBy]);

  React.useEffect(() => {
    return () => {
      dispatch(resetEVChargerState());
    };
  }, []);

  return {
    onAddEvCharger,
    onEditEvCharger,
    onDeleteEvCharger,
    handleSearch,
    searchQuery,
    selectedEVChargers,
    toggleAddModal,
    toggleEditModal,
    toggleDeleteModal,
    addModal,
    editModal,
    deleteModal,
    formik,
    handleFetchEVChargers,
    handleFormSubmit,
    handleSelectFilter,
    searchFilter,
  };
};
