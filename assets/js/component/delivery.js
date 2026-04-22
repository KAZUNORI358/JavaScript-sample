export const initializeDelivery = () => {
    const Input = document.querySelector(".js-delivery-input");
    const Button = document.querySelector(".js-delivery-button");
    const ResultMessage = document.querySelector(".js-delivery-result-message");
    if (!Input || !Button || !ResultMessage) {
        return;
    }

    // 配送不可ルールの定義
    const EXCLUDED_RULES = {
        prefixes: ["100", "200", "901"], // 離島や特定地域の上3桁
        fullZips: ["9998888"], // ピンポイントな除外番号
    };

    /**
     * 判定メインロジック
     */
    function validateDelivery(zipCode) {
        const cleanZip = zipCode.replace(/-/g, "").trim();

        if (!/^\d{7}$/.test(cleanZip)) {
            return {
                deliverable: false,
                message: "郵便番号は7桁の数字で入力してください。",
            };
        }

        const isExcluded =
            EXCLUDED_RULES.fullZips.includes(cleanZip) ||
            EXCLUDED_RULES.prefixes.some((prefix) =>
                cleanZip.startsWith(prefix),
            );

        if (isExcluded) {
            return {
                deliverable: false,
                message:
                    "誠に恐れ入りますが、ご入力いただいた地域は現在配送を承っておりません。",
            };
        }

        return {
            deliverable: true,
            message:
                "ご指定の地域への配送が可能です！そのまま購入手続きへお進みください。",
        };
    }

    /**
     * 画面への結果表示
     */
    function displayResult() {
        const val = Input.value;
        if (!val) return;

        const result = validateDelivery(val);

        ResultMessage.textContent = result.message;
        ResultMessage.classList.remove("is-success", "is-error");
        ResultMessage.classList.add(
            result.deliverable ? "is-success" : "is-error",
        );
    }

    // イベントリスナー
    Button.addEventListener("click", displayResult);

    // Enterキーでも判定できるようにする
    Input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") displayResult();
    });
};
