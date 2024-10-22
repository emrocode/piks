import "@/styles/globals.css";
import { PiksProvider } from "@/contexts";
import Layout from "@/components/Layout";
import { Toaster } from "sonner";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PiksProvider>
      <Layout>
        <Component {...pageProps} />
        <Toaster
          toastOptions={{
            unstyled: true,
            className: "piksToast",
          }}
        />
      </Layout>
    </PiksProvider>
  );
}
