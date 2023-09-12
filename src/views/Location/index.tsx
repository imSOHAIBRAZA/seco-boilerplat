import * as React from "react";
import { Box, Typography } from "@mui/material";
import { AddIcon, DeleteIcon, EditIcon, ExportIcon } from "../../assets/icons";
import { Table, Modal, SearchField, IconButton } from "../../components";
import * as sx from "./Location.styles";
import * as types from "./Location.types";
import * as mock from "./Location.mock";
import { getScreenDescription, useAppDispatch, useAppSelector } from "../../lib";
import {
  setLocationOrdering,
  setLocationPage,
  setLocationRowsPerPage,
  setLocationSelected,
} from "../../features/location/location-slice";
import { Field } from "../../components/Modal/Modal.types";
import { useLocation } from "./Location.hooks";
import { Location as LocationT } from "../../types";
import { CSVLink } from "react-csv";

const Location: types.ComponentT = () => {
  const dispatch = useAppDispatch();

  const locations = useAppSelector((state) => state.locations.locations);
  const allLocations = useAppSelector((state) => state.locations.allLocations);
  const rowsPerPage = useAppSelector((state) => state.locations.rowsPerPage);
  const pageNo = useAppSelector((state) => state.locations.pageNo);
  const isLoading = useAppSelector((state) => state.locations.isLoading);
  const isMutating = useAppSelector((state) => state.locations.isMutating);
  const dataCount = useAppSelector((state) => state.locations.dataCount);
  const selectedLocations = useAppSelector((state) => state.locations.selectedLocations);
  const orderBy = useAppSelector((state) => state.locations.ordering);
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
  } = useLocation();

  const locationFields: Field[] = React.useMemo(
    () => [
      {
        key: "location_name",
        label: "Location Name",
        required: true,
        visible: true,
        type: "text",
      },
      {
        key: "country",
        label: "Country",
        required: true,
        visible: true,
        type: "text",
      },
      {
        key: "city",
        label: "City",
        required: true,
        visible: true,
        type: "text",
      },
      {
        key: "province",
        label: "Province",
        required: true,
        visible: true,
        type: "text",
      },
      {
        key: "detailed_address",
        label: "Detailed Address",
        required: true,
        visible: true,
        type: "text",
      },
      {
        key: "latitude",
        label: "Latitude",
        required: true,
        visible: true,
        type: "number",
      },
      {
        key: "longitude",
        label: "Longitude",
        required: true,
        visible: true,
        type: "number",
      },
      {
        key: "status",
        label: "Status",
        required: true,
        visible: true,
        type: "select",
        options: [
          { value: "Enable", label: "Enable" },
          { value: "Disable", label: "Disable" },
        ],
      },
    ],
    [],
  );

  const handleRecordSelection = (selected: LocationT[]) => {
    const selection = selected;

    dispatch(setLocationSelected(selection));
  };

  const handleRowsPerPageChange = (limit: number) => {
    dispatch(setLocationRowsPerPage(limit));
  };

  const handlePageChange = (page: number) => {
    dispatch(setLocationPage(page));
  };

  const handleSort = (order: string) => {
    dispatch(setLocationOrdering(order));
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
              disabled={selectedLocations?.length !== 1 || user?.type === "VU"}
              icon={EditIcon}
            >
              Edit
            </IconButton>
            <IconButton
              icon={DeleteIcon}
              onClick={toggleDeleteModal}
              variant='outlined'
              color='error'
              disabled={selectedLocations?.length < 1 || user?.type === "VU"}
            >
              Delete
            </IconButton>
          </Box>
          <Box sx={{ marginLeft: { md: "auto" } }}>
            <CSVLink
              data={allLocations}
              filename={"allLocations.csv"}
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
            selected={selectedLocations}
            setSelected={handleRecordSelection}
            headData={mock.HeadRowData}
            data={locations}
            isLoading={isLoading}
            rowsPerPage={rowsPerPage}
            orderBy={orderBy}
            onSort={handleSort}
            onRowsPerPageChange={handleRowsPerPageChange}
            page={pageNo}
            onPageChange={handlePageChange}
            dataCount={dataCount}
          />
        </Box>
      </Box>
      <Modal
        title='Add Location'
        onClose={toggleAddModal}
        open={addModal}
        onSubmit={formik.handleSubmit}
        formik={formik}
        fields={locationFields}
        disabled={isMutating}
      />
      <Modal
        title='Edit Location'
        onClose={toggleEditModal}
        open={editModal}
        formik={formik}
        fields={locationFields}
        onSubmit={formik.handleSubmit}
        submitButtonText='Save'
        disabled={isMutating}
      />
      <Modal
        title='Delete Location(s)'
        description='Are you sure you want to delete the Location(s)?'
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

export default Location;
