import { NavBarVisibilityProvider } from "@/context/NavBarVisibilityContext";
import NavBar from "@/components/NavBar";
import Layout from "@/components/Layout";
import "@/styles/globals.css";
import "@mantine/core/styles.css";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { theme } from "@/theme";

// function MyApp({ Component, pageProps }) {
//   return (
//     <NavBarVisibilityProvider>
//       <Layout>
//         <Component {...pageProps} />;
//       </Layout>
//     </NavBarVisibilityProvider>
//   );
// }

function MyApp({ Component, pageProps }) {
  return (
    <MantineProvider theme={theme}>
      <NavBarVisibilityProvider>
        <Layout>
          <Head>
            <title>Mantine Template</title>
            <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
            />
            <link rel="shortcut icon" href="/favicon.svg" />
          </Head>
          <Component {...pageProps} />
        </Layout>
      </NavBarVisibilityProvider>
    </MantineProvider>
  );
}

export default MyApp;
