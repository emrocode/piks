import "@/styles/globals.css";
import Layout from "@/components/Layout";
import { Toaster } from "sonner";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
      <Toaster
        toastOptions={{
          unstyled: true,
          className: "piksToast",
        }}
      />
    </Layout>
  );
}
