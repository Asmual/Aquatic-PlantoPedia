import { useState, useEffect } from "react";
import { TFetchResult } from "@/types";

export function useFetch<T>(url: string): TFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url, { signal });
       
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
       
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err: unknown) {
        if (err instanceof Error) {
          if (err.name === "AbortError") {
            return;
          }
          setError(err.message);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [url]);

  return { data, loading, error };
}