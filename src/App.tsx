import { FunctionComponent } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { Router } from "./components";
import { SessionProvider } from "./contexts";
import { theme, GlobalStyles } from "@/components/App";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // tab change (default true)
      refetchOnReconnect: true, // network goes down and up (default true)
      retry: false, // if fails, retry (default true)
      // stale: if i query on another instance, it will refetch
      // fresh: if i query on another instance, it will take data from cache
      // by default, queries are stale (staleTime: 0)
      // staleTime: 99999, // i can decide how long the query will be "fresh", then it pass to "stale" (default 0)
      // refetchOnMount: false, // if set to false, it will take data from cache (if queryKey exists) (default true)
    },
  },
});

const App: FunctionComponent = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <SessionProvider>
            <Router />
            <ReactQueryDevtools />
          </SessionProvider>
          <GlobalStyles />
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
