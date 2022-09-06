/* eslint-disable no-useless-catch */

export const fetcher = async <T>(
  url: URL | RequestInfo,
  options?: RequestInit,
  baseURL = process.env.API_HOST
): Promise<T> => {
  const authToken = localStorage.getItem(process.env.AUTH_TOKEN || "auth-token");

  const defaultOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(authToken && { Authorization: authToken }),
    },
  };

  const requestOptions = { ...defaultOptions, ...options };

  try {
    const response = await fetch(`${baseURL}/${url}`, requestOptions);
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
