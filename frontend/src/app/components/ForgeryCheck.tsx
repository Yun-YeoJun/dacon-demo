import { Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { listAnalyses, getMessage } from '../lib/api';

interface ForgeryCheckProps {
  onNavigate: (page: 'home' | 'messages' | 'analysis' | 'safeanalysis' | 'forgery' | 'mypage' |
    'dmselect' | 'facebook' | 'instagram' | 'search' | 'notification') => void;
}

type PhoneEntry = { phone: string; sender: string; message: string; isPhishing: boolean };

export function ForgeryCheck({ onNavigate }: ForgeryCheckProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [phoneNumbers, setPhoneNumbers] = useState<PhoneEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await listAnalyses(null, 100);
        const entries: PhoneEntry[] = [];
        const seen = new Set<string>();
        for (const item of res.items) {
          try {
            const msg = await getMessage(item.messageId);
            if (!seen.has(msg.senderId)) {
              seen.add(msg.senderId);
              entries.push({
                phone: msg.senderId,
                sender: msg.senderName,
                message: msg.content.substring(0, 30),
                isPhishing: item.analysis.label === '스미싱',
              });
            }
          } catch { /* skip */ }
        }
        setPhoneNumbers(entries);
      } catch { /* fail silently */ }
      finally { setLoading(false); }
    })();
  }, []);

  const filteredNumbers = searchQuery
    ? phoneNumbers.filter((item) =>
        item.phone.includes(searchQuery) ||
        item.sender.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : phoneNumbers;

  return (
    <div className="h-full overflow-y-auto pb-24 bg-white">
      {/* 상단 로고 */}
      <div className="px-4 pt-6 pb-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-xs">🛡️</span>
          </div>
          <h1 className="text-xl font-bold">Smashing</h1>
        </div>
      </div>

      {/* 제목 */}
      <div className="px-4 mb-6">
        <h2 className="text-2xl font-bold mb-1">전화번호 검색 📞</h2>
        <p className="text-sm text-gray-500">분석된 번호를 검색합니다</p>
      </div>

      {/* 검색 입력 */}
      <div className="px-4 mb-6">
        <div className="relative">
          <input
            type="tel"
            placeholder="010-0000-0000"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-4 pr-12 bg-gray-100 rounded-2xl text-base border-none outline-none"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
            <Search className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* 검색 결과 */}
      <div className="px-4 mb-6">
        <h3 className="text-lg font-bold mb-3">
          {searchQuery ? `검색 결과 (${filteredNumbers.length})` : '전체 번호 내역'}
        </h3>

        {loading && <div className="text-center py-8 text-gray-500">불러오는 중...</div>}

        {!loading && filteredNumbers.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <div className="text-4xl mb-3">🔍</div>
            <div className="text-base">{searchQuery ? '검색 결과가 없습니다' : '분석된 번호가 없습니다'}</div>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredNumbers.map((item, index) => (
              <div
                key={index}
                className={`${
                  item.isPhishing ? 'bg-red-50' : 'bg-green-50'
                } rounded-2xl p-4 flex items-center gap-4`}
              >
                <div
                  className={`w-14 h-14 ${
                    item.isPhishing ? 'bg-red-500' : 'bg-green-500'
                  } rounded-full flex items-center justify-center flex-shrink-0`}
                >
                  <span className="text-white text-2xl">{item.isPhishing ? '✗' : '✓'}</span>
                </div>
                <div className="flex-1">
                  <div className="text-base font-bold mb-1">{item.phone}</div>
                  <div className="text-sm text-gray-600 mb-1">{item.sender} - {item.message}</div>
                  {item.isPhishing ? (
                    <div className="text-xs text-red-600 font-semibold">
                      ⚠️ 스미싱 위험 감지
                    </div>
                  ) : (
                    <div className="text-xs text-green-600">안전한 번호입니다</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
