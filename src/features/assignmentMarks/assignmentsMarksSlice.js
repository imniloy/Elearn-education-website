import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "all",
  countByStatus: {
    total: 0,
    pending: 0,
    published: 0,
  },
};

const AssignmentsMarkSlice = createSlice({
  name: "assignmentsMark",
  initialState,
  reducers: {
    changeStatus: (state, action) => {
      state.status = action.payload;
    },
    setCountByStatus: (state, action) => {
      const allAssignments = action.payload;
      const allPendingAssignments = allAssignments.filter(
        (assignment) => assignment?.status.toLowerCase() === "pending"
      );

      const allPublishedAssignments = allAssignments.filter(
        (assignment) => assignment?.status.toLowerCase() === "published"
      );

      state.countByStatus = {
        total: allAssignments?.length,
        pending: allPendingAssignments?.length,
        published: allPublishedAssignments?.length,
      };
    },
    updateCountByStatus: (state, action) => {
      const prevCountByStatus = {
        ...state.countByStatus,
      };
      const pending = prevCountByStatus?.pending - 1;
      const published = prevCountByStatus?.published + 1;
      const updateCountByStatus = Object.assign(prevCountByStatus, {
        pending,
        published,
      });
      state.countByStatus = updateCountByStatus;
    },
  },
});

export const { changeStatus, setCountByStatus, updateCountByStatus } =
  AssignmentsMarkSlice.actions;
export default AssignmentsMarkSlice.reducer;
