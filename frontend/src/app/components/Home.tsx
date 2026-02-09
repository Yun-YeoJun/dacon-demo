import { useState, useEffect } from 'react';
import { listAnalyses, getMessage, type AnalysisRecord } from '../lib/api';

interface HomeProps {
  onNavigate: (page: 'home' | 'messages' | 'analysis' | 'safeanalysis' | 'forgery' | 'mypage' |
    'dmselect' | 'facebook' | 'instagram' | 'search' | 'notification') => void;
}

type EnrichedAnalysis = AnalysisRecord & { senderName?: string };

export function Home({ onNavigate }: HomeProps) {
  const [recentAnalyses, setRecentAnalyses] = useState<EnrichedAnalysis[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await listAnalyses(null, 3);
        const enriched = await Promise.all(
          res.items.map(async (item) => {
            try {
              const msg = await getMessage(item.messageId);
              return { ...item, senderName: msg.senderName };
            } catch {
              return { ...item, senderName: item.messageId };
            }
          })
        );
        setRecentAnalyses(enriched);
      } catch {
        // 홈 화면이므로 에러 시 빈 상태 유지
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="h-full overflow-y-auto pb-24">
      {/* 메인 배너 */}
      <div className="mx-4 mt-6 mb-6 bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-2">지금 받은 그 메세지,<br />안전할까요?</h1>
          </div>
          <div className="text-7xl ml-4">🛡️</div>
        </div>
      </div>

      {/* 기능 버튼 그리드 */}
      <div className="px-4 mb-6">
        <button
          onClick={() => onNavigate('messages')}
          className="w-full bg-blue-100 rounded-2xl p-8 text-left mb-3 row-span-2"
        >
          <div className="text-6xl mb-4">💬</div>
          <div className="text-2xl font-bold mb-1">문자 탐지</div>
          <div className="text-base text-gray-600">SMS 피싱 메시지 탐지</div>
        </button>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => onNavigate('dmselect')}
            className="bg-teal-100 rounded-2xl p-4 text-left"
          >
            <div className="text-3xl mb-2">📱</div>
            <div className="text-base font-bold">메세지 탐지</div>
          </button>
          <button
            onClick={() => onNavigate('forgery')}
            className="bg-purple-100 rounded-2xl p-4 text-left"
          >
            <div className="text-3xl mb-2">🔍</div>
            <div className="text-base font-bold">번호 검색</div>
          </button>
        </div>
      </div>

      {/* 최근 분석 기록 */}
      <div className="px-4">
        <h2 className="text-lg font-bold mb-3">최근 분석 기록</h2>
        {loading && <div className="text-center py-4 text-gray-400 text-sm">불러오는 중...</div>}
        {!loading && recentAnalyses.length === 0 && (
          <div className="text-center py-4 text-gray-400 text-sm">분석 내역이 없습니다</div>
        )}
        {recentAnalyses.map((item) => {
          const isPhishing = item.analysis.label === '스미싱';
          return (
            <button
              key={item.analysisId}
              onClick={() => onNavigate(isPhishing ? 'analysis' : 'safeanalysis')}
              className={`w-full ${isPhishing ? 'bg-red-50' : 'bg-green-50'} rounded-xl p-4 flex items-center gap-3 mb-3`}
            >
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-xl">
                {item.senderName?.charAt(0) || '?'}
              </div>
              <div className="flex-1 text-left">
                <div className="text-base font-bold mb-1">{item.senderName || item.messageId}</div>
                <div className="text-sm text-gray-500 truncate">{item.analysis.explanation || ''}</div>
              </div>
              <div className="text-xl">{isPhishing ? '⚠️' : '✅'}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
