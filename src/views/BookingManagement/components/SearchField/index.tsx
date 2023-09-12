import React from "react";
import { Box, 
  // Checkbox, Menu, MenuItem,
   TextField } from "@mui/material";
import { 
  // FilterIcon,
   SearchIcon } from "../../../../assets/icons";
import * as sx from "./SearchField.styles";
import * as types from "./SearchField.types";

const SearchField = ({
  onChange,
  value,
}: types.ComponentT) => {


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
        }}
        sx={sx.searchField}
        value={value}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange(event)}
      />
 
    </React.Fragment>
  );
};

export default SearchField;
