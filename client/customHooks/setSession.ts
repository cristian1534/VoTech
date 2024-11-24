export function setSession(token: string): void {
  sessionStorage.setItem("session", token);
}

export function endSession(): void {
  sessionStorage.removeItem("session");
  sessionStorage.removeItem("user");
  window.location.href = "/";
};