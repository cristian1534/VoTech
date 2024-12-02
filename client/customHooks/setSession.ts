import Cookies from "js-cookie";

export function setSession(token: string): void {
  Cookies.set("token", token, { secure: true, sameSite: "strict" });
}

export function endSession(): void {
  Cookies.remove("token");
  Cookies.remove("user");
  Cookies.remove("email");
  Cookies.remove("paymentCompleted");
  window.location.href = "/";
}

export function getSessions(): string | null {
  if (typeof window !== "undefined") {
    const token = Cookies.get("token"); 
    if (!token) {
      throw new Error("No session found");
    }

    return token;
  }

  return null;
}
