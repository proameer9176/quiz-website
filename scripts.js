// Handle Login
document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const username = e.target.username.value;
    const password = e.target.password.value;

    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    })
        .then((res) => res.json())
        .then((data) => {
            const loginMessage = document.getElementById("login-message");
            loginMessage.textContent = data.message || data.error;
        })
        .catch((err) => console.error(err));
});

// Handle Registration
document.getElementById("register-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const username = e.target.username.value;
    const password = e.target.password.value;

    fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    })
        .then((res) => res.json())
        .then((data) => {
            const registerMessage = document.getElementById("register-message");
            registerMessage.textContent = data.message || data.error;
        })
        .catch((err) => console.error(err));
});

// Fetch Quiz Questions
document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/quiz")
        .then((response) => response.json())
        .then((data) => {
            const quizContainer = document.querySelector(".quiz-container");

            data.forEach((question, index) => {
                const questionDiv = document.createElement("div");
                questionDiv.classList.add("question");

                const questionText = document.createElement("p");
                questionText.textContent = ${index + 1}. ${question.question};
                questionDiv.appendChild(questionText);

                for (let i = 1; i <= 4; i++) {
                    const optionLabel = document.createElement("label");
                    const optionInput = document.createElement("input");
                    optionInput.type = "radio";
                    optionInput.name = q${question.id};
                    optionInput.value = i;
                    optionLabel.appendChild(optionInput);
                    optionLabel.append(` ${question[option${i}]}`);
                    questionDiv.appendChild(optionLabel);
                }

                quizContainer.appendChild(questionDiv);
            });
        })
        .catch((error) => {
            console.error("Error fetching quiz questions:", error);
        });
});

// Handle Quiz Submission
document.getElementById("submit-quiz").addEventListener("click", () => {
    alert("Quiz submitted! Implement scoring on the backend.");
});