async function sendMessage() {
  const input = document.getElementById("userInput");
  const chatBox = document.getElementById("chat-box");
  const userMessage = input.value.trim();

  if (!userMessage) return;

  // Hiển thị tin nhắn người dùng
  const userDiv = document.createElement("div");
  userDiv.className = "message user";
  userDiv.textContent = userMessage;
  chatBox.appendChild(userDiv);

  input.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;

  // Hiển thị trạng thái "đang xử lý..."
  const aiDiv = document.createElement("div");
  aiDiv.className = "message ai";
  aiDiv.textContent = "Đang xử lý...";
  chatBox.appendChild(aiDiv);
  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    const res = await fetch("http://127.0.0.1:5000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage })
    });

    const data = await res.json();
    aiDiv.textContent = data.reply;
  } catch (err) {
    aiDiv.textContent = "Lỗi: " + err;
  }

  chatBox.scrollTop = chatBox.scrollHeight;
}

// Cho phép gửi bằng phím Enter
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("userInput");
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  });
});