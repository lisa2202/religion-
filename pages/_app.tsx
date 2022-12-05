import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { createContext, useState } from "react";

import "@fontsource/source-sans-pro";
import "@fontsource/source-sans-pro/600.css";
import "@fontsource/source-sans-pro/700.css";

const theme = extendTheme({
  fonts: {
    heading: `"Source Sans Pro", sans-serif`,
    body: `"Source Sans Pro", sans-serif`,
  },
  styles: {
    global: {
      html: {
        fontSize: `10px`,
      },
      body: {
        fontFamily: `"Source Sans Pro", Arial, sans-serif`,
        fontSize: `18px`,
        lineHeight: `1.5`,
        color: `#333333`,
        backgroundColor: `#fff`,
        margin: 0,
      },
    },
  },
});

export const DataContext = createContext({} as any);

function MyApp({ Component, pageProps }: AppProps) {
  const [data, setData] = useState();
  return (
    <ChakraProvider theme={theme}>
      <DataContext.Provider value={{ data, setData }}>
        <Component {...pageProps} />
      </DataContext.Provider>
    </ChakraProvider>
  );
}

export default MyApp;
