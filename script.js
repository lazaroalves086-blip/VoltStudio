const canvas = document.getElementById('ambient-canvas');
const ctx = canvas.getContext('2d');

let particles = [];

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class AmbientParticle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        
        // Mistura de partículas cinzas/azuis sutis e algumas laranjas para remeter à marca
        const isOrange = Math.random() > 0.85;
        this.color = isOrange ? 'rgba(255, 85, 0, 0.4)' : 'rgba(209, 213, 219, 0.15)';
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Rebater nas bordas suavemente
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

function init() {
    particles = [];
    // Calcula a quantidade de partículas com base no tamanho da tela para não pesar em celulares
    let quantity = (canvas.width * canvas.height) / 12000; 
    for(let i = 0; i < quantity; i++) {
        particles.push(new AmbientParticle());
    }
}

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        p.update();
        p.draw();
    });

    requestAnimationFrame(loop);
}

init();
loop();
