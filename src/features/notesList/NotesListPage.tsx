import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { fetchNotes } from './notesSlice';

import { RootState } from 'app/rootReducer'

import { NotesPageHeader } from './NotesPageHeader'
import NotesList from './NotesList';
import NoteAdd from './NoteAdd'

export const NotesListPage = () => {

  const dispatch = useDispatch()

  const notes = useSelector((state: RootState) => state.notes.notesByNumber)
  const isUpdating = useSelector((state: RootState) => state.notes.isUpdating)
  const notesCount = Object.keys(notes).length
  const { error } = useSelector((state: RootState) => state.notes)

  useEffect(() => {
    if(isUpdating === false){
      dispatch(fetchNotes())
    }
  }, [dispatch, isUpdating])

  if (error) {
    return (
      <div>
        <h1>Something went wrong...</h1>
        <div>{error}</div>
      </div>
    )
  }

  return (
    <div id="issue-list-page">
      <NotesPageHeader notesCount={notesCount}/>
      <NotesList notes={notes} />
      <NoteAdd />
    </div>
  )
}
