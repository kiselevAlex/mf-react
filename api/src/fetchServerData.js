import { unstable_serialize } from "swr";
import { fetcher } from "./fetcher";

export const fetchServerData = async (options = []) => {
  const fallback = {};

  const serverFetcher = async (options) => {
    const key = unstable_serialize(options);
    const data = await fetcher(options);

    fallback[key] = data;

    return data;
  };

  const promise = options.reduce((p, lvlOptions) => {
    return p.then((responses = []) =>
      Promise.allSettled(
        lvlOptions.map((getOptions) => {
          const options = getOptions(responses);

          return options ? serverFetcher(options) : undefined;
        })
      ).then((results) => [
        ...responses,
        ...results.map((result) =>
          result.status === "fulfilled" ? result.value : undefined
        ),
      ])
    );
  }, Promise.resolve());

  await promise;

  return fallback;
};
