import { importChatData } from "./chat-data.js";

export const initializeChat = () => {
    const chatLog = document.querySelector(".js-chat-log");
    const optionsContainer = document.querySelector(".js-options-container");
    const chatFrame = document.querySelector(".js-chat-frame");
    const chatData = importChatData();
    if (!chatLog || !optionsContainer || !chatFrame || !chatData) {
        return;
    }

    function addMessage(text, sender) {
        const msgDiv = document.createElement("div");
        msgDiv.classList.add("msg", sender === "bot" ? "msg-bot" : "msg-user");
        msgDiv.innerText = text;
        chatLog.appendChild(msgDiv);

        // 自動スクロール
        chatLog.scrollTop = chatLog.scrollHeight;
    }

    function showStep(stepKey) {
        const data = chatData[stepKey];

        // ボットの質問を表示
        setTimeout(() => {
            addMessage(data.question, "bot");

            // 選択肢を表示
            optionsContainer.innerHTML = "";
            data.options.forEach((opt) => {
                const btn = document.createElement("button");
                btn.innerText = opt.text;
                btn.onclick = () => {
                    addMessage(opt.text, "user"); // 自分の回答をログに出す
                    optionsContainer.innerHTML = ""; // 連打防止
                    setTimeout(() => showStep(opt.next), 500); // 少し間を置いて次へ
                };
                optionsContainer.appendChild(btn);
            });
        }, 0);
    }

    showStep("start");
    chatFrame.classList.add("is-active");
};

