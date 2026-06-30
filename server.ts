import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with telemetry User-Agent header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// Structured corporate ownership data to feed the frontend visualizations
const corporateData = {
  beverage: {
    title: "Ngành Nước giải khát (Beverage)",
    companies: [
      {
        id: "coca",
        name: "Coca-Cola Company (KO)",
        marketCap: "$265B",
        shares: [
          { shareholder: "The Vanguard Group", percentage: "8.4%" },
          { shareholder: "BlackRock, Inc.", percentage: "7.2%" },
          { shareholder: "Berkshire Hathaway (Warren Buffett)", percentage: "9.2%" },
          { shareholder: "State Street Corporation", percentage: "3.9%" }
        ]
      },
      {
        id: "pepsi",
        name: "PepsiCo, Inc. (PEP)",
        marketCap: "$235B",
        shares: [
          { shareholder: "The Vanguard Group", percentage: "9.1%" },
          { shareholder: "BlackRock, Inc.", percentage: "7.8%" },
          { shareholder: "State Street Corporation", percentage: "4.2%" },
          { shareholder: "Geode Capital Management", percentage: "2.1%" }
        ]
      }
    ]
  },
  tech: {
    title: "Ngành Công nghệ (Big Tech)",
    companies: [
      {
        id: "apple",
        name: "Apple Inc. (AAPL)",
        marketCap: "$3.2T",
        shares: [
          { shareholder: "The Vanguard Group", percentage: "8.3%" },
          { shareholder: "BlackRock, Inc.", percentage: "6.6%" },
          { shareholder: "Berkshire Hathaway", percentage: "5.8%" },
          { shareholder: "State Street Corporation", percentage: "3.7%" }
        ]
      },
      {
        id: "microsoft",
        name: "Microsoft Corp. (MSFT)",
        marketCap: "$3.1T",
        shares: [
          { shareholder: "The Vanguard Group", percentage: "8.9%" },
          { shareholder: "BlackRock, Inc.", percentage: "7.3%" },
          { shareholder: "State Street Corporation", percentage: "3.9%" },
          { shareholder: "FMR LLC (Fidelity)", percentage: "2.8%" }
        ]
      }
    ]
  },
  energy: {
    title: "Ngành Năng lượng (Energy)",
    companies: [
      {
        id: "exxon",
        name: "ExxonMobil (XOM)",
        marketCap: "$480B",
        shares: [
          { shareholder: "The Vanguard Group", percentage: "9.4%" },
          { shareholder: "BlackRock, Inc.", percentage: "7.1%" },
          { shareholder: "State Street Corporation", percentage: "4.8%" },
          { shareholder: "FMR LLC (Fidelity)", percentage: "2.2%" }
        ]
      },
      {
        id: "chevron",
        name: "Chevron Corp. (CVX)",
        marketCap: "$290B",
        shares: [
          { shareholder: "The Vanguard Group", percentage: "8.8%" },
          { shareholder: "BlackRock, Inc.", percentage: "7.5%" },
          { shareholder: "Berkshire Hathaway", percentage: "6.1%" },
          { shareholder: "State Street Corporation", percentage: "3.7%" }
        ]
      }
    ]
  }
};

// API Endpoint to get standard corporate datasets
app.get("/api/corporate-data", (req, res) => {
  res.json(corporateData);
});

// API Endpoint to run deep political-economic critique using Gemini AI
app.post("/api/gemini/analyze", async (req, res) => {
  const { prompt, context } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Yêu cầu cung cấp câu hỏi phân tích." });
  }

  try {
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ 
        error: "GEMINI_API_KEY chưa được cấu hình trên máy chủ. Vui lòng thêm khóa trong bảng Secrets." 
      });
    }

    const systemInstruction = `
Bạn là một chuyên gia phân tích Kinh tế Chính trị phê phán lỗi lạc, sâu sắc và khách quan, luôn bám sát lý thuyết tư bản độc quyền và tư bản tài chính.
Nhiệm vụ của bạn là giải đáp các câu hỏi của người dùng bằng tiếng Việt về cơ cấu sở hữu tập trung, chế độ tham dự, và sự tách rời kinh tế thực/kinh tế ảo dựa trên bộ tài liệu lý luận sau:

1. Chế độ tham dự & Biểu hiện mới:
- Tư bản tài chính hình thành từ sự dung hợp tư bản ngân hàng và tư bản công nghiệp, dưới sự thống trị của giới đầu sỏ tài chính.
- Vận hành qua "chế độ tham dự": sở hữu lượng cổ phiếu khống chế để kiểm soát chuỗi công ty mẹ-con-cháu mà không cần nắm toàn bộ vốn.
- Biểu hiện mới ngày nay: mở rộng sang bảo hiểm, quỹ đầu tư, fintech; bổ sung bởi "chế độ ủy nhiệm" (cổ đông nhỏ lẻ ủy quyền biểu quyết cho các quỹ khổng lồ như BlackRock, Vanguard).
- Cạnh tranh giữa các tập đoàn (như Coca vs Pepsi) không mất đi mà chuyển thành cạnh tranh dưới sự chi phối chung của tư bản tài chính nhằm tối đa hóa lợi nhuận cho cổ đông lớn.

2. Sự tách rời giữa Kinh tế thực và Kinh tế ảo:
- Kinh tế thực: tạo ra hàng hóa, dịch vụ, công nghệ, là nguồn gốc duy nhất của giá trị thặng dư thông qua lao động trực tiếp.
- Kinh tế ảo: giao dịch cổ phiếu, phái sinh, đầu cơ (tư bản giả), hoạt động theo công thức T - T' (tiền đẻ ra tiền) phản ánh kỳ vọng tương lai, không tạo ra giá trị mới mà chỉ chuyển dịch giá trị giữa các chủ thể.
- Ba nguyên nhân đầu cơ tài chính lấn át sản xuất: Tốc độ sinh lời nhanh hơn; Đòn bẩy tài chính khổng lồ; Tâm lý đầu cơ và kỳ vọng thị trường tự khuyếch đại.

3. Chủ nghĩa tư bản độc quyền nhà nước & Vai trò lịch sử:
- Sự kết hợp sức mạnh tập đoàn độc quyền với quyền lực chính trị của nhà nước thông qua can thiệp chính sách, cứu trợ tài chính, đầu tư hạ tầng và khoa học.
- Đánh giá khách quan: Thúc đẩy lực lượng sản xuất mạnh mẽ (tự động hóa, khoa học, AI, kinh tế tri thức) nhưng tồn tại mâu thuẫn cốt lõi giữa tính xã hội hóa của lực lượng sản xuất và chế độ chiếm hữu tư nhân tư bản chủ nghĩa, dẫn đến khủng hoảng chu kỳ và bất bình đẳng giàu nghèo.

Hãy trả lời bằng tiếng Việt uyên bác, lập luận chặt chẽ khoa học, sử dụng đúng các thuật ngữ trên, chia đoạn rõ ràng bằng danh sách gạch đầu dòng để người đọc dễ theo dõi, khẳng định đây là phân tích cấu trúc kinh tế thay vì thuyết âm mưu.
    `.trim();

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: context 
        ? `Bối cảnh dữ liệu đang xem: ${JSON.stringify(context)}\n\nCâu hỏi: ${prompt}`
        : prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini API error:", error);
    res.status(500).json({ 
      error: `Lỗi hệ thống khi phân tích dữ liệu: ${error.message || error}` 
    });
  }
});

async function startServer() {
  const useEmbeddedVite =
    process.env.NODE_ENV !== "production" &&
    process.env.API_ONLY !== "true";

  if (useEmbeddedVite) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
