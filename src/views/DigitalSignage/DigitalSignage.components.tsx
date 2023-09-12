import * as React from "react";
import {
  TextField,
  TextFieldProps,
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import * as types from "./DigitalSignage.types";
import moment from "moment";
import _ from "lodash";

export const NameDateAndURLField: React.FC<types.NaveDateAndURLPropsT> = (
  props: types.NaveDateAndURLPropsT,
) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    props.onChange(target.name, target.value);
  };

  return (
    <React.Fragment>
      <TextField
        size='small'
        name='name'
        label='Name'
        onChange={handleChange}
        defaultValue={props.name}
        InputLabelProps={{ shrink: true }}
      />
      <DatePicker
        onChange={(x) => props.onChange("start_date", moment(x).format("YYYY-MM-DD"))}
        value={new Date(props.date)}
        label='Start Date'
        renderInput={(params: TextFieldProps) => (
          <TextField {...params} InputLabelProps={{ shrink: true }} size='small' />
        )}
      />
      <DatePicker
        onChange={(x) => props.onChange("end_date", moment(x).format("YYYY-MM-DD"))}
        value={new Date(props.enddate)}
        label='End Date'
        renderInput={(params: TextFieldProps) => (
          <TextField {...params} InputLabelProps={{ shrink: true }} size='small' style={{width:'200px'}}/>
        )}
      />
      <TextField
        size='small'
        name='file_url'
        label='File/URL'
        onChange={handleChange}
        defaultValue={props.URL}
        InputLabelProps={{ shrink: true }}
      />
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
    <Box sx={{ display: "flex", gap: 2 }}>
      <DatePicker
        onChange={handleStartDate}
        value={startDate}
        label='Start Date'
        renderInput={(params: TextFieldProps) => (
          <TextField {...params} InputLabelProps={{ shrink: true }} size='small' />
        )}
      />
      <DatePicker
        onChange={handleEndDate}
        value={endDate}
        label='End Date'
        renderInput={(params: TextFieldProps) => (
          <TextField {...params} InputLabelProps={{ shrink: true }} size='small' />
        )}
      />
    </Box>
  );
};

export function VendorTable({ data }: { data: types.TableDataT[] }) {
  const [total, setTotal] = React.useState(0);

  React.useEffect(() => {
    setTotal(_.sum(_.map(data, ({ value }: types.TableDataT) => value)));
  }, [data]);

  return (
    <Table sx={{ width: "100%" }} aria-label='spanning table'>
      <TableBody>
        <TableRow>
          <TableCell sx={{ fontWeight: 700 }}>Adv</TableCell>
          <TableCell sx={{ fontWeight: 700 }} align='right'>
            Views
          </TableCell>
        </TableRow>
        {_.map(data, ({ value, label }: types.TableDataT, index: number) => (
          <TableRow key={index}>
            <TableCell>{label}</TableCell>
            <TableCell align='right'>{value}</TableCell>
          </TableRow>
        ))}
        <TableRow>
          <TableCell sx={{ fontWeight: 700, color: "primary.800", borderBottom: 0 }}>
            Total
          </TableCell>
          <TableCell sx={{ fontWeight: 700, color: "primary.800", borderBottom: 0 }} align='right'>
            {total}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export const AdsMultiSelect: React.FC<{
  options: { name: string; id: number }[];
  onSelect: (arg: number[]) => void;
}> = ({ options, onSelect }) => {
  const [selectedOptions, setSelectedOptions] = React.useState<number[]>([]);
  React.useEffect(() => {
    const selected = options.slice(0, 5).map(({ id }) => id);
    setSelectedOptions(selected);
    onSelect(selected);
  }, [options]);

  const handleChange = (event: SelectChangeEvent<number[]>) => {
    const {
      target: { value },
    } = event;
    const selected = typeof value === "string" ? value.split(",").map((v) => Number(v)) : value;
    if (selected.length > 1 && selected.length <= 5) {
      setSelectedOptions(selected);
      onSelect(selected);
    }
  };

  return (
    <Box>
      <FormControl sx={{ width: 180 }}>
        <InputLabel>Ads</InputLabel>
        <Select
          size='small'
          multiple
          value={selectedOptions}
          onChange={handleChange}
          input={<OutlinedInput label='Ads' />}
          renderValue={(selected) => `${selected.length} Ads selected`}
        >
          {options.map(({ name, id }) => (
            <MenuItem key={name} value={id}>
              <Checkbox checked={selectedOptions.indexOf(id) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
