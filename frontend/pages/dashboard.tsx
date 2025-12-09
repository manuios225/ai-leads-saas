import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { requireAuth } from "@/utils/requireAuth";
import { getDashboardSummary } from "@/utils/api";

type Summary = {
  totalLeads: number;
  activeCampaigns: number;
  repliesLast7Days: number;
  meetingsBookedLast7Days: number;
  conversionRate: number;
};

function DashboardPage() {
  const router = useRouter();
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  function handleLogout() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
      router.push("/login");
    }
  }

  useEffect(() => {
    async function load() {
      try {
        const data = await getDashboardSummary();
        setSummary(data);
      } catch (e) {
        setError("Impossible de charger les statistiques.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div style={{ minHeight: "100vh", padding: 32, background: "#e5e7eb" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 600 }}>Tableau de bord</h1>
        <button
          onClick={handleLogout}
          style={{
            padding: "8px 14px",
            borderRadius: 6,
            border: "none",
            background: "#ef4444",
            color: "#ffffff",
            fontSize: 14,
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          Se déconnecter
        </button>
      </div>
      {loading && <p>Chargement des données...</p>}
      {error && <p style={{ color: "#b91c1c" }}>{error}</p>}
      {!loading && !error && summary && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 16,
          }}
        >
          <div style={{ background: "#ffffff", padding: 16, borderRadius: 12, boxShadow: "0 4px 10px rgba(0,0,0,0.05)" }}>
            <p style={{ fontSize: 12, color: "#6b7280" }}>Leads totaux</p>
            <p style={{ fontSize: 24, fontWeight: 600 }}>{summary.totalLeads}</p>
          </div>
          <div style={{ background: "#ffffff", padding: 16, borderRadius: 12, boxShadow: "0 4px 10px rgba(0,0,0,0.05)" }}>
            <p style={{ fontSize: 12, color: "#6b7280" }}>Campagnes actives</p>
            <p style={{ fontSize: 24, fontWeight: 600 }}>{summary.activeCampaigns}</p>
          </div>
          <div style={{ background: "#ffffff", padding: 16, borderRadius: 12, boxShadow: "0 4px 10px rgba(0,0,0,0.05)" }}>
            <p style={{ fontSize: 12, color: "#6b7280" }}>Réponses (7 derniers jours)</p>
            <p style={{ fontSize: 24, fontWeight: 600 }}>{summary.repliesLast7Days}</p>
          </div>
          <div style={{ background: "#ffffff", padding: 16, borderRadius: 12, boxShadow: "0 4px 10px rgba(0,0,0,0.05)" }}>
            <p style={{ fontSize: 12, color: "#6b7280" }}>Rendez-vous (7 derniers jours)</p>
            <p style={{ fontSize: 24, fontWeight: 600 }}>{summary.meetingsBookedLast7Days}</p>
          </div>
          <div style={{ background: "#ffffff", padding: 16, borderRadius: 12, boxShadow: "0 4px 10px rgba(0,0,0,0.05)" }}>
            <p style={{ fontSize: 12, color: "#6b7280" }}>Taux de conversion</p>
            <p style={{ fontSize: 24, fontWeight: 600 }}>{summary.conversionRate}%</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default requireAuth(DashboardPage);
