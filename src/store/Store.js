import { configureStore, createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  initialState: {
    notificationFilter: {
      pageNo: 1,
      pageSize: 10,
      dateTime: null,
      groupId: null,
    },
  },
  name: "notifications",
  reducers: {
    setFilterNotification: (state, action) => {
      state.notificationFilter = {
        ...state.notificationFilter,
        ...action.payload,
      };
    },
    
  },
});

export const store = configureStore({
  reducer: {
    notifications: slice.reducer,
  },
});

export const { setFilterNotification,setSelected } = slice.actions;
