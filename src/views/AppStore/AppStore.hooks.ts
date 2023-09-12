import * as React from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector, useSnackbar } from "../../lib";
import { AddAppSchema, AppFieldValues } from "./AppStore.types";
import _ from "lodash";
import {
  addApp,
  editApp,
  deleteApp,
  fetchApps,
  searchApps,
  insatllApp,
} from "../../features/appstore/appstore-thunk";
import { fetchAllOperators } from "../../features/dropdown-data/dropdown-slice";
import { App, SearchPromiseT, SearchTimeoutT } from "../../types";

let searchPromise: SearchPromiseT;
let searchTimeout: SearchTimeoutT;

export const useApps = () => {
  const { snackbar } = useSnackbar();

  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const rowsPerPage = useAppSelector((state) => state.apps.rowsPerPage);
  const pageNo = useAppSelector((state) => state.apps.pageNo);
  const selectedApps = useAppSelector((state) => state.apps.selectedApps);

  const [addModal, setAddModal] = React.useState<boolean>(false);
  const [editModal, setEditModal] = React.useState<boolean>(false);
  const [deleteModal, setDeleteModal] = React.useState<boolean>(false);

  const [searchFilter, setSearchFilter] = React.useState<string[]>([
    "name",
    "category",
    "description",
    "app_slug",
  ]);

  const dispatch = useAppDispatch();

  const handleFormSubmit = (values?: AppFieldValues) => {
    if (addModal === true) {
      onAddApp(values as AppFieldValues);
    } else if (editModal === true) {
      onEditApp(values as AppFieldValues);
    } else if (deleteModal === true) {
      onDeleteApp();
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      app_type: "Frontend",
      description: "",
      company_ids: [] as number[],
      category: "",
      app_slug: "",
      icon: null,
      sidebar_icon: null,
    },
    onSubmit: handleFormSubmit,
    validationSchema: AddAppSchema,
  });

  const toggleAddModal = () => {
    setAddModal((prevState) => !prevState);
  };
  const toggleEditModal = React.useCallback(() => {
    formik.setValues({
      name: selectedApps[0]?.name,
      app_type: "Frontend",
      description: selectedApps[0]?.description,
      category: selectedApps[0]?.category,
      company_ids: selectedApps[0]?.companies,
      app_slug: selectedApps[0]?.app_slug,
      icon: null,
      sidebar_icon: null,
    });

    if (editModal) {
      formik.resetForm();
    }
    setEditModal((prevState) => !prevState);
  }, [formik, selectedApps, editModal]);

  const toggleDeleteModal = () => setDeleteModal((prevState) => !prevState);

  const onAddApp = React.useCallback(
    async (values: AppFieldValues) => {
      try {
        await dispatch(addApp(values)).unwrap();
        toggleAddModal();
        snackbar({ message: "App Added Successfully", type: "success" });
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
        dispatch(fetchApps());
      }
    },
    [dispatch, snackbar],
  );

  const onEditApp = React.useCallback(
    async (values: AppFieldValues) => {
      try {
        await dispatch(
          editApp({
            ...values,
            id: selectedApps[0]?.id,
          }),
        ).unwrap();
        toggleEditModal();
        snackbar({ message: "App Saved Successfully", type: "success" });
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
        dispatch(fetchApps());
      }
    },
    [dispatch, snackbar, selectedApps, toggleEditModal],
  );

  const onDeleteApp = React.useCallback(async () => {
    try {
      await Promise.all(
        _.map(selectedApps, (value: App) => dispatch(deleteApp(value.id)).unwrap()),
      );
      toggleDeleteModal();
      snackbar({
        message: "App(s) Deleted Successfully",
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
      dispatch(fetchApps());
    }
  }, [dispatch, snackbar, selectedApps]);

  const onInstallApp = React.useCallback(
    async (id: number) => {
      try {
        const data= await dispatch(insatllApp(id)).unwrap();
        snackbar({ message: data.message, type: "success" });
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
        dispatch(fetchApps());
      }
    },
    [dispatch, snackbar],
  );

  const handleSearch: React.ChangeEventHandler<HTMLInputElement> = ({
    target: { value: query },
  }) => {
    clearTimeout(searchTimeout);

    setSearchQuery(query);

    searchTimeout = window.setTimeout(() => {
      searchPromise?.abort?.();
      searchPromise = dispatch(searchApps({ query, filter: searchFilter }));
    }, 500);
  };

  const handleSelectFilter = (value: string[]) => setSearchFilter(value);

  React.useEffect(() => {
    dispatch(fetchApps());
    dispatch(fetchAllOperators());

    return () => {
      searchPromise = undefined;
      clearTimeout(searchTimeout);
      searchTimeout = undefined;
    };
  }, [dispatch, rowsPerPage, pageNo]);

  return {
    onAddApp,
    onEditApp,
    onDeleteApp,
    handleSearch,
    searchQuery,
    selectedApps,
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
    onInstallApp,
  };
};
