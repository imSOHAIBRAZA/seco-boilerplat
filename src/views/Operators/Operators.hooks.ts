import * as React from "react";
import { useFormik } from "formik";
import { serverErrorHandlers, useAppDispatch, useAppSelector, useSnackbar } from "../../lib";
import { AddOperatorSchema, OperatorFieldValues } from "./Operators.types";
import {
  addOperator,
  deleteOperator,
  editOperator,
  fetchOperators,
  fetchAllOperators,
  searchOperators,
} from "../../features/operator/operator-thunk";
import _ from "lodash";
import { setSelectedOperators } from "../../features/operator/operator-slice";
import { Operator, SearchPromiseT, SearchTimeoutT } from "../../types";

let searchPromise: SearchPromiseT;
let searchTimeout: SearchTimeoutT;

export const useOperators = () => {
  const { snackbar } = useSnackbar();

  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const rowsPerPage = useAppSelector((state) => state.operators.rowsPerPage);
  const pageNo = useAppSelector((state) => state.operators.pageNo);
  const selectedOperators = useAppSelector((state) => state.operators.selectedOperators);
  const orderBy = useAppSelector((state) => state.operators.ordering);

  const [addModal, setAddModal] = React.useState<boolean>(false);
  const [editModal, setEditModal] = React.useState<boolean>(false);
  const [deleteModal, setDeleteModal] = React.useState<boolean>(false);
  const [searchFilter, setSearchFilter] = React.useState<string[]>([
    "business_name",
    "address",
    "contact_info",
    "parent_operator",
  ]);

  const handleSelectFilter = (value: string[]) => setSearchFilter(value);

  const dispatch = useAppDispatch();

  const handleFormSubmit = (values?: OperatorFieldValues) => {
    if (addModal === true) {
      onAddOperator(values as OperatorFieldValues);
    } else if (editModal === true) {
      onEditOperator(values as OperatorFieldValues);
    } else if (deleteModal === true) {
      onDeleteOperator();
    }
  };

  const formik = useFormik({
    initialValues: {
      business_name: "",
      address: "",
      contact_info: "",
      customer_type: "Operator",
      device_types: [],
    },
    onSubmit: handleFormSubmit,
    validationSchema: AddOperatorSchema,
  });

  const toggleAddModal = () => {
    setAddModal((prevState) => !prevState);
  };
  const toggleEditModal = React.useCallback(() => {
    formik.setValues({
      business_name: selectedOperators[0]?.business_name,
      address: selectedOperators[0]?.address,
      contact_info: selectedOperators[0]?.contact_info,
      customer_type: "Operator",
      device_types: [],
    });

    if (editModal) {
      formik.resetForm();
    }
    setEditModal((prevState) => !prevState);
  }, [formik, selectedOperators, editModal]);

  const toggleDeleteModal = () => setDeleteModal((prevState) => !prevState);

  const onAddOperator = React.useCallback(
    async (values: OperatorFieldValues) => {
      try {
        await dispatch(addOperator(values)).unwrap();
        toggleAddModal();
        snackbar({ message: "Operator Added Successfully", type: "success" });
      } catch (err: unknown) {
        serverErrorHandlers(err, snackbar);
      } finally {
        dispatch(fetchOperators({ query: "" }));
      }
    },
    [dispatch, snackbar],
  );

  const onEditOperator = React.useCallback(
    async (values: OperatorFieldValues) => {
      try {
        await dispatch(
          editOperator({
            ...values,
            id: selectedOperators[0]?.id,
          }),
        ).unwrap();
        toggleEditModal();
        snackbar({ message: "Operator Saved Successfully", type: "success" });
      } catch (err: unknown) {
        serverErrorHandlers(err, snackbar);
      } finally {
        dispatch(fetchOperators({ query: "" }));
      }
    },
    [dispatch, snackbar, selectedOperators, toggleEditModal],
  );

  const onDeleteOperator = React.useCallback(async () => {
    try {
      await Promise.all(
        _.map(selectedOperators, (value: Operator) => dispatch(deleteOperator(value.id)).unwrap()),
      );
      toggleDeleteModal();
      snackbar({
        message: "Operator(s) Deleted Successfully",
        type: "success",
      });
    } catch (err: unknown) {
      serverErrorHandlers(err, snackbar);
    } finally {
      dispatch(fetchOperators({ query: "" }));
    }
  }, [dispatch, snackbar, selectedOperators]);

  const handleSearch: React.ChangeEventHandler<HTMLInputElement> = ({
    target: { value: query },
  }) => {
    clearTimeout(searchTimeout);

    setSearchQuery(query);

    searchTimeout = window.setTimeout(() => {
      searchPromise?.abort?.();
      searchPromise = dispatch(searchOperators({ query, filter: searchFilter }));
    }, 500);
  };

  React.useEffect(() => {
    dispatch(fetchOperators({ query: searchQuery, filter: searchFilter }));
    dispatch(fetchAllOperators({ query: searchQuery, filter: searchFilter }));
    dispatch(setSelectedOperators([]));

    return () => {
      searchPromise = undefined;
      clearTimeout(searchTimeout);
      searchTimeout = undefined;
    };
  }, [dispatch, rowsPerPage, pageNo, orderBy]);

  return {
    onAddOperator,
    onEditOperator,
    onDeleteOperator,
    handleSearch,
    searchQuery,
    selectedOperators,
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
