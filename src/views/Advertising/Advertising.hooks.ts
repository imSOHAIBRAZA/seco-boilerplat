import * as React from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector, useSnackbar } from "../../lib";
import { AdvertiseSchema, AdvertiseFieldValues } from "./Advertising.types";
import {
  fetchAdvertise,
  addAdvertise,
  editAdvertise,
  deleteAdvertise,
  fetchAllAdvertise,
} from "../../features/advertising/advertising-thunk";
import _ from "lodash";
import {
  fetchAllDeviceTypes,
  fetchAllOperators,
} from "../../features/dropdown-data/dropdown-slice";
import { SearchPromiseT, SearchTimeoutT } from "../../types";

let searchPromise: SearchPromiseT;
let searchTimeout: SearchTimeoutT;

export const useAdvertising = () => {
  const { snackbar } = useSnackbar();

  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const rowsPerPage = useAppSelector((state) => state.advertising.rowsPerPage);
  const pageNo = useAppSelector((state) => state.advertising.pageNo);
  const selectedAdvertise = useAppSelector((state) => state.advertising.selectedAdvertise);
  const orderBy = useAppSelector((state) => state.advertising.ordering);

  const [addModal, setAddModal] = React.useState<boolean>(false);
  const [editModal, setEditModal] = React.useState<boolean>(false);
  const [deleteModal, setDeleteModal] = React.useState<boolean>(false);

  const dispatch = useAppDispatch();

  const handleFormSubmit = (values?: AdvertiseFieldValues) => {
    if (addModal === true) {
      onAddAdvertise(values as AdvertiseFieldValues);
    } else if (editModal === true) {
      onEditAdvertise(values as AdvertiseFieldValues);
    } else if (deleteModal === true) {
      onDeleteAdvertise();
    }
  };

  const formik = useFormik({
    initialValues: {
      serial_number: "",
      vm_name: "",
      company: "",
      device_type: "",
    },
    onSubmit: handleFormSubmit,
    validationSchema: AdvertiseSchema,
  });

  const toggleAddModal = () => {
    setAddModal((prevState) => !prevState);
  };
  const toggleEditModal = React.useCallback(() => {
    formik.setValues({
      serial_number: selectedAdvertise[0]?.serial_number,
      vm_name: selectedAdvertise[0]?.vm_name,
      company: selectedAdvertise[0]?.company?.id,
      device_type: selectedAdvertise[0]?.device_type_id,
    });

    if (editModal) {
      formik.resetForm();
    }
    setEditModal((prevState) => !prevState);
  }, [formik, selectedAdvertise, editModal]);

  const toggleDeleteModal = () => setDeleteModal((prevState) => !prevState);

  const onAddAdvertise = React.useCallback(
    async (values: AdvertiseFieldValues) => {
      try {
        await dispatch(addAdvertise(values)).unwrap();
        toggleAddModal();
        snackbar({ message: "Advertise Added Successfully", type: "success" });
      } catch (err: unknown) {
        snackbar({
          message: "Something went wrong while adding",
          type: "error",
        });
        if (axios.isAxiosError(err)) {
          if (err.response?.status) {
            if (err.response?.status >= 400 && err.response?.status <= 500) {
              /** do something */
            } else if (err.response?.status >= 500) {
              /** do something */
            }
          } else {
            /** do something */
          }
        } else if (err instanceof Error) {
          /** do something */
        } else {
          /** do something */
        }
      } finally {
        dispatch(fetchAdvertise(null));
      }
    },
    [dispatch, snackbar],
  );

  const onEditAdvertise = React.useCallback(
    async (values: AdvertiseFieldValues) => {
      try {
        await dispatch(
          editAdvertise({
            ...values,
            id: selectedAdvertise[0]?.id,
          }),
        ).unwrap();
        toggleEditModal();
        snackbar({ message: "Advertise Saved Successfully", type: "success" });
      } catch (err: unknown) {
        snackbar({
          message: "Something went wrong while editing",
          type: "error",
        });
        if (axios.isAxiosError(err)) {
          if (err.response?.status) {
            if (err.response?.status >= 400 && err.response?.status <= 500) {
              /** do something */
            } else if (err.response?.status >= 500) {
              /** do something */
            }
          } else {
            /** do something */
          }
        } else if (err instanceof Error) {
          /** do something */
        } else {
          /** do something */
        }
      } finally {
        dispatch(fetchAdvertise(null));
      }
    },
    [dispatch, snackbar, selectedAdvertise, toggleEditModal],
  );

  const onDeleteAdvertise = React.useCallback(async () => {
    try {
      await Promise.all(
        _.map(selectedAdvertise, (value: any) => dispatch(deleteAdvertise(value.id)).unwrap()),
      );
      toggleDeleteModal();
      snackbar({
        message: "Advertise Deleted Successfully",
        type: "success",
      });
    } catch (err: unknown) {
      snackbar({
        message: "Something went wrong while deleting",
        type: "error",
      });
      if (axios.isAxiosError(err)) {
        if (err.response?.status) {
          if (err.response?.status >= 400 && err.response?.status <= 500) {
            /** do something */
          } else if (err.response?.status >= 500) {
            /** do something */
          }
        } else {
          /** do something */
        }
      } else if (err instanceof Error) {
        /** do something */
      } else {
        /** do something */
      }
    } finally {
      dispatch(fetchAdvertise(null));
    }
  }, [dispatch, snackbar, selectedAdvertise]);

  const handleSearch: React.ChangeEventHandler<HTMLInputElement> = ({
    target: { value: query },
  }) => {
    clearTimeout(searchTimeout);

    setSearchQuery(query);

    searchTimeout = window.setTimeout(() => {
      searchPromise?.abort?.();
      // searchPromise = dispatch(searchEVChargers(query));
    }, 500);
  };

  const handleFetchAdvertise = () => {
    dispatch(fetchAdvertise(null));
  };

  React.useEffect(() => {
    dispatch(fetchAdvertise(null));
    dispatch(fetchAllAdvertise());
    dispatch(fetchAllOperators());
    dispatch(fetchAllDeviceTypes());

    return () => {
      searchPromise = undefined;
      clearTimeout(searchTimeout);
      searchTimeout = undefined;
    };
  }, [dispatch, rowsPerPage, pageNo, orderBy]);

  return {
    onAddAdvertise,
    onEditAdvertise,
    onDeleteAdvertise,
    handleSearch,
    searchQuery,
    selectedAdvertise,
    toggleAddModal,
    toggleEditModal,
    toggleDeleteModal,
    addModal,
    editModal,
    deleteModal,
    formik,
    handleFetchAdvertise,
    handleFormSubmit,
  };
};
