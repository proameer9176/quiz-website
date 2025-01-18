document.getElementById("register-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("reg-username").value;
    const password = document.getElementById("reg-password").value;
  
    const res = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
  
    const data = await res.json();
    alert(data.message);
  });
  
  document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;
  
    const res = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
  
    const data = await res.json();
    if (data.message) {
      alert(data.message);
      loadQuiz();
    } else {
      alert(data.error);
    }
  });
  
  async function loadQuiz() {
    const res = await fetch("http://localhost:3000/quiz");
    const questions = await res.json();
    const quizContainer = document.getElementById("quiz");
    quizContainer.innerHTML = questions.map((q, i) => `
      <div>
        <p>${i + 1}. ${q.question}</p>
        <input type="radio" name="q${q.id}" value="1"> ${q.option1}<br>
        <input type="radio" name="q${q.id}" value="2"> ${q.option2}<br>
        <input type="radio" name="q${q.id}" value="3"> ${q.option3}<br>
        <input type="radio" name="q${q.id}" value="4"> ${q.option4}<br>
      </div>
    `).join("");
    document.getElementById("quiz-container").style.display = "block";
  }