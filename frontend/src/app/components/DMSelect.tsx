interface DMSelectProps {
  onNavigate: (page: 'home' | 'messages' | 'analysis' | 'safeanalysis' | 'forgery' | 'mypage' | 
    'dmselect' | 'facebook' | 'instagram' | 'search' | 'notification' | 'kakao') => void;
}

const kakaoIcon = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='16' fill='%233C1E1E'/%3E%3Cpath d='M32 16c-11 0-20 6.7-20 15 0 5.3 3.5 10 8.8 12.7l-2.2 8.1c-.2.6.5 1.1 1 .7l9.6-6.4c.9.1 1.8.1 2.8.1 11 0 20-6.7 20-15S43 16 32 16z' fill='%23FFE812'/%3E%3C/svg%3E";
const messengerIcon = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='16' fill='%23006AFF'/%3E%3Cpath d='M32 14C21.5 14 13 21.6 13 31c0 5.3 2.6 10 6.8 13.1V50l5.5-3c1.5.4 3.1.6 4.7.6h2C42.5 47.6 51 40.4 51 31S42.5 14 32 14zm2 22l-5-5.4-10 5.4 11-11.6 5.2 5.4L45 24.4 34 36z' fill='white'/%3E%3C/svg%3E";
const instagramIcon = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='1' x2='1' y2='0'%3E%3Cstop offset='0' stop-color='%23FFC107'/%3E%3Cstop offset='.5' stop-color='%23F44336'/%3E%3Cstop offset='1' stop-color='%239C27B0'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='64' height='64' rx='16' fill='url(%23g)'/%3E%3Crect x='16' y='16' width='32' height='32' rx='8' fill='none' stroke='white' stroke-width='3'/%3E%3Ccircle cx='32' cy='32' r='8' fill='none' stroke='white' stroke-width='3'/%3E%3Ccircle cx='42' cy='22' r='2.5' fill='white'/%3E%3C/svg%3E";

export function DMSelect({ onNavigate }: DMSelectProps) {
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

      {/* 제목 */}
      <div className="px-4 mb-8">
        <h2 className="text-2xl font-bold mb-2">메세지 탐지</h2>
        <p className="text-base text-gray-600">각 앱에서 공유하기로 메시지를 전송하세요</p>
      </div>

      {/* 플랫폼 선택 - 세로 배치 (3행 1열) */}
      <div className="px-4">
        <div className="space-y-4">
          <button 
            className="w-full bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-3xl flex items-center gap-6 p-6 text-white shadow-lg hover:scale-105 transition-transform"
          >
            <img src={kakaoIcon} alt="카카오톡" className="w-16 h-16 rounded-2xl object-cover" />
            <div className="text-left flex-1">
              <div className="text-xl font-bold">카카오톡</div>
              <div className="text-sm opacity-90">카카오톡에서 공유하기</div>
            </div>
          </button>

          <button 
            onClick={() => onNavigate('facebook')}
            className="w-full bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center gap-6 p-6 text-white shadow-lg hover:scale-105 transition-transform"
          >
            <img src={messengerIcon} alt="페이스북 메신저" className="w-16 h-16 rounded-2xl object-cover" />
            <div className="text-left flex-1">
              <div className="text-xl font-bold">페이스북 메신저</div>
              <div className="text-sm opacity-90">페이스북에서 공유하기</div>
            </div>
          </button>

          <button 
            onClick={() => onNavigate('instagram')}
            className="w-full bg-gradient-to-br from-pink-500 via-purple-500 to-orange-500 rounded-3xl flex items-center gap-6 p-6 text-white shadow-lg hover:scale-105 transition-transform"
          >
            <img src={instagramIcon} alt="인스타그램" className="w-16 h-16 rounded-2xl object-cover" />
            <div className="text-left flex-1">
              <div className="text-xl font-bold">인스타그램 DM</div>
              <div className="text-sm opacity-90">인스타그램에서 공유하기</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}