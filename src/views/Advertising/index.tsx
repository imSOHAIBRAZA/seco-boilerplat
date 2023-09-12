import * as React from "react";
import { Box, Typography } from "@mui/material";
import { AddIcon, DeleteIcon, EditIcon, ExportIcon, ReloadIcon } from "../../assets/icons";
import { Table, Modal, SearchField, IconButton } from "../../components";
import * as sx from "./Advertising.styles";
import * as types from "./Advertising.types";
import * as mock from "./Advertising.mock";
import { getScreenDescription, useAppDispatch, useAppSelector } from "../../lib";
import {
  setAdvertisingPage,
  setAdvertisingRowsPerPage,
  setAdvertisingSelected,
  setAdvertisingOrdering,
} from "../../features/advertising/advertising-slice";
import { Field } from "../../components/Modal/Modal.types";
import { useAdvertising } from "./Advertising.hooks";
import { CSVLink } from "react-csv";

const Advertising: types.ComponentT = () => {
  const dispatch = useAppDispatch();

  const advertise = useAppSelector((state) => state.advertising.advertise);
  const allAdvertise = useAppSelector((state) => state.advertising.allAdvertise);
  const rowsPerPage = useAppSelector((state) => state.advertising.rowsPerPage);
  const pageNo = useAppSelector((state) => state.advertising.pageNo);
  const isLoading = useAppSelector((state) => state.advertising.isLoading);
  const isMutating = useAppSelector((state) => state.advertising.isMutating);
  const dataCount = useAppSelector((state) => state.advertising.dataCount);
  const selectedAdvertise = useAppSelector((state) => state.advertising.selectedAdvertise);
  const orderBy = useAppSelector((state) => state.advertising.ordering);
  const user = useAppSelector((state) => state?.auth?.user);

  const operatorOptions = useAppSelector((state) => state.dropdown.operators);

  const [searchFilter, setSearchFilter] = React.useState<string[]>([]);

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
    handleFetchAdvertise,
  } = useAdvertising();

  const handleSelectFilter = (value: string[]) => setSearchFilter(value);

  const advertisingFields: Field[] = React.useMemo(
    () => [
      {
        key: "ad_name",
        label: "Ad Name",
        required: true,
        visible: true,
        type: "text",
      },
      {
        key: "operator_name",
        label: "Operator",
        required: true,
        visible: true,
        type: "select",
        options: operatorOptions,
      },
      {
        key: "ad_type",
        label: "Type",
        required: true,
        visible: true,
        type: "select",
        options: operatorOptions,
      },
      {
        key: "ad_screen",
        label: "Screen",
        required: true,
        visible: true,
        type: "select",
        options: operatorOptions,
      },
    ],
    [],
  );

  const handleRecordSelection = (selected: any) => {
    const selection = selected as any[];

    dispatch(setAdvertisingSelected(selection));
  };

  const handleRowsPerPageChange = (limit: number) => {
    dispatch(setAdvertisingRowsPerPage(limit));
  };

  const handlePageChange = (page: number) => {
    dispatch(setAdvertisingPage(page));
  };
  const handleSort = (order: string) => {
    dispatch(setAdvertisingOrdering(order));
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
              onClick={toggleEditModal}
              variant='outlined'
              disabled={selectedAdvertise?.length !== 1 || user?.type === "SA" || user?.type === "VU"}
              icon={EditIcon}
            >
              Edit
            </IconButton>
            <IconButton
              onClick={toggleDeleteModal}
              variant='outlined'
              color='error'
              disabled={selectedAdvertise?.length < 1 || user?.type === "VU"}
              icon={DeleteIcon}
            >
              Delete
            </IconButton>
            <IconButton icon={ReloadIcon} variant='outlined' onClick={handleFetchAdvertise}>
              Refresh
            </IconButton>
            <CSVLink
              data={allAdvertise}
              filename={"allAdvertise.csv"}
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
            selected={selectedAdvertise}
            setSelected={handleRecordSelection}
            headData={mock.HeadRowData}
            data={advertise}
            isLoading={isLoading}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleRowsPerPageChange}
            page={pageNo}
            orderBy={orderBy}
            onSort={handleSort}
            onPageChange={handlePageChange}
            dataCount={dataCount}
          />
        </Box>
      </Box>
      <Modal
        title='Add Advertise'
        onClose={toggleAddModal}
        open={addModal}
        onSubmit={formik.handleSubmit}
        formik={formik}
        fields={advertisingFields}
        disabled={isMutating}
      />
      <Modal
        title='Edit Advertise'
        onClose={toggleEditModal}
        open={editModal}
        formik={formik}
        fields={advertisingFields}
        onSubmit={formik.handleSubmit}
        submitButtonText='Save'
        disabled={isMutating}
      />
      <Modal
        title='Delete Advertise'
        description='Are you sure you want to delete the Advertise?'
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

export default Advertising;
