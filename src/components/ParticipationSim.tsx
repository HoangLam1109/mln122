import React, { useState } from "react";
import { Building2, Users, Vote, RefreshCw, Landmark, ArrowRightLeft, ArrowDown, ChevronRight, CheckCircle2, ShieldAlert } from "lucide-react";

export default function ParticipationSim() {
  const [activeTab, setActiveTab] = useState<"diagram" | "mechanisms" | "implications">("diagram");
  const [selectedAspect, setSelectedAspect] = useState<string>("all");
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const controlAspects = [
    {
      id: "strategy",
      title: "Chiến lược kinh doanh",
      desc: "Định hướng thị trường dài hạn, phân khúc cạnh tranh và quy mô mở rộng.",
      color: "border-coral text-coral bg-coral/10",
    },
    {
      id: "investment",
      title: "Định hướng đầu tư",
      desc: "Quyết định dòng vốn R&D, thâu tóm thương hiệu con và đầu tư công nghệ mới.",
      color: "border-honey text-honey bg-honey/10",
    },
    {
      id: "profits",
      title: "Phân phối lợi nhuận",
      desc: "Tỷ lệ chi trả cổ tức và chương trình mua lại cổ phiếu để tối đa hóa giá trị cổ đông.",
      color: "border-teal-accent text-teal-accent bg-teal-accent/10",
    },
    {
      id: "leadership",
      title: "Bổ nhiệm lãnh đạo",
      desc: "Bầu chọn các thành viên Hội đồng quản trị và phê duyệt các nhân sự điều hành chủ chốt.",
      color: "border-blue-500 text-blue-500 bg-blue-500/10",
    },
  ];

  return (
    <div id="participation-sim-section" className="bg-white rounded-2xl border border-zinc-200/80 p-6 md:p-8 space-y-8 shadow-xs">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-honey font-mono text-xs uppercase tracking-widest mb-2">
          <Landmark className="w-4 h-4 text-honey" />
          Phân tích chuyên sâu • Biểu hiện mới của độc quyền
        </div>
        <h3 className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-navy">
          Chế độ Tham dự: Tư bản tài chính chi phối Coca-Cola và Pepsi
        </h3>
        <p className="text-zinc-600 text-sm mt-1 max-w-3xl">
          Trường hợp The Coca-Cola Company và PepsiCo là ví dụ rõ ràng cho biểu hiện mới của tư bản tài chính ngày nay, minh chứng cho sự dung hợp quyền lực và sự thống trị của các định chế quản lý quỹ lớn.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-zinc-200">
        <button
          onClick={() => setActiveTab("diagram")}
          className={`px-4 py-2.5 text-xs font-mono font-medium border-b-2 transition-all ${
            activeTab === "diagram"
              ? "border-coral text-navy font-semibold"
              : "border-transparent text-zinc-400 hover:text-navy"
          }`}
        >
          SƠ ĐỒ CHI PHỐI TRỰC QUAN
        </button>
        <button
          onClick={() => setActiveTab("mechanisms")}
          className={`px-4 py-2.5 text-xs font-mono font-medium border-b-2 transition-all ${
            activeTab === "mechanisms"
              ? "border-coral text-navy font-semibold"
              : "border-transparent text-zinc-400 hover:text-navy"
          }`}
        >
          CƠ CHẾ KIỂM SOÁT (4 KÊNH)
        </button>
        <button
          onClick={() => setActiveTab("implications")}
          className={`px-4 py-2.5 text-xs font-mono font-medium border-b-2 transition-all ${
            activeTab === "implications"
              ? "border-coral text-navy font-semibold"
              : "border-transparent text-zinc-400 hover:text-navy"
          }`}
        >
          CHẾ ĐỘ ỦY NHIỆM & CẠNH TRANH
        </button>
      </div>

      {/* Content Area */}
      {activeTab === "diagram" && (
        <div className="space-y-6">
          {/* Dynamic Styles for Bowtie Animation */}
          <style>{`
            @keyframes flow-golden {
              from { stroke-dashoffset: 24; }
              to { stroke-dashoffset: 0; }
            }
            @keyframes flow-coral {
              from { stroke-dashoffset: 24; }
              to { stroke-dashoffset: 0; }
            }
            @keyframes flow-teal {
              from { stroke-dashoffset: 24; }
              to { stroke-dashoffset: 0; }
            }
            .path-golden {
              stroke-dasharray: 8 4;
              animation: flow-golden 1.5s linear infinite;
            }
            .path-coral {
              stroke-dasharray: 8 4;
              animation: flow-coral 1.5s linear infinite;
            }
            .path-teal {
              stroke-dasharray: 8 4;
              animation: flow-teal 1.5s linear infinite;
            }
          `}</style>

          <div className="bg-ivory-dark/30 p-6 rounded-2xl border border-zinc-200/60 shadow-xs">
            {/* Diagram Title */}
            <div className="text-center mb-6">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest bg-zinc-100 px-2.5 py-1 rounded-full border border-zinc-200/55">
                Sơ đồ nơ liên kết • Bowtie Diagram
              </span>
              <h4 className="text-lg font-bold text-navy mt-2">
                Sơ đồ hình Nơ (Bowtie) về kiểm soát tài chính & sở hữu trùng lặp
              </h4>
              <p className="text-xs text-zinc-500 mt-1 max-w-2xl mx-auto">
                Rê chuột vào các nhóm quỹ hoặc thương hiệu để xem dòng chảy kiểm soát tích tụ tại nút thắt trung tâm rồi phân rã về các cực cạnh tranh.
              </p>
            </div>

            {/* Unified Responsive Vertical Bowtie Diagram */}
            <div className="relative w-full aspect-[1000/740] md:aspect-[1000/680] min-h-[580px] md:min-h-[680px] overflow-hidden select-none">
              
              {/* Background SVG Connectors & Bowtie Wings */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 680" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                <defs>
                  {/* Top Wing Area Fill (Amber) */}
                  <linearGradient id="top-wing-area" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#D97706" stopOpacity="0.015" />
                    <stop offset="100%" stopColor="#D97706" stopOpacity="0.1" />
                  </linearGradient>
                  {/* Bottom Wing Area Fill (Teal/Red-Blue Gradient) */}
                  <linearGradient id="bottom-wing-area" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#0D9488" stopOpacity="0.08" />
                    <stop offset="50%" stopColor="#EF4444" stopOpacity="0.05" />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.015" />
                  </linearGradient>
                </defs>

                {/* Connection Lines from Top Wing to Center Knot */}
                {/* 1. Vanguard to Center */}
                <path 
                  d="M 170 160 C 170 200, 430 200, 430 238" 
                  fill="none" 
                  stroke={hoveredNode === 'vanguard' ? '#D97706' : (hoveredNode === 'knot' || hoveredNode === 'coca' || hoveredNode === 'pepsi') ? '#D97706' : hoveredNode ? '#F4F4F5' : '#D97706'} 
                  strokeWidth={hoveredNode === 'vanguard' ? '4.5' : (hoveredNode === 'knot' || hoveredNode === 'coca' || hoveredNode === 'pepsi') ? '3' : '2'} 
                  strokeOpacity={hoveredNode === 'vanguard' || hoveredNode === 'knot' || hoveredNode === 'coca' || hoveredNode === 'pepsi' ? 1 : hoveredNode ? 0.15 : 0.55} 
                  className={(!hoveredNode || hoveredNode === 'vanguard' || hoveredNode === 'knot' || hoveredNode === 'coca' || hoveredNode === 'pepsi') ? 'path-golden' : ''} 
                  style={{ transition: 'all 0.3s' }}
                />

                {/* 2. BlackRock to Center */}
                <path 
                  d="M 500 160 L 500 238" 
                  fill="none" 
                  stroke={hoveredNode === 'blackrock' ? '#EA580C' : (hoveredNode === 'knot' || hoveredNode === 'coca' || hoveredNode === 'pepsi') ? '#EA580C' : hoveredNode ? '#F4F4F5' : '#EA580C'} 
                  strokeWidth={hoveredNode === 'blackrock' ? '4.5' : (hoveredNode === 'knot' || hoveredNode === 'coca' || hoveredNode === 'pepsi') ? '3' : '2'} 
                  strokeOpacity={hoveredNode === 'blackrock' || hoveredNode === 'knot' || hoveredNode === 'coca' || hoveredNode === 'pepsi' ? 1 : hoveredNode ? 0.15 : 0.55} 
                  className={(!hoveredNode || hoveredNode === 'blackrock' || hoveredNode === 'knot' || hoveredNode === 'coca' || hoveredNode === 'pepsi') ? 'path-coral' : ''} 
                  style={{ transition: 'all 0.3s' }}
                />

                {/* 3. Shareholders to Center */}
                <path 
                  d="M 830 160 C 830 200, 570 200, 570 238" 
                  fill="none" 
                  stroke={hoveredNode === 'proxy' ? '#0D9488' : (hoveredNode === 'knot' || hoveredNode === 'coca' || hoveredNode === 'pepsi') ? '#0D9488' : hoveredNode ? '#F4F4F5' : '#0D9488'} 
                  strokeWidth={hoveredNode === 'proxy' ? '4.5' : (hoveredNode === 'knot' || hoveredNode === 'coca' || hoveredNode === 'pepsi') ? '3' : '2'} 
                  strokeOpacity={hoveredNode === 'proxy' || hoveredNode === 'knot' || hoveredNode === 'coca' || hoveredNode === 'pepsi' ? 1 : hoveredNode ? 0.15 : 0.55} 
                  className={(!hoveredNode || hoveredNode === 'proxy' || hoveredNode === 'knot' || hoveredNode === 'coca' || hoveredNode === 'pepsi') ? 'path-teal' : ''} 
                  style={{ transition: 'all 0.3s' }}
                />

                {/* Connection Lines from Center Knot to Bottom Wing */}
                {/* 4. Center to Coca-Cola */}
                <path 
                  d="M 440 428 C 440 460, 270 460, 270 490" 
                  fill="none" 
                  stroke={hoveredNode === 'coca' ? '#DC2626' : (hoveredNode === 'vanguard' || hoveredNode === 'blackrock' || hoveredNode === 'proxy' || hoveredNode === 'knot') ? '#DC2626' : hoveredNode ? '#F4F4F5' : '#DC2626'} 
                  strokeWidth={hoveredNode === 'coca' ? '4.5' : (hoveredNode === 'vanguard' || hoveredNode === 'blackrock' || hoveredNode === 'proxy' || hoveredNode === 'knot') ? '3' : '2'} 
                  strokeOpacity={hoveredNode === 'coca' || hoveredNode === 'vanguard' || hoveredNode === 'blackrock' || hoveredNode === 'proxy' || hoveredNode === 'knot' ? 1 : hoveredNode ? 0.15 : 0.55} 
                  className={(!hoveredNode || hoveredNode === 'coca' || hoveredNode === 'vanguard' || hoveredNode === 'blackrock' || hoveredNode === 'proxy' || hoveredNode === 'knot') ? 'path-coral' : ''} 
                  style={{ transition: 'all 0.3s' }}
                />

                {/* 5. Center to PepsiCo */}
                <path 
                  d="M 560 428 C 560 460, 730 460, 730 490" 
                  fill="none" 
                  stroke={hoveredNode === 'pepsi' ? '#2563EB' : (hoveredNode === 'vanguard' || hoveredNode === 'blackrock' || hoveredNode === 'proxy' || hoveredNode === 'knot') ? '#2563EB' : hoveredNode ? '#F4F4F5' : '#2563EB'} 
                  strokeWidth={hoveredNode === 'pepsi' ? '4.5' : (hoveredNode === 'vanguard' || hoveredNode === 'blackrock' || hoveredNode === 'proxy' || hoveredNode === 'knot') ? '3' : '2'} 
                  strokeOpacity={hoveredNode === 'pepsi' || hoveredNode === 'vanguard' || hoveredNode === 'blackrock' || hoveredNode === 'proxy' || hoveredNode === 'knot' ? 1 : hoveredNode ? 0.15 : 0.55} 
                  className={(!hoveredNode || hoveredNode === 'pepsi' || hoveredNode === 'vanguard' || hoveredNode === 'blackrock' || hoveredNode === 'proxy' || hoveredNode === 'knot') ? 'path-teal' : ''} 
                  style={{ transition: 'all 0.3s' }}
                />
              </svg>

              {/* Top Row: Inputs (Y = 2%) */}
              <div className="absolute left-[2%] w-[30%] top-[2%] h-[21%] z-10 flex flex-col justify-center">
                <div 
                  onMouseEnter={() => setHoveredNode('vanguard')}
                  onMouseLeave={() => setHoveredNode(null)}
                  className={`p-2 md:p-3 bg-white border rounded-xl transition-all duration-300 shadow-xs cursor-pointer h-full flex flex-col justify-between ${
                    hoveredNode === 'vanguard' 
                      ? 'border-honey ring-2 ring-honey/20 scale-[1.02]' 
                      : 'border-zinc-200 hover:border-honey'
                  }`}
                >
                  <div className="flex items-center gap-1.5 md:gap-2.5">
                    <div className="w-6 h-6 md:w-8 h-8 rounded bg-amber-50 flex items-center justify-center border border-amber-100 flex-shrink-0">
                      <Landmark className="w-3.5 h-3.5 text-honey" />
                    </div>
                    <div className="min-w-0">
                      <h5 className="font-bold text-[9px] md:text-xs text-navy leading-tight truncate">Vanguard Group</h5>
                      <p className="text-[7.5px] md:text-[9.5px] text-zinc-500 truncate">Tài sản ~8k tỷ USD</p>
                    </div>
                  </div>
                  <div className="mt-1 pt-1 border-t border-zinc-100 flex justify-between text-[7px] md:text-[9.5px] text-zinc-500 font-mono">
                    <span>Coca-Cola: ~8.5%</span>
                    <span>PepsiCo: ~9.2%</span>
                  </div>
                </div>
              </div>

              <div className="absolute left-[35%] w-[30%] top-[2%] h-[21%] z-10 flex flex-col justify-center">
                <div 
                  onMouseEnter={() => setHoveredNode('blackrock')}
                  onMouseLeave={() => setHoveredNode(null)}
                  className={`p-2 md:p-3 bg-white border rounded-xl transition-all duration-300 shadow-xs cursor-pointer h-full flex flex-col justify-between ${
                    hoveredNode === 'blackrock' 
                      ? 'border-coral ring-2 ring-coral/20 scale-[1.02]' 
                      : 'border-zinc-200 hover:border-coral'
                  }`}
                >
                  <div className="flex items-center gap-1.5 md:gap-2.5">
                    <div className="w-6 h-6 md:w-8 h-8 rounded bg-orange-50 flex items-center justify-center border border-orange-100 flex-shrink-0">
                      <Landmark className="w-3.5 h-3.5 text-coral" />
                    </div>
                    <div className="min-w-0">
                      <h5 className="font-bold text-[9px] md:text-xs text-navy leading-tight truncate">BlackRock, Inc.</h5>
                      <p className="text-[7.5px] md:text-[9.5px] text-zinc-500 truncate">Tài sản ~10k tỷ USD</p>
                    </div>
                  </div>
                  <div className="mt-1 pt-1 border-t border-zinc-100 flex justify-between text-[7px] md:text-[9.5px] text-zinc-500 font-mono">
                    <span>Coca-Cola: ~7.1%</span>
                    <span>PepsiCo: ~7.8%</span>
                  </div>
                </div>
              </div>

              <div className="absolute left-[68%] w-[30%] top-[2%] h-[21%] z-10 flex flex-col justify-center">
                <div 
                  onMouseEnter={() => setHoveredNode('proxy')}
                  onMouseLeave={() => setHoveredNode(null)}
                  className={`p-2 md:p-3 bg-zinc-50/90 border border-dashed rounded-xl transition-all duration-300 shadow-xs cursor-pointer h-full flex flex-col justify-between text-center ${
                    hoveredNode === 'proxy' 
                      ? 'border-teal-accent bg-white ring-2 ring-teal-accent/20 scale-[1.02]' 
                      : 'border-zinc-200 hover:border-teal-accent/50'
                  }`}
                >
                  <div className="flex items-center justify-center gap-1 md:gap-1.5 text-zinc-700 text-[9px] md:text-xs font-semibold">
                    <Users className="w-3.5 h-3.5 text-teal-accent flex-shrink-0" />
                    <span className="truncate">Cổ đông nhỏ lẻ</span>
                  </div>
                  <p className="text-[7px] md:text-[9px] text-zinc-500 leading-normal px-1 mt-0.5 line-clamp-3">
                    Hàng triệu cá nhân ủy quyền biểu quyết thông qua <strong>Chế độ ủy nhiệm</strong> (Proxy voting).
                  </p>
                </div>
              </div>

              {/* Middle Section: Central Knot (Y = 35% to 63%) */}
              <div className="absolute left-[36%] w-[28%] top-[35%] h-[28%] z-20 flex flex-col justify-center">
                <div 
                  onMouseEnter={() => setHoveredNode('knot')}
                  onMouseLeave={() => setHoveredNode(null)}
                  className={`p-2.5 md:p-3.5 bg-white border rounded-xl text-center flex flex-col justify-between shadow-md transition-all duration-300 cursor-pointer h-full ${
                    hoveredNode === 'knot' 
                      ? 'border-honey ring-4 ring-honey/10 scale-[1.03]' 
                      : 'border-zinc-300/90'
                  }`}
                >
                  <div>
                    <span className="text-[7.5px] md:text-[8.5px] font-mono text-honey font-bold uppercase tracking-wider block">
                      NÚT THẮT HÌNH NƠ (KNOT)
                    </span>
                    <div className="w-6 h-6 md:w-8 h-8 rounded-full bg-honey/15 flex items-center justify-center mx-auto border border-honey/30 my-0.5 md:my-1">
                      <Vote className="w-3 md:w-4 h-3 md:h-4 text-honey" />
                    </div>
                    <h6 className="text-[9px] md:text-xs font-bold text-navy leading-tight">Biểu quyết tập trung</h6>
                    <span className="text-[7px] md:text-[8px] text-zinc-400 font-mono block">CƠ CHẾ THAM DỰ</span>
                  </div>
                  
                  <p className="text-[7px] md:text-[9px] text-zinc-500 leading-normal max-w-[180px] mx-auto hidden md:block">
                    Tập trung dòng vốn gián tiếp đưa ra nghị quyết kiểm soát cả hai thương hiệu.
                  </p>
                  
                  {/* Aspect badges inside knot */}
                  <div className="grid grid-cols-2 gap-1 pt-1 border-t border-zinc-100">
                    <span className="text-[6.5px] md:text-[8px] bg-amber-50 text-amber-700 px-1 py-0.5 rounded border border-amber-100 truncate">Chiến lược</span>
                    <span className="text-[6.5px] md:text-[8px] bg-orange-50 text-orange-700 px-1 py-0.5 rounded border border-orange-100 truncate">Đầu tư</span>
                    <span className="text-[6.5px] md:text-[8px] bg-teal-50 text-teal-700 px-1 py-0.5 rounded border border-teal-100 truncate">Lợi nhuận</span>
                    <span className="text-[6.5px] md:text-[8px] bg-blue-50 text-blue-700 px-1 py-0.5 rounded border border-blue-100 truncate">Lãnh đạo</span>
                  </div>
                </div>
              </div>

              {/* Bottom Row: Outputs (Y = 72% to 96%) */}
              <div className="absolute left-[4%] w-[44%] top-[72%] h-[24%] z-10 flex flex-col justify-center">
                <div 
                  onMouseEnter={() => setHoveredNode('coca')}
                  onMouseLeave={() => setHoveredNode(null)}
                  className={`p-2.5 md:p-3.5 bg-white border rounded-xl transition-all duration-300 shadow-xs cursor-pointer h-full flex flex-col justify-between ${
                    hoveredNode === 'coca' 
                      ? 'border-red-500 ring-2 ring-red-500/10 scale-[1.01]' 
                      : 'border-zinc-200 hover:border-red-400'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span className="text-[7px] md:text-[8px] font-mono px-1.5 py-0.5 rounded bg-red-50 text-red-600 border border-red-100 font-bold uppercase">
                      COCA-COLA
                    </span>
                    <span className="text-[7px] md:text-[8.5px] text-zinc-400 font-mono">~15.6% sở hữu kép</span>
                  </div>
                  <div>
                    <h5 className="font-bold text-[10px] md:text-xs text-navy">The Coca-Cola Company</h5>
                    <p className="text-[7.5px] md:text-[9.5px] text-zinc-500 mt-0.5 leading-normal line-clamp-3">
                      Lao động sản xuất tạo ra thặng dư lớn. Phục vụ nhu cầu lợi nhuận của cùng nhóm cổ đông tài chính.
                    </p>
                  </div>
                  <div className="mt-1 bg-red-50/50 p-1 rounded border border-red-100 text-[7px] md:text-[8.5px] text-zinc-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-red-500 flex-shrink-0" />
                    <span className="truncate">HĐQT thông qua phê duyệt chiến lược dài hạn</span>
                  </div>
                </div>
              </div>

              <div className="absolute left-[52%] w-[44%] top-[72%] h-[24%] z-10 flex flex-col justify-center">
                <div 
                  onMouseEnter={() => setHoveredNode('pepsi')}
                  onMouseLeave={() => setHoveredNode(null)}
                  className={`p-2.5 md:p-3.5 bg-white border rounded-xl transition-all duration-300 shadow-xs cursor-pointer h-full flex flex-col justify-between ${
                    hoveredNode === 'pepsi' 
                      ? 'border-blue-500 ring-2 ring-blue-500/10 scale-[1.01]' 
                      : 'border-zinc-200 hover:border-blue-400'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span className="text-[7px] md:text-[8px] font-mono px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-100 font-bold uppercase">
                      PEPSICO
                    </span>
                    <span className="text-[7px] md:text-[8.5px] text-zinc-400 font-mono">~17.0% sở hữu kép</span>
                  </div>
                  <div>
                    <h5 className="font-bold text-[10px] md:text-xs text-navy">PepsiCo, Inc.</h5>
                    <p className="text-[7.5px] md:text-[9.5px] text-zinc-500 mt-0.5 leading-normal line-clamp-3">
                      Thống trị đồ ăn nhẹ & nước uống. Tránh chiến tranh giá cả cực đoan để tối ưu hóa giá trị cổ đông.
                    </p>
                  </div>
                  <div className="mt-1 bg-blue-50/50 p-1 rounded border border-blue-100 text-[7px] md:text-[8.5px] text-zinc-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-blue-500 flex-shrink-0" />
                    <span className="truncate">Lợi ích trùng lặp triệt tiêu xung đột giá cả cực đoan</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Connective Conclusion Banner */}
            <div className="mt-6 bg-white p-4 rounded-xl border border-zinc-200 shadow-xs flex items-start gap-3">
              <RefreshCw className="w-5 h-5 text-honey mt-0.5 flex-shrink-0" />
              <div>
                <h6 className="text-xs font-bold text-navy uppercase tracking-wider">
                  Bản chất vận hành dưới Chế độ Tham dự hiện đại:
                </h6>
                <p className="text-[11.5px] text-zinc-600 leading-relaxed mt-1">
                  Mặc dù Coca-Cola và Pepsi vẫn đối đầu nảy lửa trên thị trường, nhưng đằng sau sự cạnh tranh đó, dòng tiền và lợi tức rốt cuộc vẫn đổ về túi của cùng các nhóm tư bản tài chính lớn. Họ <strong>không cần nắm giữ 100%</strong> vốn mà chỉ cần tỉ lệ cổ phần khống chế để thiết lập luật chơi mang lại lợi nhuận cao nhất cho cổ đông tài chính.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "mechanisms" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {controlAspects.map((aspect) => (
              <div
                key={aspect.id}
                onClick={() => setSelectedAspect(aspect.id)}
                className={`p-5 rounded-xl border transition-all cursor-pointer shadow-xs ${
                  selectedAspect === aspect.id || selectedAspect === "all"
                    ? `bg-white border-zinc-300 shadow-sm`
                    : "bg-zinc-50 border-zinc-200 opacity-60"
                }`}
              >
                <div className="flex justify-between items-start">
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${aspect.color}`}>
                    CÔNG CỤ CHI PHỐI
                  </span>
                  <ChevronRight className="w-4 h-4 text-zinc-400" />
                </div>
                <h4 className="text-sm font-semibold text-navy mt-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-honey"></span>
                  {aspect.title}
                </h4>
                <p className="text-zinc-600 text-xs leading-relaxed mt-2">
                  {aspect.desc}
                </p>
                <div className="mt-3 pt-3 border-t border-zinc-100 text-[11px] text-zinc-500 italic">
                  * Biểu hiện tại Coca & Pepsi: Đảm bảo các chiến lược cạnh tranh không làm tổn hại đến lợi nhuận ròng toàn cục của cả hai.
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button
              onClick={() => setSelectedAspect("all")}
              className="text-xs font-mono text-zinc-500 hover:text-navy transition-all underline cursor-pointer"
            >
              Hiển thị đầy đủ các kênh kiểm soát
            </button>
          </div>
        </div>
      )}

      {activeTab === "implications" && (
        <div className="space-y-6 bg-ivory-dark/30 p-6 rounded-2xl border border-zinc-200/60 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Chế độ ủy nhiệm */}
            <div className="space-y-3">
              <h4 className="font-bold text-navy text-sm flex items-center gap-2 border-b border-zinc-200 pb-2">
                <Users className="w-4 h-4 text-coral" />
                Chế độ ủy nhiệm (Proxy Voting System)
              </h4>
              <p className="text-zinc-600 text-xs leading-relaxed">
                Trong nền kinh tế hiện đại, cổ phiếu được phát hành rộng rãi với mệnh giá rất nhỏ, dẫn đến số lượng cổ đông cá nhân nhỏ lẻ tăng đột biến. Tuy nhiên, tuyệt đại đa số các cổ đông này:
              </p>
              <ul className="space-y-2 text-zinc-600 text-xs list-disc pl-4">
                <li>Không có đủ kiến thức chuyên môn để tự bỏ phiếu.</li>
                <li>Sở hữu số lượng quá nhỏ để có tiếng nói thực tế.</li>
                <li><strong>Ủy quyền biểu quyết</strong> cho các quỹ đầu tư lớn (Vanguard, BlackRock) đứng ra quản lý danh mục.</li>
              </ul>
              <div className="bg-white p-3 rounded-lg border border-zinc-200 shadow-xs text-[10.5px] text-zinc-500 leading-normal">
                Hệ quả: Các quỹ khổng lồ tự động tập hợp tiếng nói của hàng triệu người, tập trung quyền lực kinh tế cực đại vào tay một nhóm nhỏ các nhà đầu sỏ tài chính.
              </div>
            </div>

            {/* Bản chất cạnh tranh độc quyền */}
            <div className="space-y-3">
              <h4 className="font-bold text-navy text-sm flex items-center gap-2 border-b border-zinc-200 pb-2">
                <ArrowRightLeft className="w-4 h-4 text-teal-accent" />
                Bản chất cạnh tranh độc quyền hiện đại
              </h4>
              <p className="text-zinc-600 text-xs leading-relaxed">
                Sự hiện diện của cùng một nhóm cổ đông lớn tại Coca-Cola và Pepsi không có nghĩa là sự cạnh tranh giữa hai hãng nước ngọt biến mất hoàn toàn:
              </p>
              <ul className="space-y-2 text-zinc-600 text-xs list-disc pl-4">
                <li>Hai doanh nghiệp vẫn tung ra các chiến dịch tiếp thị gay gắt nhằm thu hút người tiêu dùng.</li>
                <li>Họ vẫn nỗ lực cải tiến hương vị, tối ưu hóa chuỗi cung ứng sản phẩm thực tế.</li>
                <li>Tuy nhiên, <strong>mục tiêu cuối cùng</strong> của cuộc cạnh tranh này bị khống chế: phải luôn đảm bảo lợi ích tối đa và sự tăng trưởng ổn định cho các cổ đông tài chính chung.</li>
              </ul>
              <div className="bg-white p-3 rounded-lg border border-zinc-200 shadow-xs text-[10.5px] text-zinc-500 leading-normal">
                Như vậy, độc quyền tài chính không tiêu diệt cạnh tranh tự do một cách tuyệt đối, mà biến cạnh tranh thành công cụ phục vụ lợi ích của giới đầu sỏ tài chính.
              </div>
            </div>
          </div>

          <div className="p-4 bg-white border border-zinc-200 rounded-xl flex items-center gap-3 shadow-xs">
            <ShieldAlert className="w-5 h-5 text-honey flex-shrink-0" />
            <p className="text-[11px] text-zinc-600 leading-relaxed">
              <strong>Kết luận học thuật:</strong> Chế độ tham dự và chế độ ủy nhiệm hiện đại chính là biểu hiện rõ nét của sự phát triển chủ nghĩa tư bản tài chính lên nấc thang mới. Nó chứng minh quyền lực thực tế nằm ở quyền kiểm soát dòng vốn và dữ liệu thị trường chứ không đơn thuần chỉ là sở hữu pháp lý thô sơ.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
