import React from "react";
import { useDispatch } from "react-redux";
import { makeStyles, Theme } from "@material-ui/core/styles";

import IconButton from "@material-ui/core/IconButton";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import SaveIcon from "@material-ui/icons/Save";

import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";

import { addNote } from "./notesSlice";

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
    display: "flex",
    justifyContent: "space-between",
  },
  textInput: {
    width: "80%",
  },
  saveButton: {
    display: "flex",
  },
  addButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(0, 3),
  },
}));

export default function NoteAdd() {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [isAdding, setIsAdding] = React.useState(false);
  const [titleText, setTitleText] = React.useState("");

  const handleAddPress = () => {
    setIsAdding(true);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleText(event.target.value);
  };

  const handleSave = () => {
    dispatch(addNote(titleText));
    setIsAdding(false);
  };

  return (
    <div className={classes.root}>
      {isAdding && (
        <Paper className={classes.paper}>
          <TextField
            className={classes.textInput}
            id="standard-basic"
            label="Enter note text"
            value={titleText}
            onChange={handleChange}
          />
          <IconButton aria-label="save" onClick={handleSave} color="primary">
            <SaveIcon />
          </IconButton>
        </Paper>
      )}
      <div className={classes.addButton}>
        <IconButton aria-label="edit" onClick={handleAddPress} color="primary">
          <PlaylistAddIcon />
        </IconButton>
      </div>
    </div>
  );
}
