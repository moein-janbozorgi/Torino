import QueryString from "qs";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const serverFetch = async (
  endpoint,
  query,
  cache = { cache: "force-cache" }
) => {
  let url = BASE_URL;
  if (endpoint) url += endpoint;
  const queryString = query ? QueryString.stringify(query) : "";
  if (queryString) url += `?${queryString}`;


  try {
    const res = await fetch(`${url}`, cache);
    const json = await res.json();
    return json;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export { serverFetch };
