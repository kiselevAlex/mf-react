import useSWR, { useSWRConfig } from "swr"

export const useFetcher = () => {
    const { fetcher } = useSWRConfig();

    if (!fetcher) throw new Error('fetcher isn\'t initialize!');

    return fetcher;
}

export const useFetch = (data) => {
    const fetcher = useFetcher();

    return useSWR(data, fetcher)
}