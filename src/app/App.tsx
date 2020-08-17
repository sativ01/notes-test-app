import React from 'react'
import 'fontsource-roboto';

import './App.css'

import { NotesListPage } from 'features/notesList/NotesListPage'

const App: React.FC = () => {
  let content

    content = (
      <>
        <NotesListPage />
      </>
    )

  return <div className="App">{content}</div>
}

export default App
