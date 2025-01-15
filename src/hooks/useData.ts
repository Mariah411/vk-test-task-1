import { useEffect, useState } from "react";
import { getPage } from "../api";

const useData = (pageNumber = 1) => {
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState({});
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    setError({});

    const controller = new AbortController();
    const { signal } = controller;

    getPage(pageNumber, { signal })
      .then((data) => {
        setIsLoading(false);
        setResults((prev) => [...prev, ...data]);
        setHasNextPage(Boolean(data.lenght));
      })
      .catch((e) => {
        setIsLoading(false);
        if (signal.aborted) return;
        setIsError(true);
        setError({ message: e.message });
      });

    return () => controller.abort();
  }, [pageNumber]);

  return { results, isLoading, isError, error, hasNextPage };
};

export default useData;
