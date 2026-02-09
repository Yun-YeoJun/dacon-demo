import { useState, useEffect } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { listAnalyses, getMessage, type AnalysisRecord } from '../lib/api';

interface SearchProps {
  onNavigate: (page: 'home' | 'messages' | 'analysis' | 'safeanalysis' | 'forgery' | 'mypage' |
    'dmselect' | 'facebook' | 'instagram' | 'search' | 'notification') => void;
}

type SearchItem = AnalysisRecord & { senderName?: string; content?: string; channelType?: string };

const CHANNEL_LABELS: Record<string, string> = {
  sms: '문자', facebook: 'DM', instagram: 'DM', kakao: 'DM', email: '메일',
};

export function Search({ onNavigate }: SearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [allItems, setAllItems] = useState<SearchItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await listAnalyses(null, 50);
        const enriched = await Promise.all(
          res.items.map(async (item) => {
            try {
              const msg = await getMessage(item.messageId);
              return {
                ...item,
                senderName: msg.senderName,
                content: msg.content,
                channelType: msg.channel,
              };
            } catch {
              return { ...item };
            }
          })
        );
        setAllItems(enriched);
      } catch {
        // 실패 시 빈 상태
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filteredHistory = searchQuery
    ? allItems.filter(
        (item) =>
          (item.senderName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
          (item.content || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
          (item.analysis.explanation || '').toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allItems;

  return (
    <div className="h-full overflow-y-auto pb-24 bg-white">
      {/* 상단 로고 */}
      <div className="px-4 pt-6 pb-4">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-xs">🛡️</span>
          </div>
          <h1 className="text-xl font-bold">Smashing</h1>
        </div>
      </div>

      {/* 검색 바 */}
      <div className="px-4 mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="발신자, 내용 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-4 pr-12 bg-gray-100 rounded-2xl text-base border-none outline-none"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
            <SearchIcon className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>

      {/* 검색 결과 */}
      <div className="px-4">
        <h3 className="text-lg font-bold mb-3">
          {searchQuery ? `검색 결과 (${filteredHistory.length})` : '전체 분석 내역'}
        </h3>

        {loading && <div className="text-center py-8 text-gray-500">불러오는 중...</div>}

        {!loading && filteredHistory.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <div className="text-4xl mb-3">🔍</div>
            <div className="text-base">{searchQuery ? '검색 결과가 없습니다' : '분석 내역이 없습니다'}</div>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredHistory.map((item) => {
              const isPhishing = item.analysis.label === '스미싱';
              return (
                <button
                  key={item.analysisId}
                  onClick={() => onNavigate(isPhishing ? 'analysis' : 'safeanalysis')}
                  className={`w-full ${
                    isPhishing ? 'bg-red-50' : 'bg-green-50'
                  } rounded-xl p-4 text-left hover:scale-[1.02] transition-transform`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-12 h-12 ${
                        isPhishing ? 'bg-red-500' : 'bg-green-500'
                      } rounded-xl flex items-center justify-center flex-shrink-0`}
                    >
                      <span className="text-white text-xl">
                        {isPhishing ? '⚠️' : '✅'}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="text-base font-bold">{item.senderName || item.messageId}</div>
                        <div className="text-xs text-gray-500 px-2 py-0.5 bg-white rounded">
                          {CHANNEL_LABELS[item.channelType || ''] || '문자'}
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 truncate mb-1">{item.content || item.analysis.explanation}</div>
                      <div className="text-xs text-gray-400">{new Date(item.createdAt).toLocaleDateString('ko-KR')}</div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
