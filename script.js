// ==========================================
// ECOQUEST - FINAL GAMIFICATION SYSTEM
// ==========================================


// ==========================================
// PLAYER DATA
// ==========================================

let playerName =
    localStorage.getItem("ecoPlayerName") || "Eco Explorer";

let playerXP =
    Number(localStorage.getItem("ecoXP")) || 0;

let ecoActions =
    Number(localStorage.getItem("ecoActions")) || 0;

let streakDays =
    Number(localStorage.getItem("ecoStreak")) || 0;

let lastActivityDate =
    localStorage.getItem("ecoLastActivity") || "";

let badgesUnlocked =
    Number(localStorage.getItem("ecoBadges")) || 0;


// ==========================================
// QUIZ DATA
// ==========================================

let currentQuestion = 0;

let quizCompleted = false;

let quizXP = 0;


// ==========================================
// QUIZ QUESTIONS
// ==========================================

const questions = [

    {
        question:
            "Which of the following is a renewable source of energy?",

        options: [
            "A. Coal",
            "B. Petroleum",
            "C. Solar Energy",
            "D. Natural Gas"
        ],

        answer: 2
    },

    {
        question:
            "Which gas is mainly responsible for global warming?",

        options: [
            "A. Oxygen",
            "B. Carbon Dioxide",
            "C. Nitrogen",
            "D. Hydrogen"
        ],

        answer: 1
    },

    {
        question:
            "Which of these helps reduce plastic pollution?",

        options: [
            "A. Using single-use plastic",
            "B. Burning plastic",
            "C. Reusing bags and bottles",
            "D. Throwing plastic on roads"
        ],

        answer: 2
    },

    {
        question:
            "Which natural resource should we conserve carefully?",

        options: [
            "A. Water",
            "B. Plastic",
            "C. Smoke",
            "D. Waste"
        ],

        answer: 0
    },

    {
        question:
            "Which activity helps protect forests?",

        options: [
            "A. Cutting more trees",
            "B. Planting trees",
            "C. Burning forests",
            "D. Wasting paper"
        ],

        answer: 1
    }

];


// ==========================================
// UPDATE DASHBOARD
// ==========================================

function updateDashboard() {

    let level =
        Math.floor(playerXP / 100) + 1;

    let currentLevelXP =
        playerXP % 100;


    // --------------------------------------
    // PLAYER NAME
    // --------------------------------------

    const playerNameElement =
        document.getElementById("player-name");

    if (playerNameElement) {

        playerNameElement.innerHTML =
            playerName;

    }


    // --------------------------------------
    // LEVEL
    // --------------------------------------

    const levelElement =
        document.getElementById("player-level");

    if (levelElement) {

        levelElement.innerHTML =
            "Level " + level;

    }


    // --------------------------------------
    // XP
    // --------------------------------------

    const playerXPElement =
        document.getElementById("player-xp");

    if (playerXPElement) {

        playerXPElement.innerHTML =
            currentLevelXP + " / 100 XP";

    }


    // --------------------------------------
    // PROGRESS BAR
    // --------------------------------------

    const progress =
        document.getElementById("xp-progress");

    if (progress) {

        progress.style.width =
            currentLevelXP + "%";

    }


    // --------------------------------------
    // PROFILE LEVEL
    // --------------------------------------

    const profileLevel =
        document.getElementById("profile-level");

    if (profileLevel) {

        profileLevel.innerHTML =
            "Level " + level + " • " + playerName;

    }


    // --------------------------------------
    // ACTIONS
    // --------------------------------------

    const actionElement =
        document.getElementById("action-count");

    if (actionElement) {

        actionElement.innerHTML =
            ecoActions;

    }


    // --------------------------------------
    // STREAK
    // --------------------------------------

    const streakElement =
        document.getElementById("streak-count");

    if (streakElement) {

        streakElement.innerHTML =
            streakDays;

    }


    // --------------------------------------
    // QUIZ XP
    // --------------------------------------

    const quizXPElement =
        document.getElementById("xp");

    if (quizXPElement) {

        quizXPElement.innerHTML =
            playerXP;

    }


    // --------------------------------------
    // CALCULATE BADGES
    // --------------------------------------

    if (playerXP >= 500) {

        badgesUnlocked = 5;

    }

    else if (playerXP >= 300) {

        badgesUnlocked = 4;

    }

    else if (playerXP >= 200) {

        badgesUnlocked = 3;

    }

    else if (playerXP >= 100) {

        badgesUnlocked = 2;

    }

    else if (playerXP >= 50) {

        badgesUnlocked = 1;

    }

    else {

        badgesUnlocked = 0;

    }


    // --------------------------------------
    // BADGE COUNT
    // --------------------------------------

    const badgeCount =
        document.getElementById("badge-count");

    if (badgeCount) {

        badgeCount.innerHTML =
            badgesUnlocked;

    }


    // --------------------------------------
    // LEADERBOARD NAME
    // --------------------------------------

    const playerRank =
        document.querySelector(
            "#player-rank strong"
        );

    if (playerRank) {

        playerRank.innerHTML =
            "🎓 " + playerName;

    }


    // --------------------------------------
    // LEADERBOARD XP
    // --------------------------------------

    const leaderboardXP =
        document.getElementById(
            "leaderboard-xp"
        );

    if (leaderboardXP) {

        leaderboardXP.innerHTML =
            playerXP + " XP";

    }


    // --------------------------------------
    // UPDATE BADGES
    // --------------------------------------

    updateBadges();


    // --------------------------------------
    // SAVE EVERYTHING
    // --------------------------------------

    localStorage.setItem(
        "ecoPlayerName",
        playerName
    );

    localStorage.setItem(
        "ecoXP",
        playerXP
    );

    localStorage.setItem(
        "ecoActions",
        ecoActions
    );

    localStorage.setItem(
        "ecoStreak",
        streakDays
    );

    localStorage.setItem(
        "ecoLastActivity",
        lastActivityDate
    );

    localStorage.setItem(
        "ecoBadges",
        badgesUnlocked
    );

}


// ==========================================
// UPDATE BADGES
// ==========================================

function updateBadges() {

    const badges = [

        {
            id: "badge-1",
            xp: 50
        },

        {
            id: "badge-2",
            xp: 100
        },

        {
            id: "badge-3",
            xp: 200
        },

        {
            id: "badge-4",
            xp: 300
        },

        {
            id: "badge-5",
            xp: 500
        }

    ];


    badges.forEach(function(badge) {

        const badgeCard =
            document.getElementById(
                badge.id
            );


        if (!badgeCard) {

            return;

        }


        const status =
            badgeCard.querySelector(
                "strong"
            );


        if (!status) {

            return;

        }


        if (playerXP >= badge.xp) {

            status.innerHTML =
                "🏆 Unlocked";

        }

        else {

            status.innerHTML =
                "🔒 Locked";

        }

    });

}


// ==========================================
// UPDATE STREAK
// ==========================================

function updateStreak() {

    const today =
        new Date().toDateString();


    // Already active today
    if (
        lastActivityDate === today
    ) {

        return;

    }


    // First activity
    if (
        lastActivityDate === ""
    ) {

        streakDays = 1;

    }

    else {

        const lastDate =
            new Date(
                lastActivityDate
            );

        const currentDate =
            new Date(today);


        const difference =
            Math.floor(
                (
                    currentDate -
                    lastDate
                ) /
                (
                    1000 *
                    60 *
                    60 *
                    24
                )
            );


        // Next day
        if (
            difference === 1
        ) {

            streakDays++;

        }


        // Missed a day
        else if (
            difference > 1
        ) {

            streakDays = 1;

        }

    }


    lastActivityDate =
        today;


    localStorage.setItem(
        "ecoStreak",
        streakDays
    );

    localStorage.setItem(
        "ecoLastActivity",
        lastActivityDate
    );


    updateDashboard();

}


// ==========================================
// START QUEST
// ==========================================

function startQuest() {

    const quiz =
        document.getElementById(
            "quiz"
        );


    if (quiz) {

        quiz.scrollIntoView({

            behavior: "smooth"

        });

    }

}


// ==========================================
// CHECK ANSWER
// ==========================================

function checkAnswer(
    button,
    selectedAnswer
) {

    if (quizCompleted) {

        return;

    }


    const question =
        questions[
            currentQuestion
        ];


    const buttons =
        document.querySelectorAll(
            ".options button"
        );


    // Disable buttons
    buttons.forEach(
        function(btn) {

            btn.disabled = true;

        }
    );


    // ======================================
    // CORRECT
    // ======================================

    if (
        selectedAnswer ===
        question.answer
    ) {

        quizXP += 50;

        playerXP += 50;


        document.getElementById(
            "quiz-result"
        ).innerHTML =
            "🎉 Correct! +50 XP";


        document.getElementById(
            "quiz-result"
        ).style.color =
            "#249447";


        button.style.background =
            "#dff6e3";


        button.style.borderColor =
            "#249447";


        updateStreak();

    }


    // ======================================
    // WRONG
    // ======================================

    else {

        document.getElementById(
            "quiz-result"
        ).innerHTML =
            "❌ Wrong Answer!";


        document.getElementById(
            "quiz-result"
        ).style.color =
            "#d63031";


        button.style.background =
            "#ffe1e1";


        button.style.borderColor =
            "#d63031";


        buttons[
            question.answer
        ].style.background =
            "#dff6e3";


        buttons[
            question.answer
        ].style.borderColor =
            "#249447";

    }


    updateDashboard();


    setTimeout(
        nextQuestion,
        1200
    );

}


// ==========================================
// NEXT QUESTION
// ==========================================

function nextQuestion() {

    currentQuestion++;


    if (
        currentQuestion >=
        questions.length
    ) {

        finishQuiz();

        return;

    }


    const question =
        questions[
            currentQuestion
        ];


    const questionNumber =
        document.querySelector(
            ".quiz-header span:first-child"
        );


    if (questionNumber) {

        questionNumber.innerHTML =
            "Question " +
            (
                currentQuestion + 1
            ) +
            " of " +
            questions.length;

    }


    document.getElementById(
        "question"
    ).innerHTML =
        question.question;


    const buttons =
        document.querySelectorAll(
            ".options button"
        );


    buttons.forEach(
        function(
            button,
            index
        ) {

            button.disabled =
                false;


            button.innerHTML =
                question.options[
                    index
                ];


            button.style.background =
                "#f3f8f3";


            button.style.borderColor =
                "#dceadd";

        }
    );


    document.getElementById(
        "quiz-result"
    ).innerHTML = "";

}


// ==========================================
// QUIZ COMPLETE
// ==========================================

function finishQuiz() {

    quizCompleted = true;


    let percentage =
        Math.round(
            (
                quizXP /
                (
                    questions.length *
                    50
                )
            ) *
            100
        );


    let level =
        Math.floor(
            playerXP / 100
        ) + 1;


    updateDashboard();


    document.querySelector(
        ".quiz-card"
    ).innerHTML = `

        <div style="text-align:center;">

            <div style="font-size:60px;">
                🏆
            </div>

            <h2>
                Quiz Completed!
            </h2>

            <p style="
                font-size:20px;
                margin:20px 0;
            ">
                Great job, ${playerName}!
            </p>

            <div style="
                background:#e8f5e5;
                padding:25px;
                border-radius:20px;
                margin:20px 0;
            ">

                <h3>
                    ⭐ ${quizXP} XP
                </h3>

                <p>
                    Score: ${percentage}%
                </p>

                <p>
                    🌱 Level ${level}
                </p>

                <p>
                    🏅 Badges: ${badgesUnlocked}
                </p>

                <p>
                    🔥 Streak: ${streakDays} Days
                </p>

            </div>

            <button
                class="primary-btn"
                onclick="restartQuiz()">

                Play Again 🔄

            </button>

        </div>

    `;

}


// ==========================================
// RESTART QUIZ
// ==========================================

function restartQuiz() {

    // Keep total XP
    // Keep badges
    // Keep streak
    // Keep actions

    quizXP = 0;

    currentQuestion = 0;

    quizCompleted = false;


    location.reload();

}


// ==========================================
// QUEST SYSTEM
// ==========================================

function completeQuest(
    points
) {

    playerXP += points;

    ecoActions++;


    updateStreak();

    updateDashboard();


    alert(

        "🎉 Quest Completed!\n\n+" +
        points +
        " XP earned!"

    );

}


// ==========================================
// DASHBOARD BUTTON
// ==========================================

function openDashboard() {

    let level =
        Math.floor(
            playerXP / 100
        ) + 1;


    alert(

        "📊 EcoQuest Dashboard\n\n" +

        "👤 Player: " +
        playerName +
        "\n\n" +

        "⭐ XP: " +
        playerXP +
        "\n" +

        "🌱 Level: " +
        level +
        "\n" +

        "🔥 Streak: " +
        streakDays +
        " Days\n" +

        "🏆 Badges: " +
        badgesUnlocked +
        "\n" +

        "🎯 Actions: " +
        ecoActions

    );

}


// ==========================================
// HOW IT WORKS
// ==========================================

function showInfo() {

    alert(

        "🌱 How EcoQuest Works\n\n" +

        "1. Complete environmental quests\n" +

        "2. Answer environmental quizzes\n" +

        "3. Earn XP\n" +

        "4. Level up\n" +

        "5. Unlock badges\n" +

        "6. Build your daily streak\n" +

        "7. Compete on the leaderboard"

    );

}


// ==========================================
// LOGIN / PLAYER NAME
// ==========================================

function login() {

    let name =
        prompt(
            "🌱 Welcome to EcoQuest!\n\nEnter your name:"
        );


    if (
        name !== null &&
        name.trim() !== ""
    ) {

        playerName =
            name.trim();


        localStorage.setItem(
            "ecoPlayerName",
            playerName
        );


        updateDashboard();


        alert(

            "🎉 Welcome, " +
            playerName +
            "!\n\n" +

            "Your EcoQuest profile is ready."

        );

    }

}


// ==========================================
// INITIAL DASHBOARD
// ==========================================

updateDashboard();