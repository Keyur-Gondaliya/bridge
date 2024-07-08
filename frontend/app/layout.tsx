import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material";
import lightMode from "@/utils/theme/themeModeLight";
import { ChainContextProvider } from "@/utils/context/ChainContext";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bridge",
  description: "Bridge App For swaping tokens powered By XY Finance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={inter.className}
        style={{ padding: "0px", margin: "0px" }}
      >
        <AppRouterCacheProvider>
          <ThemeProvider theme={lightMode}>
            <ChainContextProvider>{children}</ChainContextProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
