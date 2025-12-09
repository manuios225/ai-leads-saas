import { useEffect } from "react";
import { useRouter } from "next/router";

export function requireAuth(Component: any) {
  return function ProtectedPage(props: any) {
    const router = useRouter();

    useEffect(() => {
      const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

      if (!token) {
        router.replace("/login");
      }
    }, [router]);

    return <Component {...props} />;
  };
}
