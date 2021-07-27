import { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Route, Switch } from 'react-router-dom';
import Storage from 'local-storage-fallback';

//Import Components
import Header from './Header';
import Footer from './Footer';
import AddNote from './AddNote';
import ShowNotes from './ShowNote';


// Theme Light/Dark Mode Section //
const darkColors = {
  bgColor: "#393E46",
  hfbBgColor: "#222831",
  hfbColor: "#EEEEEE",
  mainTextColor: "#FFD369",
  borderForNote: "#FFD369",
  bgForNote: "#e8e9ea",
  btnSubmit: "#64686e",
  
};

const lightColors = {
  bgColor: "#FCEFEE",
  hfbBgColor: "#FC5C9C",
  hfbColor: "#FFFFFF",
  mainTextColor: "#000000",
  borderForNote: "#FC5C9C",
  bgForNote: "#fff",
  btnSubmit: "#fc8cb9",
  
};

const themes = {
  dark: darkColors,
  light: lightColors,
}
// Theme Light/Dark Mode Section //

function App() {
  // Theme Light/Dark Mode Section //
  const initialTheme = () => {
    const GetTheme = Storage.getItem('theme-mode');
    return GetTheme ? GetTheme : "light";
  }

  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => {
    Storage.setItem("theme-mode", theme)
  })

  const themeHandler = () => {
    setTheme(theme == "dark" ? "light" : "dark")
  }
  // Theme Light/Dark Mode Section //
  return (
    <ThemeProvider theme={themes[theme]}>
        <Header themeHandler={themeHandler} thememode={theme} />
        <Switch>
          <Route exact path="/">
            <AddNote />
          </Route>
          <Route exact path="/:id">
            <ShowNotes />
          </Route>
        </Switch>
        <Footer />
    </ThemeProvider>
  );
}

export default App;