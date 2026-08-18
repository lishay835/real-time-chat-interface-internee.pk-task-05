// ============================================================
// NOVA CHAT ASSISTANT
// COMPLETE JAVASCRIPT
// ============================================================


// ============================================================
// 1. GET HTML ELEMENTS
// ============================================================

const messageForm = document.getElementById("messageForm");
const messageInput = document.getElementById("messageInput");
const messagesContainer = document.getElementById("messagesContainer");
const chatHistory = document.getElementById("chatHistory");

const newChatBtn = document.getElementById("newChatBtn");
const clearChatBtn = document.getElementById("clearChatBtn");

const headerClearBtn = document.getElementById("headerClearBtn");

const sidebarThemeBtn = document.getElementById("sidebarThemeBtn");
const headerThemeBtn = document.getElementById("headerThemeBtn");

const themeMenu = document.getElementById("themeMenu");
const themeOverlay = document.getElementById("themeOverlay");
const closeThemeMenu = document.getElementById("closeThemeMenu");

const themeOptions = document.querySelectorAll(".theme-option");

const typingIndicator = document.getElementById("typingIndicator");

const emojiBtn = document.getElementById("emojiBtn");
const emojiPicker = document.getElementById("emojiPicker");


// ============================================================
// 2. LOCAL STORAGE KEYS
// ============================================================

const MESSAGE_STORAGE_KEY = "novaMessages";
const HISTORY_STORAGE_KEY = "novaChatHistory";
const THEME_STORAGE_KEY = "novaTheme";


// ============================================================
// 3. APPLICATION DATA
// ============================================================

let messages = [];
let chatHistoryData = [];

let userTypingTimer = null;
let botReplyTimer = null;

let currentChatId = null;


// ============================================================
// 4. BOT RESPONSES
// ============================================================

const botResponses = {

    greetings: [
        "Hello! 👋 Nice to hear from you. How can I help you today?",
        "Hi there! 😊 I'm NOVA. What would you like to talk about?",
        "Hey! 👋 I'm here and ready to help.",
        "Hello! Welcome to NOVA. What can I do for you?"
    ],

    morning: [
        "Good morning! ☀️ I hope you're having a great day.",
        "Good morning! 😊 What are you working on today?"
    ],

    evening: [
        "Good evening! 🌙 How can I help you?",
        "Good evening! Hope your day is going well. 😊"
    ],

    howAreYou: [
        "I'm doing great! 🤖 Thanks for asking. How are you?",
        "I'm good and ready to chat! 😊 What are you working on?",
        "I'm doing well! Everything is running smoothly."
    ],

    identity: [
        "I'm NOVA, your simple virtual chat assistant. 🤖",
        "My name is NOVA! I can chat with you and help with basic web development and study topics.",
        "I'm NOVA — a frontend chatbot created with HTML, CSS and JavaScript."
    ],

    whatDoing: [
        "I'm here waiting for your next message. 😄",
        "Right now, I'm chatting with you and ready to help!",
        "I'm processing your messages and preparing helpful responses. 🤖"
    ],

    thanks: [
        "You're very welcome! 😊",
        "No problem at all! Happy to help. ✨",
        "Anytime! Let me know if you need anything else."
    ],

    goodbye: [
        "Goodbye! 👋 Have a wonderful day!",
        "See you later! 😊 Take care.",
        "Bye! I'll be here whenever you want to chat again."
    ],

    goodNight: [
        "Good night! 🌙 Sleep well and take care.",
        "Good night! See you next time. ✨"
    ],

    help: [
        "Of course! 😊 You can ask me about HTML, CSS, JavaScript, frontend development, projects, coding or study topics.",
        "I'm here to help! Try asking me about a web development topic or a project idea.",
        "Sure! Tell me what you're working on and I'll try to guide you."
    ],

    html: [
        "HTML creates the structure of a webpage. It is used for headings, paragraphs, buttons, forms, images and other page elements.",
        "HTML is the foundation of a website. CSS handles the design and JavaScript adds interaction."
    ],

    css: [
        "CSS is used to style webpages. You can use it for colors, layouts, animations, spacing and responsive designs.",
        "CSS controls how your HTML looks. Flexbox and Grid are especially useful for modern layouts."
    ],

    javascript: [
        "JavaScript adds interactivity to webpages. It can handle clicks, forms, DOM changes, animations and localStorage.",
        "JavaScript is what makes many frontend interfaces interactive and dynamic."
    ],

    webDevelopment: [
        "Web development usually involves HTML for structure, CSS for styling and JavaScript for functionality.",
        "Frontend development focuses on what users see and interact with in a website."
    ],

    frontend: [
        "Frontend development is the client-side part of a website. HTML, CSS and JavaScript are its main building blocks.",
        "A frontend developer works on layouts, buttons, forms, animations and user interactions."
    ],

    coding: [
        "Coding is the process of writing instructions that a computer can understand and execute.",
        "Keep practicing! The best way to improve coding skills is to build small projects regularly."
    ],

    website: [
        "A website can be built using HTML, CSS and JavaScript. You can start with a simple structure and gradually add functionality.",
        "For a modern website, focus on clean structure, responsive design and useful interactions."
    ],

    project: [
        "That's interesting! 😊 A good project should solve a small problem and demonstrate useful features.",
        "For a frontend project, try adding responsive design, animations, localStorage or interactive components."
    ],

    task: [
        "Break your task into smaller features, complete the basic requirements first, then add simple improvements.",
        "Start with the required functionality and test each feature before moving to the next one."
    ],

    study: [
        "A good study routine is to learn one concept, practice it and then explain it in your own words.",
        "For programming subjects, practical examples can make difficult concepts much easier to understand."
    ],

    exam: [
        "For exams, focus on definitions, key concepts, examples and frequently asked questions.",
        "Try solving questions after studying a topic instead of only reading the notes."
    ],

    database: [
        "A database stores and organizes information so applications can efficiently access and manage it.",
        "SQL is commonly used to create, read, update and delete data in relational databases."
    ],

    programming: [
        "Programming becomes easier when you divide a large problem into smaller steps.",
        "Practice is really important in programming. Start with small problems and gradually increase the difficulty."
    ],

    responsive: [
        "Responsive design makes a website adapt to different screen sizes. CSS media queries, flexible layouts and responsive units are commonly used.",
        "Flexbox, Grid and media queries are great tools for creating responsive interfaces."
    ],

    localStorage: [
        "localStorage lets a frontend application save small amounts of data directly in the browser. Your NOVA chat uses it to remember messages.",
        "With localStorage, data can remain available even after the page is refreshed."
    ],

    joke: [
        "Why did the developer go broke? Because they used up all their cache! 😄",
        "I would tell you a programming joke... but it might need a debugger. 🤖😂",
        "Why do programmers prefer dark mode? Because light attracts bugs! 😄"
    ],

    interesting: [
        "Here's something interesting: JavaScript can update webpage content without reloading the entire page. ✨",
        "Fun fact! The browser can store data locally using localStorage, which is useful for small frontend projects."
    ],

    favorite: [
        "I don't have personal favorites, but I really enjoy talking about web development! 🤖",
        "If I had to choose, I'd probably pick JavaScript because it makes websites interactive. 😄"
    ],

    introduce: [
        "I'm NOVA! 🤖 I'm a simple frontend chatbot built with HTML, CSS and JavaScript. I can answer predefined questions, remember your chat and switch between themes.",
        "Nice to meet you! I'm NOVA, a browser-based chatbot designed for simple conversations and web-development help."
    ]

};


// ============================================================
// 5. FALLBACK RESPONSES
// ============================================================

const fallbackResponses = [
    "That's interesting! 🤔 I don't have a specific answer for that yet, but you can ask me about web development, coding, projects or study topics.",

    "I'm still learning! 🤖 Try asking me about HTML, CSS, JavaScript, frontend development, projects or programming.",

    "I understand what you're asking, but I don't have a predefined answer for that yet. You can try rephrasing your question.",

    "Hmm, I don't have an answer for that one yet. 😊 Try asking me something related to coding, websites or study.",

    "That's a good question! I can currently help with basic conversations, web development, coding and study topics."
];


// ============================================================
// 6. RANDOM RESPONSE FUNCTION
// ============================================================

function getRandomResponse(responseArray) {

    const randomIndex =
        Math.floor(Math.random() * responseArray.length);

    return responseArray[randomIndex];
}


// ============================================================
// 7. MESSAGE NORMALIZATION
// ============================================================

function normalizeMessage(text) {

    return text
        .toLowerCase()
        .replace(/[^\w\s]/gi, " ")
        .replace(/\s+/g, " ")
        .trim();
}


// ============================================================
// 8. SMART BOT RESPONSE
// ============================================================

function getBotResponse(message) {

    const text = normalizeMessage(message);


    // Greetings
    if (
        /\b(hello|hi|hey|helo|hii)\b/.test(text)
    ) {
        return getRandomResponse(botResponses.greetings);
    }


    // Morning
    if (
        text.includes("good morning")
    ) {
        return getRandomResponse(botResponses.morning);
    }


    // Evening
    if (
        text.includes("good evening")
    ) {
        return getRandomResponse(botResponses.evening);
    }


    // How are you
    if (
        text.includes("how are you") ||
        text.includes("how r you") ||
        text.includes("how are u")
    ) {
        return getRandomResponse(botResponses.howAreYou);
    }


    // Name / identity
    if (
        text.includes("your name") ||
        text.includes("who are you") ||
        text.includes("what are you")
    ) {
        return getRandomResponse(botResponses.identity);
    }


    // What are you doing
    if (
        text.includes("what are you doing") ||
        text.includes("what r you doing")
    ) {
        return getRandomResponse(botResponses.whatDoing);
    }


    // Thanks
    if (
        /\b(thanks|thank you|thx)\b/.test(text)
    ) {
        return getRandomResponse(botResponses.thanks);
    }


    // Goodbye
    if (
        /\b(bye|goodbye|see you|see ya)\b/.test(text)
    ) {
        return getRandomResponse(botResponses.goodbye);
    }


    // Good night
    if (
        text.includes("good night") ||
        text.includes("goodnight")
    ) {
        return getRandomResponse(botResponses.goodNight);
    }


    // Help
    if (
        /\b(help|assist|support)\b/.test(text)
    ) {
        return getRandomResponse(botResponses.help);
    }


    // HTML
    if (
        /\b(html|html5)\b/.test(text)
    ) {
        return getRandomResponse(botResponses.html);
    }


    // CSS
    if (
        /\b(css|styling|stylesheet)\b/.test(text)
    ) {
        return getRandomResponse(botResponses.css);
    }


    // JavaScript
    if (
        /\b(javascript|js|javascript)\b/.test(text)
    ) {
        return getRandomResponse(botResponses.javascript);
    }


    // Web development
    if (
        text.includes("web development") ||
        text.includes("web developer")
    ) {
        return getRandomResponse(botResponses.webDevelopment);
    }


    // Frontend
    if (
        /\b(frontend|front end)\b/.test(text)
    ) {
        return getRandomResponse(botResponses.frontend);
    }


    // Coding
    if (
        /\b(coding|code|programming)\b/.test(text)
    ) {
        return getRandomResponse(botResponses.coding);
    }


    // Website
    if (
        /\b(website|webpage|web site)\b/.test(text)
    ) {
        return getRandomResponse(botResponses.website);
    }


    // Project
    if (
        /\b(project|projects)\b/.test(text)
    ) {
        return getRandomResponse(botResponses.project);
    }


    // Task
    if (
        /\b(task|assignment)\b/.test(text)
    ) {
        return getRandomResponse(botResponses.task);
    }


    // Study
    if (
        /\b(study|studying|learn|learning)\b/.test(text)
    ) {
        return getRandomResponse(botResponses.study);
    }


    // Exam
    if (
        /\b(exam|exams|test|tests)\b/.test(text)
    ) {
        return getRandomResponse(botResponses.exam);
    }


    // Database
    if (
        /\b(database|sql|mysql)\b/.test(text)
    ) {
        return getRandomResponse(botResponses.database);
    }


    // Programming
    if (
        /\b(programming|programmer)\b/.test(text)
    ) {
        return getRandomResponse(botResponses.programming);
    }


    // Responsive design
    if (
        text.includes("responsive") ||
        text.includes("mobile design")
    ) {
        return getRandomResponse(botResponses.responsive);
    }


    // localStorage
    if (
        text.includes("localstorage") ||
        text.includes("local storage")
    ) {
        return getRandomResponse(botResponses.localStorage);
    }


    // Joke
    if (
        text.includes("tell me a joke") ||
        text === "joke" ||
        text.includes("funny")
    ) {
        return getRandomResponse(botResponses.joke);
    }


    // Interesting
    if (
        text.includes("interesting") ||
        text.includes("fun fact")
    ) {
        return getRandomResponse(botResponses.interesting);
    }


    // Favorite
    if (
        text.includes("favorite") ||
        text.includes("favourite")
    ) {
        return getRandomResponse(botResponses.favorite);
    }


    // Introduce
    if (
        text.includes("introduce yourself") ||
        text.includes("tell me about yourself")
    ) {
        return getRandomResponse(botResponses.introduce);
    }


    // Fallback
    return getRandomResponse(fallbackResponses);
}


// ============================================================
// 9. CURRENT TIME
// ============================================================

function getCurrentTime() {

    const now = new Date();

    return now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });
}


// ============================================================
// 10. CREATE BOT ICON
// ============================================================

function createBotIcon(className = "small-bot-icon") {

    return `
        <svg
            viewBox="0 0 64 64"
            class="${className}">

            <rect
                x="12"
                y="18"
                width="40"
                height="32"
                rx="10">
            </rect>

            <circle cx="25" cy="33" r="4"></circle>

            <circle cx="39" cy="33" r="4"></circle>

            <path d="M24 42 Q32 47 40 42"></path>

            <line
                x1="32"
                y1="18"
                x2="32"
                y2="10">
            </line>

            <circle
                cx="32"
                cy="8"
                r="3">
            </circle>

        </svg>
    `;
}


// ============================================================
// 11. ADD MESSAGE TO SCREEN
// ============================================================

function addMessageToScreen(text, sender, time) {

    const messageRow = document.createElement("div");

    messageRow.classList.add(
        "message-row",
        sender === "user"
            ? "user-message"
            : "bot-message"
    );


    if (sender === "bot") {

        messageRow.innerHTML = `

            <div class="message-avatar">
                ${createBotIcon()}
            </div>

            <div class="message-content">

                <div class="message-bubble">

                    <p>${escapeHTML(text)}</p>

                    <span class="message-time">
                        ${time}
                    </span>

                </div>

            </div>

        `;

    } else {

        messageRow.innerHTML = `

            <div class="message-content">

                <div class="message-bubble">

                    <p>${escapeHTML(text)}</p>

                    <span class="message-time">
                        ${time}
                    </span>

                </div>

            </div>

        `;

    }


    messagesContainer.appendChild(messageRow);

    scrollToBottom();
}


// ============================================================
// 12. ESCAPE HTML
// ============================================================

function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}


// ============================================================
// 13. SAVE MESSAGES
// ============================================================

function saveMessages() {

    localStorage.setItem(
        MESSAGE_STORAGE_KEY,
        JSON.stringify(messages)
    );
}


// ============================================================
// 14. LOAD MESSAGES
// ============================================================

function loadMessages() {

    const savedMessages =
        localStorage.getItem(MESSAGE_STORAGE_KEY);

    if (!savedMessages) {
        return;
    }


    try {

        messages = JSON.parse(savedMessages);

    } catch (error) {

        messages = [];

    }


    messages.forEach(message => {

        addMessageToScreen(
            message.text,
            message.sender,
            message.time
        );

    });
}


// ============================================================
// 15. SAVE CHAT HISTORY
// ============================================================

function saveChatHistory() {

    localStorage.setItem(
        HISTORY_STORAGE_KEY,
        JSON.stringify(chatHistoryData)
    );
}


// ============================================================
// 16. LOAD CHAT HISTORY
// ============================================================

function loadChatHistory() {

    const savedHistory =
        localStorage.getItem(HISTORY_STORAGE_KEY);

    if (!savedHistory) {
        return;
    }


    try {

        chatHistoryData =
            JSON.parse(savedHistory);

    } catch (error) {

        chatHistoryData = [];

    }


    renderChatHistory();
}


// ============================================================
// 17. RENDER CHAT HISTORY
// ============================================================

function renderChatHistory() {

    chatHistory.innerHTML = "";


    if (chatHistoryData.length === 0) {

        chatHistory.innerHTML = `
            <div class="empty-history">
                <p>No recent chats yet.</p>
            </div>
        `;

        return;
    }


    chatHistoryData.forEach((chat, index) => {

        const historyItem =
            document.createElement("div");

        historyItem.className = "history-item";


        if (index === 0) {
            historyItem.classList.add("active");
        }


        historyItem.innerHTML = `

            <div class="history-icon">
                💬
            </div>

            <div class="history-content">

                <h4>
                    ${escapeHTML(chat.title)}
                </h4>

                <p>
                    ${escapeHTML(chat.preview)}
                </p>

            </div>

            <span class="history-time">
                ${chat.time}
            </span>

        `;


        chatHistory.appendChild(historyItem);

    });
}


// ============================================================
// 18. ADD CHAT TO HISTORY
// ============================================================

function addToChatHistory(userText) {

    const title =
        userText.length > 24
            ? userText.substring(0, 24) + "..."
            : userText;


    const historyObject = {

        id: Date.now(),

        title: title,

        preview: userText,

        time: getCurrentTime()

    };


    chatHistoryData.unshift(historyObject);


    // Keep only latest 12 conversations
    if (chatHistoryData.length > 12) {

        chatHistoryData =
            chatHistoryData.slice(0, 12);

    }


    saveChatHistory();

    renderChatHistory();
}


// ============================================================
// 19. SAVE A SINGLE MESSAGE
// ============================================================

function saveMessage(text, sender, time) {

    messages.push({

        id: Date.now() + Math.random(),

        text: text,

        sender: sender,

        time: time

    });


    saveMessages();
}


// ============================================================
// 20. SEND USER MESSAGE
// ============================================================

function sendUserMessage() {

    const text =
        messageInput.value.trim();


    // Don't send empty messages
    if (!text) {

        messageInput.focus();

        return;

    }


    const time = getCurrentTime();


    // Show user message
    addMessageToScreen(
        text,
        "user",
        time
    );


    // Save user message
    saveMessage(
        text,
        "user",
        time
    );


    // Add to sidebar history
    addToChatHistory(text);


    // Clear input
    messageInput.value = "";


    // User has stopped typing
    setOnlineStatus();


    // Generate NOVA response
    generateBotReply(text);

}


// ============================================================
// 21. BOT REPLY
// ============================================================

function generateBotReply(userText) {

    // Show NOVA typing indicator
    showBotTyping();


    // Small realistic delay
    const delay =
        900 + Math.random() * 800;


    botReplyTimer =
        setTimeout(() => {

            const response =
                getBotResponse(userText);

            const time =
                getCurrentTime();


            hideBotTyping();


            addMessageToScreen(
                response,
                "bot",
                time
            );


            saveMessage(
                response,
                "bot",
                time
            );


        }, delay);
}


// ============================================================
// 22. SHOW BOT TYPING
// ============================================================

function showBotTyping() {

    typingIndicator.classList.add("show");

    scrollToBottom();
}


// ============================================================
// 23. HIDE BOT TYPING
// ============================================================

function hideBotTyping() {

    typingIndicator.classList.remove("show");
}


// ============================================================
// 24. SMOOTH SCROLL
// ============================================================

function scrollToBottom() {

    setTimeout(() => {

        messagesContainer.scrollTo({

            top: messagesContainer.scrollHeight,

            behavior: "smooth"

        });

    }, 50);
}


// ============================================================
// 25. USER TYPING STATUS
// ============================================================

function showUserTypingStatus() {

    const statusElement =
        document.querySelector(
            ".chat-title-text p"
        );


    if (!statusElement) {
        return;
    }


    statusElement.innerHTML = `

        <span class="online-dot"></span>
        Typing...

    `;

}


// ============================================================
// 26. USER ONLINE STATUS
// ============================================================

function setOnlineStatus() {

    const statusElement =
        document.querySelector(
            ".chat-title-text p"
        );


    if (!statusElement) {
        return;
    }


    statusElement.innerHTML = `

        <span class="online-dot"></span>
        Online

    `;

}


// ============================================================
// 27. DETECT USER TYPING
// ============================================================

messageInput.addEventListener(
    "input",
    () => {

        if (messageInput.value.trim() !== "") {

            showUserTypingStatus();

        } else {

            setOnlineStatus();

        }


        clearTimeout(userTypingTimer);


        userTypingTimer =
            setTimeout(() => {

                setOnlineStatus();

            }, 900);

    }
);


// ============================================================
// 28. FORM SUBMIT
// ============================================================

messageForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();

        sendUserMessage();

    }
);


// ============================================================
// 29. ENTER KEY
// ============================================================

messageInput.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {

            event.preventDefault();

            sendUserMessage();

        }

    }
);


// ============================================================
// 30. NEW CHAT
// ============================================================

newChatBtn.addEventListener(
    "click",
    () => {

        startNewChat();

    }
);


function startNewChat() {

    clearTimeout(botReplyTimer);

    hideBotTyping();


    messages = [];

    currentChatId = Date.now();


    saveMessages();


    // Remove all dynamically added messages
    const dynamicMessages =
        messagesContainer.querySelectorAll(
            ".message-row"
        );


    dynamicMessages.forEach(message => {

        message.remove();

    });


    messageInput.value = "";

    setOnlineStatus();

    messageInput.focus();


    scrollToBottom();

}


// ============================================================
// 31. CLEAR CHAT
// ============================================================

function clearCurrentChat() {

    clearTimeout(botReplyTimer);

    hideBotTyping();


    messages = [];

    saveMessages();


    const dynamicMessages =
        messagesContainer.querySelectorAll(
            ".message-row"
        );


    dynamicMessages.forEach(message => {

        message.remove();

    });


    messageInput.value = "";

    setOnlineStatus();

    messageInput.focus();

    scrollToBottom();

}


// ============================================================
// 32. CLEAR BUTTONS
// ============================================================

clearChatBtn.addEventListener(
    "click",
    clearCurrentChat
);


headerClearBtn.addEventListener(
    "click",
    clearCurrentChat
);


// ============================================================
// 33. THEME MENU
// ============================================================

function openThemeMenu() {

    themeMenu.classList.add("show");

    themeOverlay.classList.add("show");

}


function closeThemeMenuFunction() {

    themeMenu.classList.remove("show");

    themeOverlay.classList.remove("show");

}


sidebarThemeBtn.addEventListener(
    "click",
    openThemeMenu
);


headerThemeBtn.addEventListener(
    "click",
    openThemeMenu
);


closeThemeMenu.addEventListener(
    "click",
    closeThemeMenuFunction
);


themeOverlay.addEventListener(
    "click",
    closeThemeMenuFunction
);


// ============================================================
// 34. CHANGE THEME
// ============================================================

themeOptions.forEach(option => {

    option.addEventListener(
        "click",
        () => {

            const selectedTheme =
                option.dataset.theme;


            changeTheme(selectedTheme);

        }
    );

});


function changeTheme(theme) {

    document.body.classList.remove(
        "light-theme",
        "dark-theme",
        "warm-theme",
        "forest-theme"
    );


    document.body.classList.add(theme);


    localStorage.setItem(
        THEME_STORAGE_KEY,
        theme
    );


    updateSelectedTheme(theme);

    closeThemeMenuFunction();

}


// ============================================================
// 35. UPDATE SELECTED THEME
// ============================================================

function updateSelectedTheme(theme) {

    themeOptions.forEach(option => {

        option.classList.remove("selected");


        if (
            option.dataset.theme === theme
        ) {

            option.classList.add("selected");

        }

    });

}


// ============================================================
// 36. LOAD SAVED THEME
// ============================================================

function loadTheme() {

    const savedTheme =
        localStorage.getItem(
            THEME_STORAGE_KEY
        );


    const theme =
        savedTheme || "light-theme";


    document.body.classList.remove(
        "light-theme",
        "dark-theme",
        "warm-theme",
        "forest-theme"
    );


    document.body.classList.add(theme);


    updateSelectedTheme(theme);

}


// ============================================================
// 37. SIMPLE EMOJI BUTTON
// ============================================================

emojiBtn.addEventListener("click", () => {

    emojiPicker.classList.toggle("show");

});


const emojiButtons =
    emojiPicker.querySelectorAll("button");


emojiButtons.forEach(button => {

    button.addEventListener("click", () => {

        messageInput.value += button.textContent;

        messageInput.focus();

        showUserTypingStatus();

        emojiPicker.classList.remove("show");

    });

});


// ============================================================
// 38. INITIAL WELCOME MESSAGE
// ============================================================

function prepareWelcomeMessage() {

    if (messages.length > 0) {
        return;
    }


    /*
       The welcome message already exists
       in HTML, so we don't add it here.
    */

}


// ============================================================
// 39. APPLICATION START
// ============================================================

function initializeApp() {

    loadTheme();

    loadChatHistory();

    loadMessages();

    prepareWelcomeMessage();

    setOnlineStatus();

    messageInput.focus();

    scrollToBottom();

}


// ============================================================
// START NOVA
// ============================================================

initializeApp();