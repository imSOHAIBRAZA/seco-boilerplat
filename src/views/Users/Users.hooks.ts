import * as React from "react";
import { useFormik } from "formik";
import { serverErrorHandlers, useAppDispatch, useAppSelector, useSnackbar } from "../../lib";
import { UserSchema, UserValues, EditUserSchema } from "./Users.types";
import {
  addUser,
  editUser,
  deleteUser,
  fetchUsers,
  searchUsers,
  fetchAllUsers,
} from "../../features/user/user-thunk";
import _ from "lodash";
import { fetchAllOperators } from "../../features/dropdown-data/dropdown-slice";
import { setSelectedUsers } from "../../features/user/user-slice";
import { SearchPromiseT, SearchTimeoutT, User } from "../../types";

let searchPromise: SearchPromiseT;
let searchTimeout: SearchTimeoutT;

export const useUsers = () => {
  const { snackbar } = useSnackbar();

  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [searchFilter, setSearchFilter] = React.useState<string[]>([
    "username",
    "first_name",
    "last_name",
    "type",
    "created_by_user",
    "operator",
    "email",
  ]);
  const rowsPerPage = useAppSelector((state) => state.users.rowsPerPage);
  const pageNo = useAppSelector((state) => state.users.pageNo);
  const selectedUsers = useAppSelector((state) => state.users.selectedUsers);
  const orderBy = useAppSelector((state) => state.users.ordering);

  const [addModal, setAddModal] = React.useState<boolean>(false);
  const [editModal, setEditModal] = React.useState<boolean>(false);
  const [deleteModal, setDeleteModal] = React.useState<boolean>(false);

  const dispatch = useAppDispatch();

  const handleFormSubmit = (values?: UserValues) => {
    if (addModal === true) {
      onAddUser(values as UserValues);
    } else if (editModal === true) {
      onEditUser(values as UserValues);
    } else if (deleteModal === true) {
      onDeleteUser();
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      type: "",
      company: -1,
    },
    onSubmit: handleFormSubmit,
    validationSchema: editModal ? EditUserSchema : UserSchema,
  });

  const toggleAddModal = () => {
    setAddModal((prevState) => !prevState);
  };
  const toggleEditModal = React.useCallback(() => {
    formik.setValues({
      username: selectedUsers[0]?.username,
      email: selectedUsers[0]?.email,
      first_name: selectedUsers[0]?.first_name,
      last_name: selectedUsers[0]?.last_name,
      password: "",
      type: selectedUsers[0]?.type,
      company: selectedUsers[0]?.company?.id || -1,
    });

    if (editModal) {
      formik.resetForm();
    }
    setEditModal((prevState) => !prevState);
  }, [formik, selectedUsers, editModal]);

  const toggleDeleteModal = () => setDeleteModal((prevState) => !prevState);

  const onAddUser = React.useCallback(
    async (values: UserValues) => {
      try {
        await dispatch(addUser(values)).unwrap();
        toggleAddModal();
        snackbar({ message: "User Added Successfully", type: "success" });
      } catch (err: unknown) {
        serverErrorHandlers(err, snackbar);
      } finally {
        dispatch(fetchUsers({ query: "" }));
      }
    },
    [dispatch, snackbar],
  );

  const onEditUser = React.useCallback(
    async (values: UserValues) => {
      try {
        await dispatch(
          editUser({
            ...values,
            id: selectedUsers[0]?.id,
          }),
        ).unwrap();
        toggleEditModal();
        snackbar({ message: "User Saved Successfully", type: "success" });
      } catch (err: unknown) {
        serverErrorHandlers(err, snackbar);
      } finally {
        dispatch(fetchUsers({ query: "" }));
      }
    },
    [dispatch, snackbar, selectedUsers, toggleEditModal],
  );

  const onDeleteUser = React.useCallback(async () => {
    try {
      await Promise.all(
        _.map(selectedUsers, (value: User) => dispatch(deleteUser(value.id)).unwrap()),
      );
      toggleDeleteModal();
      snackbar({
        message: "User(s) Deleted Successfully",
        type: "success",
      });
    } catch (err: unknown) {
      serverErrorHandlers(err, snackbar);
    } finally {
      dispatch(fetchUsers({ query: "" }));
    }
  }, [dispatch, snackbar, selectedUsers]);

  const handleSelectFilter = (value: string[]) => {
    setSearchFilter(value);
  };

  const handleSearch: React.ChangeEventHandler<HTMLInputElement> = ({
    target: { value: query },
  }) => {
    clearTimeout(searchTimeout);

    setSearchQuery(query);

    searchTimeout = window.setTimeout(() => {
      searchPromise?.abort?.();
      searchPromise = dispatch(searchUsers({ query, filter: searchFilter }));
    }, 500);
  };

  React.useEffect(() => {
    dispatch(fetchUsers({ query: searchQuery, filter: searchFilter }));
    dispatch(fetchAllUsers({ query: searchQuery, filter: searchFilter }));
    dispatch(fetchAllOperators());
    dispatch(setSelectedUsers([]));

    return () => {
      searchPromise = undefined;
      clearTimeout(searchTimeout);
      searchTimeout = undefined;
    };
  }, [dispatch, rowsPerPage, pageNo, orderBy]);

  return {
    onAddUser,
    onEditUser,
    onDeleteUser,
    handleSearch,
    handleSelectFilter,
    searchQuery,
    searchFilter,
    selectedUsers,
    toggleAddModal,
    toggleEditModal,
    toggleDeleteModal,
    addModal,
    editModal,
    deleteModal,
    formik,
    handleFormSubmit,
  };
};
