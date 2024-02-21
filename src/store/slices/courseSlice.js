import { createSlice } from "@reduxjs/toolkit";

const coursesSlice = createSlice({
  name: "courses",
  initialState: {
    courseList: [],
    renderedList: [],
    currentPage: 1,
    itemsPerPage: 5,
    sortBy: "", // 'asc' or 'desc',
    wishlist: [],
  },
  reducers: {
    setCourse: (state, action) => {
      state.courseList = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
      const startIndex = (state.currentPage - 1) * state.itemsPerPage;
      const endIndex = startIndex + state.itemsPerPage;
      state.renderedList = state.courseList.slice(startIndex, endIndex);
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;

      if (action.payload === "asc") {
        state.courseList.sort((a, b) => a.discountedPrice - b.discountedPrice);
      } else if (action.payload === "desc") {
        state.courseList.sort((a, b) => b.discountedPrice - a.discountedPrice);
      }
    },
    wishlist: (state, action) => {
      const { courseId, courses } = action.payload;
      const courseIndex = courses.findIndex((item) => item.id.toString() === courseId);
      if (courseIndex !== -1) {
        state.courseList[0].wishlist = !state.courseList[0].wishlist;
      }
    },
  },
});

export const { setCourse, setCurrentPage, setSortBy, wishlist, removeFromWishlist } =
  coursesSlice.actions;
export default coursesSlice.reducer;
