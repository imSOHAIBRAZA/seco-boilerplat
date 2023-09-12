import React from "react";
import {
  Box,
  Checkbox,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  alpha,
  useTheme,
  Typography,
} from "@mui/material";
import MuiTable from "@mui/material/Table";
import { visuallyHidden } from "@mui/utils";
import * as types from "./Table.types";
import _ from "lodash";
import TableSkeleton from "../EvSkeletonTable";

type Order = "asc" | "desc";

interface EnhancedTableProps {
  numSelected?: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
  onSelectAllClick?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  headData: types.HeadCell[];
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, headData } =
    props;
  const createSortHandler = (property: string) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };
  const theme = useTheme();

  return (
    <TableHead sx={{ backgroundColor: alpha(theme.palette.primary.main, 0.1) }}>
      <TableRow>
        {onSelectAllClick && typeof numSelected === "number" && (
          <TableCell padding='checkbox'>
            <Checkbox
              color='primary'
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                "aria-label": "select all desserts",
              }}
            />
          </TableCell>
        )}
        {headData.map((headCell, index) => (
          <TableCell
            key={index}
            align={headCell?.align || "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id || orderBy === `-${headCell.id}` ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id || orderBy === `-${headCell.id}`}
              direction={orderBy === headCell.id || orderBy === `-${headCell.id}` ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              sx={{ whiteSpace: "nowrap" }}
            >
              {headCell.label}
              {orderBy === headCell.id || orderBy === `-${headCell.id}` ? (
                <Box component='span' sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const Table = ({
  headData,
  data,
  selected,
  setSelected,
  rowsPerPage,
  page,
  onPageChange,
  onRowsPerPageChange,
  isLoading,
  onSort,
  orderBy = "",
  dataCount,
  isEmptyRows = true,
}: types.ComponentT) => {
  const [order, setOrder] = React.useState<Order>("asc");

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: string) => {
    const isAsc = orderBy === `-${property}` && order === "asc";
    setOrder(isAsc ? "desc" : "asc");

    if (typeof onSort === "function") {
      onSort(isAsc ? property : `-${property}`);
    }
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (setSelected) {
      if (event.target.checked) {
        setSelected(data);
        return;
      }
      setSelected([]);
    }
  };
  const handleClick = (event: React.MouseEvent<unknown>, name: Record<string, any>) => {
    if (selected && setSelected) {
      const selectedIndex = selected?.indexOf(name);
      let newSelected: Record<string, any>[] = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, name);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected?.slice(1));
      } else if (selectedIndex === selected?.length - 1) {
        newSelected = newSelected.concat(selected?.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected?.slice(0, selectedIndex),
          selected?.slice(selectedIndex + 1),
        );
      }
      setSelected(newSelected);
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    onPageChange && onPageChange(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    onRowsPerPageChange(parseInt(event.target.value, 10));
    onPageChange && onPageChange(0);
  };

  const isSelected = (name: Record<string, any>) => selected?.indexOf(name) !== -1;
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dataCount) : 0;
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <MuiTable sx={{ minWidth: 750 }} aria-labelledby='tableTitle' size='medium'>
            <EnhancedTableHead
              headData={headData}
              numSelected={selected?.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={setSelected && handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell align='center' colSpan={headData.length + 1}>
                    <TableSkeleton
                      hasSelect={(selected && setSelected && true) || false}
                      headCount={headData?.length || 0}
                    />
                  </TableCell>
                </TableRow>
              ) : !isLoading && data.length === 0 ? (
                <TableRow>
                  <TableCell align='center' colSpan={headData.length + 1}>
                    <Typography variant='body1' fontWeight={600}>
                      No Record Found.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                <>
                  {_.map(data, (row, index) => {
                    const isItemSelected = setSelected ? isSelected(row) : false;
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                      <TableRow
                        hover
                        role='checkbox'
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={index}
                        selected={isItemSelected}
                      >
                        {setSelected && (
                          <TableCell padding='checkbox'>
                            <Checkbox
                              color='primary'
                              checked={isItemSelected}
                              inputProps={{
                                "aria-labelledby": labelId,
                              }}
                              onClick={(event) => handleClick(event, row)}
                            />
                          </TableCell>
                        )}
                        {_.map(headData, (value, index) => {
                          if (value?.render)
                            return (
                              <TableCell key={index} align={value?.align || "left"}>
                                {value?.render(row, row[value.id]) || "---"}
                              </TableCell>
                            );
                          return (
                            <TableCell key={index} align={value?.align || "left"}>
                              {row[value.id] === 0 ? row[value.id] : row[value.id] || "---"}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                  {isEmptyRows && emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: 53 * emptyRows,
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </>
              )}
            </TableBody>
          </MuiTable>
        </TableContainer>

        {onPageChange && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component='div'
            sx={{
              "& > div:first-of-type > div:first-of-type": {
                background: "red",
                display: "none",
              },
            }}
            count={dataCount}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            showFirstButton={true}
            showLastButton={true}
          />
        )}
      </Paper>
    </Box>
  );
};

export default Table;
