export const initializeTime = () => {
    const msgArea = document.querySelector(".js-time-message");
    const nightArea = document.querySelector(".js-time-night-only");

    if (!msgArea || !nightArea) return;

    // 現在の時間を取得 (0-23)
    const hour = new Date().getHours();
    let message = "";

    // 時間帯による出し分け
    if (hour >= 5 && hour < 12) {
        message = "☀️ おはようございます。午前中に表示されます。5時~12時です。";
    } else if (hour >= 12 && hour < 17) {
        message = "☕️ こんにちは。午後に表示されます。12時~17時です。";
    } else if (hour >= 17 && hour < 22) {
        message = "🌇 こんばんは。夜間に表示されます。17時~22時です。";
    } else {
        // 夜間（22:00 〜 4:59）
        message = "🌙 夜間に表示されます。22時~4時です。";
        nightArea.classList.add("is-active"); // 要素を表示させる
    }

    msgArea.textContent = message;
    msgArea.classList.add("is-active"); // 要素を表示させる
};
