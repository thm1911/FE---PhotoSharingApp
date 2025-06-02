import { baseUrl } from "../utils/utils";

/**
 * fetchModel - Fetch a model from the web server.
 *
 * @param {string} url      The URL to issue the GET request.
 *
 */
function fetchModel(url, method, body, token) {
  const headers = {
    "Content-Type": "application/json",
  };

  // Thêm token vào header nếu có
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const request = {
    headers,
    method: method,
    body: body,
  };
  const response = fetch(baseUrl + url, request).then((res) => res.json());
  return response;
}

export default fetchModel;
