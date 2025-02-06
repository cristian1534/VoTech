import { useState } from "react";
import { useSession } from "../context/SessionContext";
import { useGoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";
import { setSession } from "../customHooks/setSession"
import axios from "axios";


const GoogleAuthButton = () => {
  const { setSessionToken, setSessionUser, setSessionEmail } = useSession();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();


  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const token = response.access_token;
        const userInfo = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${response.access_token}` },
        });
        if (token) {
          interface GoogleUserInfo {
            name: string;
            email: string;
            sub?: string;
          }
          
         const userData = userInfo.data as GoogleUserInfo;
         const url = pathname === "/signup"
            ? `${process.env.NEXT_PUBLIC_URL_DEV}/users`
            : `${process.env.NEXT_PUBLIC_URL_DEV}/users/auth`;

          const payload = pathname === "/signup"
            ? { name: userData.name, email: userData.email, password: userData.sub }
            : { email: userData.email, password: userData.sub };

          await axios.post(url, payload);

          Cookies.set("token", token, { secure: true, sameSite: "strict" });
          setSession(token);
          setSessionUser(userData.name);
          setSessionEmail(userData.email);
        }
        setTimeout(() => {
        router.push("/");
        setSessionToken(token); 
      }, 1500);
      }catch (error) {
    if (error && typeof error === 'object' && 'isAxiosError' in error && 'response' in error) {
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
         setErrorMessage((error as any).response?.data?.message);
    } else {
        console.log("Other type of error:", error);
    }
}

    },
    onError: () => console.error("Auth failed"),
  });

  return (
    <button
      onClick={() => login()}
      className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white hover:bg-gray-50 text-white font-medium border border-gray-300 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
    >
      {errorMessage ? (
        <div className="flex items-center justify-center gap-2 text-red-500">
          <svg 
            className="w-5 h-5" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path 
              fillRule="evenodd" 
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" 
              clipRule="evenodd"
            />
          </svg>
          <p className="font-medium">{errorMessage}</p>
        </div>
      ) : (

      <>
      <svg width="20" height="20" viewBox="0 0 24 24">
        <path
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          fill="#4285F4"
          />
        <path
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          fill="#34A853"
          />
        <path
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          fill="#FBBC05"
          />
        <path
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          fill="#EA4335"
          />
      </svg>
        <p>Auth with Google</p>
      </>
      )}
    </button>
  );
};

export default GoogleAuthButton;
