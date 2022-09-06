/* eslint-disable no-useless-catch */
const defaultOptions: RequestInit = {
  method: "GET",
  headers: { "Content-Type": "application/json" },
};

export const fetcher = async <T>(
  url: URL | RequestInfo,
  requestOptions: RequestInit,
  baseURL = "http://localhost:3000/api"
): Promise<T> => {
  const options = { ...defaultOptions, ...requestOptions };
  try {
    const response = await fetch(`${baseURL}/${url}`, options);
    const data: T = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw data;
    }
  } catch (err) {
    throw err;
  }
};
