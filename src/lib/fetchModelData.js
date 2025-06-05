import { removeAuthToken, removeUserId } from "../common/functions";
import { baseUrl } from "../utils/utils";
/**
 * fetchModel - Fetch a model from the web server.
 *
 * @param {string} url      The URL to issue the GET request.
 *
 */
function fetchModel(url, method, body, token) {
  const headers = {};
  if(!(body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  // Thêm token vào header nếu có
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const request = {
    headers,
    method: method,
    body: body,
  };
  const response = fetch(baseUrl + url, request).then((res) => {
    if(res.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.setItem("tokenExpired", "Token expired. Please login again.");
      window.location.href = "/login";
      return;
    }
    return res.json();
  });
  return response;
}

export default fetchModel;
