import { useState, useEffect } from 'react';
import { listInbox, type InboxItem } from '../lib/api';

interface KakaoMessagesProps {
  onAnalyze: (messageId: string) => void;
  onNavigate: (page: 'home' | 'messages' | 'analysis' | 'safeanalysis' | 'forgery' | 'mypage' |
    'dmselect' | 'facebook' | 'instagram' | 'kakao' | 'search' | 'notification') => void;
}

const COLORS = ['bg-yellow-100', 'bg-amber-100', 'bg-orange-100', 'bg-yellow-50'];

export function KakaoMessages({ onNavigate, onAnalyze }: KakaoMessagesProps) {
  const [messages, setMessages] = useState<InboxItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await listInbox('kakao');
        setMessages(res.items);
      } catch (e: any) {
        setError(e?.message || '메시지를 불러오지 못했습니다');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="h-full overflow-y-auto pb-24 bg-white">
      {/* 상단 로고 및 제목 */}
      <div className="px-4 pt-6 pb-4">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-xs">🛡️</span>
          </div>
          <h1 className="text-xl font-bold">Smashing</h1>
        </div>
        <h2 className="text-2xl font-bold mb-1">DM 목록</h2>
        <p className="text-sm text-gray-500">카카오톡 메시지</p>
      </div>

      {/* 메시지 목록 */}
      <div className="px-4">
        {loading && <div className="text-center py-8 text-gray-500">불러오는 중...</div>}
        {error && <div className="text-center py-8 text-red-500">{error}</div>}
        {!loading && !error && messages.length === 0 && (
          <div className="text-center py-8 text-gray-400">메시지가 없습니다</div>
        )}
        {messages.map((message, index) => (
          <button
            key={message.id}
            onClick={() => onAnalyze(message.id)}
            className="w-full flex items-center gap-4 py-4 border-b border-gray-100 hover:bg-gray-50"
          >
            <div className={`w-14 h-14 ${COLORS[index % COLORS.length]} rounded-full flex items-center justify-center flex-shrink-0`}>
              <span className="text-2xl">👤</span>
            </div>
            <div className="flex-1 text-left min-w-0">
              <div className="text-base font-bold mb-1">{message.senderName}</div>
              <div className="text-sm text-gray-500 truncate">{message.preview}</div>
            </div>
            <div className="flex flex-col items-end gap-1 flex-shrink-0">
              <div className="text-xs text-gray-400">{new Date(message.ts).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}</div>
              <div className="text-lg">🟡</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
