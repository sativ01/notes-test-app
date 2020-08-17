import React from "react";
import { useDispatch } from "react-redux";

import { Note } from "api/notesAPI";
import { removeNote, saveNote } from "./notesSlice";

import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import TextField from "@material-ui/core/TextField";

type Props = {
  note: Note;
};

export default function NoteListItem({ note: { id, title } }: Props) {
  const [editing, setEditing] = React.useState(false);
  const dispatch = useDispatch();

  const handleEdit = () => {
    setEditing(!editing);
  };

  const [titleText, setTitleText] = React.useState(title);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleText(event.target.value);
  };

  const handleDelete = () => {
    dispatch(removeNote(id));
  };

  const handleSave = () => {
    dispatch(saveNote(id, titleText));
    setEditing(false);
  }

  return (
    <Grid container wrap="nowrap" spacing={2}>
      <Grid item>
        <Avatar>{id}</Avatar>
      </Grid>
      <Grid item xs zeroMinWidth>
        {editing ? (
          <TextField
            id="standard-basic"
            label="Edit Note text"
            placeholder={title}
            value={titleText}
            onChange={handleChange}
          />
        ) : (
          <Typography noWrap>{title}</Typography>
        )}
      </Grid>
      <Grid item xs zeroMinWidth>
        <ButtonGroup
          variant="text"
          color="primary"
          aria-label="text primary button group"
        >
          <IconButton aria-label="edit" onClick={handleEdit}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="save" onClick={handleSave}>
            <SaveIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={handleDelete}>
            <DeleteIcon color="error" />
          </IconButton>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
}
