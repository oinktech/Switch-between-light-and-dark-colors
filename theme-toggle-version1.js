// 動態插入 CSS 樣式
const css = `
/* 按鈕樣式 */
.theme-toggle-btn {
    width: 55px; /* 按鈕寬度 */
    height: 55px; /* 按鈕高度 */
    background: rgba(0, 123, 255, 0.2); /* 背景透明度 20% */
    color: #fff;
    border: 2px solid #007bff; /* 明顯的邊框 */
    border-radius: 50%;
    position: fixed;
    top: 20px;
    right: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.6rem; /* 圖標大小 */
    cursor: pointer;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
    transition: background-color 0.4s ease, transform 0.4s ease, box-shadow 0.4s ease, color 0.4s ease;
    z-index: 9999; /* 確保按鈕位於其他內容之上 */
    animation: slide-in 0.5s ease-out;
    overflow: hidden;
}

/* 按鈕光暈效果 */
.theme-toggle-btn::before {
    content: '';
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    border-radius: 50%;
    box-shadow: 0 0 15px rgba(0, 123, 255, 0.6);
    transition: box-shadow 0.4s ease;
    z-index: -1;
}

.theme-toggle-btn:hover {
    background: rgba(0, 123, 255, 0.3); /* 懸停時更高透明度 */
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
    transform: scale(1.1);
}

.theme-toggle-btn:active {
    transform: scale(0.95);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

.theme-toggle-btn i {
    font-size: 1.6rem; /* 確保圖標大小合適 */
    transition: transform 0.4s ease;
}

.theme-toggle-btn.rotating i {
    transform: rotate(360deg); /* 圖標旋轉動畫 */
}

/* 深色模式樣式 */
.dark-mode {
    --background-color: #1e1e1e;
    --text-color: #e0e0e0;
    --button-color: #007bff;
    --button-hover-color: #0056b3;
    background-color: var(--background-color);
    color: var(--text-color);
    transition: background-color 0.6s ease, color 0.6s ease; /* 主題過渡動畫 */
}

.dark-mode .theme-toggle-btn::before {
    box-shadow: 0 0 15px rgba(0, 123, 255, 0.6);
}

/* 淺色模式樣式 */
.light-mode {
    --background-color: #ffffff;
    --text-color: #000000;
    --button-color: #00bfff;
    --button-hover-color: #009acd;
    background-color: var(--background-color);
    color: var(--text-color);
    transition: background-color 0.6s ease, color 0.6s ease; /* 主題過渡動畫 */
}

.light-mode .theme-toggle-btn::before {
    box-shadow: 0 0 15px rgba(0, 191, 255, 0.6);
}

/* 動畫效果 */
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

/* 通知樣式 */
.theme-notification {
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 10px 20px;
    background-color: rgba(0, 123, 255, 0.9);
    color: #fff;
    border-radius: 5px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.4s ease, transform 0.4s ease;
}
.theme-notification.show {
    opacity: 1;
    transform: translateY(0);
}
`;

function insertCSS(css) {
    const style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
}

// 創建並插入切換按鈕
function createThemeToggleButton() {
    const button = document.createElement('button');
    button.className = 'theme-toggle-btn';
    button.innerHTML = '<i class="bx bx-moon"></i>'; // 使用 Boxicons 圖標庫
    button.title = '切換主題';

    let longPressTimer;

    button.addEventListener('mousedown', () => {
        longPressTimer = setTimeout(() => {
            resetToSystemTheme(); // 長按超過2秒切換到系統預設主題
        }, 2000);
    });

    button.addEventListener('mouseup', () => {
        clearTimeout(longPressTimer); // 如果放開得早，則不重置主題
    });

    button.addEventListener('click', () => {
        const isDarkMode = document.documentElement.classList.contains('dark-mode');
        button.classList.add('rotating'); // 添加旋轉動畫
        toggleTheme(!isDarkMode);
        showNotification(isDarkMode ? '切換至淺色模式' : '切換至深色模式');
        setTimeout(() => {
            button.classList.remove('rotating'); // 移除旋轉動畫
        }, 400); // 動畫時長
    });

    button.addEventListener('mouseover', () => {
        previewTheme(); // 預覽即將切換的主題
    });

    button.addEventListener('mouseleave', () => {
        resetPreview(); // 移除預覽效果
    });

    document.body.appendChild(button);
}

// 顯示主題切換通知
function showNotification(message) {
    let notification = document.querySelector('.theme-notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.className = 'theme-notification';
        document.body.appendChild(notification);
    }
    notification.textContent = message;
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000); // 2秒後隱藏通知
}

// 切換主題並儲存狀態
function toggleTheme(isDarkMode) {
    document.documentElement.classList.toggle('dark-mode', isDarkMode);
    document.documentElement.classList.toggle('light-mode', !isDarkMode);

    const button = document.querySelector('.theme-toggle-btn');
    button.innerHTML = isDarkMode
        ? '<i class="bx bx-sun"></i>' // 更改為太陽圖標
        : '<i class="bx bx-moon"></i>'; // 更改為月亮圖標

    // 儲存主題選擇到 localStorage
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
}

// 自動偵測系統主題
function detectSystemTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    toggleTheme(prefersDark);
}

// 重置為系統主題
function resetToSystemTheme() {
    localStorage.removeItem('theme');
    detectSystemTheme();
}

// 預覽即將切換的主題
function previewTheme() {
    const isDarkMode = document.documentElement.classList.contains('dark-mode');
    document.documentElement.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    document.documentElement.style.backgroundColor = isDarkMode ? '#ffffff' : '#1e1e1e';
    document.documentElement.style.color = isDarkMode ? '#000000' : '#e0e0e0';
}

// 重置預覽效果
function resetPreview() {
    const isDarkMode = document.documentElement.classList.contains('dark-mode');
    document.documentElement.style.backgroundColor = isDarkMode ? '#1e1e1e' : '#ffffff';
    document.documentElement.style.color = isDarkMode ? '#e0e0e0' : '#000000';
}

// 檢查是否有本地儲存的主題
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        toggleTheme(savedTheme === 'dark');
    } else {
        detectSystemTheme(); // 沒有本地儲存則偵測系統主題
    }
}

// 初始化函數
function initThemeToggle() {
    insertCSS(css);        // 插入CSS樣式
    loadSavedTheme();      // 載入儲存的主題或偵測系統主題
    createThemeToggleButton(); // 創建主題切換按鈕
}

// 監聽頁面載入事件
document.addEventListener('DOMContentLoaded', initThemeToggle);
