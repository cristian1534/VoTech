export function setSession(token: string): void {
  localStorage.setItem("session", token);
}

export function endSession(): void {
  localStorage.removeItem("session");
  localStorage.removeItem("currentUser");
  window.location.href = "/";
}

export function getSessions(): string | null {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("session");

    if (!token) {
      throw new Error("No session found");
    }

    return token;
  }

  return null;
}
