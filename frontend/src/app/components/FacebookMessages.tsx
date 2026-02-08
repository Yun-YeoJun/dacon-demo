interface FacebookMessagesProps {
  onAnalyze: (messageId: string) => void;
  onNavigate: (page: 'home' | 'messages' | 'analysis' | 'safeanalysis' | 'forgery' | 'mypage' | 
    'dmselect' | 'facebook' | 'instagram' | 'search' | 'notification') => void;
}

export function FacebookMessages({ onNavigate, onAnalyze }: FacebookMessagesProps) {
  const messages = [
    { id: 1, sender: '남현', preview: '내일 식사 갈래?', time: '17:21 AM', avatar: '👤', color: 'bg-blue-100', platform: '💬' },
    { id: 2, sender: '은혜', preview: '무슨 일 있어?', time: '12:30 AM', avatar: '👤', color: 'bg-pink-100', platform: '💬' },
    { id: 3, sender: '은혜', preview: '맞아!', time: '12:30 AM', avatar: '👤', color: 'bg-pink-100', platform: '💬' },
    { id: 4, sender: '민채', preview: '언제 만날까...', time: '12:30 AM', avatar: '👤', color: 'bg-green-100', platform: '💬' },
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
        <h2 className="text-2xl font-bold mb-1">DM 목록</h2>
        <p className="text-sm text-gray-500">페이스북 메신저 메시지</p>
      </div>

      {/* 메시지 목록 */}
      <div className="px-4">
        {messages.map((message) => (
          <button
            key={message.id}
            onClick={() => onAnalyze(String(message.id))}
            className="w-full flex items-center gap-4 py-4 border-b border-gray-100 hover:bg-gray-50"
          >
            <div className={`w-14 h-14 ${message.color} rounded-full flex items-center justify-center flex-shrink-0`}>
              <span className="text-2xl">{message.avatar}</span>
            </div>
            <div className="flex-1 text-left min-w-0">
              <div className="text-base font-bold mb-1">{message.sender}</div>
              <div className="text-sm text-gray-500 truncate">{message.preview}</div>
            </div>
            <div className="flex flex-col items-end gap-1 flex-shrink-0">
              <div className="text-xs text-gray-400">{message.time}</div>
              <div className="text-lg">{message.platform}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}