import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types";
import { addUser, deleteUser, editUser, fetchUsers, fetchAllUsers, searchUsers } from "./user-thunk";

interface UserState {
  users: User[];
  allUsers: User[];
  selectedUsers: User[];
  pageNo: number;
  isLoading: boolean;
  ordering: string;
  rowsPerPage: number;
  dataCount: number;
  isMutating: boolean;
}

const initialState: UserState = {
  users: [],
  allUsers: [],
  pageNo: 0,
  isLoading: false,
  ordering: "",
  rowsPerPage: 10,
  dataCount: 0,
  isMutating: false,
  selectedUsers: [],
};

const userSlice = createSlice({
  name: "user-slice",
  initialState,
  reducers: {
    setUserRowsPerPage(state, action: PayloadAction<number>) {
      state.rowsPerPage = action.payload;
    },
    setUserPage(state, action: PayloadAction<number>) {
      state.pageNo = action.payload;
    },
    setSelectedUsers(state, action: PayloadAction<User[]>) {
      state.selectedUsers = action.payload;
    },
    setUserOrdering(state, action: PayloadAction<string>) {
      state.ordering = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload?.results;
        state.dataCount = action.payload?.count;
        state.isLoading = false;
      })
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.allUsers = action.payload?.results;
        state.dataCount = action.payload?.count;
        state.isLoading = false;
      })
      .addCase(fetchAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllUsers.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.users = action.payload?.results;
        state.dataCount = action.payload?.count;
        state.isLoading = false;
      })
      .addCase(searchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchUsers.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(addUser.fulfilled, (state) => {
        state.selectedUsers = [];
        state.isMutating = false;
      })
      .addCase(addUser.pending, (state) => {
        state.isMutating = true;
      })
      .addCase(addUser.rejected, (state) => {
        state.isMutating = false;
      })
      .addCase(editUser.fulfilled, (state) => {
        state.selectedUsers = [];
        state.isMutating = false;
      })
      .addCase(editUser.pending, (state) => {
        state.isMutating = true;
      })
      .addCase(editUser.rejected, (state) => {
        state.isMutating = false;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.selectedUsers = [];
        state.isMutating = false;
      })
      .addCase(deleteUser.pending, (state) => {
        state.isMutating = true;
      })
      .addCase(deleteUser.rejected, (state) => {
        state.isMutating = false;
      });
  },
});

export const { setUserRowsPerPage, setUserPage, setSelectedUsers, setUserOrdering } =
  userSlice.actions;

export default userSlice;
