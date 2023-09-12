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
import { AddIcon, ChevronDownIcon, CloseIcon, SaveIcon, ExportIcon } from "../../assets/icons";
import { DateCostAndPriceField, StartEndTimesAndPrice } from "./RevenueAndPrice.components";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import * as sx from "./RevenueAndPrice.styles";
import _ from "lodash";
import { getScreenDescription, rootStyles, useAppDispatch, useAppSelector } from "../../lib";
import { routes } from "../../lib/routeConfig";
import { IconButton, SearchField, Table } from "../../components";
import {
  setEVChargerPage,
  setEVChargerRowsPerPage,
  setEVChargerSelected,
  setEVChargerOrdering,
} from "../../features/ev-charger/ev-charger-slice";
import {
  deselectStation,
  setStationSelected,
} from "../../features/revenue-and-price/revenue-and-price-slice";

import { useRevenueOccupancy, useRevenuePrice } from "./RevenueAndPrice.hooks";
import { useNavigate } from "react-router-dom";
import { EVCharger } from "../../types/ev-charger";
import { HeadCell } from "../../components/Table/Table.types";
import { useEVChargers } from "../EVCharger/EVCharger.hooks";
import { filterOptions } from "../EVCharger/EVCharger.mocks";
import { CSVLink } from "react-csv";

const Prices: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { searchQuery, handleSearch, handleSelectFilter, searchFilter } = useEVChargers();

  const {
    revenuePriceList,
    editRevenuePrice,
    saveRevenuePrice,
    deleteRevenuePrice,
    addRevenuePrice,
  } = useRevenuePrice();

  const {
    revenueOccupancyList,
    addRevenueOccupancy,
    editRevenueOccupancy,
    deleteRevenueOccupancy,
    saveRevenueOccupancy,
  } = useRevenueOccupancy();

  const [isExpandedPrice, setIsExpandedPrice] = React.useState<false | number>(false);
  const [isExpandedOccupancy, setIsExpandedOccupancy] = React.useState<false | number>(false);

  const evchargers = useAppSelector((state) => state.evchargers.evchargers);
  const allEvchargers = useAppSelector((state) => state.evchargers.allEvchargers);
  const rowsPerPage = useAppSelector((state) => state.evchargers.rowsPerPage);
  const pageNo = useAppSelector((state) => state.evchargers.pageNo);
  const isLoading = useAppSelector((state) => state.evchargers.isLoading);
  const dataCount = useAppSelector((state) => state.evchargers.dataCount);
  const selectedEVChargers = useAppSelector((state) => state.evchargers.selectedEVChargers);
  const orderBy = useAppSelector((state) => state.evchargers.ordering);
  const selectedStations = useAppSelector((state) => state.revenueAndPrice.selectedStation);
  const isMutating = useAppSelector((state) => state.revenueAndPrice.isMutating);
  const [filteredPrice, setFilteredPrice] = React.useState<any>([]);
  const [priceCheck, setPriceCheck] = React.useState<any>(false);
  const [occupancyCheck, setOccupancyCheck] = React.useState<any>(false);
  const user = useAppSelector((state) => state?.auth?.user);

  const theme = useTheme();
  const screenDownMd = useMediaQuery(theme.breakpoints.down("md"));

  const handleExpandedOccupancy = (value: number) => {
    setIsExpandedOccupancy((prevState) => (prevState === value ? false : value));
  };
  const handleExpandedPrice = (value: number) => {
    setIsExpandedPrice((prevState) => (prevState === value ? false : value));
  };

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
    !screenDownMd && setIsExpandedOccupancy(false);
  }, [screenDownMd]);

  React.useEffect(() => {
    setFilteredPrice(
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

  React.useEffect(() => {
    revenuePriceList.forEach((d) => {
      if (d.is_default) {
        setPriceCheck(true)
      }
    })
  }, [revenuePriceList]);

  React.useEffect(() => {
    revenueOccupancyList.forEach((d) => {
      if (d.is_default) {
        setOccupancyCheck(true)
      }
    })
  }, [revenueOccupancyList]);

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
              Add Prices and Occupancy
            </IconButton>
          </Box>
          <Box sx={{ marginLeft: { md: "auto" } }}>
            <CSVLink
              data={filteredPrice}
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
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3.5 }}>
      <Typography sx={sx.selectedStationTitle} variant='h6'>
        {_.map(selectedStations, (station) => station.vm_name)?.join(", ")}
      </Typography>
      <Box sx={sx.campaignContainer}>
        <Typography sx={sx.campaignTitle} variant='body1'>
          Pricing
        </Typography>
        <Box sx={{ display: "flex", gap: 2, ml: 4, mt: 2 }}>
          <Button
            disabled={isMutating}
            variant='outlined'
            onClick={() => {
              dispatch(deselectStation());
            }}
          >
            CLOSE
          </Button>
          <IconButton
            icon={SaveIcon}
            disabled={isMutating || user?.type === "VU"}
            variant='contained'
            onClick={saveRevenuePrice}
          >
            Save
          </IconButton>
          <IconButton
            icon={AddIcon}
            disabled={isMutating || user?.type === "VU"}
            variant='contained'
            onClick={addRevenuePrice}
          >
            Add Price
          </IconButton>
        </Box>
        <Box>
          {_.map(revenuePriceList, (value, index) => (
            <Accordion key={index} expanded={isExpandedPrice === index}>
              <AccordionSummary
                expandIcon={
                  screenDownMd && <ChevronDownIcon onClick={() => handleExpandedPrice(index)} />
                }
              >
                <Box sx={sx.accordionContent}>
                  <Box sx={sx.fieldsContainer}>
                    <TextField
                      size='small'
                      label='Name'
                      disabled={isMutating}
                      value={value.name}
                      InputLabelProps={{ shrink: true }}
                      onChange={({ target }) => editRevenuePrice(index, target.name, target.value)}
                      name='name'
                    />

                    {!screenDownMd && (
                      <DateCostAndPriceField
                        onChange={(field: string, value: string) =>
                          editRevenuePrice(index, field, value)
                        }
                        values={value}
                        priceCheck={priceCheck}
                      />
                    )}
                  </Box>
                  <Box>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={Boolean(value.is_default)}
                            onChange={() => {
                              if (!value.is_default) {
                                setPriceCheck(true)
                              } else {
                                setPriceCheck(false)
                              }
                              editRevenuePrice(index, "is_default", !value.is_default)
                            }}

                          />
                        }
                        label={<Box sx={sx.labelText}>Default</Box>}
                        disabled={priceCheck && !value.is_default}
                      />
                    </FormGroup>
                  </Box>
                  <Box
                    sx={(theme) => ({ ...sx.iconWrapper(theme), ...sx.closeIcon(theme) })}
                    onClick={() => {
                      deleteRevenuePrice(index);
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
                      <DateCostAndPriceField
                        onChange={(field: string, value: string) =>
                          editRevenuePrice(index, field, value)
                        }
                        values={value}
                        priceCheck={priceCheck}
                      />
                    )}
                  </Box>
                </Box>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Box>
      <Box sx={sx.campaignContainer}>
        <Typography sx={sx.campaignTitle} variant='body1'>
          Occupancy
        </Typography>
        <Box sx={{ display: "flex", gap: 2, ml: 4, mt: 2 }}>
          <Button
            disabled={isMutating}
            variant='outlined'
            onClick={() => {
              dispatch(deselectStation());
            }}
          >
            CLOSE
          </Button>
          <Button disabled={isMutating || user?.type === "VU"} variant='contained' onClick={saveRevenueOccupancy}>
            <SaveIcon /> Save
          </Button>
          <Button disabled={isMutating || user?.type === "VU"} variant='contained' onClick={addRevenueOccupancy}>
            <AddIcon />
            Add Occupancy
          </Button>
        </Box>
        <Box>
          {_.map(revenueOccupancyList, (value, index) => (
            <Accordion key={index} expanded={isExpandedOccupancy === index}>
              <AccordionSummary
                expandIcon={
                  screenDownMd && <ChevronDownIcon onClick={() => handleExpandedOccupancy(index)} />
                }
              >
                <Box sx={sx.accordionContent}>
                  <Box sx={sx.fieldsContainer3}>
                    <TextField
                      size='small'
                      label='Name'
                      value={value.name}
                      InputLabelProps={{ shrink: true }}
                      onChange={({ target }) =>
                        editRevenueOccupancy(index, target.name, target.value)
                      }
                      name='name'
                    />
                    {!screenDownMd && (
                      <StartEndTimesAndPrice
                        onChange={(field: string, value: string) =>
                          editRevenueOccupancy(index, field, value)
                        }
                        values={value}
                        occupancyCheck={occupancyCheck}
                      />
                    )}
                  </Box>
                  <Box >
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={Boolean(value.is_default)}
                            onChange={() => {
                              if (!value.is_default) {
                                setOccupancyCheck(true)
                              } else {
                                setOccupancyCheck(false)
                              }
                              editRevenueOccupancy(index, "is_default", !value.is_default)
                            }}
                          />
                        }
                        label={<Box sx={sx.labelText} >Default</Box>}
                        disabled={occupancyCheck && !value.is_default}
                      />
                    </FormGroup>
                  </Box>
                  <Box
                    sx={(theme) => ({ ...sx.iconWrapper(theme), ...sx.closeIcon(theme) })}
                    onClick={() => {
                      deleteRevenueOccupancy(index);
                    }}
                  >
                    <CloseIcon />
                  </Box>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={sx.expandedDetailWrapper}>
                  <Box sx={sx.line} />
                  <Box sx={sx.fieldsContainer3}>
                    {screenDownMd && (
                      <StartEndTimesAndPrice
                        onChange={(field: string, value: string) =>
                          editRevenueOccupancy(index, field, value)
                        }
                        values={value}
                        occupancyCheck={occupancyCheck}
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

export default Prices;
