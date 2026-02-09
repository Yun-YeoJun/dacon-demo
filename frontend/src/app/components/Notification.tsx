import { useEffect, useState } from 'react';
import { listAnalyses, getMessage } from '../lib/api';

interface NotificationProps {
  onNavigate: (page: 'home' | 'messages' | 'analysis' | 'safeanalysis' | 'forgery' | 'mypage' |
    'dmselect' | 'facebook' | 'instagram' | 'search' | 'notification') => void;
  unreadCount: number;
  setUnreadCount: (count: number) => void;
}

type NotificationItem = {
  id: string;
  title: string;
  message: string;
  time: string;
};

function formatRelativeTime(isoDate: string): string {
  const diff = Date.now() - new Date(isoDate).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return '방금 전';
  if (mins < 60) return `${mins}분 전`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}시간 전`;
  const days = Math.floor(hours / 24);
  return `${days}일 전`;
}

export function Notification({ onNavigate, unreadCount, setUnreadCount }: NotificationProps) {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUnreadCount(0);
    (async () => {
      try {
        const res = await listAnalyses(null, 20);
        const notifs: NotificationItem[] = [];
        for (const item of res.items) {
          if (item.analysis.label === '스미싱') {
            let senderInfo = item.messageId;
            try {
              const msg = await getMessage(item.messageId);
              senderInfo = msg.senderName || msg.senderId;
            } catch { /* use messageId */ }
            notifs.push({
              id: item.analysisId,
              title: '⚠️ 스미싱 위험 메세지 탐지',
              message: `${senderInfo}에서 받은 메세지에서 피싱 위험이 감지되었습니다.`,
              time: formatRelativeTime(item.createdAt),
            });
          }
        }
        setNotifications(notifs);
      } catch {
        // 실패 시 빈 상태
      } finally {
        setLoading(false);
      }
    })();
  }, [setUnreadCount]);

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

      {/* 알림 제목 */}
      <div className="px-4 mb-6">
        <h2 className="text-2xl font-bold mb-1">알림</h2>
        <p className="text-sm text-gray-500">스미싱 탐지 알림 내역</p>
      </div>

      {/* 알림 목록 */}
      <div className="px-4">
        {loading && <div className="text-center py-8 text-gray-500">불러오는 중...</div>}
        {!loading && notifications.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <div className="text-4xl mb-3">🔔</div>
            <div className="text-base">알림이 없습니다</div>
          </div>
        )}
        {notifications.map((notification) => (
          <button
            key={notification.id}
            onClick={() => onNavigate('analysis')}
            className="w-full p-4 mb-3 rounded-2xl text-left hover:bg-gray-50 border bg-red-50 border-red-200"
          >
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">⚠️</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <div className="text-base font-bold">{notification.title}</div>
                </div>
                <div className="text-sm text-gray-600 mb-2">{notification.message}</div>
                <div className="text-xs text-gray-400">{notification.time}</div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
