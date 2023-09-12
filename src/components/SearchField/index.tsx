import React from "react";
import { Box, Checkbox, Menu, MenuItem, TextField } from "@mui/material";
import { FilterIcon, SearchIcon } from "../../assets/icons";
import * as sx from "./SearchField.styles";
import * as types from "./SearchField.types";
import _ from "lodash";

const SearchField = ({
  onChange,
  value,
  filterValue = [],
  options,
  onSelect,
}: types.ComponentT) => {
  const [anchorEl, setAnchorEl] = React.useState<types.AnchorEleT>(null);

  const handleOpenDropDown = (event: types.MouseEventT) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseDropDown = () => {
    setAnchorEl(null);
  };

  const handleSelect = (value: string) => {
    const newValue: string[] = _.includes(filterValue, value)
      ? _.filter(filterValue, (val) => val !== value)
      : [...filterValue, value];

    onSelect && onSelect(newValue);
  };

  return (
    <React.Fragment>
      <TextField
        size='small'
        placeholder='Search'
        InputProps={{
          startAdornment: (
            <Box sx={sx.searchIcon}>
              <SearchIcon />
            </Box>
          ),
          endAdornment: <FilterIcon sx={sx.filterIcon} onClick={handleOpenDropDown} />,
        }}
        sx={sx.searchField}
        value={value}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange(event)}
      />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseDropDown}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {options && options?.length > 0 ? (
          _.map(options, (option, index) => (
            <MenuItem key={index} component='label' sx={{ paddingLeft: 0.5 }}>
              <Checkbox
                size='small'
                onChange={() => handleSelect(option.value)}
                checked={_.includes(filterValue, option?.value)}
              />
              {option.label}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled onClick={handleCloseDropDown}>
            No Option Available
          </MenuItem>
        )}
      </Menu>
    </React.Fragment>
  );
};

export default SearchField;
