import useSessionStorageState from "use-session-storage-state";

type HttpMethod = "POST" | "GET" | "PATCH" | "PUT" | "DELETE";
export type AuthToken = string | undefined;
export type AuthUser =
  | {
      id: number;
      username: string;
      created_at: Date;
      updated_at: Date;
    }
  | undefined;

export function useHttpRequest(useAuth: boolean = true) {
  const [token] = useSessionStorageState<AuthToken>("token");
  const [user] = useSessionStorageState<AuthUser>("user");

  if (useAuth) {
    const auth = {
      token,
      user,
    };
    console.log(auth);
    return (route: string, method: HttpMethod, body?: object) =>
      createHttpRequest(
        route,
        method,
        auth,
        body
      );
  }

  return (route: string, method: HttpMethod, body?: object) =>
    createHttpRequest(route, method, undefined, body);
}

export async function createHttpRequest<T extends string = HttpMethod>(
  route: string,
  method: T,
  auth?: {
    token: AuthToken;
    user: AuthUser;
  },
  body?: object
): Promise<Response> {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  if (!backendUrl) {
    throw new Error("Invalid backend url");
  }

  const response = await fetch(`${backendUrl}${route}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth?.token}`
    } as HeadersInit,
    body: body ? JSON.stringify(body) : undefined,
  });

  return response;
}
