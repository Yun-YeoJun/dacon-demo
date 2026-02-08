interface MessageListProps {
  onAnalyze: (messageId: string) => void;
  onNavigate: (page: 'home' | 'messages' | 'analysis' | 'safeanalysis' | 'forgery' | 'mypage' | 
    'dmselect' | 'facebook' | 'instagram' | 'search' | 'notification') => void;
}

export function MessageList({ onNavigate, onAnalyze }: MessageListProps) {
  const messages = [
    { id: 1, sender: '국세청', phone: '010-1234-5678', preview: '세금 환급 안내', date: '2025. 07. 15', emoji: '📝', initial: '국', color: 'bg-blue-100', isPhishing: true },
    { id: 2, sender: '삼성페이', phone: '010-5678-1234', preview: '결제 승인', date: '2025. 07. 15', emoji: '💳', initial: '삼', color: 'bg-pink-100', isPhishing: false },
    { id: 3, sender: '택배', phone: '010-9999-8888', preview: '배송 완료', date: '2025. 07. 27', emoji: '📦', initial: '택', color: 'bg-green-100', isPhishing: false },
    { id: 4, sender: '경찰청', phone: '010-7777-6666', preview: '사기 주의 안내', date: '2025. 07. 07', emoji: '🚨', initial: '경', color: 'bg-orange-100', isPhishing: true },
  ];

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
        <h2 className="text-2xl font-bold mb-1">문자 내역</h2>
        <p className="text-sm text-gray-500">수신한 문자 메세지를 확인하세요</p>
      </div>

      {/* 메시지 목록 */}
      <div className="px-4">
        {messages.map((message) => (
          <button
            key={message.id}
            onClick={() => onNavigate(message.isPhishing ? 'analysis' : 'safeanalysis')}
            className="w-full flex items-center gap-4 py-4 border-b border-gray-100 hover:bg-gray-50"
          >
            <div className={`w-14 h-14 ${message.color} rounded-2xl flex items-center justify-center flex-shrink-0`}>
              <span className="text-2xl font-bold">{message.initial}</span>
            </div>
            <div className="flex-1 text-left min-w-0">
              <div className="text-base font-bold mb-1">{message.sender}</div>
              <div className="text-xs text-gray-400 mb-1">{message.phone}</div>
              <div className="text-sm text-gray-500 truncate">{message.preview}</div>
            </div>
            <div className="flex flex-col items-end gap-1 flex-shrink-0">
              <div className="text-xs text-gray-400">{message.date}</div>
              <div className="text-lg">{message.emoji}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}