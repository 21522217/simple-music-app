"use client"

import React from "react";
import { ThemeProvider } from "@/providers/theme";
import QCProvider from "@/providers/query-client";

interface IProviderProps {
  children: React.ReactNode;
}

export default function Providers({ children }: IProviderProps) {
  return (
    <QCProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </QCProvider>
  );
}
