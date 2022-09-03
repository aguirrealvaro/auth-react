const defaultOptions = {
  method: "GET",
};

export const fetcher = async <T>(
  url: URL | RequestInfo,
  options: RequestInit = defaultOptions,
  baseURL = "http://localhost:3000/api"
): Promise<T> => {
  // eslint-disable-next-line no-useless-catch
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
