(() => {
    const translations = {
        en: {
            "nav.home": "Home",
            "nav.projects": "Projects",
            "nav.skills": "Skills",
            "nav.services": "Services",
            "nav.about": "About",
            "nav.contact": "Contact",
            "hero.kicker": "Backend Engineer + Security Mindset",
            "hero.title": "I build reliable <span class=\"accent\">backend systems</span> and design apps that stay secure.",
            "hero.subtitle": "I focus on clean architecture, API quality, and practical cybersecurity. My goal is simple: create products that are fast, maintainable, and hard to break.",
            "hero.ctaPrimary": "Start a project",
            "hero.ctaSecondary": "See my work",
            "hero.stats.projects": "Live projects",
            "hero.stats.tools": "Tools in stack",
            "hero.stats.learn": "Learning mode",
            "projects.title": "Featured Projects",
            "projects.subtitle": "Selected works where backend logic and product UX work together.",
            "projects.gym.title": "GYM Platform",
            "projects.gym.desc": "Management panel to track members, status, and daily processes in one place.",
            "projects.school.title": "School 21",
            "projects.school.desc": "Education-focused portal with posts, updates, and structured content delivery.",
            "projects.brandor.title": "Brandor",
            "projects.brandor.desc": "Business website focused on conversion, clean structure, and online visibility.",
            "projects.higherwaist.title": "Higher Waist",
            "projects.higherwaist.desc": "Official website project for the Higher Waist brand with modern presentation and product focus.",
            "projects.zedly.title": "Zedly",
            "projects.zedly.desc": "Corporate website for Zedly with clear structure, modern visual identity, and strong usability.",
            "projects.placeholder": "Image coming soon",
            "projects.open": "Open live",
            "skills.title": "Skills & Toolbox",
            "skills.subtitle": "Core technologies I use in production and the stack I am actively improving.",
            "skills.current": "Current Focus",
            "skills.learning": "Learning Path",
            "skills.languages": "Languages",
            "skills.en": "English B2/C1",
            "skills.ru": "Russian C1/C2",
            "skills.uz": "Uzbek C1/C2",
            "services.title": "Services",
            "services.subtitle": "What I can help you with in real projects.",
            "services.api.title": "Backend & API Development",
            "services.api.desc": "Design and build scalable REST APIs, auth flows, and clean server architecture.",
            "services.security.title": "Security-Focused Implementation",
            "services.security.desc": "Input validation, safe data handling, basic hardening, and secure coding practices.",
            "services.deploy.title": "Deployment & Support",
            "services.deploy.desc": "Deploy to cloud platforms, optimize runtime setup, and maintain project stability.",
            "about.title": "About Me",
            "about.p1": "I am Umid, a developer who enjoys building robust backend products and testing systems from a security perspective. I like clean architecture, readable code, and practical engineering decisions.",
            "about.p2": "Most of my projects are built with Express and Node.js. I pay attention to structure, data flow, and deployment, so the product is easy to scale and maintain.",
            "about.drives": "What drives me",
            "about.li1": "Create stable, production-ready services.",
            "about.li2": "Improve security awareness in every stage of development.",
            "about.li3": "Keep learning and shipping better work each month.",
            "contact.title": "Let's connect",
            "contact.subtitle": "If you have an idea, project, or collaboration in mind, send a message. I usually reply quickly and keep communication direct.",
            "contact.email": "Email",
            "contact.telegram": "Telegram",
            "contact.form.title": "Message form",
            "contact.form.name": "Name *",
            "contact.form.surname": "Surname *",
            "contact.form.phone": "Phone *",
            "contact.form.email": "Email",
            "contact.form.message": "Message *",
            "contact.form.submit": "Send message",
            "feedback.success": "Message sent successfully. I will reply soon.",
            "feedback.error": "Could not send message. Please try again.",
            "feedback.validation": "Please fill all required fields correctly.",
            "footer.copy": "2026 © Umid Yuldashev"
        },
        ru: {
            "nav.home": "Главная",
            "nav.projects": "Проекты",
            "nav.skills": "Навыки",
            "nav.services": "Услуги",
            "nav.about": "Обо мне",
            "nav.contact": "Контакты",
            "hero.kicker": "Backend инженер + подход с фокусом на безопасность",
            "hero.title": "Я создаю надежные <span class=\"accent\">backend-системы</span> и приложения с упором на безопасность.",
            "hero.subtitle": "Я фокусируюсь на чистой архитектуре, качестве API и практической кибербезопасности. Цель простая: делать быстрые, поддерживаемые и устойчивые продукты.",
            "hero.ctaPrimary": "Обсудить проект",
            "hero.ctaSecondary": "Смотреть работы",
            "hero.stats.projects": "Готовых проектов",
            "hero.stats.tools": "Инструментов в стеке",
            "hero.stats.learn": "Режим обучения",
            "projects.title": "Избранные проекты",
            "projects.subtitle": "Проекты, где backend-логика и UX продукта работают вместе.",
            "projects.gym.title": "GYM Platform",
            "projects.gym.desc": "Панель управления для учета участников, статусов и ежедневных процессов.",
            "projects.school.title": "School 21",
            "projects.school.desc": "Образовательный портал с новостями, публикациями и структурированным контентом.",
            "projects.brandor.title": "Brandor",
            "projects.brandor.desc": "Бизнес-сайт с акцентом на конверсию, чистую структуру и онлайн-видимость.",
            "projects.higherwaist.title": "Higher Waist",
            "projects.higherwaist.desc": "Официальный сайт бренда Higher Waist с современным визуалом и акцентом на продукт.",
            "projects.zedly.title": "Zedly",
            "projects.zedly.desc": "Корпоративный сайт для Zedly с понятной структурой, современным стилем и удобным UX.",
            "projects.placeholder": "Фото будет добавлено",
            "projects.open": "Открыть",
            "skills.title": "Навыки и стек",
            "skills.subtitle": "Ключевые технологии, которые использую в продакшене и развиваю дальше.",
            "skills.current": "Текущий фокус",
            "skills.learning": "Изучаю",
            "skills.languages": "Языки",
            "skills.en": "Английский B2/C1",
            "skills.ru": "Русский C1/C2",
            "skills.uz": "Узбекский C1/C2",
            "services.title": "Услуги",
            "services.subtitle": "Чем могу помочь в реальных проектах.",
            "services.api.title": "Разработка backend и API",
            "services.api.desc": "Проектирование и разработка масштабируемых REST API, авторизации и чистой серверной архитектуры.",
            "services.security.title": "Реализация с фокусом на безопасность",
            "services.security.desc": "Валидация входных данных, безопасная работа с данными, базовый hardening и secure coding.",
            "services.deploy.title": "Деплой и поддержка",
            "services.deploy.desc": "Разворачивание в облаке, настройка окружения и поддержка стабильности проекта.",
            "about.title": "Обо мне",
            "about.p1": "Я Умид, разработчик, которому нравится строить надежные backend-продукты и смотреть на системы с позиции безопасности.",
            "about.p2": "Большинство моих проектов построены на Express и Node.js. Я уделяю внимание структуре, потокам данных и деплою, чтобы проект было легко масштабировать.",
            "about.drives": "Что меня мотивирует",
            "about.li1": "Создавать стабильные сервисы для продакшена.",
            "about.li2": "Повышать культуру безопасности на каждом этапе разработки.",
            "about.li3": "Постоянно учиться и делать результат сильнее каждый месяц.",
            "contact.title": "Давайте на связи",
            "contact.subtitle": "Если у вас есть идея, проект или предложение по сотрудничеству, отправьте сообщение. Обычно отвечаю быстро и по делу.",
            "contact.email": "Почта",
            "contact.telegram": "Телеграм",
            "contact.form.title": "Форма сообщения",
            "contact.form.name": "Имя *",
            "contact.form.surname": "Фамилия *",
            "contact.form.phone": "Телефон *",
            "contact.form.email": "Почта",
            "contact.form.message": "Сообщение *",
            "contact.form.submit": "Отправить",
            "feedback.success": "Сообщение отправлено. Скоро отвечу.",
            "feedback.error": "Не удалось отправить сообщение. Попробуйте еще раз.",
            "feedback.validation": "Пожалуйста, заполните обязательные поля корректно.",
            "footer.copy": "2026 © Umid Yuldashev"
        },
        uz: {
            "nav.home": "Bosh sahifa",
            "nav.projects": "Loyihalar",
            "nav.skills": "Ko'nikmalar",
            "nav.services": "Xizmatlar",
            "nav.about": "Men haqimda",
            "nav.contact": "Aloqa",
            "hero.kicker": "Backend muhandis + xavfsizlik yondashuvi",
            "hero.title": "Men ishonchli <span class=\"accent\">backend tizimlar</span> va xavfsiz ilovalar yarataman.",
            "hero.subtitle": "Men toza arxitektura, API sifati va amaliy kiberxavfsizlikka e'tibor beraman. Maqsad oddiy: tez, qo'llab-quvvatlash oson va barqaror mahsulot yaratish.",
            "hero.ctaPrimary": "Loyihani boshlash",
            "hero.ctaSecondary": "Ishlarimni ko'rish",
            "hero.stats.projects": "Jonli loyihalar",
            "hero.stats.tools": "Stekdagi vositalar",
            "hero.stats.learn": "O'rganish rejimi",
            "projects.title": "Asosiy loyihalar",
            "projects.subtitle": "Backend mantiqi va mahsulot UX birga ishlagan loyihalar.",
            "projects.gym.title": "GYM Platform",
            "projects.gym.desc": "A'zolar, holatlar va kunlik jarayonlarni boshqarish paneli.",
            "projects.school.title": "School 21",
            "projects.school.desc": "Yangiliklar, postlar va tartibli kontent uchun ta'lim portali.",
            "projects.brandor.title": "Brandor",
            "projects.brandor.desc": "Konversiya va toza struktura uchun yo'naltirilgan biznes sayti.",
            "projects.higherwaist.title": "Higher Waist",
            "projects.higherwaist.desc": "Higher Waist brendi uchun zamonaviy taqdimot va mahsulotga fokus qilingan rasmiy sayt loyihasi.",
            "projects.zedly.title": "Zedly",
            "projects.zedly.desc": "Zedly uchun aniq struktura, zamonaviy vizual uslub va qulay UX bilan yaratilgan korporativ sayt.",
            "projects.placeholder": "Rasm keyin qo'shiladi",
            "projects.open": "Ochish",
            "skills.title": "Ko'nikmalar va stek",
            "skills.subtitle": "Ishda qo'llaydigan asosiy texnologiyalar va hozir rivojlantirayotgan yo'nalishlarim.",
            "skills.current": "Hozirgi fokus",
            "skills.learning": "O'rganayapman",
            "skills.languages": "Tillar",
            "skills.en": "Ingliz tili B2/C1",
            "skills.ru": "Rus tili C1/C2",
            "skills.uz": "O'zbek tili C1/C2",
            "services.title": "Xizmatlar",
            "services.subtitle": "Haqiqiy loyihalarda yordam bera oladigan yo'nalishlar.",
            "services.api.title": "Backend va API ishlab chiqish",
            "services.api.desc": "Masshtablanadigan REST API, autentifikatsiya oqimi va toza server arxitekturasi.",
            "services.security.title": "Xavfsizlikka yo'naltirilgan yechim",
            "services.security.desc": "Kiritilgan ma'lumotni tekshirish, xavfsiz data ishlovi, bazaviy hardening va secure coding.",
            "services.deploy.title": "Deploy va qo'llab-quvvatlash",
            "services.deploy.desc": "Bulutga joylash, ish muhiti sozlash va loyiha barqarorligini saqlash.",
            "about.title": "Men haqimda",
            "about.p1": "Men Umidman, ishonchli backend mahsulotlar qurish va tizimlarni xavfsizlik nuqtai nazaridan ko'rishni yoqtiradigan dasturchiman.",
            "about.p2": "Loyihalarimning asosiy qismi Express va Node.js da qurilgan. Strukturaga, data oqimiga va deploy jarayoniga alohida e'tibor beraman.",
            "about.drives": "Meni ilhomlantiradigan narsalar",
            "about.li1": "Production darajadagi barqaror servislar yaratish.",
            "about.li2": "Har bir bosqichda xavfsizlik madaniyatini kuchaytirish.",
            "about.li3": "Doimiy o'rganish va har oy natijani yaxshilash.",
            "contact.title": "Bog'lanamiz",
            "contact.subtitle": "Agar sizda g'oya, loyiha yoki hamkorlik taklifi bo'lsa, xabar yuboring. Odatda tez va aniq javob beraman.",
            "contact.email": "Email",
            "contact.telegram": "Telegram",
            "contact.form.title": "Xabar formasi",
            "contact.form.name": "Ism *",
            "contact.form.surname": "Familiya *",
            "contact.form.phone": "Telefon *",
            "contact.form.email": "Email",
            "contact.form.message": "Xabar *",
            "contact.form.submit": "Yuborish",
            "feedback.success": "Xabar muvaffaqiyatli yuborildi. Tez orada javob beraman.",
            "feedback.error": "Xabar yuborilmadi. Iltimos, qayta urinib ko'ring.",
            "feedback.validation": "Iltimos, majburiy maydonlarni to'g'ri to'ldiring.",
            "footer.copy": "2026 © Umid Yuldashev"
        }
    };

    const defaultLang = "en";
    const defaultTheme = "dark";

    function getLang() {
        const saved = localStorage.getItem("portfolio_lang");
        return translations[saved] ? saved : defaultLang;
    }

    function applyLang(lang) {
        const dict = translations[lang] || translations[defaultLang];

        document.querySelectorAll("[data-i18n]").forEach((node) => {
            const key = node.dataset.i18n;
            if (dict[key]) {
                node.textContent = dict[key];
            }
        });

        document.querySelectorAll("[data-i18n-html]").forEach((node) => {
            const key = node.dataset.i18nHtml;
            if (dict[key]) {
                node.innerHTML = dict[key];
            }
        });

        document.documentElement.lang = lang;
        localStorage.setItem("portfolio_lang", lang);

        document.querySelectorAll(".lang-btn").forEach((btn) => {
            btn.classList.toggle("active", btn.dataset.lang === lang);
        });
    }

    function getTheme() {
        const saved = localStorage.getItem("portfolio_theme");
        return saved === "light" || saved === "dark" ? saved : defaultTheme;
    }

    function applyTheme(theme) {
        const finalTheme = theme === "light" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", finalTheme);
        localStorage.setItem("portfolio_theme", finalTheme);

        const toggle = document.getElementById("theme-toggle");
        if (toggle) {
            toggle.textContent = finalTheme === "dark" ? "☾" : "☀";
            toggle.setAttribute("aria-label", finalTheme === "dark" ? "Switch to light theme" : "Switch to dark theme");
        }
    }

    function showFeedback(type, key) {
        const feedback = document.getElementById("form-feedback");
        if (!feedback) return;
        const lang = getLang();
        const text = (translations[lang] && translations[lang][key]) || translations[defaultLang][key];

        feedback.classList.remove("success", "error");
        feedback.classList.add("show", type);
        feedback.textContent = text;
    }

    function initContactForm() {
        const form = document.getElementById("contact-form");
        if (!form) return;

        const params = new URLSearchParams(window.location.search);
        const status = params.get("status");
        const errorType = params.get("type");

        if (status === "success") {
            showFeedback("success", "feedback.success");
        } else if (status === "error") {
            showFeedback("error", errorType === "validation" ? "feedback.validation" : "feedback.error");
        }

        form.addEventListener("submit", (event) => {
            const name = (form.querySelector("#name")?.value || "").trim();
            const surname = (form.querySelector("#surname")?.value || "").trim();
            const phone = (form.querySelector("#phone")?.value || "").trim();
            const message = (form.querySelector("#message")?.value || "").trim();
            const phonePattern = /^\+?[0-9()\-\s]{7,20}$/;

            if (name.length < 2 || surname.length < 2 || message.length < 10 || !phonePattern.test(phone)) {
                event.preventDefault();
                showFeedback("error", "feedback.validation");
            }
        });
    }

    function initReveal() {
        const items = document.querySelectorAll(".reveal");
        if (!items.length) return;

        if (!("IntersectionObserver" in window)) {
            items.forEach((item) => item.classList.add("visible"));
            return;
        }

        items.forEach((item, index) => {
            item.style.transitionDelay = `${Math.min(index * 35, 280)}ms`;
        });

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.14 });

        items.forEach((item) => observer.observe(item));
    }

    function initSmoothAnchors() {
        document.querySelectorAll("a[href^=\"#\"]").forEach((anchor) => {
            anchor.addEventListener("click", (event) => {
                const href = anchor.getAttribute("href");
                if (!href || href === "#") return;
                const section = document.querySelector(href);
                if (!section) return;
                event.preventDefault();
                section.scrollIntoView({ behavior: "smooth", block: "start" });
            });
        });
    }

    function initCardTilt() {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const cards = document.querySelectorAll(".project-card, .service-card, .skills-column, .hero-card, .contact-card, .contact-form-card");
        if (!cards.length) return;

        cards.forEach((card) => {
            card.classList.add("motion-target");
            card.addEventListener("mousemove", (event) => {
                const rect = card.getBoundingClientRect();
                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;
                const rotateY = ((x / rect.width) - 0.5) * 7;
                const rotateX = (0.5 - (y / rect.height)) * 6;
                card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
            });

            card.addEventListener("mouseleave", () => {
                card.style.transform = "";
            });
        });
    }

    document.querySelectorAll(".lang-btn").forEach((btn) => {
        btn.addEventListener("click", () => applyLang(btn.dataset.lang || defaultLang));
    });

    const toggle = document.getElementById("theme-toggle");
    if (toggle) {
        toggle.addEventListener("click", () => {
            const current = getTheme();
            applyTheme(current === "dark" ? "light" : "dark");
        });
    }

    applyTheme(getTheme());
    applyLang(getLang());
    initContactForm();
    initReveal();
    initSmoothAnchors();
    initCardTilt();
})();
