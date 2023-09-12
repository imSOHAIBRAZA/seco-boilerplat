import * as React from "react";
import { Box, Typography } from "@mui/material";
import { useUsers } from "./Users.hooks";
import { AddIcon, DeleteIcon, EditIcon, ExportIcon } from "../../assets/icons";
import { Table, Modal, SearchField, IconButton } from "../../components";
import * as sx from "./Users.styles";
import * as types from "./Users.types";
import * as mock from "./Users.mock";
import {
  setUserRowsPerPage,
  setUserPage,
  setSelectedUsers,
  setUserOrdering,
} from "../../features/user/user-slice";
import { getScreenDescription, useAppDispatch, useAppSelector } from "../../lib";
import { Field } from "../../components/Modal/Modal.types";
import { User } from "../../types";
import { CSVLink } from "react-csv";

const Users: types.ComponentT = () => {
  const dispatch = useAppDispatch();

  const users = useAppSelector((state) => state.users.users);
  const allUsers = useAppSelector((state) => state.users.allUsers);
  const rowsPerPage = useAppSelector((state) => state.users.rowsPerPage);
  const pageNo = useAppSelector((state) => state.users.pageNo);
  const isLoading = useAppSelector((state) => state.users.isLoading);
  const dataCount = useAppSelector((state) => state.users.dataCount);
  const isMutating = useAppSelector((state) => state.users.isMutating);
  const selectedUsers = useAppSelector((state) => state.users.selectedUsers);
  const orderBy = useAppSelector((state) => state.users.ordering);
  const operatorOptions = useAppSelector((state) => state.dropdown.operators);
  const user = useAppSelector((state) => state?.auth?.user);

  const {
    searchQuery,
    searchFilter,
    handleSelectFilter,
    handleSearch,
    toggleAddModal,
    toggleDeleteModal,
    toggleEditModal,
    addModal,
    editModal,
    deleteModal,
    formik,
    handleFormSubmit,
  } = useUsers();

  const userFields: Field[] = React.useMemo(
    () => [
      {
        key: "username",
        label: "Username",
        required: true,
        visible: true,
        type: "text",
      },
      {
        key: "email",
        label: "Email",
        required: true,
        visible: true,
        type: "text",
      },
      {
        key: "first_name",
        label: "First Name",
        required: true,
        visible: true,
        type: "text",
      },
      {
        key: "last_name",
        label: "Last Name",
        required: true,
        visible: true,
        type: "text",
      },
      {
        key: "password",
        label: "Password",
        required: !editModal,
        visible: true,
        type: "password",
      },
      {
        key: "company",
        label: "Operator",
        required: false,
        visible: true,
        options: operatorOptions,
        type: "select",
        render: (_: unknown, value: { business_name: string }) => value?.business_name,
      },

      {
        key: "type",
        label: "User Type",
        required: true,
        visible: true,
        options: [
          { label: "Operator", value: "OP" },
          { label: "Floor Operator", value: "FO" },
          { label: "Employee", value: "EM" },
          { label: "Super Admin", value: "SA" },
          { label: "Demo User", value: "VU" },
        ],
        type: "select",
      },
    ],
    [operatorOptions, editModal],
  );

  const handleRecordSelection = (selected: User[]) => {
    const selection = selected;

    dispatch(setSelectedUsers(selection));
  };

  const handleRowsPerPageChange = (limit: number) => {
    dispatch(setUserRowsPerPage(limit));
  };

  const handlePageChange = (page: number) => {
    dispatch(setUserPage(page));
  };

  const handleSort = (order: string) => {
    dispatch(setUserOrdering(order));
  };

  return (
    <React.Fragment>
      <Box>
        <Typography variant='body2' sx={sx.appDescription}>
          {getScreenDescription(location.pathname)}
        </Typography>
        <Box sx={sx.headerWrapper}>
          <Box sx={sx.buttonsWrapper}>
            <IconButton icon={AddIcon} onClick={toggleAddModal} disabled={user?.type === "VU"}>
              Add
            </IconButton>
            <IconButton
              onClick={toggleEditModal}
              variant='outlined'
              disabled={selectedUsers?.length !== 1 || user?.type === "VU"}
              icon={EditIcon}
            >
              Edit
            </IconButton>
            <IconButton
              onClick={toggleDeleteModal}
              variant='outlined'
              color='error'
              disabled={selectedUsers?.length < 1 || user?.type === "VU"}
              icon={DeleteIcon}
            >
              Delete
            </IconButton>
            <CSVLink
              data={allUsers}
              filename={"allUsers.csv"}
              style={{ textDecoration: "none" }}
            >
              <IconButton icon={ExportIcon} variant='contained' >
                Export
              </IconButton>
            </CSVLink>
          </Box>

          <SearchField
            value={searchQuery}
            filterValue={searchFilter}
            onChange={handleSearch}
            onSelect={handleSelectFilter}
            options={mock.filterOptions}
          />
        </Box>
        <Box sx={sx.tableWrapper}>
          <Table
            selected={selectedUsers}
            setSelected={handleRecordSelection}
            headData={mock.HeadRowData}
            data={users}
            isLoading={isLoading}
            rowsPerPage={rowsPerPage}
            orderBy={orderBy}
            onSort={handleSort}
            onRowsPerPageChange={handleRowsPerPageChange}
            page={pageNo}
            dataCount={dataCount}
            onPageChange={handlePageChange}
          />
        </Box>
      </Box>
      <Modal
        title='Add User'
        onClose={toggleAddModal}
        open={addModal}
        onSubmit={formik.handleSubmit}
        formik={formik}
        fields={userFields}
        disabled={isMutating}
      />
      <Modal
        title='Edit User'
        onClose={toggleEditModal}
        open={editModal}
        formik={formik}
        fields={userFields}
        onSubmit={formik.handleSubmit}
        submitButtonText='Save'
        disabled={isMutating}
      />
      <Modal
        title='Delete User(s)'
        description='Are you sure you want to delete the User(s)?'
        onClose={toggleDeleteModal}
        open={deleteModal}
        onSubmit={handleFormSubmit}
        submitButtonText='Yes, Proceed'
        disabled={isMutating}
        icon={DeleteIcon}
        align='center'
      />
    </React.Fragment>
  );
};

export default Users;
