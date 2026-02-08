import { MessageSquare, Send, Mail, Rocket, Search, Shield } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: 'home' | 'messages' | 'analysis' | 'safeanalysis' | 'forgery' | 'mypage' | 
    'dmselect' | 'facebook' | 'instagram' | 'search' | 'notification') => void;
}

export function Home({ onNavigate }: HomeProps) {
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
        {/* 문자 탐지 - 2행 2열 크기 (큰 버튼) */}
        <button 
          onClick={() => onNavigate('messages')}
          className="w-full bg-blue-100 rounded-2xl p-8 text-left mb-3 row-span-2"
        >
          <div className="text-6xl mb-4">💬</div>
          <div className="text-2xl font-bold mb-1">문자 탐지</div>
          <div className="text-base text-gray-600">SMS 피싱 메시지 탐지</div>
        </button>

        {/* 메세지 탐지 & 번호 검색 - 1행 2열 (작은 버튼들) */}
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
        <button 
          onClick={() => onNavigate('analysis')}
          className="w-full bg-blue-50 rounded-xl p-4 flex items-center gap-3 mb-3"
        >
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-xl">
            👤
          </div>
          <div className="flex-1 text-left">
            <div className="text-base font-bold mb-1">홍길동</div>
            <div className="text-sm text-gray-500">smashing.com/</div>
          </div>
          <div className="text-xl">⚠️</div>
        </button>
        <button 
          onClick={() => onNavigate('safeanalysis')}
          className="w-full bg-green-50 rounded-xl p-4 flex items-center gap-3"
        >
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-xl">
            👤
          </div>
          <div className="flex-1 text-left">
            <div className="text-base font-bold mb-1">김철수</div>
            <div className="text-sm text-gray-500">안전한 메세지</div>
          </div>
          <div className="text-xl">✅</div>
        </button>
      </div>
    </div>
  );
}