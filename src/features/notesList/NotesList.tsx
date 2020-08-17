import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles, Theme } from "@material-ui/core/styles";

import { Note } from "api/notesAPI";
import NoteListItem from "./NoteListItem";

interface Props {
  notes: Record<number, Note>;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
    padding: theme.spacing(0, 3),
  },
  paper: {
    maxWidth: 500,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
}));

export default function NotesList({ notes }: Props) {
  const classes = useStyles();

  const renderList = Object.values(notes).map((note) => (
    <div key={note.id} className={classes.root}>
      <Paper className={classes.paper}>
        <NoteListItem note={note} />
      </Paper>
    </div>
  ));

  return <div>{renderList}</div>;
}
