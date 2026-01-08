/**
 * Grupo Neovos - Main JavaScript
 * Handles navigation, animations, FAQ toggles, and form interactions
 */

document.addEventListener("DOMContentLoaded", function () {
  // ==========================================
  // Mobile Navigation Toggle
  // ==========================================
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      navMenu.classList.toggle("active");
      navToggle.classList.toggle("active");

      // Toggle body scroll when menu is open
      document.body.style.overflow = navMenu.classList.contains("active")
        ? "hidden"
        : "";
    });

    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll(".navbar-link");
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        navMenu.classList.remove("active");
        navToggle.classList.remove("active");
        document.body.style.overflow = "";
      });
    });
  }

  // ==========================================
  // Navbar Scroll Effect
  // ==========================================
  const navbar = document.querySelector(".navbar");

  if (navbar) {
    let lastScroll = 0;

    window.addEventListener("scroll", function () {
      const currentScroll = window.pageYOffset;

      // Add shadow when scrolled
      if (currentScroll > 10) {
        navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.08)";
      } else {
        navbar.style.boxShadow = "none";
      }

      lastScroll = currentScroll;
    });
  }

  // ==========================================
  // Scroll Animations
  // ==========================================
  const animatedElements = document.querySelectorAll("[data-animate]");

  if (animatedElements.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: "0px 0px -50px 0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    animatedElements.forEach((el) => {
      observer.observe(el);
    });
  }

  // ==========================================
  // FAQ Accordion
  // ==========================================
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    if (question) {
      question.addEventListener("click", function () {
        // Close other items
        faqItems.forEach((otherItem) => {
          if (otherItem !== item && otherItem.classList.contains("active")) {
            otherItem.classList.remove("active");
          }
        });

        // Toggle current item
        item.classList.toggle("active");
      });
    }
  });

  // ==========================================
  // Smooth Scroll for Anchor Links
  // ==========================================
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      if (href !== "#") {
        const target = document.querySelector(href);

        if (target) {
          e.preventDefault();

          const navbarHeight = navbar ? navbar.offsetHeight : 0;
          const targetPosition =
            target.getBoundingClientRect().top +
            window.pageYOffset -
            navbarHeight -
            20;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }
      }
    });
  });

  // ==========================================
  // Form Handling
  // ==========================================
  const forms = document.querySelectorAll("form");

  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault(); // Siempre prevenir para manejar con AJAX

      const formAction = form.getAttribute("action");

      // Si el formulario usa Formspree o Web3Forms, enviarlo con AJAX
      if (
        formAction &&
        (formAction.includes("formspree.io") ||
          formAction.includes("web3forms.com"))
      ) {
        // Deshabilitar botón de envío
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn ? submitBtn.innerHTML : "";
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = "Enviando...";
        }

        // Enviar con fetch (AJAX)
        fetch(formAction, {
          method: "POST",
          body: new FormData(form),
          headers: {
            Accept: "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              // Éxito - mostrar mensaje bonito
              showFormSuccess(form);
              form.reset(); // Limpiar formulario
            } else {
              // Error
              throw new Error(data.message || "Error al enviar el formulario");
            }
          })
          .catch((error) => {
            // Error en el envío
            alert(
              "Hubo un problema al enviar el formulario. Por favor intenta de nuevo o contáctanos directamente."
            );
            console.error("Error:", error);

            // Restaurar botón
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.innerHTML = originalBtnText;
            }
          });

        return;
      }

      // Para formularios sin servicio externo (código legacy)
      const formData = new FormData(form);
      const data = {};

      formData.forEach((value, key) => {
        if (data[key]) {
          if (Array.isArray(data[key])) {
            data[key].push(value);
          } else {
            data[key] = [data[key], value];
          }
        } else {
          data[key] = value;
        }
      });

      console.log("Form submitted:", data);
      showFormSuccess(form);
    });
  });

  function showFormSuccess(form) {
    // Create success message
    const successMessage = document.createElement("div");
    successMessage.className = "form-success";
    successMessage.innerHTML = `
      <div class="form-success-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
          <path d="M22 4L12 14.01l-3-3"/>
        </svg>
      </div>
      <h3>¡Mensaje enviado!</h3>
      <p>Gracias por contactarnos. Un asesor te contactará en menos de 24 horas hábiles.</p>
    `;

    // Add styles for success message
    successMessage.style.cssText = `
      text-align: center;
      padding: 3rem 2rem;
      animation: fadeInUp 0.5s ease forwards;
    `;

    const iconStyles = `
      width: 64px;
      height: 64px;
      margin: 0 auto 1.5rem;
      background-color: #FC4C02;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    `;

    successMessage.querySelector(".form-success-icon").style.cssText =
      iconStyles;
    successMessage.querySelector(".form-success-icon svg").style.cssText =
      "width: 32px; height: 32px; color: white;";
    successMessage.querySelector("h3").style.cssText =
      "margin-bottom: 0.5rem; color: #0B0B0B;";
    successMessage.querySelector("p").style.cssText = "color: #757575;";

    // Replace form with success message
    const formContainer = form.closest(".form-container");
    if (formContainer) {
      formContainer.innerHTML = "";
      formContainer.appendChild(successMessage);
    }

    // Scroll to success message
    successMessage.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  // ==========================================
  // Form Input Animations
  // ==========================================
  const formInputs = document.querySelectorAll(
    ".form-input, .form-select, .form-textarea"
  );

  formInputs.forEach((input) => {
    // Add focus class to parent
    input.addEventListener("focus", function () {
      this.parentElement.classList.add("focused");
    });

    input.addEventListener("blur", function () {
      this.parentElement.classList.remove("focused");

      // Add filled class if has value
      if (this.value.trim() !== "") {
        this.parentElement.classList.add("filled");
      } else {
        this.parentElement.classList.remove("filled");
      }
    });
  });

  // ==========================================
  // Radio/Checkbox Visual Feedback
  // ==========================================
  const radioOptions = document.querySelectorAll(
    ".radio-option, .checkbox-option"
  );

  radioOptions.forEach((option) => {
    const input = option.querySelector("input");

    if (input) {
      // Update visual state on change
      input.addEventListener("change", function () {
        if (this.type === "radio") {
          // Remove selected class from siblings
          const siblings =
            this.closest(".radio-group").querySelectorAll(".radio-option");
          siblings.forEach((sib) => sib.classList.remove("selected"));
        }

        if (this.checked) {
          option.classList.add("selected");
        } else {
          option.classList.remove("selected");
        }
      });
    }
  });

  // ==========================================
  // Stats Counter Animation - Animated Numbers
  // ==========================================
  const statValues = document.querySelectorAll("[data-count]");

  function animateCounter(element) {
    const target = parseInt(element.dataset.count);
    const prefix = element.dataset.prefix || "";
    const suffix = element.dataset.suffix || "";
    const duration = 2000; // 2 seconds
    const frameDuration = 1000 / 60; // 60fps
    const totalFrames = Math.round(duration / frameDuration);
    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

    let frame = 0;
    const counter = setInterval(() => {
      frame++;
      const progress = easeOutQuart(frame / totalFrames);
      const currentCount = Math.round(target * progress);

      element.textContent = `${prefix}${currentCount}${suffix}`;

      if (frame === totalFrames) {
        clearInterval(counter);
        element.textContent = `${prefix}${target}${suffix}`;
      }
    }, frameDuration);
  }

  if (statValues.length > 0) {
    const statsObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach((entry) => {
          if (
            entry.isIntersecting &&
            !entry.target.classList.contains("counted")
          ) {
            entry.target.classList.add("counted");
            animateCounter(entry.target);
            statsObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    statValues.forEach((stat) => {
      statsObserver.observe(stat);
    });
  }

  // ==========================================
  // Staggered Card Animations
  // ==========================================
  const cardContainers = document.querySelectorAll(
    ".features-grid, .services-grid, .process-grid, .cta-cards"
  );

  cardContainers.forEach((container) => {
    const cards = container.children;

    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            Array.from(cards).forEach((card, index) => {
              setTimeout(() => {
                card.classList.add("animate-in");
              }, index * 100); // 100ms delay between each card
            });
            cardObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    cardObserver.observe(container);
  });

  // ==========================================
  // Text Reveal Animation
  // ==========================================
  const revealTexts = document.querySelectorAll("[data-reveal]");

  revealTexts.forEach((text) => {
    const textObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            textObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    textObserver.observe(text);
  });

  // ==========================================
  // Floating Elements Animation
  // ==========================================
  const floatingElements = document.querySelectorAll(".floating-element");

  floatingElements.forEach((el, index) => {
    el.style.animationDelay = `${index * 0.5}s`;
  });

  // ==========================================
  // Process Steps Line Animation
  // ==========================================
  const processSection = document.querySelector(".process-section");

  if (processSection) {
    const processObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-process");
            processObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    processObserver.observe(processSection);
  }

  // ==========================================
  // Magnetic Button Effect
  // ==========================================
  const magneticButtons = document.querySelectorAll(
    ".btn-primary, .btn-secondary"
  );

  magneticButtons.forEach((btn) => {
    btn.addEventListener("mousemove", function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      this.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });

    btn.addEventListener("mouseleave", function () {
      this.style.transform = "translate(0, 0)";
    });
  });

  // ==========================================
  // Tilt Effect on Cards (subtle)
  // ==========================================
  const tiltCards = document.querySelectorAll(
    ".feature-card, .service-card, .cta-card"
  );

  tiltCards.forEach((card) => {
    card.addEventListener("mousemove", function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 50;
      const rotateY = (centerX - x) / 50;

      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
    });
  });

  // ==========================================
  // Scroll Progress Indicator
  // ==========================================
  const progressBar = document.createElement("div");
  progressBar.className = "scroll-progress";
  document.body.appendChild(progressBar);

  window.addEventListener("scroll", () => {
    const windowHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const progress = window.scrollY / windowHeight;
    progressBar.style.transform = `scaleX(${progress})`;
  });

  // ==========================================
  // Text Split Animation
  // ==========================================
  const splitTextElements = document.querySelectorAll(
    ".hero-title, .section-title"
  );

  splitTextElements.forEach((el) => {
    // Store original text and wrap in container
    const text = el.innerHTML;
    // Only process if not already processed
    if (!el.classList.contains("split-processed")) {
      el.classList.add("split-processed");

      // Simple word-by-word animation instead of character
      const words = text.split(/(<[^>]+>|[^\s<]+)/g).filter(Boolean);
      let html = "";
      let wordIndex = 0;

      words.forEach((word) => {
        if (word.startsWith("<")) {
          // It's a tag, keep as is
          html += word;
        } else if (word.trim()) {
          html += `<span class="word" style="display: inline-block; opacity: 0; transform: translateY(30px); transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${
            wordIndex * 0.05
          }s;">${word}</span>`;
          wordIndex++;
        } else {
          html += word;
        }
      });

      el.innerHTML = html;

      // Observe for animation trigger
      const textObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const words = entry.target.querySelectorAll(".word");
              words.forEach((word) => {
                word.style.opacity = "1";
                word.style.transform = "translateY(0)";
              });
              textObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.3 }
      );

      textObserver.observe(el);
    }
  });

  // ==========================================
  // Slide-in Animations
  // ==========================================
  const slideElements = document.querySelectorAll(
    ".slide-in-left, .slide-in-right, .slide-in-up, .slide-in-down, .scale-bounce, .rotate-in, .blur-in"
  );

  if (slideElements.length > 0) {
    const slideObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            slideObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    slideElements.forEach((el) => slideObserver.observe(el));
  }

  // ==========================================
  // Counter Number Enhancement with Commas
  // ==========================================
  function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // ==========================================
  // Ripple Effect for Interactive Elements
  // ==========================================
  function createRipple(event) {
    const element = event.currentTarget;
    const ripple = document.createElement("span");
    ripple.className = "ripple";

    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = event.clientX - rect.left - size / 2 + "px";
    ripple.style.top = event.clientY - rect.top - size / 2 + "px";

    element.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  }

  document.querySelectorAll(".ripple-effect").forEach((el) => {
    el.addEventListener("click", createRipple);
  });

  // ==========================================
  // Smooth Section Reveal with Scale
  // ==========================================
  const sections = document.querySelectorAll("section");

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0) scale(1)";
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "-50px",
    }
  );

  sections.forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(30px) scale(0.98)";
    section.style.transition = "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)";
    sectionObserver.observe(section);
  });

  // Hero decorations handled in HTML/CSS only

  // ==========================================
  // Smooth Counter with Blur Effect
  // ==========================================
  const counters = document.querySelectorAll("[data-count]");

  counters.forEach((counter) => {
    // Add counter-animate class
    counter.classList.add("counter-animate");
  });

  // ==========================================
  // Navbar Link Hover Animation
  // ==========================================
  const navLinks = document.querySelectorAll(".navbar-link");

  navLinks.forEach((link) => {
    link.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)";
    });
    link.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });

  // ==========================================
  // Card Shine Effect on Hover
  // ==========================================
  const shineCards = document.querySelectorAll(
    ".feature-card, .service-card, .cta-card"
  );

  shineCards.forEach((card) => {
    card.addEventListener("mousemove", function (e) {
      const rect = this.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      this.style.setProperty("--mouse-x", x + "%");
      this.style.setProperty("--mouse-y", y + "%");
    });
  });

  // ==========================================
  // Scroll-triggered Background Color Change
  // ==========================================
  const colorSections = document.querySelectorAll("[data-bg-change]");

  if (colorSections.length > 0) {
    const bgObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const bgColor = entry.target.dataset.bgChange;
            document.body.style.backgroundColor = bgColor;
            document.body.style.transition = "background-color 0.5s ease";
          }
        });
      },
      { threshold: 0.5 }
    );

    colorSections.forEach((section) => bgObserver.observe(section));
  }

  // ==========================================
  // Parallax on Multiple Elements
  // ==========================================
  const parallaxElements = document.querySelectorAll("[data-parallax]");

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;

    parallaxElements.forEach((el) => {
      const speed = el.dataset.parallax || 0.5;
      const yPos = -(scrolled * speed);
      el.style.transform = `translateY(${yPos}px)`;
    });
  });

  // ==========================================
  // Button Ripple Effect
  // ==========================================
  const buttons = document.querySelectorAll(".btn");

  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      // Create ripple
      const ripple = document.createElement("span");
      ripple.className = "btn-ripple";

      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      ripple.style.cssText = `
        position: absolute;
        width: 100px;
        height: 100px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: translate(-50%, -50%) scale(0);
        animation: ripple 0.6s ease-out;
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
      `;

      this.style.position = "relative";
      this.style.overflow = "hidden";
      this.appendChild(ripple);

      // Remove ripple after animation
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Add ripple animation to document
  const style = document.createElement("style");
  style.textContent = `
    @keyframes ripple {
      to {
        transform: translate(-50%, -50%) scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  // ==========================================
  // Lazy Loading Images (if any)
  // ==========================================
  const lazyImages = document.querySelectorAll("img[data-src]");

  if (lazyImages.length > 0) {
    const imageObserver = new IntersectionObserver(function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
          imageObserver.unobserve(img);
        }
      });
    });

    lazyImages.forEach((img) => {
      imageObserver.observe(img);
    });
  }

  // ==========================================
  // Parallax Effect for Hero (subtle)
  // ==========================================
  const heroSection = document.querySelector(".hero");

  if (heroSection) {
    window.addEventListener("scroll", function () {
      const scrolled = window.pageYOffset;
      const heroVisual = heroSection.querySelector(".hero-visual");

      if (heroVisual && scrolled < window.innerHeight) {
        heroVisual.style.transform = `translateY(${scrolled * 0.1}px)`;
      }
    });
  }
});

// ==========================================
// Utility: Debounce Function
// ==========================================
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ==========================================
// Utility: Throttle Function
// ==========================================
function throttle(func, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
