import { requireAuth } from "@/utils/requireAuth";
import { useRouter } from "next/router";

function DashboardPage() {
  const router = useRouter();

  function handleLogout() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
      router.push("/login");
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, background: '#e5e7eb' }}>
      <h1 style={{ fontSize: 24, fontWeight: 600 }}>Dashboard – connecté en super admin</h1>
      <button
        onClick={handleLogout}
        style={{
          padding: '8px 14px',
          borderRadius: 6,
          border: 'none',
          background: '#ef4444',
          color: '#ffffff',
          fontSize: 14,
          fontWeight: 500,
          cursor: 'pointer',
        }}
      >
        Se déconnecter
      </button>
    </div>
  );
}

export default requireAuth(DashboardPage);
