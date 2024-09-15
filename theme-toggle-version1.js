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

/* 調整亮度滑塊樣式 */
.brightness-slider {
    position: fixed;
    bottom: 20px;
    left: 20px;
    z-index: 9999;
    width: 200px;
}

.brightness-slider input {
    width: 100%;
}

/* 深色模式樣式 */
.dark-mode {
    --background-color: #1e1e1e;
    --text-color: #e0e0e0;
    background-color: var(--background-color);
    color: var(--text-color);
    transition: background-color 0.4s ease, color 0.4s ease;
}

/* 淺色模式樣式 */
.light-mode {
    --background-color: #ffffff;
    --text-color: #000000;
    background-color: var(--background-color);
    color: var(--text-color);
    transition: background-color 0.4s ease, color 0.4s ease;
}

/* 顏色選擇器 */
.color-picker {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 9999;
}

.color-picker input {
    margin: 5px;
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

// 增加亮度/對比度調整滑塊
function addBrightnessSlider() {
    const slider = document.createElement('div');
    slider.className = 'brightness-slider';
    slider.innerHTML = '<input type="range" min="50" max="150" value="100">';
    document.body.appendChild(slider);

    slider.querySelector('input').addEventListener('input', (event) => {
        const brightness = event.target.value;
        document.documentElement.style.filter = `brightness(${brightness}%)`;
    });
}

// 添加顏色選擇器
function addColorPicker() {
    const picker = document.createElement('div');
    picker.className = 'color-picker';
    picker.innerHTML = `
        <input type="color" id="bgColor" name="bgColor" value="#ffffff"> 背景顏色
        <input type="color" id="textColor" name="textColor" value="#000000"> 文字顏色
    `;
    document.body.appendChild(picker);

    picker.querySelector('#bgColor').addEventListener('input', (event) => {
        const bgColor = event.target.value;
        document.documentElement.style.setProperty('--background-color', bgColor);
        localStorage.setItem('bgColor', bgColor);
    });

    picker.querySelector('#textColor').addEventListener('input', (event) => {
        const textColor = event.target.value;
        document.documentElement.style.setProperty('--text-color', textColor);
        localStorage.setItem('textColor', textColor);
    });
}

// 恢復本地儲存的顏色設置
function restoreCustomColors() {
    const savedBgColor = localStorage.getItem('bgColor');
    const savedTextColor = localStorage.getItem('textColor');

    if (savedBgColor) {
        document.documentElement.style.setProperty('--background-color', savedBgColor);
    }

    if (savedTextColor) {
        document.documentElement.style.setProperty('--text-color', savedTextColor);
    }
}

// 初始化函數
function initThemeToggle() {
    insertCSS(css);
    insertBoxicons();
    const notification = createNotification();
    createThemeToggleButton();
    addBrightnessSlider();
    addColorPicker();
    restoreCustomColors();
}

// 載入腳本
document.addEventListener('DOMContentLoaded', initThemeToggle);
