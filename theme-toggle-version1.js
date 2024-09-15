// 動態插入 CSS 樣式
const css = `
/* 按鈕樣式 */
.theme-toggle-btn {
    width: 55px;
    height: 55px;
    background: rgba(0, 123, 255, 0.2);
    color: #fff;
    border: 2px solid #007bff;
    border-radius: 50%;
    position: fixed;
    top: 20px;
    right: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.6rem;
    cursor: pointer;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
    transition: background-color 0.4s ease, transform 0.4s ease, box-shadow 0.4s ease, color 0.4s ease;
    z-index: 9999;
    animation: slide-in 0.5s ease-out;
}

.theme-toggle-btn:hover {
    background: rgba(0, 123, 255, 0.3);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
    transform: scale(1.1);
}

.theme-toggle-btn:active {
    transform: scale(0.95);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

.theme-toggle-btn i {
    font-size: 1.6rem;
}

.notification {
    position: fixed;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #007bff;
    color: #fff;
    padding: 10px 20px;
    border-radius: 5px;
    opacity: 0;
    transition: opacity 0.4s ease;
}

.notification.show {
    opacity: 1;
}

.dark-mode {
    --background-color: #1e1e1e;
    --text-color: #e0e0e0;
    --button-color: #007bff;
    --button-hover-color: #0056b3;
    background-color: var(--background-color);
    color: var(--text-color);
    transition: background-color 0.4s ease, color 0.4s ease;
}

.light-mode {
    --background-color: #ffffff;
    --text-color: #000000;
    --button-color: #00bfff;
    --button-hover-color: #009acd;
    background-color: var(--background-color);
    color: var(--text-color);
    transition: background-color 0.4s ease, color 0.4s ease;
}

@keyframes slide-in {
    from {
        transform: translateX(100px);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}
`;

function insertCSS(css) {
    const style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
}

// 動態插入 boxicons.js
function insertBoxicons() {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/boxicons@2.1.4/dist/boxicons.js';
    document.head.appendChild(script);
}

// 創建通知元素
function createNotification() {
    const notification = document.createElement('div');
    notification.className = 'notification';
    document.body.appendChild(notification);
    return notification;
}

// 顯示切換主題的提示消息
function showNotification(message) {
    const notification = document.querySelector('.notification');
    notification.textContent = message;
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

// 創建並插入切換按鈕
function createThemeToggleButton() {
    const button = document.createElement('button');
    button.className = 'theme-toggle-btn';
    button.title = '切換主題';

    // 根據本地儲存或系統主題設置按鈕圖標
    const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark-mode' : 'light-mode');
    document.documentElement.classList.add(currentTheme);
    button.innerHTML = currentTheme === 'dark-mode'
        ? '<i class="bx bx-sun"></i>'
        : '<i class="bx bx-moon"></i>';

    button.addEventListener('click', () => {
        toggleTheme(button);
    });

    document.body.appendChild(button);
}

// 切換主題的功能
function toggleTheme(button) {
    const isDarkMode = document.documentElement.classList.contains('dark-mode');
    const newTheme = isDarkMode ? 'light-mode' : 'dark-mode';
    document.documentElement.classList.remove('dark-mode', 'light-mode');
    document.documentElement.classList.add(newTheme);
    localStorage.setItem('theme', newTheme);

    button.innerHTML = newTheme === 'dark-mode'
        ? '<i class="bx bx-sun"></i>'
        : '<i class="bx bx-moon"></i>';

    showNotification(newTheme === 'dark-mode' ? '已切換到深色模式' : '已切換到淺色模式');
}

// 添加鍵盤快捷鍵切換主題
function addKeyboardShortcut(button) {
    document.addEventListener('keydown', (event) => {
        if (event.key === 'T' || event.key === 't') {
            toggleTheme(button);
        }
    });
}

// 初始化函數
function initThemeToggle() {
    insertCSS(css);
    insertBoxicons(); // 動態插入 boxicons.js
    const notification = createNotification(); // 創建通知元素
    createThemeToggleButton(); // 創建切換按鈕

    // 添加按鈕的鍵盤快捷鍵
    const button = document.querySelector('.theme-toggle-btn');
    addKeyboardShortcut(button);
}

// 載入腳本
document.addEventListener('DOMContentLoaded', initThemeToggle);
