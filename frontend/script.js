// ✅ Yeh ensure karta hai ki page fully load hone ke baad JS chale
window.onload = function () {

  // ✅ Backend base URL (Spring Boot backend port 8080 par)
  const BASE_URL = "http://localhost:8080/api/users";

  // ======================================
  // 🔐 SIGNUP FUNCTION
  // ======================================
  window.signup = function () {
    // Form se input values lena
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    // Check karo koi field empty to nahi
    if (!name || !email || !password) {
      showMessage("Please fill all signup fields.");
      return;
    }

    // ✅ Fetch API call to backend: POST /register
    fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password
      })
    })
      .then(res => res.json()) // Response ko JSON me convert
      .then(data => {
        if (data.id) {
          // localStorage me user id aur name save karo
          localStorage.setItem("userId", data.id);
          localStorage.setItem("userName", data.name);

          // Success message show
          showMessage("Signup successful! Redirecting...");

          // 1 second baad main page par bhejo
          setTimeout(() => {
            window.location.href = "index.html";
          }, 1000);
        } else {
          showMessage("Signup failed.");
        }
      })
      .catch(error => {
        console.error("Signup error:", error);
        showMessage("Error while signing up.");
      });
  };

  // ======================================
  // 🔓 LOGIN FUNCTION
  // ======================================
  window.login = function () {
    // Form se email aur password lena
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    // Check karo dono fields fill kiye hain ya nahi
    if (!email || !password) {
      showMessage("Please enter email and password.");
      return;
    }

    // ✅ Fetch API call to backend: POST /login
    fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then(res => res.json()) // Response ko JSON me convert
      .then(data => {
        if (data && data.id) {
          // localStorage me login user ka data save karo
          localStorage.setItem("userId", data.id);
          localStorage.setItem("userName", data.name);

          // Success message
          showMessage("Login successful! Redirecting...");

          // 1 second baad main page par bhejo
          setTimeout(() => {
            window.location.href = "index.html";
          }, 1000);
        } else {
          showMessage("Invalid credentials.");
        }
      })
      .catch(error => {
        console.error("Login error:", error);
        showMessage("Error while logging in.");
      });
  };

  // ======================================
  // 📢 Message show karne ke liye function
  // ======================================
  function showMessage(msg) {
    document.getElementById("message").innerText = msg;
  }

};