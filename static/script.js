const textInput = document.getElementById('textInput');
const sizeSelect = document.getElementById('sizeSelect');
const fgColor = document.getElementById('fgColor');
const bgColor = document.getElementById('bgColor');
const themeToggle = document.getElementById('themeToggle');
const generateBtn = document.getElementById('generateBtn');
const btnText = document.querySelector('.btn-text');
const btnLoader = document.querySelector('.btn-loader');
const qrSection = document.getElementById('qrSection');
const placeholder = document.getElementById('placeholder');
const qrCodeDiv = document.getElementById('qrcode');
const downloadBtn = document.getElementById('downloadBtn');
const copyBtn = document.getElementById('copyBtn');
const errorMessage = document.getElementById('errorMessage');
const presetBtns = document.querySelectorAll('.preset-btn');
const colorLabels = document.querySelectorAll('.color-label');

let currentQRData = '';
let currentQRImage = '';

function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggle.textContent = savedTheme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
}

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeToggle.textContent = newTheme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
});

fgColor.addEventListener('input', (e) => {
    colorLabels[0].textContent = e.target.value;
    if (currentQRData) generateQR(currentQRData);
});

bgColor.addEventListener('input', (e) => {
    colorLabels[1].textContent = e.target.value;
    if (currentQRData) generateQR(currentQRData);
});

presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        fgColor.value = btn.dataset.fg;
        bgColor.value = btn.dataset.bg;
        colorLabels[0].textContent = btn.dataset.fg;
        colorLabels[1].textContent = btn.dataset.bg;
        if (currentQRData) generateQR(currentQRData);
    });
});

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    setTimeout(() => errorMessage.style.display = 'none', 5000);
}

function setLoading(loading) {
    btnText.style.display = loading ? 'none' : 'block';
    btnLoader.style.display = loading ? 'block' : 'none';
    generateBtn.disabled = loading;
}

async function generateQR(text) {
    if (!text.trim()) {
        showError('Please enter some text or URL');
        return;
    }
    
    setLoading(true);
    currentQRData = text;
    
    try {
        const response = await fetch('/generate', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                text: text,
                size: parseInt(sizeSelect.value),
                fgColor: fgColor.value,
                bgColor: bgColor.value
            })
        });
        
        const data = await response.json();
        currentQRImage = data.image;
        
        qrCodeDiv.innerHTML = `<img src="${data.image}" alt="QR Code">`;
        placeholder.style.display = 'none';
        qrSection.style.display = 'block';
        setLoading(false);
    } catch (error) {
        showError('Failed to generate QR code');
        setLoading(false);
    }
}

downloadBtn.addEventListener('click', () => {
    if (!currentQRImage) return;
    const link = document.createElement('a');
    link.href = currentQRImage;
    link.download = `qr-code-${Date.now()}.png`;
    link.click();
});

copyBtn.addEventListener('click', async () => {
    if (!currentQRImage) return;
    try {
        const response = await fetch(currentQRImage);
        const blob = await response.blob();
        await navigator.clipboard.write([new ClipboardItem({'image/png': blob})]);
        
        const originalHTML = copyBtn.innerHTML;
        copyBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2"/></svg>Copied!';
        setTimeout(() => copyBtn.innerHTML = originalHTML, 2000);
    } catch {
        showError('Copy not supported');
    }
});

generateBtn.addEventListener('click', () => generateQR(textInput.value.trim()));
textInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') generateQR(textInput.value.trim());
});

sizeSelect.addEventListener('change', () => {
    if (currentQRData) generateQR(currentQRData);
});

initTheme();
textInput.focus();
