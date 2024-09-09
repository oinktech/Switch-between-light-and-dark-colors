

// 動態插入 CSS 樣式
const css = `
/* 按鈕樣式 */
.theme-toggle-btn {
    width: 45px; /* 按鈕寬度 */
    height: 45px; /* 按鈕高度 */
    background: rgba(0, 123, 255, 0.25); /* 背景透明度 25% */
    color: #fff;
    border: 2px solid #007bff; /* 明顯的邊框 */
    border-radius: 50%;
    position: fixed;
    top: 20px;
    right: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem; /* 圖標大小 */
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
    z-index: 9999; /* 確保按鈕位於其他內容之上 */
}

.theme-toggle-btn:hover {
    background: rgba(0, 123, 255, 0.3); /* 懸停時更高透明度 */
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
    transform: scale(1.1);
}

.theme-toggle-btn:active {
    transform: scale(0.95);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.theme-toggle-btn i {
    font-size: 1.4rem; /* 確保圖標大小合適 */
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
    
    button.addEventListener('click', () => {
        if (document.documentElement.classList.contains('dark-mode')) {
            document.documentElement.classList.remove('dark-mode');
            document.documentElement.classList.add('light-mode');
            button.innerHTML = '<i class="bx bx-sun"></i>'; // 更改為太陽圖標
        } else {
            document.documentElement.classList.remove('light-mode');
            document.documentElement.classList.add('dark-mode');
            button.innerHTML = '<i class="bx bx-moon"></i>'; // 更改為月亮圖標
        }
    });

    document.body.appendChild(button);
}

// 檢查是否有對應的深色和淺色 CSS 樣式
function checkThemeStyles() {
    const darkModeStyles = Array.from(document.styleSheets).some(sheet => {
        try {
            return Array.from(sheet.cssRules).some(rule => rule.selectorText === ':root' && rule.style.getPropertyValue('--background-color') === '#1e1e1e');
        } catch (e) {
            return false;
        }
    });

    const lightModeStyles = Array.from(document.styleSheets).some(sheet => {
        try {
            return Array.from(sheet.cssRules).some(rule => rule.selectorText === ':root' && rule.style.getPropertyValue('--background-color') === '#ffffff');
        } catch (e) {
            return false;
        }
    });

    if (!darkModeStyles || !lightModeStyles) {
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
