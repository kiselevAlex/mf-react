import React, { useMemo, Suspense } from "react"

function wrapPromise(promise) {
    let status = 'pending'
    let response
  
    const suspender = promise.then(
      (res) => {
        status = 'success'
        response = res
      },
      (err) => {
        status = 'error'
        response = err
      },
    )

    const read = () => {
        switch (status) {
            case 'pending':
                throw suspender
            case 'error':
                throw response
            default:
                return response
        }
    }

    return { read }
}

const Suspensable = (props) => {
    const { source } = props;

    const data = source?.read();

    return (
        <div
            dangerouslySetInnerHTML={{
                __html: data,
            }}
        />
    );
}

const MicroBlock = ({ path }) => {
    const featchData = useMemo(() => wrapPromise(fetch(path).then(res => res.text())), []);

    return (
        <Suspense>
            <Suspensable source={featchData} />
        </Suspense>
    );
}

export default MicroBlock;
