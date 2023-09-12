import * as React from "react";
import { Box, Typography } from "@mui/material";
import {
  AddIcon,
  DeleteIcon,
  EditIcon,
  ExportIcon,
  ReloadIcon,
  RestartIcon,
} from "../../assets/icons";
import { Table, Modal, SearchField, IconButton } from "../../components";
import * as sx from "./EVCharger.styles";
import * as types from "./EVCharger.types";
import * as mock from "./EVCharger.mocks";
import { getScreenDescription, useAppDispatch, useAppSelector } from "../../lib";
import {
  setEVChargerOrdering,
  setEVChargerPage,
  setEVChargerRowsPerPage,
  setEVChargerSelected,
} from "../../features/ev-charger/ev-charger-slice";
import { Field } from "../../components/Modal/Modal.types";
import { useEVChargers } from "./EVCharger.hooks";
import { EVCharger as EVChargerT } from "../../types";
import EvChargerTable from "./Evcharger.History";
import { CSVLink } from "react-csv";

const EVCharger: types.ComponentT = () => {
  const dispatch = useAppDispatch();

  const evchargers = useAppSelector((state) => state.evchargers.evchargers);
  const historyData = useAppSelector((state) => state.evchargers.history);
  const allEvchargers = useAppSelector((state) => state.evchargers.allEvchargers);
  const rowsPerPage = useAppSelector((state) => state.evchargers.rowsPerPage);
  const pageNo = useAppSelector((state) => state.evchargers.pageNo);
  const isLoading = useAppSelector((state) => state.evchargers.isLoading);
  const isMutating = useAppSelector((state) => state.evchargers.isMutating);
  const dataCount = useAppSelector((state) => state.evchargers.dataCount);
  const orderBy = useAppSelector((state) => state.evchargers.ordering);
  const selectedEVChargers = useAppSelector((state) => state.evchargers.selectedEVChargers);
  const operatorOptions = useAppSelector((state) => state.dropdown.operators);
  const deviceTypeOptions = useAppSelector((state) => state.dropdown.deviceTypes);
  const user = useAppSelector((state) => state?.auth?.user);

  const CONNECTOR_CHOICE = [
    { value: "J1772", label: "J1772" },
    { value: "mennekes_type2", label: "Mennekes Type2" },
    { value: "GB/T", label: "GB/T" },
    { value: "CCS_type1", label: "CCS Type1" },
    { value: "CCS_type2", label: "CCS Type2" },
    { value: "CHAdeMO", label: "CHAdeMO" },
    { value: "Tesla", label: "Tesla" },
  ];
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
    handleFetchEVChargers,
    handleSelectFilter,
    searchFilter,
  } = useEVChargers();

  const evChargerFields: Field[] = React.useMemo(
    () => [
      {
        key: "serial_number",
        label: "Serial Number",
        required: true,
        visible: true,
        type: "text",
      },
      {
        key: "vm_name",
        label: "Name",
        required: true,
        visible: true,
        type: "text",
      },
      {
        key: "company",
        label: "Operator",
        required: true,
        visible: true,
        type: "select",
        options: operatorOptions,
      },
      {
        key: "device_type",
        label: "Device Type",
        required: true,
        visible: true,
        type: "select",
        options: deviceTypeOptions,
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
        key: "address_text",
        label: "Address",
        required: true,
        visible: true,
        type: "text",
      },
      {
        key: "max_power",
        label: "Max Power",
        required: true,
        visible: true,
        type: "number",
      },
      {
        key: "connector_type",
        label: "Connector Type",
        required: true,
        visible: true,
        type: "select",
        options: CONNECTOR_CHOICE,
      },
    ],
    [],
  );


  const handleRecordSelection = (selected: EVChargerT[]) => {
    const selection = selected;

    dispatch(setEVChargerSelected(selection));
  };
  const [filteredEvCharger, setFilteredEvCharger] = React.useState<any>([]);

  const handleRowsPerPageChange = (limit: number) => {
    dispatch(setEVChargerRowsPerPage(limit));
  };

  const handlePageChange = (page: number) => {
    dispatch(setEVChargerPage(page));
  };

  const handleSort = (order: string) => {
    dispatch(setEVChargerOrdering(order));
  };

  React.useEffect(() => {
    setFilteredEvCharger(
      allEvchargers.map((evcharger) => {
        const temp: any = {
          ...evcharger,
          company: evcharger?.company?.business_name,
          address: evcharger?.address?.address,
        };
        return temp;
      }),
    );
  }, [allEvchargers]);

  if (historyData) {
    return <EvChargerTable />;
  }
  
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
              disabled={selectedEVChargers?.length !== 1 || user?.type === "VU"}
              icon={EditIcon}
            >
              Edit
            </IconButton>
            <IconButton
              onClick={toggleDeleteModal}
              variant='outlined'
              color='error'
              disabled={selectedEVChargers?.length < 1 || user?.type === "VU"}
              icon={DeleteIcon}
            >
              Delete
            </IconButton>
            <IconButton icon={ReloadIcon} variant='outlined' onClick={handleFetchEVChargers}>
              Refresh
            </IconButton>
            <CSVLink
              data={filteredEvCharger}
              filename={"allEvchargers.csv"}
              style={{ textDecoration: "none" }}
            >
              <IconButton icon={ExportIcon} variant='contained'>
                Export
              </IconButton>
            </CSVLink>
            <IconButton icon={RestartIcon} variant='contained' disabled={user?.type === "VU"}>
              Reboot
            </IconButton>
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
            selected={selectedEVChargers}
            setSelected={handleRecordSelection}
            headData={mock.HeadRowData}
            data={evchargers}
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
        title='Add EV Charger'
        onClose={toggleAddModal}
        open={addModal}
        onSubmit={formik.handleSubmit}
        formik={formik}
        fields={evChargerFields}
        disabled={isMutating}
      />
      <Modal
        title='Edit EV Charger'
        onClose={toggleEditModal}
        open={editModal}
        formik={formik}
        fields={evChargerFields}
        onSubmit={formik.handleSubmit}
        submitButtonText='Save'
        disabled={isMutating}
      />
      <Modal
        title='Delete EV Charger(s)'
        description='Are you sure you want to delete the EV Charger(s)?'
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

export default EVCharger;
