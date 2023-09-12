import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { AddIcon, ChevronDownIcon, CloseIcon, SaveIcon,ExportIcon } from "../../assets/icons";
import { PromoFieldsWithoutName } from "./RevenueAndPrice.components";

import * as sx from "./RevenueAndPrice.styles";

import _ from "lodash";
import { getScreenDescription, rootStyles, useAppDispatch, useAppSelector } from "../../lib";
import { routes } from "../../lib/routeConfig";
import { setStationSelected } from "../../features/revenue-and-price/revenue-and-price-slice";
import { RevenueCommonT } from "../../types/revenue-and-price";
import { useRevenuePromos } from "./RevenueAndPrice.hooks";
import { IconButton, SearchField, Table } from "../../components";
import {
  setEVChargerPage,
  setEVChargerRowsPerPage,
  setEVChargerSelected,
  setEVChargerOrdering,
} from "../../features/ev-charger/ev-charger-slice";
import { useNavigate } from "react-router-dom";
import { EVCharger } from "../../types/ev-charger";
import { HeadCell } from "../../components/Table/Table.types";
import { useEVChargers } from "../EVCharger/EVCharger.hooks";
import { filterOptions } from "../EVCharger/EVCharger.mocks";
import { CSVLink } from "react-csv";

const RevenueAndPricePromo: React.FC = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const screenDownMd = useMediaQuery(theme.breakpoints.down("md"));
  const {
    revenuePromosList,
    editRevenuePromos,
    addRevenuePromos,
    saveRevenuePromos,
    deleteRevenuePromos,
  } = useRevenuePromos();

  const { searchQuery, handleSearch, handleSelectFilter, searchFilter } = useEVChargers();

  const [isExpandedPrice, setIsExpandedPrice] = React.useState<false | number>(false);

  const evchargers = useAppSelector((state) => state.evchargers.evchargers);
  const allEvchargers = useAppSelector((state) => state.evchargers.allEvchargers);
  const rowsPerPage = useAppSelector((state) => state.evchargers.rowsPerPage);
  const pageNo = useAppSelector((state) => state.evchargers.pageNo);
  const isLoading = useAppSelector((state) => state.evchargers.isLoading);
  const dataCount = useAppSelector((state) => state.evchargers.dataCount);
  const selectedEVChargers = useAppSelector((state) => state.evchargers.selectedEVChargers);
  const orderBy = useAppSelector((state) => state.evchargers.ordering);
  const isMutating = useAppSelector((state) => state.revenueAndPrice.isMutating);
  const user = useAppSelector((state) => state?.auth?.user);

  const selectedStations = useAppSelector((state) => state.revenueAndPrice.selectedStation);

  const handleExpandedPrice = (value: number) => {
    setIsExpandedPrice((prevState) => (prevState === value ? false : value));
  };

  const [filteredPromos, setFilteredPromos] = React.useState<any>([]);

  const handleRowsPerPageChange = (limit: number) => {
    dispatch(setEVChargerRowsPerPage(limit));
  };

  const handlePageChange = (page: number) => {
    dispatch(setEVChargerPage(page));
  };
  const handleSort = (order: string) => {
    dispatch(setEVChargerOrdering(order));
  };
  const handleRecordSelection = (selected: EVCharger[]) => {
    const selection = selected;

    dispatch(setEVChargerSelected(selection));
  };

  const handleStationSelection = () => {
    dispatch(setStationSelected(selectedEVChargers));
  };

  const EvChargerHeadRowData: HeadCell[] = [
    {
      id: "serial_number",
      label: "Serial Number",
      numeric: true,
      disablePadding: false,
      align: "left",
    },
    {
      id: "vm_name",
      label: "Name",
      numeric: false,
      disablePadding: false,
      align: "left",
    },
    {
      id: "company",
      label: "Operator",
      numeric: false,
      disablePadding: false,
      align: "left",
      render: (_: unknown, value) => value?.business_name,
    },
    {
      id: "status",
      label: "Status",
      numeric: true,
      disablePadding: false,
      align: "left",
      render: (_: unknown, connected: boolean) => (
        <Chip
          color={connected ? "success" : "error"}
          label={
            <>
              <Box sx={connected ? rootStyles.successIndicator : rootStyles.errorIndicator} />
              {connected ? "Connected" : "Not Connected"}
            </>
          }
        />
      ),
    },
    {
      id: "warning",
      label: "Warning status",
      numeric: true,
      disablePadding: false,
      align: "left",
      render: ({ id }) => {
        const showWarning = [2, 5, 9].includes(id);
        return (
          <Chip
            color={showWarning ? "warning" : "success"}
            label={showWarning ? "Warning" : "No warning"}
          />
        );
      },
    },
    {
      id: "device_type",
      label: "Device Type",
      numeric: true,
      disablePadding: false,
      align: "left",
    },
    {
      id: "action",
      label: "Action",
      numeric: false,
      disablePadding: false,
      align: "left",
      render: (evcharger) => {
        return (
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              onClick={() => {
                dispatch(setStationSelected([evcharger] as EVCharger[]));
                navigate(routes.revenueAndPrice.prices);
              }}
              variant='contained'
              size='small'
            >
              View Price
            </Button>
            <Button
              onClick={() => {
                dispatch(setStationSelected([evcharger] as EVCharger[]));
                navigate(routes.revenueAndPrice.promos);
              }}
              variant='contained'
              size='small'
            >
              View Promo
            </Button>
          </Box>
        );
      },
    },
  ];

  React.useEffect(() => {
    !screenDownMd && setIsExpandedPrice(false);
  }, [screenDownMd]);

  React.useEffect(() => {
    setFilteredPromos(
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
              Add Promotions
            </IconButton>
          </Box>
          <Box sx={{ marginLeft: { md: "auto" } }}>
            <CSVLink
              data={filteredPromos}
              filename={"allEvchargers.csv"}
              style={{ textDecoration: "none" }}
            >
              <IconButton icon={ExportIcon}  variant='contained'>
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
              headData={EvChargerHeadRowData}
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
      </Box>
    );
  }
  return (
    <Box>
      <Typography sx={sx.selectedStationTitle} variant='h6' mb={2}>
        {_.map(selectedStations, (station) => station.vm_name)?.join(", ")}
      </Typography>
      <Box sx={sx.campaignContainer}>
        <Typography sx={sx.campaignTitle} variant='body1'>
          Promos
        </Typography>
        <Box sx={{ display: "flex", gap: 2, ml: 4, mt: 2 }}>
          <Button
            disabled={isMutating}
            variant='outlined'
            onClick={() => {
              dispatch(setStationSelected([]));
            }}
          >
            CLOSE
          </Button>
          <IconButton
            icon={SaveIcon}
            disabled={isMutating}
            onClick={saveRevenuePromos}
            variant='contained'
          >
            Save
          </IconButton>
          <IconButton
            icon={AddIcon}
            disabled={isMutating || user?.type === "VU"}
            onClick={addRevenuePromos}
            variant='contained'
          >
            Add Promo
          </IconButton>
        </Box>
        <Box>
          {_.map(revenuePromosList, (value: RevenueCommonT, index: number) => (
            <Accordion key={index} expanded={isExpandedPrice === index}>
              <AccordionSummary
                expandIcon={
                  screenDownMd && <ChevronDownIcon onClick={() => handleExpandedPrice(index)} />
                }
              >
                <Box sx={sx.accordionContent}>
                  <Box sx={sx.fieldsContainerPromo}>
                    <TextField
                      size='small'
                      label='Name'
                      name='name'
                      value={value.name}
                      onChange={({ target }) => editRevenuePromos(index, target.name, target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
                    {!screenDownMd && (
                      <PromoFieldsWithoutName
                        onChange={(field: string, value: string) =>
                          editRevenuePromos(index, field, value)
                        }
                        values={value}
                      />
                    )}
                  </Box>
                  <Box
                    sx={(theme) => ({ ...sx.iconWrapper(theme), ...sx.closeIcon(theme) })}
                    onClick={() => {
                      deleteRevenuePromos(index);
                    }}
                  >
                    <CloseIcon />
                  </Box>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={sx.expandedDetailWrapper}>
                  <Box sx={sx.line} />
                  <Box sx={sx.fieldsContainer2}>
                    {screenDownMd && (
                      <PromoFieldsWithoutName
                        onChange={(field: string, value: string) =>
                          editRevenuePromos(index, field, value)
                        }
                        values={value}
                      />
                    )}
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

export default RevenueAndPricePromo;
