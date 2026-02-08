import { useState } from 'react';
import { Home } from './components/Home';
import { MessageList } from './components/MessageList';
import { AnalysisResult } from './components/AnalysisResult';
import { SafeAnalysisResult } from './components/SafeAnalysisResult';
import { ForgeryCheck } from './components/ForgeryCheck';
import { MyPage } from './components/MyPage';
import { DMSelect } from './components/DMSelect';
import { FacebookMessages } from './components/FacebookMessages';
import { InstagramMessages } from './components/InstagramMessages';
import { KakaoMessages } from './components/KakaoMessages';
import { AnalysisHistory } from './components/AnalysisHistory';
import { analyzeText, getMessage, saveAnalysis } from './lib/api';
import { Search } from './components/Search';
import { Notification } from './components/Notification';

export default function App() {
  const [currentPage, setCurrentPage] = useState<
    'home' | 'messages' | 'analysis' | 'safeanalysis' | 'forgery' | 'mypage' |
    'dmselect' | 'facebook' | 'instagram' | 'search' | 'notification' | 'historydetail'
  >('home');
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);
  const [analysisPayload, setAnalysisPayload] = useState<any | null>(null);
  const [analysisId, setAnalysisId] = useState<string | null>(null);
  const [unreadNotifications, setUnreadNotifications] = useState(3);

  
async function runAnalysisForMessage(messageId: string) {
  setSelectedMessageId(messageId);
  setAnalysisPayload(null);
  setAnalysisId(null);
  try {
    const msg = await getMessage(messageId);
    const res = await analyzeText(msg.content);
    setAnalysisPayload(res.result);
    // 저장(사용자 기기별)
    const saved = await saveAnalysis(messageId, res.result);
    setAnalysisId(saved.analysisId);
    // label에 따라 화면 분기
    if (res.result.label === "스미싱") setCurrentPage("analysis");
    else setCurrentPage("safeanalysis");
  } catch (e) {
    // 실패하면 분석 화면으로 보내고, 내부에서 에러 문구 표시(기존 컴포넌트가 정적이면 콘솔로)
    console.error(e);
    setCurrentPage("analysis");
  }
}

function openHistoryDetail(id: string) {
  setAnalysisId(id);
  setCurrentPage("historydetail");
}

return (
    <div className="size-full flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md h-full bg-white relative">
        {/* 페이지 컨텐츠 */}
        <div className="h-full">
          {currentPage === 'home' && <Home onNavigate={setCurrentPage} />}
          {currentPage === 'messages' && <MessageList onNavigate={setCurrentPage} onAnalyze={runAnalysisForMessage} />}
          {currentPage === 'analysis' && <AnalysisResult onNavigate={setCurrentPage} analysisPayload={analysisPayload} />}
          {currentPage === 'safeanalysis' && <SafeAnalysisResult onNavigate={setCurrentPage} analysisPayload={analysisPayload} />}
          {currentPage === 'forgery' && <ForgeryCheck onNavigate={setCurrentPage} />}
          {currentPage === 'mypage' && <MyPage onNavigate={setCurrentPage} />}
          {currentPage === 'dmselect' && <DMSelect onNavigate={setCurrentPage} />}
          {currentPage === 'facebook' && <FacebookMessages onNavigate={setCurrentPage} onAnalyze={runAnalysisForMessage} />}
          {currentPage === 'instagram' && <InstagramMessages onNavigate={setCurrentPage} onAnalyze={runAnalysisForMessage} />}
          {currentPage === 'search' && <Search onNavigate={setCurrentPage} />}
          {currentPage === 'notification' && <Notification onNavigate={setCurrentPage} unreadCount={unreadNotifications} setUnreadCount={setUnreadNotifications} />}
        </div>
        
        {/* 하단 네비게이션 바 */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-white border-t border-gray-200">
          <div className="flex justify-around items-center h-14">
            <button className="flex flex-col items-center gap-1" onClick={() => setCurrentPage('home')}>
              <div className={`w-6 h-6 ${currentPage === 'home' ? 'text-blue-500' : 'text-gray-400'}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                </svg>
              </div>
            </button>
            <button className="flex flex-col items-center gap-1" onClick={() => setCurrentPage('search')}>
              <div className={`w-6 h-6 ${currentPage === 'search' ? 'text-blue-500' : 'text-gray-400'}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </div>
            </button>
            <button className="flex flex-col items-center gap-1 relative" onClick={() => setCurrentPage('notification')}>
              <div className={`w-6 h-6 ${currentPage === 'notification' ? 'text-blue-500' : 'text-gray-400'}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
              </div>
              {unreadNotifications > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{unreadNotifications}</span>
                </div>
              )}
            </button>
          </div>
          <div className="h-6 bg-white" />
        </div>
      </div>
    </div>
  );
}