import React, { Suspense } from "react"

export default ({ component: Component }) => <Suspense><div><Component /></div></Suspense>
