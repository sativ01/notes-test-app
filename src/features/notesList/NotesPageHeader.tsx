import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(0, 3),
  },
}));

type HeaderProps = {
  notesCount: number;
};

export function NotesPageHeader({ notesCount = -1 }: HeaderProps) {
  const notesPresent = notesCount > 0;
  const pluralizedIssue = notesCount === 1 ? "note" : "notes";
  const classes = useStyles();

  return (
    <Typography
      variant="h2"
      component="h2"
      gutterBottom
      className={classes.root}
    >
      {notesPresent
        ? `You have ${notesCount} ${pluralizedIssue}`
        : `You have no notes :(`}
    </Typography>
  );
}
