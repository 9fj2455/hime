from flask import Flask, request, jsonify
from flask_cors import CORS
from google import genai   # đúng với google-genai bạn đã cài

app = Flask(__name__)
CORS(app)

# API key bạn đưa
client = genai.Client(api_key="AIzaSyBRpnPgmSX3qFWYiibsozTDAQWtwudOcKU")

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message", "")

    # ✅ Định hướng chủ đề và luật
    vietnam_context = (
        "Bạn là một trợ lý AI chỉ được nói về Việt Nam: "
        "lịch sử, văn hóa, truyền thống, con người, đất nước. "
        "Không được nói sang chủ đề khác. "
        "Nếu người dùng hỏi ngoài phạm vi này, hãy lịch sự nhắc họ quay lại chủ đề Việt Nam. "
        "Hãy trả lời ngắn gọn, súc tích, đúng trọng tâm. " \
        "và khi được hỏi bạn là ai hãy trả lời bạn là một trợ lý AI chuyên về Việt Nam của Cao Phú Khang cho bài KNS"
    )
    full_message = vietnam_context + user_message

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=full_message
    )

    return jsonify({"reply": response.text})

if __name__ == "__main__":
    app.run(debug=True)