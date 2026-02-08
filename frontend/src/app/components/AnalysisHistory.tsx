import { useEffect, useState } from "react";
import { listAnalyses, getMessage, type AnalysisRecord } from "../lib/api";
import { ChevronLeft } from "lucide-react";

interface Props {
  onNavigate: (page: any) => void;
  onOpenAnalysis: (analysisId: string) => void;
}

export function AnalysisHistory({ onNavigate, onOpenAnalysis }: Props) {
  const [items, setItems] = useState<AnalysisRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await listAnalyses(null, 30);
        setItems(res.items);
      } catch (e: any) {
        setError(e?.message || "불러오기 실패");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="h-full overflow-y-auto pb-24 bg-white">
      <div className="px-4 pt-6 pb-4 flex items-center gap-2">
        <button
          className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center"
          onClick={() => onNavigate("mypage")}
          aria-label="back"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-bold">분석 내역</h1>
      </div>

      <div className="px-4">
        {loading && <div className="text-sm text-gray-500">불러오는 중…</div>}
        {error && <div className="text-sm text-red-600">{error}</div>}

        {!loading && !error && items.length === 0 && (
          <div className="text-sm text-gray-500">아직 저장된 분석 내역이 없습니다.</div>
        )}

        <div className="space-y-3 mt-3">
          {items.map((it) => (
            <button
              key={it.analysisId}
              className="w-full text-left p-4 rounded-2xl border border-gray-100 shadow-sm bg-white"
              onClick={() => onOpenAnalysis(it.analysisId)}
            >
              <div className="flex items-center justify-between">
                <div className="font-semibold">{it.analysis.label}</div>
                <div className="text-xs text-gray-400">{new Date(it.createdAt).toLocaleString()}</div>
              </div>
              <div className="text-sm text-gray-600 mt-1 line-clamp-2">
                {it.analysis.explanation || "—"}
              </div>
              <div className="text-xs text-gray-400 mt-2">
                score: {typeof it.analysis.score === "number" ? it.analysis.score : "—"}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
