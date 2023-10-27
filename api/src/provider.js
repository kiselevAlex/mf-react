import React, { useMemo } from "react";
import { SWRConfig } from "swr";
import { fetcher } from "./fetcher";

const value = {
  fetcher,
  revalidateIfStale: false,
  revalidateOnMount: false,
};

const isClient = () => typeof window !== "undefined";

export const ApiProvider = ({ children, fallback }) => {
  const context = useMemo(
    () => ({
      fallback: isClient() ? window.__SERVER_DATA__ : fallback,
      ...value,
    }),
    [fallback]
  );

  return <SWRConfig value={context}>{children}</SWRConfig>;
};
