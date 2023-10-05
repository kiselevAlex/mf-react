import React, { Suspense } from "react"

let config;
let Block;

if (process.env.BUILD_TARGET === 'client') {
    config = require('./config.client').default;
    Block = require('./MicroBlock.client').default;
}

if (process.env.BUILD_TARGET === 'server') {
    config = require('./config.server').default;
    Block = require('./MicroBlock.server').default;
}

const Microfront = (props) => {
    const { name } = props;
    const blockProps = config[name];

    return (
        <Suspense>
            <Block {...blockProps} />
        </Suspense>
    );
}

export default Microfront;
