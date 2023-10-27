import React, { Suspense } from "react";

export default ({ component: Component, ...props }) => (
  <Suspense>
    <div data-mf>
      <Component {...props} />
    </div>
  </Suspense>
);
