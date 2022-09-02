import { FunctionComponent } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { Layout } from "./components";
import { Home, Login, Register } from "./containers";
import { theme, GlobalStyles } from "@/components/App";

const App: FunctionComponent = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Layout>
      </Router>
      <GlobalStyles />
    </ThemeProvider>
  );
};

export default App;
