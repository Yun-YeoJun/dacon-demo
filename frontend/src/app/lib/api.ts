export type Channel = "sms" | "facebook" | "instagram" | "kakao" | "email";

export type AnalyzeResult = {
  label: "스미싱" | "정상" | "불명";
  score?: number | null;
  explanation: string;
  patterns: string[];
  recommended_actions: string[];
  raw_output?: any;
};

export type AnalyzeResponse = {
  request_id: string;
  success: boolean;
  result: AnalyzeResult;
};

export type InboxItem = {
  id: string;
  channel: Channel;
  senderName: string;
  senderId: string;
  preview: string;
  ts: string;
  riskHint?: "warn" | "safe" | null;
};

export type InboxResponse = { items: InboxItem[]; nextCursor?: string | null };

export type MessageDetail = { id: string; channel: Channel; senderId: string; content: string; ts: string };

export type AnalysisRecord = { analysisId: string; messageId: string; createdAt: string; analysis: AnalyzeResult };
export type AnalysisListResponse = { items: AnalysisRecord[]; nextCursor?: string | null };

const CLIENT_ID_KEY = "sg_client_id";

export function getClientId(): string {
  let v = localStorage.getItem(CLIENT_ID_KEY);
  if (!v) {
    v = "c_" + Math.random().toString(16).slice(2) + Date.now().toString(16);
    localStorage.setItem(CLIENT_ID_KEY, v);
  }
  return v;
}

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const headers = new Headers(init?.headers || {});
  headers.set("X-Client-Id", getClientId());
  if (init?.body && !headers.has("Content-Type")) headers.set("Content-Type", "application/json");

  const res = await fetch(path, { ...init, headers });
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`API ${res.status}: ${txt}`);
  }
  return (await res.json()) as T;
}

export function listInbox(channel: Channel, cursor?: string | null, limit: number = 20) {
  const qs = new URLSearchParams({ channel, limit: String(limit) });
  if (cursor) qs.set("cursor", cursor);
  return apiFetch<InboxResponse>(`/v1/inbox?${qs.toString()}`);
}

export function getMessage(id: string) {
  return apiFetch<MessageDetail>(`/v1/messages/${encodeURIComponent(id)}`);
}

export function analyzeText(text: string, request_id?: string) {
  return apiFetch<AnalyzeResponse>(`/v1/analyze`, {
    method: "POST",
    body: JSON.stringify({ request_id: request_id || "req_" + Date.now(), text }),
  });
}

export function saveAnalysis(messageId: string, analysis: AnalyzeResult) {
  return apiFetch<AnalysisRecord>(`/v1/analysis`, {
    method: "POST",
    body: JSON.stringify({ messageId, analysis }),
  });
}

export function listAnalyses(cursor?: string | null, limit: number = 20) {
  const qs = new URLSearchParams({ limit: String(limit) });
  if (cursor) qs.set("cursor", cursor);
  return apiFetch<AnalysisListResponse>(`/v1/analysis?${qs.toString()}`);
}

export function getAnalysis(analysisId: string) {
  return apiFetch<AnalysisRecord>(`/v1/analysis/${encodeURIComponent(analysisId)}`);
}
