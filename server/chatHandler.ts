import type { IncomingMessage, ServerResponse } from "node:http";

type ChatRequestBody = {
  prompt?: string;
  context?: unknown;
};

type JsonResponse = {
  text?: string;
  error?: string;
};

type RequestWithOptionalBody = IncomingMessage & {
  body?: unknown;
};

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
- Ba nguyên nhân đầu cơ tài chính lấn át sản xuất: Tốc độ sinh lời nhanh hơn; Đòn bẩy tài chính khổng lồ; Tâm lý đầu cơ và kỳ vọng thị trường tự khuếch đại.

3. Chủ nghĩa tư bản độc quyền nhà nước & Vai trò lịch sử:
- Sự kết hợp sức mạnh tập đoàn độc quyền với quyền lực chính trị của nhà nước thông qua can thiệp chính sách, cứu trợ tài chính, đầu tư hạ tầng và khoa học.
- Đánh giá khách quan: Thúc đẩy lực lượng sản xuất mạnh mẽ (tự động hóa, khoa học, AI, kinh tế tri thức) nhưng tồn tại mâu thuẫn cốt lõi giữa tính xã hội hóa của lực lượng sản xuất và chế độ chiếm hữu tư nhân tư bản chủ nghĩa, dẫn đến khủng hoảng chu kỳ và bất bình đẳng giàu nghèo.

Hãy trả lời bằng tiếng Việt uyên bác, lập luận chặt chẽ khoa học, sử dụng đúng các thuật ngữ trên, chia đoạn rõ ràng bằng danh sách gạch đầu dòng để người đọc dễ theo dõi, khẳng định đây là phân tích cấu trúc kinh tế thay vì thuyết âm mưu.
`.trim();

function getApiKey() {
  return process.env.GEMINI_API_KEY;
}

async function getAI() {
  console.log("[api/chat] Initializing GoogleGenAI client.");
  const { GoogleGenAI } = await import("@google/genai");

  return new GoogleGenAI({
    apiKey: getApiKey(),
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

async function generateChatResponse({ prompt, context }: ChatRequestBody): Promise<JsonResponse> {
  if (!prompt) {
    return { error: "Yêu cầu cung cấp câu hỏi phân tích." };
  }

  if (!getApiKey()) {
    return { error: "Thiếu biến môi trường GEMINI_API_KEY." };
  }

  const ai = await getAI();
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: context
      ? `Bối cảnh dữ liệu đang xem: ${JSON.stringify(context)}\n\nCâu hỏi: ${prompt}`
      : prompt,
    config: {
      systemInstruction,
      temperature: 0.7,
    },
  });

  return { text: response.text };
}

async function readJsonBody(req: RequestWithOptionalBody): Promise<ChatRequestBody> {
  if (typeof req.body === "string") {
    return req.body ? JSON.parse(req.body) : {};
  }

  if (req.body && typeof req.body === "object") {
    return req.body as ChatRequestBody;
  }

  const chunks: Buffer[] = [];

  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
}

function sendJson(res: ServerResponse, statusCode: number, body: JsonResponse) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(body));
}

function getErrorStatusCode(message: string) {
  return message.includes("GEMINI_API_KEY") ? 500 : 400;
}

export async function handleNodeChatRequest(req: IncomingMessage, res: ServerResponse) {
  console.log("[api/chat] Incoming request.", {
    method: req.method,
    url: req.url,
    hasGeminiApiKey: Boolean(getApiKey()),
  });

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return sendJson(res, 405, { error: "Method not allowed." });
  }

  try {
    const body = await readJsonBody(req as RequestWithOptionalBody);
    console.log("[api/chat] Request body parsed.", {
      hasPrompt: Boolean(body.prompt),
      hasContext: Boolean(body.context),
    });
    const result = await generateChatResponse(body);

    if (result.error) {
      console.error("[api/chat] Returning handled error.", result);
      return sendJson(res, getErrorStatusCode(result.error), result);
    }

    console.log("[api/chat] Response generated successfully.");
    return sendJson(res, 200, result);
  } catch (error) {
    console.error("[api/chat] Unhandled error:", error);
    return sendJson(res, 500, {
      error: `Lỗi hệ thống khi phân tích dữ liệu: ${error instanceof Error ? error.message : String(error)}`,
    });
  }
}

export function chatHandlerMiddleware(req: IncomingMessage, res: ServerResponse, next: () => void) {
  if (req.url !== "/api/chat") {
    next();
    return;
  }

  void handleNodeChatRequest(req, res);
}
