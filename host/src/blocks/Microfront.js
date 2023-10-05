import React, { lazy, useMemo, Suspense } from "react"

let Blog;

if (process.env.BUILD_TARGET === 'client') {
    const MF = lazy(() => import('Blog/App'));

    Blog = () => <Suspense><div><MF /></div></Suspense>
}

if (process.env.BUILD_TARGET === 'server') {
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

    const MF = (props) => {
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

    Blog = () => {

        const featchData = useMemo(() => wrapPromise(fetch('http://localhost:3006/blog').then(res => res.text())), []);

        return (
            <Suspense>
                <MF source={featchData} />
            </Suspense>
        );
    }
}

const Microfront = (props) => {
    const { name } = props;

    return (
        <Suspense>
            <Blog />
        </Suspense>
    );
}

export default Microfront;
