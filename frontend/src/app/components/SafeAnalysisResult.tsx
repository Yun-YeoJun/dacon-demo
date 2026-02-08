import { Share2, CheckCircle } from 'lucide-react';

interface SafeAnalysisResultProps {
  analysisPayload?: any | null;
  onNavigate: (page: 'home' | 'messages' | 'analysis' | 'safeanalysis' | 'forgery' | 'mypage' | 
    'dmselect' | 'facebook' | 'instagram' | 'search' | 'notification') => void;
}

export function SafeAnalysisResult({ onNavigate, analysisPayload }: SafeAnalysisResultProps) {
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

      {/* 안전 배너 */}
      <div className="mx-4 mb-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-3xl p-8 text-white text-center shadow-lg">
        <div className="text-6xl mb-4">✅</div>
        <h2 className="text-2xl font-bold">안전한 메세지입니다</h2>
      </div>

      {/* 발신자 정보 */}
      <div className="mx-4 mb-6">
        <div className="bg-gray-50 rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <span className="text-xl font-bold">삼</span>
            </div>
            <div>
              <div className="text-base font-bold mb-1">삼성페이</div>
              <div className="text-sm text-gray-500">010-5678-1234</div>
            </div>
          </div>
        </div>
      </div>

      {/* 메시지 내용 */}
      <div className="mx-4 mb-6">
        <h3 className="text-lg font-bold mb-3">메세지 내용</h3>
        <div className="bg-gray-50 rounded-2xl p-5">
          <p className="text-base leading-relaxed text-gray-700">
            [삼성페이] 결제가 승인되었습니다.
            <br/><br/>
            승인금액: 15,000원
            <br/>
            가맹점: 스타벅스 강남점
            <br/>
            승인일시: 2025.07.15 14:32
            <br/><br/>
            이용해 주셔서 감사합니다.
          </p>
        </div>
      </div>

      {/* AI 분석 결과 */}
      <div className="mx-4 mb-6">
        <h3 className="text-lg font-bold mb-3">AI 분석 결과</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3 bg-green-50 rounded-xl p-4">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-sm">✓</span>
            </div>
            <div>
              <div className="text-base font-bold mb-1">공식 발신번호 확인</div>
              <div className="text-sm text-gray-600">등록된 공식 발신번호입니다</div>
            </div>
          </div>
          
          <div className="flex items-start gap-3 bg-green-50 rounded-xl p-4">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-sm">✓</span>
            </div>
            <div>
              <div className="text-base font-bold mb-1">의심 링크 없음</div>
              <div className="text-sm text-gray-600">외부 링크가 포함되어 있지 않습니다</div>
            </div>
          </div>
          
          <div className="flex items-start gap-3 bg-green-50 rounded-xl p-4">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-sm">✓</span>
            </div>
            <div>
              <div className="text-base font-bold mb-1">정상적인 내용</div>
              <div className="text-sm text-gray-600">피싱 패턴이 발견되지 않았습니다</div>
            </div>
          </div>
        </div>
      </div>

      {/* 버튼 */}
      <div className="mx-4 flex gap-3">
        <button 
          onClick={() => onNavigate('home')}
          className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-2xl text-base font-bold hover:bg-gray-300"
        >
          🏠 홈으로
        </button>
        <button className="flex-1 bg-blue-500 text-white py-4 rounded-2xl text-base font-bold shadow-md hover:bg-blue-600">
          📤 공유하기
        </button>
      </div>
    </div>
  );
}