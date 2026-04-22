export const initializeCalculator = () => {
    const serviceSelect = document.querySelector(".js-input-service");
    const areaSelect = document.querySelector(".js-input-area");
    const displayBaseText = document.querySelector(".js-display-base");
    const displayAdjText = document.querySelector(".js-display-adj");
    const displayShipText = document.querySelector(".js-display-ship");
    const displayTotalText = document.querySelector(".js-display-total");

    if (
        !serviceSelect ||
        !areaSelect ||
        !displayBaseText ||
        !displayAdjText ||
        !displayShipText ||
        !displayTotalText
    ) {
        return;
    }

    // 地域別の設定
    const areaData = {
        TOKYO: { laborFactor: 1.2, shipping: 500 },
        OSAKA: { laborFactor: 1.1, shipping: 800 },
        OKINAWA: { laborFactor: 1.0, shipping: 5000 },
        DEFAULT: { laborFactor: 1.0, shipping: 1500 },
    };

    // 計算と表示の更新関数
    const updatePrice = () => {
        const basePrice = parseInt(serviceSelect.value);
        const areaKey = areaSelect.value;
        const area = areaData[areaKey] || areaData["DEFAULT"];
        if (!basePrice || !area) {
            displayBaseText.textContent = `--`;
            displayAdjText.textContent = `--`;
            displayShipText.textContent = `--`;
            displayTotalText.textContent = `--`;
            return;
        }

        // 金額の計算
        const laborAdjustment = Math.round(basePrice * (area.laborFactor - 1));
        const totalPrice = basePrice + laborAdjustment + area.shipping;

        // 画面への反映 ￥表記に変換
        displayBaseText.textContent = `¥${basePrice.toLocaleString()}`;
        displayAdjText.textContent = `¥${Math.floor(laborAdjustment).toLocaleString()}`;
        displayShipText.textContent = `¥${area.shipping.toLocaleString()}`;
        displayTotalText.textContent = `¥${Math.floor(totalPrice).toLocaleString()}`;
    };

    // イベントリスナーの設定 (値が変わるたびに計算)
    serviceSelect.addEventListener("change", updatePrice);
    areaSelect.addEventListener("change", updatePrice);

    // 初期表示の実行
    updatePrice();
};
