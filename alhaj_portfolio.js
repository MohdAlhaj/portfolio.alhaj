// Noor / Gentle Firefly Effect for Islamic Elegance Theme
const canvas = document.getElementById('noor-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];
const numParticles = 100;

function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
}

window.addEventListener('resize', resize);
resize();

class Particle {
    constructor() {
        this.reset();
        // randomize initial Y so they aren't all at the bottom
        this.y = Math.random() * height;
    }
    
    reset() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 100; // start slightly below screen
        this.size = Math.random() * 2 + 0.5;
        this.speedY = Math.random() * 0.5 + 0.1; // Float upwards slowly
        this.speedX = (Math.random() - 0.5) * 0.3; // Slight drift
        this.opacity = Math.random() * 0.5 + 0.1;
        this.glow = Math.random() > 0.8; // some glow brighter
    }

    update() {
        this.y -= this.speedY;
        this.x += this.speedX;

        // Reset if it goes off top or sides
        if (this.y < -10 || this.x < -10 || this.x > width + 10) {
            this.reset();
            this.y = height + 10;
        }
    }

    draw() {
        ctx.beginPath();
        
        let alpha = this.opacity;
        // pulse effect
        alpha += Math.sin(Date.now() * 0.002 + this.x) * 0.2;
        if(alpha < 0) alpha = 0;
        if(alpha > 1) alpha = 1;

        if (this.glow) {
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#D4AF37'; // Gold glow
        } else {
            ctx.shadowBlur = 0;
        }

        ctx.fillStyle = `rgba(212, 175, 55, ${alpha})`;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle());
}

function animate() {
    // Clear canvas instead of trail for clean look
    ctx.clearRect(0, 0, width, height);

    for (let particle of particles) {
        particle.update();
        particle.draw();
    }

    requestAnimationFrame(animate);
}
animate();

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Animate Icon
    const icon = hamburger.querySelector('i');
    if(navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu on link click
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = hamburger.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80, // Adjust for fixed header
                behavior: 'smooth'
            });
        }
    });
});
