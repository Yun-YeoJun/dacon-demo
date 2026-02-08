import { Search } from 'lucide-react';
import { useState } from 'react';

interface ForgeryCheckProps {
  onNavigate: (page: 'home' | 'messages' | 'analysis' | 'safeanalysis' | 'forgery' | 'mypage' | 
    'dmselect' | 'facebook' | 'instagram' | 'search' | 'notification') => void;
}

export function ForgeryCheck({ onNavigate }: ForgeryCheckProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // 문자 탐지에서 저장된 번호들
  const phoneNumbers = [
    { phone: '010-5678-1234', sender: '삼성페이', message: '결제 승인', isPhishing: false, reportCount: 0 },
    { phone: '010-1234-5678', sender: '국세청', message: '세금 환급 안내', isPhishing: true, reportCount: 127 },
    { phone: '010-9999-8888', sender: '택배', message: '배송 완료', isPhishing: false, reportCount: 0 },
    { phone: '010-7777-6666', sender: '경찰청', message: '사기 주의 안내', isPhishing: true, reportCount: 89 },
    { phone: '010-5555-6666', sender: '은행', message: '계좌 이체 완료', isPhishing: false, reportCount: 0 },
  ];

  const filteredNumbers = searchQuery
    ? phoneNumbers.filter((item) =>
        item.phone.includes(searchQuery) ||
        item.sender.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : phoneNumbers;

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

      {/* 제목 */}
      <div className="px-4 mb-6">
        <h2 className="text-2xl font-bold mb-1">전화번호 검색 📞</h2>
        <p className="text-sm text-gray-500">문자 탐지에서 저장된 번호를 검색합니다</p>
      </div>

      {/* 검색 입력 */}
      <div className="px-4 mb-6">
        <div className="relative">
          <input 
            type="tel" 
            placeholder="010-0000-0000"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-4 pr-12 bg-gray-100 rounded-2xl text-base border-none outline-none"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
            <Search className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* 검색 결과 */}
      <div className="px-4 mb-6">
        <h3 className="text-lg font-bold mb-3">
          {searchQuery ? `검색 결과 (${filteredNumbers.length})` : '전체 번호 내역'}
        </h3>
        
        {filteredNumbers.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <div className="text-4xl mb-3">🔍</div>
            <div className="text-base">검색 결과가 없습니다</div>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredNumbers.map((item, index) => (
              <div
                key={index}
                className={`${
                  item.isPhishing ? 'bg-red-50' : 'bg-green-50'
                } rounded-2xl p-4 flex items-center gap-4`}
              >
                <div
                  className={`w-14 h-14 ${
                    item.isPhishing ? 'bg-red-500' : 'bg-green-500'
                  } rounded-full flex items-center justify-center flex-shrink-0`}
                >
                  <span className="text-white text-2xl">{item.isPhishing ? '✗' : '✓'}</span>
                </div>
                <div className="flex-1">
                  <div className="text-base font-bold mb-1">{item.phone}</div>
                  <div className="text-sm text-gray-600 mb-1">{item.sender} - {item.message}</div>
                  {item.isPhishing ? (
                    <div className="text-xs text-red-600 font-semibold">
                      ⚠️ 스팸 신고 {item.reportCount}건
                    </div>
                  ) : (
                    <div className="text-xs text-green-600">안전한 번호입니다</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}