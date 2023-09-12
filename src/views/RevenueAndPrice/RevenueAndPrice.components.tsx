import * as React from "react";
import { TextField, TextFieldProps, Box, Typography } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { SelectField, Table } from "../../components";
import { RevenueCommonT } from "../../types/revenue-and-price";

import * as sx from "./RevenueAndPrice.styles";
import * as types from "./RevenueAndPrice.types";
import * as mocks from "./RevenueAndPrice.mocks";
import * as rootStyles from "../../lib/rootStyles";
import { useAppDispatch, useAppSelector } from "../../lib";
import {
  setHistoryPage,
  setHistoryRowsPerPage,
  setRevenueAndPriceOrdering,
} from "../../features/revenue-and-price/revenue-and-price-slice";

export const NameDateAndURLField: React.FC<types.NaveDateAndURLPropsT> = (
  value: types.NaveDateAndURLPropsT,
) => {
  return (
    <React.Fragment>
      <TextField
        size='small'
        label='Cost per kWh'
        placeholder='Cost per kWh'
        value={value.kwh}
        InputLabelProps={{ shrink: true }}
      />

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          onChange={(x) => console.log(x)}
          value={new Date(value.date)}
          label='Date'
          renderInput={(params: TextFieldProps) => (
            <TextField {...params} InputLabelProps={{ shrink: true }} size='small' />
          )}
        />
      </LocalizationProvider>
      <SelectField
        label='Reserved to'
        value={value.reserved}
        options={mocks.reservedOptions}
      />
    </React.Fragment>
  );
};
export const PromoFieldsWithoutName: React.FC<{ values: RevenueCommonT; onChange: Function }> = ({
  values,
  onChange,
}) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    onChange(target.name, target.value);
  };

  return (
    <React.Fragment>
      <TextField
        size='small'
        label='Cost per kWh'
        name='cost'
        value={values.cost}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        size='small'
        label='Price per kWh'
        name='price'
        value={values.price}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
      />
      <SelectField
        label='Reserved to'
        value={values.reserved}
        onChange={handleChange}
        name='reserved'
        options={mocks.reservedOptions}
      />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
          onChange={(val) => onChange("start_time", val)}
          value={new Date(values.start_time)}
          label='Start Date'
          renderInput={(params: TextFieldProps) => (
            <TextField
              onChange={handleChange}
              name='start_time'
              {...params}
              InputLabelProps={{ shrink: true }}
              size='small'
            />
          )}
        />
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
          onChange={(val) => onChange("end_time", val)}
          value={new Date(values.end_time)}
          label='End Date'
          renderInput={(params: TextFieldProps) => (
            <TextField
              name='end_time'
              {...params}
              InputLabelProps={{ shrink: true }}
              size='small'
            />
          )}
        />
      </LocalizationProvider>
    </React.Fragment>
  );
};
export const StartEndTimesAndPrice: React.FC<{ values: RevenueCommonT; onChange: Function; occupancyCheck: Boolean }> = ({
  values,
  onChange,
  occupancyCheck,
}) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    onChange(target.name, target.value,);
  };
  return (
    <React.Fragment>
      <TextField
        size='small'
        label='Price per kWh'
        name='price'
        value={values.price}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
      />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
          onChange={(val) => onChange("start_time", val)}
          value={new Date(values.start_time)}
          label='Start Date'
          disabled={Boolean(occupancyCheck)}
          renderInput={(params: TextFieldProps) => (
            <TextField
              name='start_time'
              {...params}
              InputLabelProps={{ shrink: true }}
              size='small'
            />
          )}
        />
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
          onChange={(val) => onChange("end_time", val)}
          value={new Date(values.end_time)}
          label='End Date'
          disabled={Boolean(occupancyCheck)}
          renderInput={(params: TextFieldProps) => (
            <TextField
              name='end_time'
              {...params}
              InputLabelProps={{ shrink: true }}
              size='small'
            />
          )}
        />
      </LocalizationProvider>
    </React.Fragment>
  );
};

export const DateCostAndPriceField: React.FC<{
  values: RevenueCommonT;
  onChange: Function;
  priceCheck: Boolean;
}> = ({ values, onChange, priceCheck }) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    onChange(target.name, target.value);
  };
  return (
    <React.Fragment>
      <TextField
        size='small'
        onChange={handleChange}
        name='cost'
        label='Cost per kWh'
        value={values.cost}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        size='small'
        label='Price per kWh'
        value={values.price}
        onChange={handleChange}
        name='price'
        InputLabelProps={{ shrink: true }}
      />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
          onChange={(val) => onChange("start_time", val)}
          value={new Date(values.start_time)}
          label='Start Date'
          disabled={Boolean(priceCheck)}
          renderInput={(params: TextFieldProps) => (
            <TextField
              name='start_time'
              {...params}
              InputLabelProps={{ shrink: true }}
              size='small'
            />
          )}
        />
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
          onChange={(val) => onChange("end_time", val)}
          value={new Date(values.end_time)}
          label='End Date'
          disabled={Boolean(priceCheck)}
          renderInput={(params: TextFieldProps) => (
            <TextField
              name='end_time'
              {...params}
              InputLabelProps={{ shrink: true }}
              size='small'
            />
          )}
        />
      </LocalizationProvider>
    </React.Fragment>
  );
};

export const StartAndEndDateField = () => {
  const [startDate, setStartDate] = React.useState<Date | null>(new Date());
  const [endDate, setEndDate] = React.useState<Date | null>(new Date());

  const handleStartDate = (date: Date | null) => {
    setStartDate(date);
  };

  const handleEndDate = (date: Date | null) => {
    setEndDate(date);
  };

  return (
    <Box sx={sx.fieldsWrapper}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          onChange={handleStartDate}
          value={startDate}
          label='Start Date'
          renderInput={(params: TextFieldProps) => (
            <TextField {...params} InputLabelProps={{ shrink: true }} size='small' />
          )}
        />
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          onChange={handleEndDate}
          value={endDate}
          label='End Date'
          renderInput={(params: TextFieldProps) => (
            <TextField {...params} InputLabelProps={{ shrink: true }} size='small' />
          )}
        />
      </LocalizationProvider>
    </Box>
  );
};

export const HistoryTable: React.FC = () => {
  const pageNo = useAppSelector((state) => state.revenueAndPrice.pageNo);
  const rowsPerPage = useAppSelector((state) => state.revenueAndPrice.rowsPerPage);
  const dataCount = useAppSelector((state) => state.revenueAndPrice.dataCount);
  const history = useAppSelector((state) => state.revenueAndPrice.history);
  const isFetching = useAppSelector((state) => state.revenueAndPrice.isFetching);
  const orderBy = useAppSelector((state) => state.revenueAndPrice.ordering);
  const dispatch = useAppDispatch();

  const handleRowsPerPageChange = (limit: number) => {
    dispatch(setHistoryRowsPerPage(limit));
  };
  const handlePageChange = (page: number) => {
    dispatch(setHistoryPage(page));
  };
  const handleSort = (order: string) => {
    dispatch(setRevenueAndPriceOrdering(order));
  };

  return (
    <Box sx={sx.historyCardWrapper}>
      <Typography sx={sx.cardTitle} variant='body1'>
        History
      </Typography>
      <Box sx={rootStyles.tableBorderlessWrapper}>
        <Table
          headData={mocks.HistoryHeadRowData}
          data={history}
          isLoading={isFetching}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleRowsPerPageChange}
          page={pageNo}
          orderBy={orderBy}
          onSort={handleSort}
          dataCount={dataCount}
          onPageChange={handlePageChange}
          isEmptyRows={false}
        />
      </Box>
    </Box>
  );
};
