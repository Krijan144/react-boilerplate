import { Providers } from "@/store/provider";
import { Suspense } from "react";
import Loading from "./loading";
import "@/theme/scss/index.scss";

import { getCssText } from "@/theme/stitches";
import Head from "next/head";
import { ServerStylesheet } from "./ServerStyleSheet";

export const metadata = {
  title: "CJW",
  description: "Created by Fourth Valley",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <style
          id="stitches"
          dangerouslySetInnerHTML={{ __html: getCssText() }}
        />
      </Head>
      <body>
        <ServerStylesheet>
          <Providers>
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </Providers>
        </ServerStylesheet>
      </body>
    </html>
  );
}
