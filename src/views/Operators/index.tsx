import * as React from "react";
import { Box, Typography } from "@mui/material";
import { AddIcon, DeleteIcon, EditIcon, ExportIcon } from "../../assets/icons";
import { Table, Modal, SearchField, IconButton } from "../../components";
import * as sx from "./Operators.styles";
import * as types from "./Operators.types";
import * as mock from "./Operators.mock";
import { getScreenDescription, useAppDispatch, useAppSelector } from "../../lib";
import {
  setOperatorPage,
  setOperatorRowsPerPage,
  setOperatorsOrdering,
  setSelectedOperators,
} from "../../features/operator/operator-slice";
import { Field } from "../../components/Modal/Modal.types";
import { Operator } from "../../types";
import { useOperators } from "./Operators.hooks";
import { CSVLink } from "react-csv";

const Operators: types.ComponentT = () => {
  const dispatch = useAppDispatch();

  const operators = useAppSelector((state) => state.operators.operators);
  const allOperators = useAppSelector((state) => state.operators.allOperators);
  const rowsPerPage = useAppSelector((state) => state.operators.rowsPerPage);
  const pageNo = useAppSelector((state) => state.operators.pageNo);
  const isLoading = useAppSelector((state) => state.operators.isLoading);
  const isMutating = useAppSelector((state) => state.operators.isMutating);
  const dataCount = useAppSelector((state) => state.operators.dataCount);
  const orderBy = useAppSelector((state) => state.operators.ordering);
  const selectedOperators = useAppSelector((state) => state.operators.selectedOperators);
  // const [filteredOperators, setFilteredOperators] = React.useState<any>([]);
  const user = useAppSelector((state) => state?.auth?.user);

  const {
    searchQuery,
    handleSearch,
    toggleAddModal,
    toggleDeleteModal,
    toggleEditModal,
    addModal,
    editModal,
    deleteModal,
    formik,
    handleFormSubmit,
    handleSelectFilter,
    searchFilter,
  } = useOperators();

  const deviceTypeOptions = useAppSelector((state) => state.dropdown.deviceTypes);

  const operatorFields: Field[] = React.useMemo(
    () => [
      {
        key: "business_name",
        label: "Name",
        required: true,
        visible: true,
        type: "text",
      },
      {
        key: "address",
        label: "Address",
        required: true,
        visible: true,
        type: "text",
      },
      {
        key: "contact_info",
        label: "Contact Info",
        required: true,
        visible: true,
        type: "text",
      },
      {
        key: "device_types",
        label: "Device Types",
        required: true,
        visible: true,
        options: deviceTypeOptions,
        type: "multiSelect",
      },
    ],
    [],
  );

  const handleRecordSelection = (selected: Operator[]) => {
    const selection = selected;

    dispatch(setSelectedOperators(selection));
  };

  const handleRowsPerPageChange = (limit: number) => {
    dispatch(setOperatorRowsPerPage(limit));
  };

  const handlePageChange = (page: number) => {
    dispatch(setOperatorPage(page));
  };

  const handleSort = (order: string) => {
    dispatch(setOperatorsOrdering(order));
  };

  return (
    <React.Fragment>
      <Box>
        <Typography variant='body2' sx={sx.appDescription}>
          {getScreenDescription(location.pathname)}
        </Typography>
        <Box sx={sx.headerWrapper}>
          <Box sx={sx.buttonsWrapper}>
            <IconButton icon={AddIcon} onClick={toggleAddModal} variant='contained' disabled={user?.type === "VU"}>
              Add
            </IconButton>
            <IconButton
              icon={EditIcon}
              onClick={toggleEditModal}
              variant='outlined'
              disabled={selectedOperators?.length !== 1 || user?.type === "VU"}
            >
              Edit
            </IconButton>
            <IconButton
              onClick={toggleDeleteModal}
              variant='outlined'
              color='error'
              disabled={selectedOperators?.length < 1}
              icon={DeleteIcon}
            >
              Delete
            </IconButton>
            <CSVLink
              data={allOperators}
              filename={"allOperators.csv"}
              style={{ textDecoration: "none" }}
            >
              <IconButton icon={ExportIcon} variant='contained'>
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
            selected={selectedOperators}
            setSelected={handleRecordSelection}
            headData={mock.HeadRowData}
            data={operators}
            isLoading={isLoading}
            orderBy={orderBy}
            onSort={handleSort}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleRowsPerPageChange}
            page={pageNo}
            onPageChange={handlePageChange}
            dataCount={dataCount}
          />
        </Box>
      </Box>
      <Modal
        title='Add Operator'
        onClose={toggleAddModal}
        open={addModal}
        onSubmit={formik.handleSubmit}
        formik={formik}
        fields={operatorFields}
        disabled={isMutating}
      />
      <Modal
        title='Edit Operator'
        onClose={toggleEditModal}
        open={editModal}
        formik={formik}
        fields={operatorFields}
        onSubmit={formik.handleSubmit}
        submitButtonText='Save'
        disabled={isMutating}
      />
      <Modal
        title='Delete Operator(s)'
        description='Are you sure you want to delete the Operator(s)?'
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

export default Operators;
