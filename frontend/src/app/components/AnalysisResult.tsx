import type { AnalyzeResult, MessageDetail } from '../lib/api';

interface AnalysisResultProps {
  analysisPayload?: AnalyzeResult | null;
  message?: MessageDetail | null;
  onNavigate: (page: 'home' | 'messages' | 'analysis' | 'safeanalysis' | 'forgery' | 'mypage' |
    'dmselect' | 'facebook' | 'instagram' | 'search' | 'notification') => void;
}

const PATTERN_STYLES = [
  { bg: 'bg-red-50', dot: 'bg-red-500' },
  { bg: 'bg-orange-50', dot: 'bg-orange-500' },
  { bg: 'bg-yellow-50', dot: 'bg-yellow-500' },
  { bg: 'bg-red-50', dot: 'bg-red-400' },
  { bg: 'bg-orange-50', dot: 'bg-orange-400' },
];

export function AnalysisResult({ onNavigate, analysisPayload, message }: AnalysisResultProps) {
  const senderInitial = message?.senderName?.charAt(0) || '?';
  const senderName = message?.senderName || '알 수 없음';
  const senderId = message?.senderId || '';
  const content = message?.content || '';
  const patterns = analysisPayload?.patterns || [];
  const explanation = analysisPayload?.explanation || '';
  const score = analysisPayload?.score;
  const actions = analysisPayload?.recommended_actions || [];

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
        {typeof score === 'number' && (
          <div className="text-lg mt-2 opacity-90">위험도 {Math.round(score * 100)}%</div>
        )}
      </div>

      {/* 발신자 정보 */}
      <div className="mx-4 mb-6">
        <div className="bg-gray-50 rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <span className="text-xl font-bold">{senderInitial}</span>
            </div>
            <div>
              <div className="text-base font-bold mb-1">{senderName}</div>
              <div className="text-sm text-gray-500">{senderId}</div>
            </div>
          </div>
        </div>
      </div>

      {/* 메시지 내용 */}
      <div className="mx-4 mb-6">
        <h3 className="text-lg font-bold mb-3">메시지 내용</h3>
        <div className="bg-gray-50 rounded-2xl p-5">
          <p className="text-base leading-relaxed text-gray-700 whitespace-pre-wrap">
            {content}
          </p>
        </div>
      </div>

      {/* AI 분석 결과 */}
      <div className="mx-4 mb-6">
        <h3 className="text-lg font-bold mb-3">AI 분석 결과</h3>
        {explanation && (
          <div className="bg-red-50 rounded-xl p-4 mb-3">
            <div className="text-sm text-gray-700">{explanation}</div>
          </div>
        )}
        <div className="space-y-3">
          {patterns.map((pattern, index) => {
            const style = PATTERN_STYLES[index % PATTERN_STYLES.length];
            return (
              <div key={index} className={`flex items-start gap-3 ${style.bg} rounded-xl p-4`}>
                <div className={`w-6 h-6 ${style.dot} rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}>
                  <span className="text-white text-sm">!</span>
                </div>
                <div>
                  <div className="text-base font-bold">{pattern}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 권장 조치 */}
      {actions.length > 0 && (
        <div className="mx-4 mb-6">
          <h3 className="text-lg font-bold mb-3">권장 조치</h3>
          <div className="space-y-2">
            {actions.map((action, i) => (
              <div key={i} className="flex items-center gap-2 bg-gray-50 rounded-xl p-3">
                <span className="text-blue-500">•</span>
                <span className="text-sm text-gray-700">{action}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 버튼 */}
      <div className="mx-4 flex gap-3">
        <button
          onClick={() => onNavigate('home')}
          className="flex-1 bg-red-500 text-white py-4 rounded-2xl text-base font-bold shadow-md hover:bg-red-600"
        >
          🏠 홈으로
        </button>
      </div>
    </div>
  );
}
