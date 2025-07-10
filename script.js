// スムーススクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// フォーム送信処理
document.querySelector('.cta-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    // バリデーション
    if (!data.name || !data.email || !data.phone || !data.time) {
        alert('すべての項目を入力してください。');
        return;
    }
    
    // メールアドレスのバリデーション
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        alert('正しいメールアドレスを入力してください。');
        return;
    }
    
    // 電話番号のバリデーション
    const phoneRegex = /^[0-9-]+$/;
    if (!phoneRegex.test(data.phone)) {
        alert('正しい電話番号を入力してください。');
        return;
    }
    
    // 送信処理（実際のAPIエンドポイントに置き換えてください）
    alert('お申し込みありがとうございます！\n確認メールを送信いたします。');
    
    // フォームをリセット
    this.reset();
});

// スクロール時のアニメーション
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// 監視対象の要素を追加
document.querySelectorAll('.problem-item, .product-item, .trust-item, .event-info, .event-program').forEach(el => {
    observer.observe(el);
});

// ヘッダーのスクロール効果
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = '#fff';
        header.style.backdropFilter = 'none';
    }
});

// カウントアップアニメーション
function countUp(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        if (element.textContent.includes('%')) {
            element.textContent = Math.floor(current) + '%';
        } else if (element.textContent.includes('時間')) {
            element.textContent = Math.floor(current) + '時間';
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// 統計数値のカウントアップ
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber && !statNumber.classList.contains('counted')) {
                statNumber.classList.add('counted');
                
                const text = statNumber.textContent;
                if (text.includes('72')) {
                    countUp(statNumber, 72);
                } else if (text.includes('80')) {
                    countUp(statNumber, 80);
                }
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.hero-stats').forEach(stat => {
    statsObserver.observe(stat);
});

// 緊急性セクションのカウントアップ
const urgencyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const urgencyNumbers = entry.target.querySelectorAll('.urgency-number');
            urgencyNumbers.forEach(num => {
                if (!num.classList.contains('counted')) {
                    num.classList.add('counted');
                    
                    const text = num.textContent;
                    if (text.includes('70')) {
                        countUp(num, 70);
                    } else if (text.includes('1500')) {
                        countUp(num, 1500);
                    }
                }
            });
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.urgency-stats').forEach(stat => {
    urgencyObserver.observe(stat);
});

// モバイルメニュー（必要に応じて追加）
function toggleMobileMenu() {
    const nav = document.querySelector('.nav');
    nav.classList.toggle('mobile-open');
}

// 商品アイテムのホバー効果
document.querySelectorAll('.product-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// CTAボタンのクリック追跡
document.querySelectorAll('.hero-cta, .cta-button-main').forEach(button => {
    button.addEventListener('click', function(e) {
        // Google Analytics などでイベント追跡したい場合はここに記述
        console.log('CTA button clicked:', this.textContent);
    });
});

// ページロード時のアニメーション
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
});

// 初期化
document.addEventListener('DOMContentLoaded', () => {
    // ページが読み込まれた時の処理
    console.log('ワークマン防災イベントLP loaded');
    
    // フォームの初期化
    const form = document.querySelector('.cta-form');
    if (form) {
        form.reset();
    }
});

// エラーハンドリング
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
});

// パフォーマンス監視
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`Page loaded in ${loadTime}ms`);
});