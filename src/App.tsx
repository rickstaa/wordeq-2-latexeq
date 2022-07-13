/**
 * @file Small Javascript Regex app that converts Word equations to Latex equations.
 */
import './App.css';

import React, { useEffect, useState } from 'react';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import GitHubIcon from '@mui/icons-material/GitHub';
import {
    Alert as MuiAlert, AlertProps, AppBar, Button, Container, CssBaseline, Grid, IconButton,
    Snackbar, TextField, Toolbar, Tooltip, Typography
} from '@mui/material';

/* Regex used for replacing equations. */
const regexes = [
  / *(?<![_^])\\mathb(it|f){([^{}]+)}(?![_^]) */g, // Match word-specific tags that are not preceded of followed by math operators.
  /\\mathb(it|f){([^{}]+)}([\^_])/g, // Match word-specific tags that are followed by math operators.
  /([\^_])\\mathb(it|f){([^{}]+)}/g, // Match word-specific tags with preceded by math operators.
];
const replaceStrs = [" $2 ", " $2$3", "$1$3 "];

/* Types */
export interface SnackbarMessage {
  message: string;
  key: number;
}
export interface State {
  open: boolean;
  snackPack: readonly SnackbarMessage[];
  messageInfo?: SnackbarMessage;
}

/* Helper functions */

/** Applies a list of regex expressions and a replace string to a input string.
 *
 * @param inputString Input string to apply regexes to.
 * @param regexes List of regex expressions to apply.
 * @param replaceStrs Replace strings to use.
 * @returns String with regexes applied.
 */
const multiRegex = (
  inputString: string | undefined,
  regexes: RegExp[],
  replaceStrs: string[]
) => {
  inputString = inputString === undefined ? "" : inputString;
  let result = inputString;
  for (const [idx, regex] of regexes.entries()) {
    result = result.replace(regex, replaceStrs[idx]) ?? inputString;
  }
  return result;
};

/* Styled components */

/** Create styled alart box.
 * @param props Forward props.
 * @ref ref Forward reference.
 * @returns Alert box.
 */
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

/* The app */
function App() {
  const [wordEq, setWordEq] = useState("");
  const [latexEq, setLatexEq] = useState("");
  const [snackPack, setSnackPack] = React.useState<readonly SnackbarMessage[]>(
    []
  );
  const [open, setOpen] = React.useState(false);
  const [messageInfo, setMessageInfo] = React.useState<
    SnackbarMessage | undefined
  >(undefined);

  /* Initialize snackbar functionality. */
  useEffect(() => {
    if (snackPack.length && !messageInfo) {
      // Set a new snack when we don't have an active one.
      setMessageInfo({ ...snackPack[0] });
      setSnackPack((prev) => prev.slice(1));
      setOpen(true);
    } else if (snackPack.length && messageInfo && open) {
      // Close an active snack when a new one is added.
      setOpen(false);
    }
  }, [snackPack, messageInfo, open]);

  /* Handles the close of the snackbar. */
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  /* Handles the exit of the snackbar. */
  const handleExited = () => {
    setMessageInfo(undefined);
  };

  /** Translates WordEquation to Latex Equation */
  const translateWordEq = () => {
    setLatexEq(multiRegex(wordEq, regexes, replaceStrs));
  };

  /** Copies Latex Equation to Clipboard **/
  const copyClipboard = () => {
    navigator.clipboard.writeText(latexEq);
    // Display snackbar
    setSnackPack((prev) => [
      ...prev,
      { message: "Copied to clipboard", key: new Date().getTime() },
    ]);
  };

  /** Stores Word Equation in State **/
  const handleWordEqChange = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    setWordEq(event.target.value);
  };

  return (
    <>
      <CssBaseline /> {/* apply normalize.css */}
      {/* AppBar */}
      <AppBar position="absolute">
        <Toolbar>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="h5">Wordeq-2-latexeq</Typography>
            </Grid>
            <Grid item>
              <Tooltip title="Open on Github" enterDelay={300}>
                <IconButton
                  component="a"
                  href="https://github.com/rickstaa/wordeq-2-latexeq"
                >
                  <GitHubIcon fontSize="large" sx={{ color: "white" }} />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Toolbar />
      {/* Content */}
      <Container>
        <Grid container direction="column">
          {/* Description */}
          <Grid item mt={2}>
            <Typography>
              A small tool that uses Regex removes several redundant tags
              created by Microsoft Word when trying to copy an equation to be
              used in Latex. For more information on this problem see{" "}
              <a href="https://tex.stackexchange.com/questions/645334/mathbit-undefined-control-sequence">
                this StackOverflow question
              </a>
              . If you think that a tag is missing please add a{" "}
              <a href="https://github.com/rickstaa/wordeq-2-latexeq/pulls">
                PR
              </a>
              .
            </Typography>
          </Grid>
          {/* Input/output fields */}
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            direction={{ xs: "column", md: "row" }}
            mt={5}
            columnSpacing={5}
          >
            <Grid item md={4} xs={1}>
              <TextField
                label="WordEq"
                variant="outlined"
                value={wordEq}
                onChange={handleWordEqChange}
                fullWidth
                sx={{
                  "& .MuiInputBase-root": {
                    height: "150px",
                  },
                }}
              />
            </Grid>
            <Grid item>
              <ArrowForwardIcon fontSize="large" />
            </Grid>
            <Grid item md={4} xs={1}>
              <TextField
                label="LatexEq"
                variant="outlined"
                value={latexEq}
                disabled
                fullWidth
                sx={{
                  "& .MuiInputBase-root": {
                    height: "150px",
                  },
                }}
              />
            </Grid>
          </Grid>
          {/* Buttons */}
          <Grid container justifyContent="center" mt={5} spacing={2}>
            <Grid item>
              <Button
                variant="contained"
                size="large"
                onClick={translateWordEq}
                startIcon={<ChangeCircleIcon />}
              >
                Convert
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                size="large"
                onClick={copyClipboard}
                startIcon={<ContentCopyIcon />}
              >
                Copy Latex to Clipboard
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      {/* Snackbar */}
      <Snackbar
        key={messageInfo ? messageInfo.key : undefined}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        TransitionProps={{ onExited: handleExited }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {messageInfo ? messageInfo.message : undefined}
        </Alert>
      </Snackbar>
    </>
  );
}

export default App;
