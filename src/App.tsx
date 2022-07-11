/* Small Javascript Regex app that converts Word equations to Latex equations. */
import './App.css';

import React, { useState } from 'react';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import GitHubIcon from '@mui/icons-material/GitHub';
import {
    AppBar, Button, Container, CssBaseline, Grid, IconButton, TextField, Toolbar, Tooltip,
    Typography
} from '@mui/material';

/* Regex used for replacing equations. */
const regex = / *\\mathb(it|f){([^{}]+)} */g;

/* The app. */
function App() {
  const [wordEq, setWordEq] = useState("");
  const [latexEq, setLatexEq] = useState("");

  /* Translates WordEquation to Latex Equation */
  const translateWordEq = () => {
    setLatexEq(wordEq.replace(regex, " $2 "));
  };

  /* Copies Latex Equation to Clipboard */
  const copyClipboard = () => {
    navigator.clipboard.writeText(latexEq);
  };

  /* Stores Word Equation in State */
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
            mt={5}
            columnSpacing={5}
          >
            <Grid item>
              <TextField
                label="WordEq"
                variant="outlined"
                value={wordEq}
                onChange={handleWordEqChange}
                sx={{
                  width: "250px",
                  "& .MuiInputBase-root": {
                    height: "150px",
                  },
                }}
              />
            </Grid>
            <Grid item>
              <ArrowForwardIcon fontSize="large" />
            </Grid>
            <Grid item>
              <TextField
                label="LatexEq"
                variant="outlined"
                value={latexEq}
                disabled
                sx={{
                  width: "250px",
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
    </>
  );
}

export default App;
