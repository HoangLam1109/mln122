import React, { useState } from "react";
import { Share2, ArrowRightLeft, ShieldAlert, Award, TrendingUp, HelpCircle } from "lucide-react";
import { CorporateDataMap, Company } from "../types";
import { corporateData } from "../data/corporateData";

interface CorporateMapProps {
  onAskGemini: (prompt: string) => void;
}

export default function CorporateMap({ onAskGemini }: CorporateMapProps) {
  const [data] = useState<CorporateDataMap>(corporateData);
  const [selectedIndustry, setSelectedIndustry] = useState<string>("beverage");
  const [activeShareholder, setActiveShareholder] = useState<string | null>(null);

  const currentGroup = data[selectedIndustry];
  const companyA = currentGroup.companies[0];
  const companyB = currentGroup.companies[1];

  const getOverlapShareholders = (c1: Company, c2: Company) => {
    const list1 = c1.shares.map(s => s.shareholder);
    const list2 = c2.shares.map(s => s.shareholder);
    return list1.filter(s => list2.includes(s));
  };

  const overlap = getOverlapShareholders(companyA, companyB);
  const institutionalGiants = ["The Vanguard Group", "BlackRock, Inc.", "State Street Corporation"];

  const triggerAnalysis = () => {
    const query = `Hãy phân tích sâu cơ cấu sở hữu trùng lặp giữa hai công ty ${companyA.name} và ${companyB.name} trong ngành ${currentGroup.title}. Tại sao hiện tượng sở hữu chéo song hành (Common Ownership) của các định chế như BlackRock và Vanguard lại thay đổi bản chất cạnh tranh thị trường theo lý luận kinh tế chính trị?`;
    onAskGemini(query);
  };

  return (
    <div id="corporate-map-section" className="bg-white rounded-2xl border border-zinc-200/80 p-6 md:p-8 space-y-8 shadow-xs">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-coral font-mono text-xs uppercase tracking-widest mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-coral animate-pulse"></span>
            Bức tranh Thực tế
          </div>
          <h3 className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-navy">
            Kịch bản Dàn dựng hay Cạnh tranh?
          </h3>
          <p className="text-zinc-600 text-sm mt-1 max-w-2xl">
            Bề ngoài các thương hiệu đối đầu khốc liệt, nhưng bên trong họ có chung những ông chủ khổng lồ nắm giữ quyền biểu quyết chi phối.
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5 bg-ivory-dark/50 p-1 rounded-xl border border-zinc-200/80 self-start md:self-end">
          {(Object.entries(data) as [string, typeof currentGroup][]).map(([key, group]) => (
            <button
              key={key}
              onClick={() => setSelectedIndustry(key)}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all duration-300 ${
                selectedIndustry === key
                  ? "bg-white text-navy shadow-xs font-semibold border border-zinc-200"
                  : "text-zinc-500 hover:text-navy"
              }`}
            >
              {group.title.split(" (")[0]}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-ivory-dark/30 rounded-xl p-5 border border-zinc-200/50 flex flex-col justify-between shadow-xs">
              <div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white text-zinc-500 font-mono uppercase border border-zinc-200">
                  Thương hiệu A
                </span>
                <h4 className="font-display font-bold text-lg text-navy mt-2 leading-snug">
                  {companyA.name.split(" (")[0]}
                </h4>
                <p className="text-zinc-500 text-xs font-mono mt-0.5">{companyA.name.match(/\(([^)]+)\)/)?.[0] || ""}</p>
              </div>
              <div className="mt-4 pt-4 border-t border-zinc-200/60">
                <div className="text-xs text-zinc-400">Vốn hóa thị trường</div>
                <div className="text-xl font-bold font-mono text-navy">{companyA.marketCap}</div>
              </div>
            </div>

            <div className="bg-ivory-dark/30 rounded-xl p-5 border border-zinc-200/50 flex flex-col justify-between shadow-xs">
              <div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white text-zinc-500 font-mono uppercase border border-zinc-200">
                  Thương hiệu B
                </span>
                <h4 className="font-display font-bold text-lg text-navy mt-2 leading-snug">
                  {companyB.name.split(" (")[0]}
                </h4>
                <p className="text-zinc-500 text-xs font-mono mt-0.5">{companyB.name.match(/\(([^)]+)\)/)?.[0] || ""}</p>
              </div>
              <div className="mt-4 pt-4 border-t border-zinc-200/60">
                <div className="text-xs text-zinc-400">Vốn hóa thị trường</div>
                <div className="text-xl font-bold font-mono text-navy">{companyB.marketCap}</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 border border-zinc-200 shadow-xs space-y-4">
            <h5 className="text-xs uppercase font-mono tracking-wider text-honey flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-honey" />
              Chỉ số Sở hữu Trùng lặp
            </h5>

            <p className="text-zinc-700 text-xs leading-relaxed">
              Bề ngoài, hai tập đoàn vẫn cạnh tranh gay gắt về thị phần, giá cả và marketing. Tuy nhiên, đằng sau sự cạnh tranh đó là sự hiện diện của các cổ đông tổ chức lớn (<strong className="text-navy">BlackRock, Vanguard</strong>) nắm giữ cổ phiếu khống chế và quyền biểu quyết, có khả năng chi phối định hướng của cả hai cùng lúc.
            </p>

            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-xs text-zinc-500 font-mono">
                <span>Cổ đông trùng lặp chủ chốt:</span>
                <span className="text-coral font-bold">{overlap.length} quỹ khổng lồ</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {overlap.map((sh, idx) => (
                  <span
                    key={idx}
                    onMouseEnter={() => setActiveShareholder(sh)}
                    onMouseLeave={() => setActiveShareholder(null)}
                    className="text-[11px] px-2.5 py-1 rounded-md bg-zinc-50 border border-zinc-200 text-zinc-700 cursor-pointer hover:bg-zinc-100 hover:text-navy transition-all duration-200"
                  >
                    {sh.replace(", Inc.", "").replace(" (Warren Buffett)", "")}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={triggerAnalysis}
              className="w-full mt-2 bg-coral hover:bg-opacity-95 text-white font-medium text-xs py-2.5 rounded-lg border border-coral hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Share2 className="w-3.5 h-3.5" />
              Yêu cầu AI phân tích sâu sở hữu chéo →
            </button>
          </div>
        </div>

        <div className="lg:col-span-7 bg-ivory-dark/20 rounded-2xl p-4 md:p-6 border border-zinc-200 relative min-h-[420px] flex flex-col justify-between overflow-hidden">
          <div className="absolute top-4 left-4 z-10">
            <h5 className="text-xs uppercase font-mono tracking-wider text-zinc-500">
              Sơ đồ Kiểm soát Tập trung
            </h5>
            <p className="text-[11px] text-zinc-400 mt-0.5">Rê chuột vào các quỹ để xem dòng chảy vốn</p>
          </div>

          <div className="flex-1 flex items-center justify-center py-6">
            <svg viewBox="0 0 600 360" className="w-full max-w-[500px] h-auto overflow-visible select-none">
              <defs>
                <linearGradient id="grad-vanguard" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#E5A93C" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#FCFBF7" stopOpacity="0.2" />
                </linearGradient>
                <linearGradient id="grad-blackrock" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#F05A4F" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#FCFBF7" stopOpacity="0.2" />
                </linearGradient>
              </defs>

              <path d="M 120 100 Q 150 180 200 240" fill="none" stroke={activeShareholder === "The Vanguard Group" ? "#E5A93C" : "#CBD5E1"} strokeWidth={activeShareholder === "The Vanguard Group" ? "3" : "1"} strokeDasharray={activeShareholder === "The Vanguard Group" ? "none" : "3,3"} className="transition-all duration-300" />
              <text x="135" y="180" fill="#E5A93C" className="text-[9px] font-mono font-bold" visibility={activeShareholder === "The Vanguard Group" ? "visible" : "hidden"}>
                {companyA.shares.find(s => s.shareholder === "The Vanguard Group")?.percentage || "8.4%"}
              </text>

              <path d="M 120 100 Q 250 180 400 240" fill="none" stroke={activeShareholder === "The Vanguard Group" ? "#E5A93C" : "#CBD5E1"} strokeWidth={activeShareholder === "The Vanguard Group" ? "3" : "1"} strokeDasharray={activeShareholder === "The Vanguard Group" ? "none" : "3,3"} className="transition-all duration-300" />
              <text x="210" y="210" fill="#E5A93C" className="text-[9px] font-mono font-bold" visibility={activeShareholder === "The Vanguard Group" ? "visible" : "hidden"}>
                {companyB.shares.find(s => s.shareholder === "The Vanguard Group")?.percentage || "9.1%"}
              </text>

              <path d="M 300 100 Q 250 180 200 240" fill="none" stroke={activeShareholder === "BlackRock, Inc." ? "#F05A4F" : "#CBD5E1"} strokeWidth={activeShareholder === "BlackRock, Inc." ? "3" : "1"} strokeDasharray={activeShareholder === "BlackRock, Inc." ? "none" : "3,3"} className="transition-all duration-300" />
              <text x="255" y="160" fill="#F05A4F" className="text-[9px] font-mono font-bold" visibility={activeShareholder === "BlackRock, Inc." ? "visible" : "hidden"}>
                {companyA.shares.find(s => s.shareholder === "BlackRock, Inc.")?.percentage || "7.2%"}
              </text>

              <path d="M 300 100 Q 350 180 400 240" fill="none" stroke={activeShareholder === "BlackRock, Inc." ? "#F05A4F" : "#CBD5E1"} strokeWidth={activeShareholder === "BlackRock, Inc." ? "3" : "1"} strokeDasharray={activeShareholder === "BlackRock, Inc." ? "none" : "3,3"} className="transition-all duration-300" />
              <text x="340" y="170" fill="#F05A4F" className="text-[9px] font-mono font-bold" visibility={activeShareholder === "BlackRock, Inc." ? "visible" : "hidden"}>
                {companyB.shares.find(s => s.shareholder === "BlackRock, Inc.")?.percentage || "7.8%"}
              </text>

              <path d="M 480 100 Q 350 180 200 240" fill="none" stroke={activeShareholder === "State Street Corporation" ? "#1D8A82" : "#CBD5E1"} strokeWidth={activeShareholder === "State Street Corporation" ? "3" : "1"} strokeDasharray={activeShareholder === "State Street Corporation" ? "none" : "3,3"} className="transition-all duration-300" />
              <text x="360" y="210" fill="#1D8A82" className="text-[9px] font-mono font-bold" visibility={activeShareholder === "State Street Corporation" ? "visible" : "hidden"}>
                {companyA.shares.find(s => s.shareholder === "State Street Corporation")?.percentage || "3.9%"}
              </text>

              <path d="M 480 100 Q 450 180 400 240" fill="none" stroke={activeShareholder === "State Street Corporation" ? "#1D8A82" : "#CBD5E1"} strokeWidth={activeShareholder === "State Street Corporation" ? "3" : "1"} strokeDasharray={activeShareholder === "State Street Corporation" ? "none" : "3,3"} className="transition-all duration-300" />
              <text x="445" y="180" fill="#1D8A82" className="text-[9px] font-mono font-bold" visibility={activeShareholder === "State Street Corporation" ? "visible" : "hidden"}>
                {companyB.shares.find(s => s.shareholder === "State Street Corporation")?.percentage || "4.2%"}
              </text>

              <g className="cursor-pointer group" onMouseEnter={() => setActiveShareholder("The Vanguard Group")} onMouseLeave={() => setActiveShareholder(null)}>
                <circle cx="120" cy="100" r="32" fill="#FEF8EC" stroke="#E5A93C" strokeWidth="2.5" className="transition-all duration-300 group-hover:fill-[#FBEFCE]" />
                <text x="120" y="96" fill="#A46E13" className="text-[10px] font-mono font-bold" textAnchor="middle">VANGUARD</text>
                <text x="120" y="108" fill="#6B7280" className="text-[8px] font-sans" textAnchor="middle">Quản lý $8.5T</text>
              </g>

              <g className="cursor-pointer group" onMouseEnter={() => setActiveShareholder("BlackRock, Inc.")} onMouseLeave={() => setActiveShareholder(null)}>
                <circle cx="300" cy="100" r="32" fill="#FDF0EE" stroke="#F05A4F" strokeWidth="2.5" className="transition-all duration-300 group-hover:fill-[#FBDDDA]" />
                <text x="300" y="96" fill="#B9251B" className="text-[10px] font-mono font-bold" textAnchor="middle">BLACKROCK</text>
                <text x="300" y="108" fill="#6B7280" className="text-[8px] font-sans" textAnchor="middle">Quản lý $10.5T</text>
              </g>

              <g className="cursor-pointer group" onMouseEnter={() => setActiveShareholder("State Street Corporation")} onMouseLeave={() => setActiveShareholder(null)}>
                <circle cx="480" cy="100" r="32" fill="#ECF8F7" stroke="#1D8A82" strokeWidth="2.5" className="transition-all duration-300 group-hover:fill-[#CFF1EE]" />
                <text x="480" y="96" fill="#145C57" className="text-[10px] font-mono font-bold" textAnchor="middle">STATE STREET</text>
                <text x="480" y="108" fill="#6B7280" className="text-[8px] font-sans" textAnchor="middle">Quản lý $4.1T</text>
              </g>

              <g className="group">
                <rect x="140" y="240" width="120" height="42" rx="8" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="1.5" className="transition-all duration-300 group-hover:stroke-navy shadow-xs" />
                <text x="200" y="258" fill="#0B1E3F" className="text-[11px] font-sans font-bold" textAnchor="middle">{companyA.name.split(" (")[0].substring(0, 15)}</text>
                <text x="200" y="272" fill="#6B7280" className="text-[9px] font-mono" textAnchor="middle">Vốn: {companyA.marketCap}</text>
              </g>

              <g>
                <circle cx="300" cy="261" r="14" fill="#FCFBF7" stroke="#CBD5E1" strokeWidth="1.5" />
                <text x="300" y="265" fill="#6B7280" className="text-[10px] font-display font-medium italic" textAnchor="middle">vs</text>
              </g>

              <g className="group">
                <rect x="340" y="240" width="120" height="42" rx="8" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="1.5" className="transition-all duration-300 group-hover:stroke-navy shadow-xs" />
                <text x="400" y="258" fill="#0B1E3F" className="text-[11px] font-sans font-bold" textAnchor="middle">{companyB.name.split(" (")[0].substring(0, 15)}</text>
                <text x="400" y="272" fill="#6B7280" className="text-[9px] font-mono" textAnchor="middle">Vốn: {companyB.marketCap}</text>
              </g>
            </svg>
          </div>

          <div className="bg-white p-3 rounded-lg border border-zinc-200/80 shadow-xs flex items-start gap-2.5">
            <TrendingUp className="w-4 h-4 text-honey mt-0.5 flex-shrink-0" />
            <p className="text-[11.5px] text-zinc-600 leading-relaxed">
              <strong>Bản chất cạnh tranh hiện đại:</strong> Sự cạnh tranh không mất đi hoàn toàn mà chuyển thành sự cạnh tranh giữa các tập đoàn lớn đặt dưới sự chi phối chung của tư bản tài chính và các định chế quản lý quỹ khổng lồ.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
