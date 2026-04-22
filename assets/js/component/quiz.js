export const initializeQuiz = () => {
    const quizContainer = document.querySelector(".js-quiz-container");
    const quizResult = document.querySelector(".js-quiz-result");
    const quizResultText = document.querySelector(".js-quiz-result-text");
    const quizButton = document.querySelector(".js-quiz-button");
    if (!quizContainer || !quizResult || !quizResultText || !quizButton) {
        return;
    }

    // 1. データ定義
    const questions = [
        {
            id: 1,
            text: "パソコン作業は好きですか？",
            points: { engineer: 10, designer: 5, sales: -2 },
        },
        {
            id: 2,
            text: "人と話すのが得意ですか？",
            points: { sales: 10, director: 7, engineer: -5 },
        },
        {
            id: 3,
            text: "クリエイティブなことがしたい？",
            points: { designer: 10, director: 5, sales: 1 },
        },
        {
            id: 4,
            text: "リーダー気質はありますか？",
            points: { director: 10, engineer: 5, designer: -2 },
        },
    ];

    // ユーザーの回答を保持するオブジェクト
    let userAnswers = {};

    // 2. UIの生成
    questions.forEach((q) => {
        const quizDiv = document.createElement("div");
        quizDiv.className = "quiz-question";
        quizDiv.innerHTML = `
        <p class="quiz-question-text">${q.text}</p>
        <div class="quiz-button-options">
            <button class="quiz-button-option" data-id="${q.id}" data-val="true">はい</button>
            <button class="quiz-button-option" data-id="${q.id}" data-val="false">いいえ</button>
        </div>
    `;
        quizContainer.appendChild(quizDiv);
    });

    quizContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("quiz-button-option")) {
            const val = e.target.dataset.val === "true";

            select(e.target, e.target.dataset.id, val);
        }
    });

    // 3. 選択処理
    function select(btn, qId, val) {
        // 同じ質問内のボタンのactiveクラスを外す
        const parent = btn.parentElement;
        Array.from(parent.children).forEach((b) =>
            b.classList.remove("active"),
        );
        // 選択されたボタンを青くする
        btn.classList.add("active");
        // 回答を保存
        userAnswers[qId] = val;
    }

    // 4. 集計と結果表示（reduceを使用）
    function showResult() {
        // 質問数すべてに答えていない場合の簡易チェック
        if (Object.keys(userAnswers).length < questions.length) {
            alert("すべての質問に答えてください！");
            return;
        }

        // reduceでスコアを集計
        const scores = Object.entries(userAnswers).reduce(
            (acc, [qId, isYes]) => {
                if (!isYes) return acc; // 「いいえ」の場合は加算しない

                const question = questions.find((q) => q.id === parseInt(qId));
                for (const [job, pts] of Object.entries(question.points)) {
                    acc[job] = (acc[job] || 0) + pts;
                }
                return acc;
            },
            {},
        );

        const scoreEntries = Object.entries(scores);
        if (scoreEntries.length === 0) {
            quizResultText.innerText =
                "該当がなかったため、再度診断をお願いします。";
            quizResult.style.display = "block";
            return;
        }

        // 最も高いスコアの職種を特定
        const bestJob = scoreEntries.sort((a, b) => b[1] - a[1])[0][0];

        // 日本語名に変換して表示
        const jobNames = {
            engineer: "エンジニア",
            sales: "営業職",
            designer: "デザイナー",
            director: "ディレクター",
        };
        quizResultText.innerText = jobNames[bestJob]+"です！" || "分析不能";
        quizResult.style.display = "block";
    }
    quizButton.addEventListener("click", () => {
        showResult();
    });
};
