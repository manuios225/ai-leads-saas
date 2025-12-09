"use client";

import { useEffect, useState } from "react";
import { api } from "@/utils/api";
import { useRouter } from "next/navigation";

export default function ICPPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    industries: "",
    companySizes: "",
    jobTitles: "",
    regions: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function loadICP() {
    try {
      const res = await api.get("/icp");
      if (res.ok) {
        const data = await res.json();
        if (data) {
          setForm({
            industries: data.industries?.join(", ") || "",
            companySizes: data.companySizes?.join(", ") || "",
            jobTitles: data.jobTitles?.join(", ") || "",
            regions: data.regions?.join(", ") || "",
            description: data.description || "",
          });
        }
      }
    } catch (err) {
      console.log("Erreur chargement ICP", err);
    }
  }

  async function saveICP(e: any) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const payload = {
      industries: form.industries.split(",").map(s => s.trim()),
      companySizes: form.companySizes.split(",").map(s => s.trim()),
      jobTitles: form.jobTitles.split(",").map(s => s.trim()),
      regions: form.regions.split(",").map(s => s.trim()),
      description: form.description,
    };

    try {
      const res = await api.put("/icp", payload);
      if (res.ok) {
        setMessage("ICP sauvegardé avec succès !");
      } else {
        setMessage("Erreur lors de la sauvegarde.");
      }
    } catch (err) {
      setMessage("Erreur réseau.");
    }

    setLoading(false);
  }

  useEffect(() => {
    loadICP();
  }, []);

  return (
    <div style={{ padding: 40, maxWidth: 700, margin: "0 auto" }}>
      <h1 style={{ fontSize: 28, fontWeight: 700 }}>Configuration ICP</h1>

      <form onSubmit={saveICP} style={{ marginTop: 30 }}>

        <label>Industries (séparées par des virgules)</label>
        <input
          value={form.industries}
          onChange={e => setForm({ ...form, industries: e.target.value })}
          style={{ width: "100%", marginBottom: 20, padding: 10 }}
        />

        <label>Taille d’entreprise (ex: 10-50, 50-200)</label>
        <input
          value={form.companySizes}
          onChange={e => setForm({ ...form, companySizes: e.target.value })}
          style={{ width: "100%", marginBottom: 20, padding: 10 }}
        />

        <label>Titres ciblés (CTO, CEO…)</label>
        <input
          value={form.jobTitles}
          onChange={e => setForm({ ...form, jobTitles: e.target.value })}
          style={{ width: "100%", marginBottom: 20, padding: 10 }}
        />

        <label>Régions (EU, US…)</label>
        <input
          value={form.regions}
          onChange={e => setForm({ ...form, regions: e.target.value })}
          style={{ width: "100%", marginBottom: 20, padding: 10 }}
        />

        <label>Description</label>
        <textarea
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          style={{ width: "100%", marginBottom: 20, padding: 10, minHeight: 120 }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px 20px",
            background: "#2563eb",
            color: "#fff",
            fontSize: 16,
            fontWeight: 600,
            borderRadius: 8,
            border: "none",
          }}
        >
          {loading ? "Sauvegarde..." : "Sauvegarder l’ICP"}
        </button>

        {message && (
          <p style={{ marginTop: 20, color: "green", fontWeight: 600 }}>{message}</p>
        )}
      </form>
    </div>
  );
}
