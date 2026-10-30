const BASE = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : "/api";

export async function api(path, method = "GET", body) {
  const token = localStorage.getItem("placetrack_token");

  let res;

  try {
    res = await fetch(BASE + path, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: "Bearer " + token } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new Error("Cannot reach the server. Please check your connection.");
  }

  const data = await res.json().catch(() => ({}));

  // Clear the local session when the API reports an expired or invalid token.
  if (res.status === 401 && token) {
    clearSession();
    window.location.href = "/login";
  }

  if (!res.ok) {
    throw new Error(data.error || "Something went wrong.");
  }

  return data;
}

export function saveSession(token, user) {
  localStorage.setItem("placetrack_token", token);
  localStorage.setItem("placetrack_user", JSON.stringify(user));
}

export function clearSession() {
  localStorage.removeItem("placetrack_token");
  localStorage.removeItem("placetrack_user");
}