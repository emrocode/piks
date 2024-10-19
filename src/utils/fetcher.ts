export const fetcher = (
  ...args: [RequestInfo, RequestInit?]
): Promise<never[]> => fetch(...args).then((res) => res.json());
