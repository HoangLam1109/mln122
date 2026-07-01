import React from 'react';
import { Landmark, TrendingUp, Handshake } from 'lucide-react';

const parts = [
  {
    id: 1,
    title: "Bản chất Độc quyền Nhà nước",
    icon: <Landmark className="w-6 h-6 text-coral" />,
    content: "Sự kết hợp giữa sức mạnh của các tổ chức độc quyền tư nhân với sức mạnh chính trị, kinh tế của nhà nước tư sản.",
    detail: "Mục tiêu sâu xa không phải chỉ là giải quyết nhu cầu xã hội, mà là ổn định nền kinh tế tư bản chủ nghĩa và tạo điều kiện bệ phóng cho tư bản độc quyền.",
    color: "border-coral",
    bg: "bg-coral/5"
  },
  {
    id: 2,
    title: "Biểu hiện 1: Công cụ Điều tiết Kinh tế",
    icon: <TrendingUp className="w-6 h-6 text-honey" />,
    content: "Nhà nước tư sản can thiệp thông qua thu - chi ngân sách, kiểm soát lãi suất, trợ cấp, mua sắm công.",
    detail: "Chức năng chính là 'bơm oxy' (cứu trợ) nhằm ổn định kinh tế vĩ mô mỗi khi nền kinh tế tư bản chủ nghĩa rơi vào khủng hoảng chu kỳ.",
    color: "border-honey",
    bg: "bg-honey/5"
  },
  {
    id: 3,
    title: "Biểu hiện 2: Xã hội hóa Chi phí, Tư nhân hóa Lợi nhuận",
    icon: <TrendingUp className="w-6 h-6 text-teal-accent" />,
    content: "Nhà nước gánh vác các khoản đầu tư rủi ro, thu hồi vốn chậm (giao thông, năng lượng, R&D).",
    detail: "Từ bệ đỡ hạ tầng giá rẻ này, các tập đoàn độc quyền nhảy vào khai thác thương mại để tối đa hóa lợi nhuận mà không phải chịu rủi ro ban đầu.",
    color: "border-teal-accent",
    bg: "bg-teal-accent/5"
  },
  {
    id: 4,
    title: "Biểu hiện 3: Cơ chế Quan hệ Nhân sự",
    icon: <Handshake className="w-6 h-6 text-navy-light" />,
    content: "Sự thỏa hiệp, phân chia quyền lực chính trị giữa các thế lực tư bản độc quyền trong bộ máy nhà nước.",
    detail: "Các lực lượng này có thể khác nhau về lợi ích trước mắt, nhưng đều hướng tới việc duy trì trật tự có lợi cho chủ nghĩa tư bản độc quyền.",
    color: "border-zinc-400",
    bg: "bg-zinc-100"
  }
];

export default function StateMonopolySlide() {
  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl border border-zinc-200/80 shadow-xs">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {parts.map((part) => (
          <div key={part.id} className={`p-6 rounded-xl border-l-4 ${part.color} ${part.bg} border-y border-r border-y-zinc-200/60 border-r-zinc-200/60 space-y-4 shadow-sm`}>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white rounded-xl shadow-xs border border-zinc-100">
                {part.icon}
              </div>
              <h3 className="font-display font-bold text-navy text-lg leading-tight">{part.title}</h3>
            </div>
            
            <div className="text-zinc-800 text-sm font-medium leading-relaxed bg-white p-4 rounded-xl border border-zinc-200/50 shadow-xs">
              "{part.content}"
            </div>
            
            <p className="text-zinc-600 text-xs leading-relaxed flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-navy mt-1.5 flex-shrink-0" />
              {part.detail}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
