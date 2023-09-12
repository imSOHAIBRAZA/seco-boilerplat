import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  setEVChargerPage,
  setEVChargerRowsPerPage,
  setEVChargerSelected,
  setEVChargerOrdering,
} from "../../features/ev-charger/ev-charger-slice";
import { AddIcon, ChevronDownIcon, CloseIcon, SaveIcon, ExportIcon } from "../../assets/icons";
import { NameDateAndURLField } from "./DigitalSignage.components";
import { IconButton, SearchField, Table } from "../../components";
import { getScreenDescription, useAppDispatch, useAppSelector } from "../../lib";
import { useEVChargers } from "../EVCharger/EVCharger.hooks";
import { setStationSelected } from "../../features/digital-signage/digital-signage-slice";
import * as rootStyles from "../../lib/rootStyles";
import * as sx from "./DigitalSignage.styles";
import * as mocks from "./DigitalSignage.mocks";
import _ from "lodash";
import { useDigitalSignage } from "./DigitalSignage.hooks";
import { EVCharger } from "../../types";
import { filterOptions } from "../EVCharger/EVCharger.mocks";
import { CSVLink } from "react-csv";

const Campaign: React.FC = () => {
  const [isExpanded, setIsExpanded] = React.useState<false | number>(false);

  const theme = useTheme();
  const screenDownMd = useMediaQuery(theme.breakpoints.down("md"));

  const dispatch = useAppDispatch();
  const { searchQuery, handleSearch, handleSelectFilter, searchFilter } = useEVChargers();

  const handleExpanded = (value: number) => {
    setIsExpanded((prevState) => (prevState === value ? false : value));
  };

  const evchargers = useAppSelector((state) => state.evchargers.evchargers);
  const allEvchargers = useAppSelector((state) => state.evchargers.allEvchargers);
  const rowsPerPage = useAppSelector((state) => state.evchargers.rowsPerPage);
  const pageNo = useAppSelector((state) => state.evchargers.pageNo);
  const orderBy = useAppSelector((state) => state.evchargers.ordering);
  const isLoading = useAppSelector((state) => state.evchargers.isLoading);
  const dataCount = useAppSelector((state) => state.evchargers.dataCount);
  const selectedStations = useAppSelector((state) => state.digitalsignage.selectedStation);
  const isMutating = useAppSelector((state) => state.digitalsignage.isMutating);
  const selectedEVChargers = useAppSelector((state) => state.evchargers.selectedEVChargers);
  const user = useAppSelector((state) => state?.auth?.user);

  const { deviceCampaignList, addCampaign, editCampaign, deleteCampaign, saveCampaigns } =
    useDigitalSignage();

  const handleRowsPerPageChange = (limit: number) => {
    dispatch(setEVChargerRowsPerPage(limit));
  };
  const [filteredCampaign, setFilteredCampaign] = React.useState<any>([]);

  const handlePageChange = (page: number) => {
    dispatch(setEVChargerPage(page));
  };

  const handleRecordSelection = (selected: EVCharger[]) => {
    const selection = selected;
    dispatch(setEVChargerSelected(selection));
  };
  const handleSort = (order: string) => {
    dispatch(setEVChargerOrdering(order));
  };
  const handleStationSelection = () => {
    dispatch(setStationSelected(selectedEVChargers));
  };

  React.useEffect(() => {
    setFilteredCampaign(
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

  if (selectedStations.length === 0) {
    return (
      <Box sx={rootStyles.rootContentWrapper}>
        <Typography variant='body2'>{getScreenDescription(location.pathname)}</Typography>
        <Box sx={rootStyles.headerWrapper}>
          <Box sx={rootStyles.buttonsWrapper}>

            <IconButton
              disabled={selectedEVChargers.length === 0 || user?.type === "VU"}
              onClick={handleStationSelection}
              variant='contained'
              icon={AddIcon}
            >
              Add Campaigns
            </IconButton>
          </Box>
          <Box sx={{ marginLeft: { md: "auto" } }} >
            <CSVLink
              data={filteredCampaign}
              filename={"allEvchargers.csv"}
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
            options={filterOptions}
          />

        </Box>
        <Box sx={rootStyles.rootTableWrapper}>
          <Box sx={rootStyles.tableBorderlessWrapper}>
            <Table
              headData={mocks.EvChargerHeadRowData}
              data={evchargers}
              selected={selectedEVChargers}
              setSelected={handleRecordSelection}
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
      </Box >
    );
  }

  return (
    <Box sx={sx.advertiseContainer}>
      <Typography sx={sx.selectedStationTitle} variant='h6'>
        {_.map(selectedStations, (station) => station.vm_name)?.join(", ")}
      </Typography>
      <Box sx={sx.campaignContainer}>
        <Typography sx={sx.campaignTitle} variant='body1'>
          Campaign Lists
        </Typography>
        <Box sx={sx.buttonsContainer}>
          <Button
            disabled={isMutating}
            variant='outlined'
            onClick={() => dispatch(setStationSelected([]))}
          >
            Close
          </Button>
          <IconButton
            icon={SaveIcon}
            disabled={isMutating}
            onClick={saveCampaigns}
            variant='contained'
          >
            Save
          </IconButton>
          <IconButton
            icon={AddIcon}
            disabled={isMutating || user?.type === "VU"}
            onClick={addCampaign}
            variant='contained'
          >
            Add Campaign
          </IconButton>
        </Box>
        <Box>
          {_.map(deviceCampaignList, (value, index) => (
            <Accordion key={index} expanded={isExpanded === index}>
              <AccordionSummary
                expandIcon={<ChevronDownIcon onClick={() => handleExpanded(index)} />}
              >
                <Box sx={sx.accordionContent}>
                  <Avatar variant='rounded' sx={sx.avatar} />
                  {!screenDownMd && (
                    <Box sx={sx.fieldsContainer}>
                      <NameDateAndURLField
                        onChange={(field, value) => editCampaign(index, field, value)}
                        disabled={isMutating}
                        name={value.name}
                        date={value.start_date}
                        enddate={value.end_date}
                        URL={value.file_url}
                      />
                    </Box>
                  )}
                  <Box sx={sx.buttonContainer}>
                    <Box
                      onClick={() => deleteCampaign(index)}
                      sx={(theme) => ({ ...sx.iconWrapper(theme), ...sx.closeIcon(theme) })}
                    >
                      <CloseIcon />
                    </Box>
                  </Box>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={sx.expandedDetailWrapper}>
                  <Box sx={sx.line} />
                  <Box sx={sx.fieldsContainer2}>
                    {screenDownMd && (
                      <NameDateAndURLField
                        onChange={(field, value) => editCampaign(index, field, value)}
                        disabled={isMutating}
                        name={value.name}
                        date={value.start_date}
                        enddate={value.end_date}
                        URL={value.file_url}
                      />
                    )}
                    <TextField
                      size='small'
                      label='Age'
                      disabled={isMutating}
                      defaultValue={value.age_range}
                      InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                      size='small'
                      label='Emotion'
                      disabled={isMutating}
                      defaultValue={value.emotions}
                      InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                      size='small'
                      label='Brands'
                      disabled={isMutating}
                      defaultValue={value.brand}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Box>
                </Box>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Campaign;
