import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import instance from "../../plugins/axios";

const initialState = {
  loading: false,
  subjects: null
}

export const getSubjects = createAsyncThunk(
  "subjects/getSubjects",
  async (params) => {
    try {
      const response = await instance.get("/subjects")
      return response.data
    } catch (e) {
      return e;
    }
  }
)

export const createSubject = createAsyncThunk(
  "subjects/createSubject",
  async (data) => {
    try {
      const response = await instance.post("/subjects/create", data)
      return response.data
    } catch (e) {
      return e;
    }
  }
)

export const updateSubject = createAsyncThunk(
  "subjects/updateSubject",
  async (data) => {
    try {
      return instance.patch(`/subjects/${data.id}`, {name: data.name})
    } catch (e) {
      return e;
    }
  }
)

export const deleteSubject = createAsyncThunk(
  "subjects/deleteSubject",
  async (id) => {
    try {
      const response = await instance.delete(`/subjects/${id}`)
      return response.data
    } catch (e) {
      return e;
    }
  }
)

const SubjectsSlice = createSlice({
  name: "subjects",
  initialState,
  extraReducers: builder => {
    builder
      .addCase(getSubjects.pending, (state) => {
        state.loading = true
      })
      .addCase(getSubjects.fulfilled, (state, {payload}) => {
        state.loading = false
        state.subjects = payload
      })
      .addCase(getSubjects.rejected, (state) => {
        state.loading = false
        state.subjects = null
      })

    // createSubject
    builder
      .addCase(createSubject.pending, (state) => {
        state.loading = true
      })
      .addCase(createSubject.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(createSubject.rejected, (state) => {
        state.loading = false
      })

    // updateSubject
    builder
      .addCase(updateSubject.pending, (state) => {
        state.loading = true
      })
      .addCase(updateSubject.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(updateSubject.rejected, (state) => {
        state.loading = false
      })

    // deleteSubject
    builder
      .addCase(deleteSubject.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteSubject.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(deleteSubject.rejected, (state) => {
        state.loading = false
      })
  }
})

export default SubjectsSlice.reducer