import { FunctionComponent } from "react";
import { ThemeProvider } from "styled-components";
import { Layout } from "./components";
import { theme, GlobalStyles } from "@/components/App";

const App: FunctionComponent = () => {
  return (
    <ThemeProvider theme={theme}>
      <Layout>App</Layout>
      <GlobalStyles />
    </ThemeProvider>
  );
};

export default App;
