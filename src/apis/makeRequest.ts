type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
interface ApiError {
  status: number;
  message: string;
}

interface RequestOptions<T> {
  method?: HttpMethod;
  body?: T;
  headers?: Record<string, string>;
  params?: Record<string, any>;
}

export async function makeRequest<T = any, R = any>(endpoint: string, options: RequestOptions<T> = {}): Promise<R> {
  const { method = "GET", body, headers: customHeaders = {} } = options;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...customHeaders,
  };

  // Get token from localStorage (set during login)
  const token = localStorage.getItem("token");
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const url = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api";

  const response = await fetch(url + endpoint, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await response.json();

  if (!response.ok) {
    throw {
      status: response.status,
      message: data.message || "Something went wrong",
    };
  }

  return data as R;
}
