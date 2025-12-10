import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/router";
import { requireAuth } from "@/utils/requireAuth";
import { getLeads, createLead } from "@/utils/api";

type Lead = {
  id: string;
  fullName: string;
  email?: string;
  jobTitle?: string;
  company?: string;
  score?: number;
  status?: string;
};

type LeadForm = {
  fullName: string;
  email: string;
  jobTitle: string;
  company: string;
};

function LeadsPage() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [form, setForm] = useState<LeadForm>({
    fullName: "",
    email: "",
    jobTitle: "",
    company: "",
  });

  async function loadLeads() {
    setLoading(true);
    setError("");
    try {
      const data = await getLeads();
      setLeads(data);
    } catch (e) {
      setError("Impossible de charger les leads.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadLeads();
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");

    try {
      await createLead({
        fullName: form.fullName,
        email: form.email || undefined,
        jobTitle: form.jobTitle || undefined,
        company: form.company || undefined,
      });
      setMessage("Lead créé avec succès.");
      setForm({ fullName: "", email: "", jobTitle: "", company: "" });
      await loadLeads();
    } catch (e) {
      setError("Erreur lors de la création du lead.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", padding: 32, background: "#e5e7eb" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 600 }}>Leads</h1>
            <p style={{ fontSize: 13, color: "#6b7280" }}>
              Mini-CRM : tous les contacts trouvés, enrichis et scorés par le système.
            </p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => router.push("/dashboard")}
              style={{ padding: "6px 10px", borderRadius: 6, border: "1px solid #d1d5db", background: "#ffffff", cursor: "pointer", fontSize: 13 }}
            >
              Dashboard
            </button>
            <button
              onClick={() => router.push("/icp")}
              style={{ padding: "6px 10px", borderRadius: 6, border: "1px solid #d1d5db", background: "#ffffff", cursor: "pointer", fontSize: 13 }}
            >
              ICP
            </button>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 24 }}>
          <div style={{ background: "#ffffff", padding: 16, borderRadius: 12, boxShadow: "0 4px 10px rgba(0,0,0,0.05)" }}>
            <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Ajouter un lead</h2>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div>
                <label style={{ display: "block", fontSize: 13, marginBottom: 4 }}>Nom complet</label>
                <input
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #d1d5db" }}
                  required
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 13, marginBottom: 4 }}>Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #d1d5db" }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 13, marginBottom: 4 }}>Poste</label>
                <input
                  value={form.jobTitle}
                  onChange={(e) => setForm({ ...form, jobTitle: e.target.value })}
                  style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #d1d5db" }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 13, marginBottom: 4 }}>Entreprise</label>
                <input
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #d1d5db" }}
                />
              </div>
              <button
                type="submit"
                disabled={saving}
                style={{
                  marginTop: 8,
                  padding: "8px 12px",
                  borderRadius: 8,
                  border: "none",
                  background: "#2563eb",
                  color: "#ffffff",
                  fontWeight: 600,
                  cursor: "pointer",
                  opacity: saving ? 0.7 : 1,
                }}
              >
                {saving ? "Création..." : "Créer le lead"}
              </button>
              {message && <p style={{ fontSize: 12, color: "#15803d" }}>{message}</p>}
              {error && <p style={{ fontSize: 12, color: "#b91c1c" }}>{error}</p>}
            </form>
          </div>

          <div style={{ background: "#ffffff", padding: 16, borderRadius: 12, boxShadow: "0 4px 10px rgba(0,0,0,0.05)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <h2 style={{ fontSize: 16, fontWeight: 600 }}>Liste des leads</h2>
            </div>
            {loading ? (
              <p>Chargement des leads...</p>
            ) : leads.length === 0 ? (
              <p style={{ fontSize: 13, color: "#6b7280" }}>Aucun lead pour l&apos;instant.</p>
            ) : (
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: "left", borderBottom: "1px solid #e5e7eb", padding: "6px 4px" }}>Nom</th>
                    <th style={{ textAlign: "left", borderBottom: "1px solid #e5e7eb", padding: "6px 4px" }}>Email</th>
                    <th style={{ textAlign: "left", borderBottom: "1px solid #e5e7eb", padding: "6px 4px" }}>Poste</th>
                    <th style={{ textAlign: "left", borderBottom: "1px solid #e5e7eb", padding: "6px 4px" }}>Entreprise</th>
                    <th style={{ textAlign: "left", borderBottom: "1px solid #e5e7eb", padding: "6px 4px" }}>Score</th>
                    <th style={{ textAlign: "left", borderBottom: "1px solid #e5e7eb", padding: "6px 4px" }}>Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead.id}>
                      <td style={{ padding: "6px 4px", borderBottom: "1px solid #f3f4f6" }}>{lead.fullName}</td>
                      <td style={{ padding: "6px 4px", borderBottom: "1px solid #f3f4f6" }}>{lead.email || "-"}</td>
                      <td style={{ padding: "6px 4px", borderBottom: "1px solid #f3f4f6" }}>{lead.jobTitle || "-"}</td>
                      <td style={{ padding: "6px 4px", borderBottom: "1px solid #f3f4f6" }}>{lead.company || "-"}</td>
                      <td style={{ padding: "6px 4px", borderBottom: "1px solid #f3f4f6" }}>{lead.score ?? 0}</td>
                      <td style={{ padding: "6px 4px", borderBottom: "1px solid #f3f4f6" }}>{lead.status || "NEW"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default requireAuth(LeadsPage);
