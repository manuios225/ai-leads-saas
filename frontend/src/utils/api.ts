const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export async function apiLogin(email: string, password: string): Promise<string> {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error('Invalid credentials');
  }

  const data = await res.json();
  return data.access_token as string;
}

export async function getDashboardSummary() {
  const res = await fetch(`${API_URL}/analytics/summary`, {
    method: 'GET',
  });

  if (!res.ok) {
    throw new Error('Failed to load analytics');
  }

  return res.json();
}

export async function getICP() {
  const res = await fetch(`${API_URL}/icp`, {
    method: 'GET',
  });

  if (!res.ok) {
    throw new Error('Failed to load ICP');
  }

  return res.json();
}

export async function updateICP(payload: {
  industries: string[];
  companySizes: string[];
  jobTitles: string[];
  regions: string[];
  description: string;
}) {
  const res = await fetch(`${API_URL}/icp`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error('Failed to update ICP');
  }

  return res.json();
}

export async function getLeads() {
  const res = await fetch(`${API_URL}/leads`, {
    method: 'GET',
  });

  if (!res.ok) {
    throw new Error('Failed to load leads');
  }

  return res.json();
}

export async function createLead(payload: {
  fullName: string;
  email?: string;
  jobTitle?: string;
  company?: string;
  linkedinUrl?: string;
  phone?: string;
  score?: number;
}) {
  const res = await fetch(`${API_URL}/leads`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error('Failed to create lead');
  }

  return res.json();
}
