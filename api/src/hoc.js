import React, { useMemo } from "react";
import { SWRConfig } from "swr";

export const withServerData = (Component) => {
  const C = (props) => {
    const { fallback } = {};

    const value = useMemo(
      () => ({
        fallback: fallback || {},
      }),
      [fallback]
    );

    return (
      <SWRConfig value={value}>
        <Component {...props} />
      </SWRConfig>
    );
  };

  return C;
};
