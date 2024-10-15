const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');
const welcomeScreen = document.getElementById('welcome-screen');
const startButton = document.getElementById('start-button');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

startButton.addEventListener('click', () => {
    // Sembunyikan welcome screen
    welcomeScreen.classList.add('hidden');
    // Tampilkan canvas dan mulai animasi dengan efek fade-in
    canvas.style.display = 'block';
    setTimeout(() => {
        canvas.style.opacity = '1';
        animate(); // Mulai animasi
    }, 500);
    
    // Hapus welcome screen setelah transisi
    setTimeout(() => {
        welcomeScreen.style.display = 'none';
    }, 1000);
});

function drawHeart(x, y, size, color) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
    ctx.bezierCurveTo(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
    ctx.fillStyle = color;
    ctx.fill();
}

function getHeartPosition(t, scaleFactor) {
    const scale = 15 * scaleFactor;
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
    return { x: x * scale, y: -y * scale };
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const time = Date.now() * 0.002;
    const numHearts = 150;  // Increased number of hearts for denser effect
    const layers = 3; // Number of layers around the heart shape
    
    for (let j = 0; j < layers; j++) {
        for (let i = 0; i < numHearts; i++) {
            const t = (i / numHearts) * Math.PI * 2;
            const { x, y } = getHeartPosition(t + time / 4, 1 - j * 0.15);
            const posX = canvas.width / 2 + x;
            const posY = canvas.height / 2 + y;
            const size = 8 + j * 4;
            const color = `rgba(255, 0, 150, ${0.7 - j * 0.2})`;
            
            drawHeart(posX, posY, size, color);
        }
    }
    
    requestAnimationFrame(animate);
}
