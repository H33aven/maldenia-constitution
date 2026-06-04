(function() {
    function initStarfield() {
        const canvas = document.getElementById('starfield');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let stars = [];
        const STAR_COUNT = 380;
        let mouseX = null, mouseY = null;

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            generateStars();
        }

        function generateStars() {
            stars = [];
            for (let i = 0; i < STAR_COUNT; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 1.6 + 0.4,
                    alpha: Math.random() * 0.5 + 0.2,
                    twinkle: Math.random() * Math.PI * 2,
                    twinkleSpeed: Math.random() * 0.02 + 0.003
                });
            }
        }

        window.addEventListener('resize', resizeCanvas);
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let star of stars) {
                star.twinkle += star.twinkleSpeed;
                const twinkleAlpha = 0.6 + 0.3 * Math.sin(star.twinkle);
                const finalAlpha = Math.min(star.alpha * twinkleAlpha, 0.8);

                let xOffset = 0, yOffset = 0;
                if (mouseX !== null && mouseY !== null) {
                    const dx = (mouseX - canvas.width / 2) / canvas.width;
                    const dy = (mouseY - canvas.height / 2) / canvas.height;
                    xOffset = dx * star.radius * 12;
                    yOffset = dy * star.radius * 12;
                }

                ctx.beginPath();
                ctx.arc(star.x + xOffset, star.y + yOffset, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(235, 235, 255, ${finalAlpha * 0.9})`;
                ctx.fill();

                if (star.radius > 1.0) {
                    ctx.beginPath();
                    ctx.arc(star.x + xOffset, star.y + yOffset, star.radius * 1.6, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(200, 200, 220, ${finalAlpha * 0.12})`;
                    ctx.fill();
                }
            }
            requestAnimationFrame(animate);
        }

        resizeCanvas();
        animate();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initStarfield);
    } else {
        initStarfield();
    }
})();