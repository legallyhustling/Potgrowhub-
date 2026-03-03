// ===============================
// GANJAGURU ADVANCED SCRIPT.JS
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    // ===============================
    // AGE GATE (Persistent)
    // ===============================
    const ageGate = document.getElementById("ageGate");
    if (localStorage.getItem("ageVerified") === "true") {
        ageGate.style.display = "none";
    }

    window.enterSite = function () {
        localStorage.setItem("ageVerified", "true");
        ageGate.style.opacity = "0";
        setTimeout(() => ageGate.style.display = "none", 500);
    };

    // ===============================
    // SIDE MENU TOGGLE
    // ===============================
    const menuToggle = document.getElementById("menuToggle");
    const sideMenu = document.getElementById("sideMenu");
    const menuOverlay = document.getElementById("menuOverlay");

    menuToggle.addEventListener("click", () => {
        sideMenu.classList.toggle("open");
        menuOverlay.classList.toggle("active");
    });

    menuOverlay.addEventListener("click", () => {
        sideMenu.classList.remove("open");
        menuOverlay.classList.remove("active");
    });

    // ===============================
    // DARK MODE TOGGLE
    // ===============================
    const darkToggle = document.getElementById("darkToggle");

    darkToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
    });

    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark-mode");
    }

    // ===============================
    // SMOOTH SCROLL
    // ===============================
    document.querySelectorAll("a[href^='#']").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    // ===============================
    // HERO BUTTONS NAVIGATION
    // ===============================
    const heroButtons = document.querySelectorAll(".hero .btn-neon");
    heroButtons[0].addEventListener("click", () => {
        document.getElementById("ai").scrollIntoView({ behavior: "smooth" });
    });
    heroButtons[1].addEventListener("click", () => {
        document.getElementById("features").scrollIntoView({ behavior: "smooth" });
    });

    // ===============================
    // SECTION FADE-IN ON SCROLL
    // ===============================
    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("fade-in");
            }
        });
    }, { threshold: 0.2 });

    sections.forEach(section => observer.observe(section));

    // ===============================
    // SEARCH FILTER
    // ===============================
    const searchInput = document.querySelector(".search-input");

    searchInput.addEventListener("keyup", function () {
        const value = this.value.toLowerCase();
        sections.forEach(section => {
            section.style.display =
                section.innerText.toLowerCase().includes(value) ? "block" : "none";
        });
    });

    // ===============================
    // CHAT AI ENGINE
    // ===============================
    const chatInput = document.querySelector(".chatbox input");
    const chatButton = document.querySelector(".chatbox button");
    const chatbox = document.querySelector(".chatbox");

    function addMessage(text, type = "bot") {
        const msg = document.createElement("div");
        msg.style.marginTop = "10px";
        msg.innerHTML = `<strong>${type === "bot" ? "Guru" : "You"}:</strong> ${text}`;
        chatbox.appendChild(msg);
        chatbox.scrollTop = chatbox.scrollHeight;
    }

    function aiResponse(input) {
        input = input.toLowerCase();

        if (input.includes("strain"))
            return "Based on current trends, hybrid citrus-dominant strains are popular for balanced energy and relaxation.";

        if (input.includes("grow"))
            return "Smart IoT grow modules optimize humidity, lighting, and nutrients automatically.";

        if (input.includes("eco"))
            return "All products are hemp-based, biodegradable, and sustainably sourced.";

        if (input.includes("delivery"))
            return "Our AI dispatch engine optimizes routes for fast eco delivery.";

        if (input.includes("3d"))
            return "Upload your design and preview it instantly with AI-assisted structural optimization.";

        return "AI Concierge activated. Ask about strains, eco sourcing, grow rooms, AR/VR previews, or monetization strategies.";
    }

    chatButton.addEventListener("click", () => {
        const value = chatInput.value.trim();
        if (!value) return;

        addMessage(value, "user");
        const response = aiResponse(value);

        setTimeout(() => addMessage(response, "bot"), 600);

        incrementBudz(5);
        chatInput.value = "";
    });

    chatInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") chatButton.click();
    });

    // ===============================
    // VOICE RECOGNITION
    // ===============================
    if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.lang = "en-US";

        chatbox.addEventListener("dblclick", () => {
            recognition.start();
        });

        recognition.onresult = function (event) {
            chatInput.value = event.results[0][0].transcript;
            chatButton.click();
        };
    }

    // ===============================
    // BUDZ GAMIFICATION SYSTEM
    // ===============================
    let budz = parseInt(localStorage.getItem("budz") || 0);

    function incrementBudz(amount) {
        budz += amount;
        localStorage.setItem("budz", budz);
        checkLevel();
    }

    function checkLevel() {
        if (budz > 100) alert("🔥 Platinum Budz Level Unlocked!");
        else if (budz > 50) alert("⚡ Gold Budz Level Unlocked!");
    }

    // ===============================
    // DELIVERY SIMULATION
    // ===============================
    const deliverySection = document.getElementById("delivery");
    deliverySection.addEventListener("click", () => {
        alert("🚚 AI Dispatch Activated. Route optimized. ETA: 24 minutes.");
    });

    // ===============================
    // FAQ INTERACTION
    // ===============================
    document.querySelectorAll("#faq p strong").forEach(item => {
        item.style.cursor = "pointer";
        item.addEventListener("click", function () {
            this.parentElement.classList.toggle("fade-in");
        });
    });

    // ===============================
    // SCROLL PROGRESS BAR
    // ===============================
    const progressBar = document.createElement("div");
    progressBar.style.position = "fixed";
    progressBar.style.top = "0";
    progressBar.style.left = "0";
    progressBar.style.height = "4px";
    progressBar.style.background = "#00ff88";
    progressBar.style.zIndex = "9999";
    document.body.appendChild(progressBar);

    window.addEventListener("scroll", () => {
        const scroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const percent = (scroll / height) * 100;
        progressBar.style.width = percent + "%";
    });

    // ===============================
    // ACCESSIBILITY ENHANCEMENT
    // ===============================
    document.querySelectorAll("button").forEach(btn => {
        if (!btn.getAttribute("aria-label")) {
            btn.setAttribute("aria-label", btn.innerText || "Button");
        }
    });

});