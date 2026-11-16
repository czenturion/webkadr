"use client";

import { useLayoutEffect } from "react";
import { applyTheme, themeInitScript } from "./theme";

export function ThemeScript() {
  useLayoutEffect(applyTheme, []);

  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: themeInitScript }}
    />
  );
}
