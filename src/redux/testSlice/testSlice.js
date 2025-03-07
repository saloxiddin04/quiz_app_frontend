import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import instance from "../../plugins/axios";

const initialState = {
  loading: false,
  tests: null,
  test: null
}

export const getAllTests = createAsyncThunk(
  "tests/getAllTests",
  async (params) => {
    try {
      const response = await instance.get("/questions/")
      return response.data
    } catch (e) {
      return e;
    }
  }
)

export const createTest = createAsyncThunk(
  "tests/createTest",
  async (data) => {
    try {
      const response = await instance.post("/questions/create", data)
      return response.data
    } catch (e) {
      return e;
    }
  }
)

const testsSlice = createSlice({
  name: "tests",
  initialState,
  extraReducers: builder => {
    builder
      .addCase(getAllTests.pending, (state) => {
        state.loading = true
      })
      .addCase(getAllTests.fulfilled, (state, {payload}) => {
        state.tests = payload
        state.loading = false
      })
      .addCase(getAllTests.rejected, (state) => {
        state.loading = false
        state.tests = null
      })

    // createTest
    builder
      .addCase(createTest.pending, (state) => {
        state.loading = true
      })
      .addCase(createTest.fulfilled, (state, {payload}) => {
        state.loading = false
      })
      .addCase(createTest.rejected, (state) => {
        state.loading = false
      })
  }
})

export default testsSlice.reducer