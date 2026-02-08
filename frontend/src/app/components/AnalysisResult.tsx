import { Share2, AlertTriangle } from 'lucide-react';

interface AnalysisResultProps {
  analysisPayload?: any | null;
  onNavigate: (page: 'home' | 'messages' | 'analysis' | 'safeanalysis' | 'forgery' | 'mypage' | 
    'dmselect' | 'facebook' | 'instagram' | 'search' | 'notification') => void;
}

export function AnalysisResult({ onNavigate, analysisPayload }: AnalysisResultProps) {
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

      {/* 경고 배너 */}
      <div className="mx-4 mb-6 bg-gradient-to-br from-red-400 to-pink-500 rounded-3xl p-8 text-white text-center shadow-lg">
        <div className="text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold">위험한 메시지입니다!</h2>
      </div>

      {/* 발신자 정보 */}
      <div className="mx-4 mb-6">
        <div className="bg-gray-50 rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <span className="text-xl font-bold">국</span>
            </div>
            <div>
              <div className="text-base font-bold mb-1">국세청</div>
              <div className="text-sm text-gray-500">010-1234-5678</div>
            </div>
          </div>
        </div>
      </div>

      {/* 분석 내용 */}
      <div className="mx-4 mb-6">
        <h3 className="text-lg font-bold mb-3">메시지 내용</h3>
        <div className="bg-gray-50 rounded-2xl p-5">
          <p className="text-base leading-relaxed text-gray-700">
            [국세청] 세금 환급이 있습니다. 아래 링크를 클릭하여 환급받으세요.
            <br/><br/>
            https://fake-tax-return.com
            <br/><br/>
            24시간 이내에 처리하지 않으면 환급 기회가 사라집니다.
          </p>
        </div>
      </div>

      {/* AI 분석 결과 */}
      <div className="mx-4 mb-6">
        <h3 className="text-lg font-bold mb-3">AI 분석 결과</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3 bg-red-50 rounded-xl p-4">
            <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-sm">!</span>
            </div>
            <div>
              <div className="text-base font-bold mb-1">의심스러운 링크 포함</div>
              <div className="text-sm text-gray-600">공식 사이트가 아닌 링크가 포함되어 있습니다</div>
            </div>
          </div>
          
          <div className="flex items-start gap-3 bg-orange-50 rounded-xl p-4">
            <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-sm">!</span>
            </div>
            <div>
              <div className="text-base font-bold mb-1">긴급성 유도</div>
              <div className="text-sm text-gray-600">24시간 제한 등으로 긴급성을 조장합니다</div>
            </div>
          </div>
          
          <div className="flex items-start gap-3 bg-yellow-50 rounded-xl p-4">
            <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-sm">!</span>
            </div>
            <div>
              <div className="text-base font-bold mb-1">금전 관련 내용</div>
              <div className="text-sm text-gray-600">환급, 세금 등 금전적 이득을 언급합니다</div>
            </div>
          </div>
        </div>
      </div>

      {/* 버튼 */}
      <div className="mx-4 flex gap-3">
        <button className="flex-1 bg-red-500 text-white py-4 rounded-2xl text-base font-bold shadow-md hover:bg-red-600">
          🚨 신고하기
        </button>
        <button className="flex-1 bg-blue-500 text-white py-4 rounded-2xl text-base font-bold shadow-md hover:bg-blue-600">
          📤 공유하기
        </button>
      </div>
    </div>
  );
}