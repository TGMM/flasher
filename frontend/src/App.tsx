import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import { Box } from "@mui/system";
import PostList from "./components/PostList";
import CommentPage from "./components/CommentPage";
import NewPost from "./components/NewPost";
import NewSubforum from "./components/NewSubforum";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={darkTheme}>
        <ResponsiveAppBar></ResponsiveAppBar>
        <CssBaseline />
        <Box display="flex" justifyContent="center">
          <Box width={["95%", "80%", "70%", "60%"]} mb={10}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/r/:subforum" element={<PostList />} />
              <Route
                path="/r/:subforum/comments/:id"
                element={<CommentPage />}
              />
              <Route path="submit" element={<NewPost />} />
              <Route path="/subforums/create" element={<NewSubforum />} />
            </Routes>
          </Box>
        </Box>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
