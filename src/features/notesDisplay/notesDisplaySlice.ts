import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CurrentDisplayState {
  noteId: number
}

let initialState: CurrentDisplayState = {
  noteId: 0
}

let notesDisplaySlice = createSlice({
  name: 'noteDisplay',
  initialState,
  reducers: {
    setCurrentNote(state, action: PayloadAction<number>) {
      state.noteId = action.payload
    },
  }
})

export const { 
  setCurrentNote 
} = notesDisplaySlice.actions

export default notesDisplaySlice.reducer