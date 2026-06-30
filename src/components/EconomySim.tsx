import React, { useState } from "react";
import { CirclePlay, RotateCcw, AlertTriangle, TrendingUp, DollarSign, Activity } from "lucide-react";
import { SimulationLog } from "../types";

export default function EconomySim() {
  const [realCapital, setRealCapital] = useState<number>(100); // Production capital
  const [specCapital, setSpecCapital] = useState<number>(150); // Fictitious capital / speculation
  const [history, setHistory] = useState<SimulationLog[]>([
    { year: 0, realValue: 100, virtualValue: 100, bubbleRisk: 100, status: "Ổn định" }
  ]);
  const [currentYear, setCurrentYear] = useState<number>(0);
  const [isCrashed, setIsCrashed] = useState<boolean>(false);

  const runOneYear = () => {
    if (isCrashed) return;

    const nextYear = currentYear + 1;
    const lastLog = history[history.length - 1];

    // Real economy grows steadily based on production investment (realCapital)
    const realGrowth = 1 + (realCapital / 1000) + (Math.random() * 0.03); // ~2% to 15% growth
    const newRealValue = lastLog.realValue * realGrowth;

    // Virtual economy grows faster, boosted by speculative leverage (specCapital)
    // Formula: T -> T' without real commodity intermediate (H)
    const specLeverage = 1 + (specCapital / 400) + (Math.random() * 0.08); // high volatility
    const newVirtualValue = lastLog.virtualValue * specLeverage;

    // Bubble risk index = (Virtual Value / Real Value) * 100
    const bubbleRisk = (newVirtualValue / newRealValue) * 100;

    let status: "Ổn định" | "Cảnh báo" | "VỠ BONG BÓNG" = "Ổn định";
    let finalVirtual = newVirtualValue;
    let finalReal = newRealValue;

    if (bubbleRisk > 250) {
      status = "Cảnh báo";
    }

    // High bubble risk triggers high probability of a speculative crash (crisis)
    const crashProbability = Math.max(0, (bubbleRisk - 180) / 150); // e.g. at 330% risk, prob is ~1.0
    if (bubbleRisk > 180 && Math.random() < crashProbability) {
      status = "VỠ BONG BÓNG";
      // A crash wipes out 60-80% of virtual fictitious values, and drags down the real economy by 15-30%
      finalVirtual = lastLog.virtualValue * (0.2 + Math.random() * 0.15);
      finalReal = newRealValue * (0.75 + Math.random() * 0.1);
      setIsCrashed(true);
    }

    const newLog: SimulationLog = {
      year: nextYear,
      realValue: Math.round(finalReal * 10) / 10,
      virtualValue: Math.round(finalVirtual * 10) / 10,
      bubbleRisk: Math.round((finalVirtual / finalReal) * 100),
      status
    };

    setHistory([...history, newLog]);
    setCurrentYear(nextYear);
  };

  const resetSim = () => {
    setHistory([{ year: 0, realValue: 100, virtualValue: 100, bubbleRisk: 100, status: "Ổn định" }]);
    setCurrentYear(0);
    setIsCrashed(false);
  };

  const latest = history[history.length - 1];

  return (
    <div id="economy-sim-section" className="bg-white rounded-2xl border border-zinc-200/80 p-6 md:p-8 space-y-8 shadow-xs">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-coral font-mono text-xs uppercase tracking-widest mb-2">
          <Activity className="w-4 h-4 text-coral" />
          Khu vực Kinh tế vĩ mô
        </div>
        <h3 className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-navy">
          Kinh tế Thực vs. Kinh tế Ảo (Tư bản Giả)
        </h3>
        <p className="text-zinc-600 text-sm mt-1 max-w-3xl leading-relaxed">
          Sự tách rời giữa <strong>Kinh tế thực</strong> (nơi lao động và công nghệ trực tiếp tạo ra hàng hóa, dịch vụ và giá trị thặng dư mới) và <strong>Kinh tế ảo</strong> (vận động trên thị trường tài chính thông qua cổ phiếu, phái sinh, tư bản giả theo công thức <span className="text-navy font-semibold font-mono">T - T'</span> phản ánh kỳ vọng tương lai).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sliders and Action */}
        <div className="lg:col-span-5 bg-ivory-dark/30 p-6 rounded-2xl border border-zinc-200/60 space-y-6">
          <h4 className="text-sm font-semibold font-mono text-navy border-b border-zinc-200/80 pb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-coral" />
            Điều tiết Dòng vốn vĩ mô
          </h4>

          {/* Real economy slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-zinc-600">Đầu tư Kinh tế Thực (Sản xuất):</span>
              <span className="text-[#1D8A82] font-bold">${realCapital}M / năm</span>
            </div>
            <input
              type="range"
              min="10"
              max="300"
              step="10"
              disabled={isCrashed}
              value={realCapital}
              onChange={(e) => setRealCapital(Number(e.target.value))}
              className="w-full h-1 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-[#1D8A82] disabled:opacity-40"
            />
            <span className="text-[10px] text-zinc-500 block leading-relaxed">Sản xuất công nghiệp, dịch vụ thực, cơ sở hạ tầng, tạo ra giá trị thặng dư bền vững.</span>
          </div>

          {/* Speculative economy slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-zinc-600">Đầu cơ Tài chính (Kinh tế Ảo):</span>
              <span className="text-coral font-bold">${specCapital}M / năm</span>
            </div>
            <input
              type="range"
              min="10"
              max="500"
              step="10"
              disabled={isCrashed}
              value={specCapital}
              onChange={(e) => setSpecCapital(Number(e.target.value))}
              className="w-full h-1 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-coral disabled:opacity-40"
            />
            <span className="text-[10px] text-zinc-500 block leading-relaxed">Các công cụ phái sinh, đòn bẩy chứng khoán, giao dịch tần suất cao (HFT). Sinh lời cực nhanh nhưng tích tụ rủi ro hệ thống.</span>
          </div>

          {/* Actions */}
          <div className="pt-4 flex gap-3">
            <button
              onClick={runOneYear}
              disabled={isCrashed}
              className="flex-1 bg-coral hover:bg-coral/90 text-white disabled:bg-zinc-100 disabled:text-zinc-400 font-semibold text-xs py-3 rounded-xl border border-coral/20 transition-all duration-300 flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <CirclePlay className="w-4 h-4" />
              Chạy mô phỏng 1 năm ↗
            </button>
            <button
              onClick={resetSim}
              className="px-4 py-3 bg-white hover:bg-zinc-50 text-zinc-600 rounded-xl border border-zinc-200 transition-all duration-200 text-xs shadow-xs cursor-pointer"
              title="Đặt lại mô phỏng"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Current Status Box */}
          <div className="p-4 rounded-xl border border-zinc-200 bg-white space-y-3 shadow-xs">
            <div className="flex justify-between items-center">
              <span className="text-xs text-zinc-500 font-mono">Trạng thái hệ thống:</span>
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-mono font-bold border ${
                latest.status === "Ổn định" 
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : latest.status === "Cảnh báo"
                  ? "bg-amber-50 text-amber-700 border-amber-200"
                  : "bg-red-50 text-red-700 border-red-200 animate-pulse"
              }`}>
                {latest.status}
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-zinc-400">Năm mô phỏng:</span>
                <span className="text-navy font-semibold">Năm thứ {currentYear}</span>
              </div>
              <div className="flex justify-between text-xs font-mono">
                <span className="text-zinc-400">Chỉ số bong bóng (Fictitious/Real ratio):</span>
                <span className={`font-bold ${latest.bubbleRisk > 200 ? "text-coral" : "text-navy"}`}>
                  {latest.bubbleRisk}%
                </span>
              </div>
            </div>

            {isCrashed && (
              <div className="mt-2 p-3 bg-red-50 border border-red-100 rounded-lg text-xs text-red-800 leading-relaxed space-y-1 flex gap-2">
                <AlertTriangle className="w-5 h-5 text-coral flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-red-900 block font-display">BÙNG NỔ KHỦNG HOẢNG KINH TẾ!</strong>
                  Bong bóng tài chính tích tụ quá lớn (vượt ngưỡng chịu đựng của nền sản xuất thực). Thị trường chứng khoán sụp đổ, thanh khoản đóng băng và kéo theo suy thoái kinh tế thực. Hãy bấm nút Đặt lại để khôi phục hệ thống.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Chart Display */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-zinc-200/80 flex flex-col justify-between space-y-6 shadow-xs">
          <div>
            <h5 className="text-xs uppercase font-mono tracking-wider text-zinc-500 flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-zinc-400" />
              Sự Phân Kỳ của dòng Vốn (Capital Divergence Tracker)
            </h5>
            <p className="text-[11px] text-zinc-400 mt-0.5">Biểu đồ so sánh giá trị sản xuất thực tế vs giá trị chứng khoán ảo</p>
          </div>

          {/* SVG Realtime Graph */}
          <div className="flex-1 min-h-[220px] bg-ivory-dark/20 border border-zinc-200/40 rounded-xl relative p-4 flex items-end shadow-xs">
            <svg viewBox="0 0 500 200" className="w-full h-[180px] overflow-visible">
              {/* Grid Lines */}
              <line x1="0" y1="50" x2="500" y2="50" stroke="#E4E4E7" strokeWidth="0.5" strokeDasharray="3,3" />
              <line x1="0" y1="100" x2="500" y2="100" stroke="#E4E4E7" strokeWidth="0.5" strokeDasharray="3,3" />
              <line x1="0" y1="150" x2="500" y2="150" stroke="#E4E4E7" strokeWidth="0.5" strokeDasharray="3,3" />

              {/* Dynamic Path Generator */}
              {history.length > 1 && (
                <>
                  {/* Real Value Path */}
                  <path
                    d={history.reduce((acc, point, idx) => {
                      const x = (idx / (history.length - 1)) * 480 + 10;
                      const maxVal = Math.max(...history.map(h => Math.max(h.realValue, h.virtualValue)), 300);
                      const y = 180 - (point.realValue / maxVal) * 150;
                      return acc + `${idx === 0 ? "M" : "L"} ${x} ${y}`;
                    }, "")}
                    fill="none"
                    stroke="#1D8A82"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    className="transition-all duration-300"
                  />

                  {/* Virtual Value Path */}
                  <path
                    d={history.reduce((acc, point, idx) => {
                      const x = (idx / (history.length - 1)) * 480 + 10;
                      const maxVal = Math.max(...history.map(h => Math.max(h.realValue, h.virtualValue)), 300);
                      const y = 180 - (point.virtualValue / maxVal) * 150;
                      return acc + `${idx === 0 ? "M" : "L"} ${x} ${y}`;
                    }, "")}
                    fill="none"
                    stroke="#E76E50"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    className="transition-all duration-300"
                  />
                </>
              )}

              {/* Labels for the axes */}
              <text x="10" y="45" fill="#A1A1AA" className="text-[8px] font-mono">Quy mô lớn</text>
              <text x="10" y="175" fill="#A1A1AA" className="text-[8px] font-mono">Khởi đầu (100)</text>
            </svg>

            {/* Absolute indicator legends */}
            <div className="absolute top-4 right-4 flex gap-4 text-[10px] font-mono">
              <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-xs px-2 py-1 rounded border border-zinc-100 shadow-xs">
                <span className="w-2.5 h-2.5 bg-[#1D8A82] rounded-full"></span>
                <span className="text-zinc-600">Kinh tế Thực: <strong className="text-navy">${latest.realValue}M</strong></span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-xs px-2 py-1 rounded border border-zinc-100 shadow-xs">
                <span className="w-2.5 h-2.5 bg-coral rounded-full"></span>
                <span className="text-zinc-600">Kinh tế Ảo: <strong className="text-navy">${latest.virtualValue}M</strong></span>
              </div>
            </div>
          </div>

          {/* Interactive Historical Logs table */}
          <div className="space-y-2">
            <div className="text-[10px] uppercase font-mono tracking-wider text-zinc-500">Nhật ký biến động chu kỳ</div>
            <div className="max-h-[100px] overflow-y-auto border border-zinc-200 rounded-lg text-[11px] font-mono bg-white shadow-xs">
              <table className="w-full text-left">
                <thead className="bg-zinc-50 sticky top-0 text-zinc-500 border-b border-zinc-200">
                  <tr>
                    <th className="p-2 font-semibold">Năm</th>
                    <th className="p-2 font-semibold">Kinh tế Thực</th>
                    <th className="p-2 font-semibold">Kinh tế Ảo</th>
                    <th className="p-2 font-semibold">Tỉ lệ lệch</th>
                    <th className="p-2 font-semibold">Trạng thái</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 text-zinc-600">
                  {history.slice().reverse().map((log) => (
                    <tr key={log.year} className="hover:bg-zinc-50/50">
                      <td className="p-2 text-zinc-900">Năm {log.year}</td>
                      <td className="p-2 text-[#1D8A82] font-semibold">${log.realValue}M</td>
                      <td className="p-2 text-coral font-semibold">${log.virtualValue}M</td>
                      <td className="p-2">{log.bubbleRisk}%</td>
                      <td className="p-2">
                        <span className={
                          log.status === "Ổn định" ? "text-emerald-600 font-medium" :
                          log.status === "Cảnh báo" ? "text-amber-600 font-medium" : "text-coral font-bold"
                        }>
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* 3 Causes of Fictitious Capital Dominance */}
          <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-200 space-y-3 shadow-xs">
            <h6 className="text-[11px] font-bold font-mono text-honey uppercase tracking-wider">
              3 Nguyên nhân đầu cơ tài chính lấn át sản xuất kinh doanh:
            </h6>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[11px] text-zinc-600">
              <div className="p-2.5 bg-white rounded-lg border border-zinc-200 shadow-2xs">
                <strong className="text-navy block mb-1">1. Tốc độ sinh lời nhanh hơn</strong>
                Sản xuất cần đầu tư nhà xưởng, máy móc, nhân công và lưu thông dài ngày. Đầu cơ tài chính có thể mang lại lợi nhuận chỉ trong vài giây.
              </div>
              <div className="p-2.5 bg-white rounded-lg border border-zinc-200 shadow-2xs">
                <strong className="text-navy block mb-1">2. Đòn bẩy tài chính khổng lồ</strong>
                Các quỹ dùng nợ vay, phái sinh và các công cụ phức tạp để kiểm soát lượng tài sản khổng lồ lớn gấp nhiều lần vốn tự có.
              </div>
              <div className="p-2.5 bg-white rounded-lg border border-zinc-200 shadow-2xs">
                <strong className="text-navy block mb-1">3. Tâm lý đầu cơ & Kỳ vọng</strong>
                Giá tài sản tài chính tăng chủ yếu dựa trên kỳ vọng tương lai và tâm lý bầy đàn, tạo ra cảm giác tiền tự đẻ ra tiền (<span className="text-coral font-semibold font-mono">T - T'</span>).
              </div>
            </div>
            <div className="pt-2.5 border-t border-zinc-200 text-[10.5px] text-zinc-500 leading-relaxed">
              * <strong>Bản chất:</strong> Tài chính không tự tạo ra giá trị mới cho xã hội. Phần lớn lợi nhuận tài chính là sự chuyển dịch giá trị giữa các chủ thể. Nguồn gốc cuối cùng của giá trị thặng dư vẫn bắt nguồn từ lao động trực tiếp trong khu vực sản xuất thực.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
