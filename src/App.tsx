import React, { useState, useRef, useEffect } from "react";
import { 
  Building2, 
  HelpCircle, 
  Sparkles, 
  BookOpen, 
  Coins, 
  Cpu, 
  GitMerge, 
  ArrowRight, 
  MessageSquare, 
  X, 
  AlertCircle,
  TrendingDown,
  ExternalLink
} from "lucide-react";
import CorporateMap from "./components/CorporateMap";
import ParticipationSim from "./components/ParticipationSim";
import EconomySim from "./components/EconomySim";
import puppetMasterBanner from "./assets/images/puppet_master_banner_1782798026905.jpg";

export default function App() {
  const [activeTab, setActiveTab] = useState<"corporate" | "participation" | "economy" | "guide">("corporate");
  const [prompt, setPrompt] = useState<string>("");
  const [aiResponse, setAiResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Preset prompts for quick-clicking inside the layout
  const presets = [
    {
      label: "Chế độ tham dự là gì?",
      query: "Hãy giải thích ngắn gọn, dễ hiểu và sâu sắc về 'chế độ tham dự' (participation system) và cách nó giúp các quỹ như BlackRock kiểm soát hàng nghìn tỷ USD toàn cầu."
    },
    {
      label: "Bong bóng kinh tế ảo?",
      query: "Phân tích vì sao kinh tế ảo (tư bản giả) trong chủ nghĩa tư bản hiện đại lại có xu hướng phình to độc lập với kinh tế thực và nguồn gốc của bùng nổ khủng hoảng chu kỳ."
    },
    {
      label: "Sở hữu chéo song hành?",
      query: "Sự trùng lặp cổ đông lớn (Common Ownership) của BlackRock và Vanguard ở cả Coca và Pepsi ảnh hưởng như thế nào đến bản chất cạnh tranh lành mạnh trên thị trường tự do?"
    },
    {
      label: "Lợi ích của CNTB?",
      query: "Đánh giá một cách khách quan nhất về những đóng góp lịch sử tích cực và những mâu thuẫn hệ thống cốt lõi không thể tự điều hòa của chủ nghĩa tư bản."
    }
  ];

  const handleAskGemini = async (queryToAsk: string) => {
    setLoading(true);
    setError(null);
    setPrompt(queryToAsk);
    setAiResponse("");

    // Smoothly scroll to AI console
    const consoleElem = document.getElementById("ai-critique-console");
    if (consoleElem) {
      consoleElem.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: queryToAsk }),
      });

      const data = await response.json();
      if (response.ok) {
        setAiResponse(data.text);
      } else {
        setError(data.error || "Có lỗi xảy ra khi liên hệ với trợ lý AI.");
      }
    } catch (err: any) {
      console.error(err);
      setError("Không thể kết nối tới máy chủ AI. Hãy đảm bảo máy chủ đang hoạt động.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [aiResponse]);

  return (
    <div className="min-h-screen bg-ivory text-navy selection:bg-coral selection:text-white pb-16">
      {/* Visual background ambient noise / warm soft gradient overlay */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-ivory-dark/60 via-ivory/20 to-transparent pointer-events-none -z-10" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-10">
        
        {/* Top Header & Intro */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-zinc-200 pb-8">
          <div>
            <div className="flex items-center gap-2 text-honey font-mono text-xs uppercase tracking-widest mb-1">
              <Cpu className="w-4 h-4 text-honey animate-pulse" />
              Nền tảng Tương tác Kinh tế Chính trị
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-navy leading-none">
              Bản đồ Quyền lực <span className="text-coral">Tài chính</span>
            </h1>
            <p className="text-zinc-600 text-sm md:text-base mt-2 max-w-3xl leading-relaxed">
              Phân tích cơ cấu sở hữu tập trung, chế độ tham dự kim tự tháp, sự trỗi dậy của kinh tế ảo (tư bản giả) và lý luận phê phán sâu sắc về hệ thống tài chính toàn cầu.
            </p>
          </div>

          <div className="flex gap-3 self-stretch md:self-auto">
            <a 
              href="#ai-critique-console"
              className="flex-1 md:flex-initial text-center px-4 py-2.5 rounded-xl text-xs font-semibold bg-white border border-zinc-200 text-navy hover:border-zinc-400 transition-all duration-300 shadow-xs"
            >
              Hỏi Trợ lý AI ↗
            </a>
            <button
              onClick={() => handleAskGemini("Phân tích tổng quan về sự nguy hiểm của độc quyền tài chính toàn cầu hiện nay.")}
              className="flex-1 md:flex-initial px-4 py-2.5 rounded-xl text-xs font-bold bg-coral border border-coral hover:bg-opacity-95 text-white shadow-lg shadow-coral/10 transition-all duration-300 flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Phân tích Tổng quan
            </button>
          </div>
        </header>

        {/* Hero Banner Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-xs items-stretch overflow-hidden">
          {/* Puppet Master Image Column */}
          <div className="lg:col-span-4 relative h-64 lg:h-auto min-h-[220px] rounded-xl overflow-hidden border border-zinc-200">
            <img 
              src={puppetMasterBanner} 
              alt="Mô hình rối dây tài chính" 
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {/* Elegant overlay gradient on image */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-3.5">
              <span className="text-[10px] font-mono text-zinc-300 bg-black/40 px-2 py-1 rounded backdrop-blur-xs">
                Mô hình Rối dây Tài chính (Common Ownership)
              </span>
            </div>
          </div>

          {/* Text and stats Column */}
          <div className="lg:col-span-8 flex flex-col md:flex-row gap-6">
            {/* Text description */}
            <div className="flex-1 space-y-3 flex flex-col justify-between py-1">
              <div className="space-y-3">
                <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-400">Cạnh tranh giả lập</span>
                <h2 className="text-xl md:text-2xl font-display font-medium text-navy leading-snug">
                  Coca hay Pepsi? Thấu thị mạng lưới sở hữu tập trung
                </h2>
                <p className="text-zinc-600 text-xs md:text-sm leading-relaxed">
                  Mặc dù hai thương hiệu này thể hiện sự cạnh tranh gay gắt trên mọi kệ hàng và chiến dịch truyền thông, nhưng đằng sau tấm màn nhung, dòng tiền thặng dư luôn tìm đường chảy về những định chế khổng lồ hàng đầu — BlackRock và Vanguard.
                </p>
              </div>
              
              <div className="pt-2 border-t border-zinc-100 flex items-center gap-1.5 text-xs text-zinc-500">
                <span className="w-1.5 h-1.5 rounded-full bg-honey animate-pulse" />
                <span>Hệ thống phân tích cơ cấu quyền lực & lý luận kinh tế học</span>
              </div>
            </div>

            {/* Quick Stats card */}
            <div className="w-full md:w-[260px] flex flex-col justify-between bg-ivory-dark/40 p-4 rounded-xl border border-zinc-200">
              <div className="text-[11px] text-zinc-500 font-mono flex justify-between items-center">
                <span>Cùng chung ông chủ lớn nhất:</span>
                <span className="w-2 h-2 rounded-full bg-coral animate-ping"></span>
              </div>
              <div className="mt-3 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-700 font-medium">1. The Vanguard Group</span>
                  <span className="text-honey font-bold font-mono">~8.5% - 9.1%</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-700 font-medium">2. BlackRock, Inc.</span>
                  <span className="text-coral font-bold font-mono">~7.2% - 7.8%</span>
                </div>
              </div>
              <button
                onClick={() => handleAskGemini("Phân tích hiện tượng Common Ownership (Sở hữu trùng lặp) ảnh hưởng thế nào đến sự cạnh tranh của Coca và Pepsi.")}
                className="mt-4 text-[11px] font-mono font-medium text-navy hover:text-coral flex items-center justify-between group pt-2 border-t border-zinc-100"
              >
                Xem giải trình cơ chế 
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs for Interactive Modules */}
        <div className="flex border-b border-zinc-200 pb-px overflow-x-auto gap-2">
          <button
            onClick={() => setActiveTab("corporate")}
            className={`px-5 py-3 text-xs md:text-sm font-medium border-b-2 transition-all duration-200 flex items-center gap-2 whitespace-nowrap ${
              activeTab === "corporate"
                ? "border-coral text-navy font-semibold"
                : "border-transparent text-zinc-500 hover:text-navy"
            }`}
          >
            <Building2 className="w-4 h-4" />
            Sở hữu Tập trung (Common Ownership)
          </button>
          <button
            onClick={() => setActiveTab("participation")}
            className={`px-5 py-3 text-xs md:text-sm font-medium border-b-2 transition-all duration-200 flex items-center gap-2 whitespace-nowrap ${
              activeTab === "participation"
                ? "border-honey text-navy font-semibold"
                : "border-transparent text-zinc-500 hover:text-navy"
            }`}
          >
            <GitMerge className="w-4 h-4" />
            Chi phối Chế độ Tham dự
          </button>
          <button
            onClick={() => setActiveTab("economy")}
            className={`px-5 py-3 text-xs md:text-sm font-medium border-b-2 transition-all duration-200 flex items-center gap-2 whitespace-nowrap ${
              activeTab === "economy"
                ? "border-teal-accent text-navy font-semibold"
                : "border-transparent text-zinc-500 hover:text-navy"
            }`}
          >
            <Coins className="w-4 h-4" />
            Kinh tế Thực vs Kinh tế Ảo
          </button>
          <button
            onClick={() => setActiveTab("guide")}
            className={`px-5 py-3 text-xs md:text-sm font-medium border-b-2 transition-all duration-200 flex items-center gap-2 whitespace-nowrap ${
              activeTab === "guide"
                ? "border-zinc-400 text-navy font-semibold"
                : "border-transparent text-zinc-500 hover:text-navy"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Cẩm nang Lý luận Mác-Lênin
          </button>
        </div>

        {/* Dynamic Interactive Component View */}
        <div className="transition-all duration-300">
          {activeTab === "corporate" && (
            <CorporateMap onAskGemini={handleAskGemini} />
          )}

          {activeTab === "participation" && (
            <ParticipationSim />
          )}

          {activeTab === "economy" && (
            <EconomySim />
          )}

          {activeTab === "guide" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 bg-white rounded-2xl border border-zinc-200/80 p-6 md:p-8 shadow-xs">
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <div className="text-xs font-mono uppercase text-honey tracking-widest mb-1">Cơ sở lý luận chính thống</div>
                  <h3 className="font-display text-2xl font-bold text-navy">Lý thuyết Tư bản Độc quyền & Tư bản Tài chính</h3>
                  <p className="text-zinc-600 text-sm mt-1">Bám sát phân tích về hiện tượng các quỹ đầu tư chi phối nền kinh tế toàn cầu dưới góc nhìn chính trị - kinh tế học.</p>
                </div>

                <div className="space-y-6 text-zinc-800 text-sm leading-relaxed">
                  {/* Part 1 */}
                  <div className="p-5 bg-ivory-dark/30 rounded-xl border border-zinc-200/60 space-y-3">
                    <h4 className="font-semibold text-navy flex items-center gap-2 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-coral"></span>
                      1. Chế độ tham dự – Biểu hiện mới của tư bản tài chính ngày nay
                    </h4>
                    <p className="text-zinc-600 text-xs leading-relaxed">
                      Sự kết hợp giữa tư bản ngân hàng và tư bản công nghiệp hình thành <strong>tư bản tài chính</strong>, thống trị bởi <strong>giới đầu sỏ tài chính</strong>. Công cụ thống trị chủ chốt là <strong>chế độ tham dự</strong>.
                    </p>
                    <p className="text-zinc-600 text-xs leading-relaxed">
                      Chỉ cần sở hữu một lượng <strong>cổ phiếu khống chế</strong>, tài phiệt đã kiểm soát cả chuỗi doanh nghiệp mẹ, con, cháu mà không cần sở hữu toàn bộ vốn.
                    </p>
                    <div className="bg-white p-3 rounded-lg border border-zinc-200/80 space-y-1.5 text-zinc-600 text-xs shadow-xs">
                      <div className="flex gap-1.5 items-start">
                        <span className="text-honey font-bold">•</span>
                        <span><strong>Mở rộng phạm vi:</strong> Vượt ra ngoài ngân hàng và công nghiệp, bao trùm cả bảo hiểm, quỹ đầu tư, fintech và dịch vụ tài chính toàn cầu.</span>
                      </div>
                      <div className="flex gap-1.5 items-start">
                        <span className="text-honey font-bold">•</span>
                        <span><strong>Bổ sung bởi chế độ ủy nhiệm:</strong> Cổ đông nhỏ lẻ tăng mạnh nhưng không trực tiếp tham gia quản trị mà ủy quyền biểu quyết cho các quỹ khổng lồ như BlackRock hay Vanguard. Quyền lực đến từ quyền biểu quyết, dòng vốn và dữ liệu thị trường.</span>
                      </div>
                    </div>
                  </div>

                  {/* Part 2 */}
                  <div className="p-5 bg-ivory-dark/30 rounded-xl border border-zinc-200/60 space-y-3">
                    <h4 className="font-semibold text-navy flex items-center gap-2 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-honey"></span>
                      2. Sự tách rời giữa kinh tế thực và kinh tế ảo
                    </h4>
                    <p className="text-zinc-600 text-xs leading-relaxed">
                      <strong>Kinh tế thực:</strong> Nơi trực tiếp sản xuất hàng hóa, dịch vụ, công nghệ thông qua lao động, tạo ra giá trị thặng dư thực tế.
                    </p>
                    <p className="text-zinc-600 text-xs leading-relaxed">
                      <strong>Kinh tế ảo:</strong> Vận động trên thị trường tài chính (cổ phiếu, trái phiếu, phái sinh). Đây là dạng <strong>tư bản giả</strong> sinh lời theo công thức <span className="text-coral font-semibold">T - T'</span>, không trực tiếp tạo ra giá trị mới mà dựa trên kỳ vọng lợi nhuận tương lai.
                    </p>
                    <p className="text-zinc-600 text-xs leading-relaxed">
                      Lợi nhuận đầu cơ tài chính lấn át sản xuất thực tế vì 3 nguyên nhân: <strong>Tốc độ sinh lời nhanh hơn</strong>; <strong>Đòn bẩy tài chính khổng lồ</strong>; <strong>Tâm lý đầu cơ & kỳ vọng thị trường</strong>. Nguồn gốc cuối cùng của mọi giá trị vẫn là lao động trong khu vực sản xuất.
                    </p>
                  </div>

                  {/* Part 3 */}
                  <div className="p-5 bg-ivory-dark/30 rounded-xl border border-zinc-200/60 space-y-3">
                    <h4 className="font-semibold text-navy flex items-center gap-2 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-accent"></span>
                      3. Liên hệ độc quyền nhà nước và vai trò lịch sử
                    </h4>
                    <p className="text-zinc-600 text-xs leading-relaxed">
                      <strong>Chủ nghĩa tư bản độc quyền nhà nước:</strong> Kết hợp sức mạnh kinh tế của các tập đoàn độc quyền với quyền lực chính trị của nhà nước thông qua can thiệp sâu vào đầu tư cơ sở hạ tầng, nghiên cứu, cứu trợ tập đoàn lớn và điều tiết tài chính.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1.5 text-xs text-zinc-600">
                      <div className="p-2.5 bg-white rounded-lg border border-zinc-200/80 shadow-xs">
                        <strong className="text-navy block mb-1">Mặt tích cực:</strong>
                        Thúc đẩy lực lượng sản xuất phát triển mạnh mẽ, từ thủ công lên tự động hóa, thúc đẩy khoa học công nghệ, AI và kinh tế tri thức.
                      </div>
                      <div className="p-2.5 bg-white rounded-lg border border-zinc-200/80 shadow-xs">
                        <strong className="text-navy block mb-1">Hạn chế & Mâu thuẫn:</strong>
                        Sản xuất vì lợi ích thiểu số tư bản, bất bình đẳng giàu nghèo lớn, khủng hoảng chu kỳ, mâu thuẫn giữa <em>tính xã hội hóa cao của lực lượng sản xuất</em> và <em>chế độ chiếm hữu tư nhân tư bản chủ nghĩa</em>.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-ivory-dark/30 p-6 rounded-xl border border-zinc-200/80 space-y-6 flex flex-col justify-between">
                <div>
                  <h4 className="font-display font-bold text-navy text-base">Học thuật & Tranh luận</h4>
                  <p className="text-zinc-600 text-xs mt-1 leading-relaxed">
                    Độc quyền tài chính không xóa bỏ hoàn toàn cạnh tranh mà chuyển thành sự cạnh tranh khốc liệt giữa các tập đoàn lớn đặt dưới sự chi phối chung của tư bản tài chính để tối đa hóa lợi ích cổ đông.
                  </p>
                </div>

                <div className="space-y-3">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase block tracking-wider">Chọn vấn đề muốn phân tích sâu:</span>
                  {presets.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAskGemini(p.query)}
                      className="w-full text-left p-3 rounded-lg bg-white border border-zinc-200 hover:border-zinc-400 text-zinc-700 hover:text-navy text-xs transition-all duration-200 shadow-xs"
                    >
                      {p.label} ↗
                    </button>
                  ))}
                </div>

                <div className="border-t border-zinc-200 pt-4 text-[11px] text-zinc-500 leading-normal flex items-start gap-1.5">
                  <AlertCircle className="w-4 h-4 text-zinc-400 flex-shrink-0 mt-0.5" />
                  Nội dung bám sát lý thuyết tư bản độc quyền và tư bản tài chính kết hợp số liệu thực tế về cơ cấu sở hữu trùng lặp toàn cầu.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* AI Critical Analyst Console */}
        <section id="ai-critique-console" className="bg-navy rounded-2xl border border-navy-light/60 p-6 md:p-8 space-y-6 text-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 text-coral font-mono text-xs uppercase tracking-widest mb-1.5">
                <Sparkles className="w-4 h-4 text-coral" />
                Trí tuệ nhân tạo
              </div>
              <h3 className="font-display text-2xl font-bold tracking-tight text-white">
                Hội đồng Lý luận Kinh tế Phê phán AI
              </h3>
              <p className="text-zinc-300 text-xs md:text-sm mt-0.5">
                Đặt bất kỳ câu hỏi nào để yêu cầu trợ lý kinh tế chính trị giải phẫu cơ cấu quyền lực, cơ chế dòng vốn và các mâu thuẫn tư bản.
              </p>
            </div>

            <div className="flex items-center gap-2 bg-navy-light px-3 py-1.5 rounded-lg border border-navy-light/80">
              <span className="w-2 h-2 rounded-full bg-teal-accent animate-pulse"></span>
              <span className="text-[11px] font-mono text-zinc-300">Mô hình: Gemini 3.5-Flash</span>
            </div>
          </div>

          {/* Prompt Presets Row */}
          <div className="flex flex-wrap gap-2 pt-2">
            {presets.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => handleAskGemini(preset.query)}
                className="text-[11px] px-3 py-1.5 rounded-lg bg-navy-light hover:bg-opacity-80 text-zinc-300 hover:text-white border border-navy-light/40 transition-all duration-200"
              >
                {preset.label}
              </button>
            ))}
          </div>

          {/* Message Output Container */}
          <div className="min-h-[140px] bg-navy-light/30 border border-navy-light/40 rounded-xl p-5 md:p-6 space-y-4 relative overflow-hidden">
            {loading && (
              <div className="absolute inset-0 bg-navy/90 backdrop-blur-xs flex flex-col items-center justify-center space-y-3 z-10">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-coral border-r-2 border-honey"></div>
                <p className="text-xs text-zinc-300 font-mono">Hội đồng học thuật AI đang tổng hợp luận lý và số liệu...</p>
              </div>
            )}

            {error && (
              <div className="p-4 bg-coral/10 border border-coral/30 rounded-lg text-xs text-coral flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-coral flex-shrink-0 mt-0.5" />
                <p>{error}</p>
              </div>
            )}

            {!aiResponse && !loading && !error && (
              <div className="flex flex-col items-center justify-center text-center py-6 text-zinc-400 space-y-2">
                <MessageSquare className="w-8 h-8 text-zinc-500" />
                <p className="text-xs max-w-md">Chưa có dữ liệu phân tích. Hãy chọn một câu hỏi gợi ý phía trên hoặc tự nhập câu hỏi ở ô bên dưới.</p>
              </div>
            )}

            {aiResponse && (
              <div className="prose prose-invert prose-xs max-w-none text-zinc-100 text-sm leading-relaxed font-sans space-y-4 whitespace-pre-wrap">
                {/* Visual quote indicator bar */}
                <div className="border-l-4 border-coral pl-4 py-1 bg-navy-light/40 rounded-r-lg pr-4 mb-4">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block mb-1">CÂU HỎI PHÂN TÍCH:</span>
                  <strong className="text-zinc-200 font-medium italic">"{prompt}"</strong>
                </div>
                {aiResponse}
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Form input field */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              if (prompt.trim()) {
                handleAskGemini(prompt);
              }
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Nhập câu hỏi của bạn (ví dụ: Tại sao tư bản tài chính lại chi phối nhà nước?)..."
              className="flex-1 bg-navy-light/80 border border-navy-light/40 hover:border-navy-light/60 focus:border-honey focus:ring-1 focus:ring-honey outline-none text-zinc-100 text-xs md:text-sm px-4 py-3 rounded-xl transition-all duration-200 placeholder:text-zinc-500"
            />
            <button
              type="submit"
              disabled={loading || !prompt.trim()}
              className="bg-honey hover:bg-opacity-95 disabled:bg-navy-light disabled:text-zinc-500 text-navy font-semibold text-xs px-6 rounded-xl transition-all duration-200 whitespace-nowrap flex items-center justify-center gap-1"
            >
              Phân tích ↗
            </button>
          </form>
        </section>

        {/* Footer info/metadata credit as styled */}
        <footer className="text-center py-6 text-xs text-zinc-500 font-mono space-y-2 border-t border-zinc-200">
          <p>© 2026 Bản đồ Quyền lực Tài chính. Học thuyết phê phán đương đại.</p>
          <div className="flex justify-center gap-4 text-[10px]">
            <span className="text-zinc-400">Tư bản độc quyền</span>
            <span className="text-zinc-400">•</span>
            <span className="text-zinc-400">Chế độ tham dự</span>
            <span className="text-zinc-400">•</span>
            <span className="text-zinc-400">Tư bản tài chính</span>
          </div>
        </footer>

      </div>
    </div>
  );
}
