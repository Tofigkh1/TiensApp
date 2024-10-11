'use client'

import * as React from "react";
import { ThemeProvider as NextThemesProvider, ThemeProviderProps } from "next-themes";

// React.FC ile Function Component tipi veriyoruz ve props tipi belirliyoruz
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, ...props }) => {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
};