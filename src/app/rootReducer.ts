import {combineReducers} from '@reduxjs/toolkit'
import notesSlice from 'features/notesList/notesSlice';

const rootReducer = combineReducers({
  notes: notesSlice,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer