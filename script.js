document.addEventListener('DOMContentLoaded', function() {
    // Elementleri seç
    const bloomBtn = document.getElementById('bloomBtn');
    const resetBtn = document.getElementById('resetBtn');
    const lightBtn = document.getElementById('lightBtn');
    const petals = document.querySelectorAll('.petal');
    const sparkles = document.querySelectorAll('.sparkle');
    const flowerCenter = document.querySelector('.flower-center');
    const lights = document.querySelectorAll('.light');
    const poemLines = document.querySelectorAll('.poem-line');
    const audio = document.getElementById('bloomSound');
    
    // Çiçek açma durumu
    let isBloomed = false;
    let lightsOn = true;
    
    // Çiçek açma animasyonu
    bloomBtn.addEventListener('click', function() {
        if (isBloomed) return;
        
        isBloomed = true;
        
        // Ses çal (eğer kullanıcı etkileşimde bulunduysa)
        try {
            audio.currentTime = 0;
            audio.play();
        } catch (e) {
            console.log("Ses oynatılamadı, devam ediliyor...");
        }
        
        // Her bir yaprak için animasyon
        petals.forEach((petal, index) => {
            // Her yaprağa farklı gecikme
            const delay = index * 100 + Math.random() * 100;
            
            // CSS değişkeni ile dönüş açısını ayarla
            const rotation = getComputedStyle(petal).transform;
            
            setTimeout(() => {
                petal.style.opacity = '1';
                petal.style.animation = `bloomPetal 1.5s ease-out forwards`;
                petal.style.setProperty('--rotate', `${index * 22.5}deg`);
                
                // 3D efekt
                petal.style.transform += ' translateZ(20px)';
                
                // Renk geçişi efekti
                if (index < 8) {
                    petal.style.background = 'linear-gradient(45deg, #ff6b9d, #ff8fab, #ffccd5)';
                }
                
            }, delay);
        });
        
        // Çiçek merkezi parıltısı
        setTimeout(() => {
            flowerCenter.style.animation = 'glow 2s infinite alternate';
            flowerCenter.style.transform = 'translate(-50%, -50%) scale(1.2)';
            
            // Parıltıları aktif et
            sparkles.forEach((sparkle, index) => {
                setTimeout(() => {
                    sparkle.style.animation = `sparkle 2s infinite`;
                    sparkle.style.animationDelay = `${index * 0.5}s`;
                }, index * 300);
            });
            
            // Şiir satırlarını yavaşça göster
            poemLines.forEach((line, index) => {
                setTimeout(() => {
                    line.style.opacity = '1';
                    line.style.transform = 'translateX(0)';
                }, 1000 + (index * 200));
            });
            
        }, 1000);
        
        // Buton güncelleme
        bloomBtn.innerHTML = '<i class="fas fa-check"></i> Çiçek Açtı!';
        bloomBtn.style.background = 'linear-gradient(45deg, #06d6a0, #4cc9f0)';
    });
    
    // Sıfırlama butonu
    resetBtn.addEventListener('click', function() {
        isBloomed = false;
        
        // Yaprakları sıfırla
        petals.forEach(petal => {
            petal.style.opacity = '0';
            petal.style.animation = 'none';
            petal.style.background = '';
            petal.style.transform = '';
            
            // Küçük bir gecikme ile transform'u sıfırla
            setTimeout(() => {
                petal.style.transform = petal.style.transform.replace('translateZ(20px)', '');
            }, 10);
        });
        
        // Çiçek merkezini sıfırla
        flowerCenter.style.animation = '';
        flowerCenter.style.transform = 'translate(-50%, -50%) scale(1)';
        
        // Parıltıları kapat
        sparkles.forEach(sparkle => {
            sparkle.style.animation = '';
        });
        
        // Şiir satırlarını gizle
        poemLines.forEach(line => {
            line.style.opacity = '0.5';
            line.style.transform = 'translateX(-20px)';
        });
        
        // Butonu sıfırla
        bloomBtn.innerHTML = '<i class="fas fa-seedling"></i> Çiçeği Açtır';
        bloomBtn.style.background = 'linear-gradient(45deg, #ff6b9d, #ff8fab)';
    });
    
    // Işıklar butonu
    lightBtn.addEventListener('click', function() {
        lightsOn = !lightsOn;
        
        if (lightsOn) {
            lights.forEach(light => {
                light.style.opacity = '1';
            });
            lightBtn.innerHTML = '<i class="fas fa-lightbulb"></i> Işıkları Kapat';
        } else {
            lights.forEach(light => {
                light.style.opacity = '0.3';
            });
            lightBtn.innerHTML = '<i class="fas fa-lightbulb"></i> Işıkları Aç';
        }
    });
    
    // Sayfa yüklendiğinde şiir satırlarını hazırla
    poemLines.forEach(line => {
        line.style.opacity = '0.5';
        line.style.transform = 'translateX(-20px)';
        line.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });
    
    // Sayfa yüklendiğinde çiçeği biraz hareket ettir
    const flower = document.querySelector('.flower');
    let angle = 0;
    
    function floatFlower() {
        if (!isBloomed) {
            angle += 0.5;
            const floatY = Math.sin(angle * Math.PI / 180) * 10;
            flower.style.transform = `translateX(-50%) translateY(${floatY}px)`;
        }
        requestAnimationFrame(floatFlower);
    }
    
    floatFlower();
    
    // İsim harflerine tıklama efekti
    const letters = document.querySelectorAll('.letter');
    letters.forEach(letter => {
        letter.addEventListener('click', function() {
            this.style.transform = 'scale(1.5) rotate(10deg)';
            this.style.color = '#ff6b9d';
            
            setTimeout(() => {
                this.style.transform = 'scale(1) rotate(0deg)';
                this.style.color = '#ffd166';
            }, 500);
        });
    });
    
    // Fare hareketi ile parıltı efekti
    document.addEventListener('mousemove', function(e) {
        if (!isBloomed) return;
        
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        flower.style.transform = `translateX(-50%) translateY(${Math.sin(angle * Math.PI / 180) * 10}px) rotateX(${y * 10}deg) rotateY(${x * 10}deg)`;
    });
    
    // Sayfa yüklendiğinde başlık animasyonu
    const title = document.querySelector('.title');
    setTimeout(() => {
        title.style.animation = 'pulse 3s infinite alternate';
    }, 1000);
});
