import { useEffect, useState, FormEvent } from "react";
import { requireAuth } from "@/utils/requireAuth";
import { getICP, updateICP } from "@/utils/api";
import { useRouter } from "next/router";

type ICPForm = {
  industries: string;
  companySizes: string;
  jobTitles: string;
  regions: string;
  description: string;
};

function ICPPage() {
  const router = useRouter();
  const [form, setForm] = useState<ICPForm>({
    industries: "",
    companySizes: "",
    jobTitles: "",
    regions: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const data = await getICP();
        if (data) {
          setForm({
            industries: Array.isArray(data.industries) ? data.industries.join(", ") : "",
            companySizes: Array.isArray(data.companySizes) ? data.companySizes.join(", ") : "",
            jobTitles: Array.isArray(data.jobTitles) ? data.jobTitles.join(", ") : "",
            regions: Array.isArray(data.regions) ? data.regions.join(", ") : "",
            description: data.description || "",
          });
        }
      } catch (e) {
        console.log("Erreur chargement ICP", e);
      } finally {
        setInitialLoading(false);
      }
    }
    load();
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const payload = {
      industries: form.industries
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0),
      companySizes: form.companySizes
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0),
      jobTitles: form.jobTitles
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0),
      regions: form.regions
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0),
      description: form.description,
    };

    try {
      await updateICP(payload);
      setMessage("ICP sauvegardé avec succès.");
    } catch (e) {
      setMessage("Erreur lors de la sauvegarde.");
    } finally {
      setLoading(false);
    }
  }

  if (initialLoading) {
    return <p style={{ padding: 40 }}>Chargement de l&apos;ICP...</p>;
  }

  return (
    <div style={{ minHeight: "100vh", padding: 32, background: "#e5e7eb" }}>
      <div style={{ maxWidth: 800, margin: "0 auto", background: "#ffffff", borderRadius: 12, padding: 24, boxShadow: "0 4px 10px rgba(0,0,0,0.05)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
          <h1 style={{ fontSize: 24, fontWeight: 600 }}>Configuration de l&apos;ICP</h1>
          <button
            onClick={() => router.push("/dashboard")}
            style={{
              padding: "6px 10px",
              borderRadius: 6,
              border: "1px solid #d1d5db",
              background: "#ffffff",
              cursor: "pointer",
              fontSize: 13,
            }}
          >
            Retour au dashboard
          </button>
        </div>
        <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 24 }}>
          Définis ton profil de client idéal. Ces informations seront utilisées pour la prospection automatique et la personnalisation des emails.
        </p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={{ display: "block", fontSize: 13, marginBottom: 4 }}>Industries (séparées par des virgules)</label>
            <input
              value={form.industries}
              onChange={(e) => setForm({ ...form, industries: e.target.value })}
              style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #d1d5db" }}
              placeholder="SaaS, Tech, E-commerce..."
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: 13, marginBottom: 4 }}>Taille d&apos;entreprise (10-50, 50-200...)</label>
            <input
              value={form.companySizes}
              onChange={(e) => setForm({ ...form, companySizes: e.target.value })}
              style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #d1d5db" }}
              placeholder="10-50, 50-200..."
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: 13, marginBottom: 4 }}>Titres ciblés (CTO, CEO...)</label>
            <input
              value={form.jobTitles}
              onChange={(e) => setForm({ ...form, jobTitles: e.target.value })}
              style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #d1d5db" }}
              placeholder="CTO, CEO, VP Sales..."
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: 13, marginBottom: 4 }}>Régions (EU, US...)</label>
            <input
              value={form.regions}
              onChange={(e) => setForm({ ...form, regions: e.target.value })}
              style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #d1d5db" }}
              placeholder="EU, US..."
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: 13, marginBottom: 4 }}>Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              style={{ width: "100%", minHeight: 100, padding: 8, borderRadius: 6, border: "1px solid #d1d5db" }}
              placeholder="Décris ton ICP en une phrase simple."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: 8,
              padding: "10px 16px",
              borderRadius: 8,
              border: "none",
              background: "#2563eb",
              color: "#ffffff",
              fontWeight: 600,
              cursor: "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Sauvegarde..." : "Sauvegarder l&apos;ICP"}
          </button>

          {message && (
            <p style={{ marginTop: 8, fontSize: 13, color: message.includes("succès") ? "#15803d" : "#b91c1c" }}>
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default requireAuth(ICPPage);
