import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  Note,
  NotesResult,
  getNote,
  getNotes,
  createNote,
  deleteNote,
  updateNote,
} from "api/notesAPI";
import { AppThunk } from "app/store";

interface IssuesState {
  notesByNumber: Record<number, Note>;
  isLoading: boolean;
  isUpdating: boolean;
  error: string | null;
}

const notesInitialState: IssuesState = {
  notesByNumber: {},
  isLoading: false,
  isUpdating: false,
  error: null,
};

function startLoading(state: IssuesState) {
  state.isLoading = true;
}

function startUpdating(state: IssuesState) {
  state.isUpdating = true;
}

function finishUpdating(state: IssuesState) {
  state.isUpdating = false;
}

function loadingFailed(state: IssuesState, { payload }: PayloadAction<string>) {
  state.isLoading = false;
  state.error = payload;
}

const issues = createSlice({
  name: "notes",
  initialState: notesInitialState,
  reducers: {
    getIssueStart: startLoading,
    getIssuesStart: startLoading,
    getIssueSuccess(state, { payload }: PayloadAction<Note>) {
      const { id } = payload;
      state.notesByNumber[id] = payload;
      state.isLoading = false;
      state.error = null;
    },
    getIssuesSuccess(state, { payload }: PayloadAction<NotesResult>) {
      const { notes } = payload;
      state.isLoading = false;
      state.error = null;

      state.notesByNumber = notes.reduce(
        (acc, note) => ({ ...acc, ...{ [note.id]: note } }),
        {}
      );
    },
    getIssueFailure: loadingFailed,
    getIssuesFailure: loadingFailed,

    addNoteStart: startUpdating,
    addNoteSuccess: finishUpdating,
    addNoteFailure: loadingFailed,
    
    saveNoteStart: startUpdating,
    saveNoteSuccess: finishUpdating,
    saveNoteFailure: loadingFailed,

    deleteNoteStart: startUpdating,
    deleteNoteSuccess: finishUpdating,
    deleteNoteFailure: loadingFailed,
  },
});

export const {
  getIssueStart,
  getIssuesStart,
  getIssueSuccess,
  getIssuesSuccess,
  getIssueFailure,
  getIssuesFailure,
  addNoteStart,
  addNoteSuccess,
  addNoteFailure,
  saveNoteStart,
  saveNoteSuccess,
  saveNoteFailure,
  deleteNoteStart,
  deleteNoteSuccess,
  deleteNoteFailure,
} = issues.actions;

export default issues.reducer;

export const fetchNotes = (): AppThunk => async (dispatch) => {
  try {
    dispatch(getIssuesStart());
    const notes = await getNotes();
    dispatch(getIssuesSuccess(notes));
  } catch (err) {
    dispatch(getIssuesFailure(err.toString()));
  }
};

export const fetchNote = (number: number): AppThunk => async (dispatch) => {
  try {
    dispatch(getIssueStart());
    const note = await getNote(number);
    dispatch(getIssueSuccess(note));
  } catch (err) {
    dispatch(getIssueFailure(err.toString()));
  }
};

export const addNote = (title: string): AppThunk => async (dispatch) => {
  try {
    dispatch(addNoteStart());
    await createNote(title);
    dispatch(addNoteSuccess());
  } catch (err) {
    dispatch(addNoteFailure(err.toString()));
  }
};

export const saveNote = (number: number, title: string): AppThunk => async (dispatch) => {
  try {
    dispatch(saveNoteStart());
    await updateNote(number, title);
    dispatch(saveNoteSuccess());
  } catch (err) {
    dispatch(saveNoteFailure(err.toString()));
  }
};

export const removeNote = (number: number): AppThunk => async (dispatch) => {
  try {
    dispatch(deleteNoteStart());
    await deleteNote(number);
    dispatch(deleteNoteSuccess());
  } catch (err) {
    dispatch(deleteNoteFailure(err.toString()));
  }
};
