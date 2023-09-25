"use client";

import React from "react";
import { useServerInsertedHTML } from "next/navigation";
import { getCssText, globalCss } from "@/theme/stitches";

export function ServerStylesheet({ children }: { children: JSX.Element }) {
  useServerInsertedHTML(() => {
    if (typeof window === "undefined") {
      return (
        <style
          id="stitches"
          dangerouslySetInnerHTML={{ __html: getCssText() }}
        />
      );
    }
  });

  globalCss();
  return <>{children}</>;
}
