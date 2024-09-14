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
}

/* 深色模式樣式 */
.dark-mode {
    --background-color: #1e1e1e;
    --text-color: #e0e0e0;
    --button-color: #007bff;
    --button-hover-color: #0056b3;
    background-color: var(--background-color);
    color: var(--text-color);
}

/* 淺色模式樣式 */
.light-mode {
    --background-color: #ffffff;
    --text-color: #000000;
    --button-color: #00bfff;
    --button-hover-color: #009acd;
    background-color: var(--background-color);
    color: var(--text-color);
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
    button.title = '切換主題';

    // 根據本地儲存的主題設置按鈕圖標
    const currentTheme = localStorage.getItem('theme') || 'light-mode';
    document.documentElement.classList.add(currentTheme);
    button.innerHTML = currentTheme === 'dark-mode'
        ? '<i class="bx bx-sun"></i>' // 深色模式，顯示太陽圖標
        : '<i class="bx bx-moon"></i>'; // 淺色模式，顯示月亮圖標

    button.addEventListener('click', () => {
        const isDarkMode = document.documentElement.classList.contains('dark-mode');
        const newTheme = isDarkMode ? 'light-mode' : 'dark-mode';
        document.documentElement.classList.remove('dark-mode', 'light-mode');
        document.documentElement.classList.add(newTheme);
        localStorage.setItem('theme', newTheme); // 儲存主題到本地儲存
        button.innerHTML = newTheme === 'dark-mode'
            ? '<i class="bx bx-sun"></i>' // 更改為太陽圖標
            : '<i class="bx bx-moon"></i>'; // 更改為月亮圖標
    });

    document.body.appendChild(button);
}

// 檢查是否有對應的深色和淺色 CSS 樣式
function checkThemeStyles() {
    const stylesheets = Array.from(document.styleSheets);

    const hasDarkMode = stylesheets.some(sheet => {
        try {
            return Array.from(sheet.cssRules).some(rule =>
                rule.selectorText === '.dark-mode' || (rule.selectorText === ':root' && rule.style.getPropertyValue('--background-color') === '#1e1e1e')
            );
        } catch (e) {
            return false;
        }
    });

    const hasLightMode = stylesheets.some(sheet => {
        try {
            return Array.from(sheet.cssRules).some(rule =>
                rule.selectorText === '.light-mode' || (rule.selectorText === ':root' && rule.style.getPropertyValue('--background-color') === '#ffffff')
            );
        } catch (e) {
            return false;
        }
    });

    if (!hasDarkMode || !hasLightMode) {
        console.error('CSS 中未包含深色模式或淺色模式的樣式。請確保您的 CSS 包含這兩個模式的樣式。');
    }
}

// 初始化函數
function initThemeToggle() {
    insertCSS(css);
    checkThemeStyles();
    createThemeToggleButton();
}

// 載入腳本
document.addEventListener('DOMContentLoaded', initThemeToggle);
