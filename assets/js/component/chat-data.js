export const importChatData = () => {
    const chatData = {
        start: {
            question: "今日はどうされましたか？以下から選択してください。",
            options: [
                { text: "サービスについて", next: "service" },
                { text: "料金プラン", next: "price" },
                { text: "採用情報", next: "recruit" },
            ],
        },
        service: {
            question: "AIを活用したLP制作を行っています。興味のある機能は？",
            options: [
                { text: "チャット機能", next: "chat_detail" },
                { text: "分析機能", next: "analysis" },
                { text: "最初に戻る", next: "start" },
            ],
        },
        price: {
            question: "月額9,800円からのプランがございます。資料を見ますか？",
            options: [
                { text: "資料をダウンロード", next: "end" },
                { text: "担当者に相談", next: "end" },
                { text: "戻る", next: "start" },
            ],
        },
        recruit: {
            question: "現在、エンジニアとデザイナーを募集中です！",
            options: [
                { text: "募集要項を見る", next: "end" },
                { text: "戻る", next: "start" },
            ],
        },
        chat_detail: {
            question: "対話型でCVRを向上させます。デモを見ますか？",
            options: [
                { text: "デモを予約する", next: "end" },
                { text: "戻る", next: "service" },
            ],
        },
        analysis: {
            question: "ユーザーの離脱ポイントを可視化します。",
            options: [
                { text: "詳しく聞きたい", next: "end" },
                { text: "戻る", next: "service" },
            ],
        },
        end: {
            question:
                "ありがとうございます！以下のボタンから詳細へお進みください。",
            options: [{ text: "公式LINEへ", next: "start" }],
        },
    };
    return chatData;
};
