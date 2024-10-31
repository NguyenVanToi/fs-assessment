import { AppCacheProvider } from '@mui/material-nextjs/v14-pagesRouter';
import { ThemeProvider } from "@mui/material/styles";
import type { AppProps } from "next/app";

import MainLayout from '@/lib/layout/MainLayout';
import { roboto, theme } from "@/lib/theme/theme";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppCacheProvider {...pageProps}>
      <ThemeProvider theme={theme}>
        <main className={roboto.variable}>
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </main>
      </ThemeProvider>
    </AppCacheProvider>
  )
}
