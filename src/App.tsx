import { FunctionComponent } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { Layout } from "./components";
import { Home, Login, Register } from "./containers";
import { theme, GlobalStyles } from "@/components/App";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: true,
      retry: false,
    },
  },
});

const App: FunctionComponent = () => {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen />
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </Layout>
        </Router>
      </QueryClientProvider>
      <GlobalStyles />
    </ThemeProvider>
  );
};

export default App;
