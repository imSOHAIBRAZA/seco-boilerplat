import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Operator } from "../../types";
import {
  addOperator,
  deleteOperator,
  editOperator,
  fetchOperators,
  fetchAllOperators,
  searchOperators,
} from "./operator-thunk";

interface OperatorState {
  operators: Operator[];
  allOperators: [];
  selectedOperators: Operator[];
  pageNo: number;
  isLoading: boolean;
  ordering: string;
  rowsPerPage: number;
  dataCount: number;
  isMutating: boolean;
}

const initialState: OperatorState = {
  operators: [],
  allOperators: [],
  pageNo: 0,
  isLoading: false,
  ordering: "business_name",
  rowsPerPage: 10,
  dataCount: 0,
  isMutating: false,
  selectedOperators: [],
};

const operatorSlice = createSlice({
  name: "operator-slice",
  initialState,
  reducers: {
    setOperatorRowsPerPage(state, action: PayloadAction<number>) {
      state.rowsPerPage = action.payload;
    },
    setOperatorPage(state, action: PayloadAction<number>) {
      state.pageNo = action.payload;
    },
    setSelectedOperators(state, action: PayloadAction<Operator[]>) {
      state.selectedOperators = action.payload;
    },
    setOperatorsOrdering(state, action: PayloadAction<string>) {
      state.ordering = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOperators.fulfilled, (state, action) => {
        state.operators = action.payload?.results;
        state.dataCount = action.payload?.count;
        state.isLoading = false;
      })
      .addCase(fetchOperators.pending, (state) => {
        state.selectedOperators = [];
        state.isLoading = true;
      })
      .addCase(fetchOperators.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchAllOperators.fulfilled, (state, action) => {
        state.allOperators = action.payload?.results;
        state.dataCount = action.payload?.count;
        state.isLoading = false;
      })
      .addCase(fetchAllOperators.pending, (state) => {
        state.selectedOperators = [];
        state.isLoading = true;
      })
      .addCase(fetchAllOperators.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(searchOperators.fulfilled, (state, action) => {
        state.operators = action.payload?.results;
        state.dataCount = action.payload?.count;
        state.isLoading = false;
      })
      .addCase(searchOperators.pending, (state) => {
        state.selectedOperators = [];
        state.isLoading = true;
      })
      .addCase(searchOperators.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(addOperator.fulfilled, (state) => {
        state.selectedOperators = [];
        state.isMutating = false;
      })
      .addCase(addOperator.pending, (state) => {
        state.isMutating = true;
      })
      .addCase(addOperator.rejected, (state) => {
        state.isMutating = false;
      })
      .addCase(editOperator.fulfilled, (state) => {
        state.selectedOperators = [];
        state.isMutating = false;
      })
      .addCase(editOperator.pending, (state) => {
        state.isMutating = true;
      })
      .addCase(editOperator.rejected, (state) => {
        state.isMutating = false;
      })
      .addCase(deleteOperator.fulfilled, (state) => {
        state.selectedOperators = [];
        state.isMutating = false;
      })
      .addCase(deleteOperator.pending, (state) => {
        state.isMutating = true;
      })
      .addCase(deleteOperator.rejected, (state) => {
        state.isMutating = false;
      });
  },
});

export const {
  setOperatorRowsPerPage,
  setOperatorPage,
  setSelectedOperators,
  setOperatorsOrdering,
} = operatorSlice.actions;

export default operatorSlice;
