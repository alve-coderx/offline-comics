"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

const TanstackWrapper = ({ children }) => {
  const queryClient = new QueryClient();
  console.log(queryClient)
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
};

export default TanstackWrapper;
