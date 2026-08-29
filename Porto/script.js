/* ==========================================================================
   Clarity69 Portfolio — script.js
   Sections: 1. Data (projects, skills, social)  2. Render helpers
             3. Mobile nav  4. Smooth scroll  5. Active nav on scroll
             6. Scroll-reveal animation  7. Footer year  8. Init
   ========================================================================== */

/* ---------- 1. Data ---------------------------------------------------- */

/**
 * Featured projects — the strongest, most representative work from
 * github.com/Clarity69. Each one includes the real repo description plus a
 * short "what it demonstrates" breakdown, written from that description and
 * the repo's primary language only (nothing invented). Update this array as
 * stronger projects are pushed.
 */
const featuredProjects = [
  {
    name: "website-form-mhs",
    fileLabel: "form.js",
    icon: "fa-brands fa-js",
    summary: "A student form application built to practice dynamic input handling and client-side interaction.",
    demonstrates: [
      "Built with vanilla JavaScript, HTML and CSS — no frameworks.",
      "Handles form-driven pages and responds to user input entirely on the client side.",
      "Grew out of a Web Programming coursework assignment (Tugas Pemrograman Web)."
    ],
    technologies: ["JavaScript", "HTML", "CSS"],
    github: "https://github.com/Clarity69/website-form-mhs",
    demo: ""
  },
  {
    name: "Vibe-code",
    fileLabel: "main.py",
    icon: "fa-brands fa-python",
    summary: "A Python project exploring how AI assistance can speed up the coding process itself.",
    demonstrates: [
      "Built with Python.",
      "Experiments with an AI-assisted (\"vibe coding\") workflow rather than a traditional app feature set.",
      "Written to learn how far AI tooling can go when guided by a human developer."
    ],
    technologies: ["Python"],
    github: "https://github.com/Clarity69/Vibe-code",
    demo: ""
  },
  {
    name: "Porto",
    fileLabel: "index.html",
    icon: "fa-brands fa-html5",
    summary: "An earlier version of this developer portfolio, built to practice structuring a personal site from scratch.",
    demonstrates: [
      "Built with plain HTML and CSS — no frameworks.",
      "Focuses on page layout, spacing and basic responsive structure.",
      "Beta version — an earlier design pass that led to the site you're looking at now."
    ],
    technologies: ["HTML", "CSS"],
    github: "https://github.com/Clarity69/Porto",
    demo: ""
  }
];

/**
 * Other projects & experiments — coursework, tooling and desktop
 * configuration. Smaller in scope than the featured work above, but still
 * real, browsable code that shows range and curiosity.
 */
const otherProjects = [
  {
    name: "Pemweb",
    description: "Practicum coursework repository (Praktikum Pemrograman Web) covering foundational web programming exercises.",
    technologies: ["HTML", "CSS"],
    github: "https://github.com/Clarity69/Pemweb"
  },
  {
    name: "dotfiles",
    description: "Personal Linux dotfiles and rice configuration — window manager, terminal and desktop styling setup.",
    technologies: ["CSS", "Shell"],
    github: "https://github.com/Clarity69/dotfiles"
  },
  {
    name: "wofi-config",
    description: "A personal Wofi application-launcher configuration, built for a customized GNOME desktop.",
    technologies: ["CSS"],
    github: "https://github.com/Clarity69/wofi-config"
  }
];

/**
 * Skills grouped by how far along each one actually is — not just a flat
 * list. "Core" only includes technologies visible in shipped repositories.
 * "Tools" covers platforms self-reported on the GitHub profile. "Exploring"
 * covers what the profile README says is currently being learned, plus the
 * remaining badges that aren't yet backed by a visible project.
 */
const skills = [
  {
    category: "Core Technologies",
    note: "Used in shipped projects",
    items: [
      { name: "HTML5", icon: "fa-brands fa-html5" },
      { name: "CSS3", icon: "fa-brands fa-css3-alt" },
      { name: "JavaScript", icon: "fa-brands fa-js" },
      { name: "Python", icon: "fa-brands fa-python" }
    ]
  },
  {
    category: "Development Tools",
    note: "Actively used to build & ship",
    items: [
      { name: "Git & GitHub", icon: "fa-brands fa-github" },
      { name: "Figma", icon: "fa-brands fa-figma" },
      { name: "Vercel", icon: "fa-solid fa-cloud" },
      { name: "Firebase", icon: "fa-solid fa-fire" }
    ]
  },
  {
    category: "Currently Exploring",
    note: "Learning, not yet shipped",
    items: [
      { name: "IoT", icon: "fa-solid fa-microchip" },
      { name: "Data Mining", icon: "fa-solid fa-chart-line" },
      { name: "TypeScript", icon: "fa-solid fa-code" },
      { name: "Next.js", icon: "fa-brands fa-node" },
      { name: "Node.js", icon: "fa-brands fa-node-js" },
      { name: "Flutter", icon: "fa-brands fa-flutter" },
      { name: "SQL Databases", icon: "fa-solid fa-database" },
      { name: "Java / C / C++ / C#", icon: "fa-solid fa-code" }
    ]
  }
];

/**
 * Social links configuration — only URLs confirmed from the public GitHub
 * profile are filled in. Anything left blank has its icon and any related
 * button hidden automatically.
 */
const socialLinks = {
  github: "https://github.com/Clarity69",
  linkedin: "https://www.linkedin.com/in/ahmad-taroqi-410187411/",
  instagram: "https://instagram.com/taroqi_"
};

const socialMeta = {
  github: { label: "GitHub", icon: "fa-brands fa-github" },
  linkedin: { label: "LinkedIn", icon: "fa-brands fa-linkedin-in" },
  instagram: { label: "Instagram", icon: "fa-brands fa-instagram" }
};

/* ---------- 2. Render helpers ------------------------------------------ */

function renderFeaturedProjects() {
  const grid = document.getElementById("featuredProjectsGrid");
  if (!grid) return;

  grid.innerHTML = featuredProjects
    .map((project) => {
      const techTags = project.technologies.map((tech) => `<span>${tech}</span>`).join("");

      const demonstratesItems = project.demonstrates.map((point) => `<li>${point}</li>`).join("");

      const demoLink = project.demo
        ? `<a href="${project.demo}" target="_blank" rel="noopener noreferrer">
             <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i> Live demo
           </a>`
        : "";

      return `
        <article class="project-card project-card--featured">
          <div class="project-preview">
            <span class="project-preview__icon"><i class="${project.icon}" aria-hidden="true"></i></span>
            <span class="project-preview__file">${project.fileLabel}</span>
          </div>
          <div class="project-card__body">
            <div class="project-card__header">
              <h3 class="project-card__name">${project.name}</h3>
              <span class="project-card__badge">Featured</span>
            </div>
            <p class="project-card__summary">${project.summary}</p>
            <div class="project-card__demonstrates">
              <p class="project-card__demonstrates-label">What it demonstrates</p>
              <ul>${demonstratesItems}</ul>
            </div>
            <div class="project-card__tech">${techTags}</div>
            <div class="project-card__links">
              <a href="${project.github}" target="_blank" rel="noopener noreferrer">
                <i class="fa-brands fa-github" aria-hidden="true"></i> View Source
              </a>
              ${demoLink}
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderOtherProjects() {
  const grid = document.getElementById("otherProjectsGrid");
  if (!grid) return;

  grid.innerHTML = otherProjects
    .map((project) => {
      const techTags = project.technologies.map((tech) => `<span>${tech}</span>`).join("");

      return `
        <article class="project-card">
          <div class="project-card__header">
            <h3 class="project-card__name">${project.name}</h3>
          </div>
          <p class="project-card__desc">${project.description}</p>
          <div class="project-card__tech">${techTags}</div>
          <div class="project-card__links">
            <a href="${project.github}" target="_blank" rel="noopener noreferrer">
              <i class="fa-brands fa-github" aria-hidden="true"></i> Source
            </a>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderSkills() {
  const grid = document.getElementById("skillsGrid");
  if (!grid) return;

  grid.innerHTML = skills
    .map((group) => {
      const tags = group.items
        .map(
          (item) => `
            <span class="skill-tag">
              <i class="${item.icon}" aria-hidden="true"></i>
              ${item.name}
            </span>
          `
        )
        .join("");

      return `
        <div class="skill-category">
          <p class="skill-category__title">${group.category}</p>
          <p class="skill-category__note">${group.note}</p>
          <div class="skill-category__tags">${tags}</div>
        </div>
      `;
    })
    .join("");
}

function renderSocialLinks() {
  const list = document.getElementById("socialList");
  if (!list) return;

  const entries = Object.entries(socialLinks).filter(([, url]) => url && url.trim() !== "");

  list.innerHTML = entries
    .map(([key, url]) => {
      const meta = socialMeta[key] || { label: key, icon: "fa-solid fa-link" };
      return `
        <li class="social-rail__item">
          <a
            class="social-rail__link"
            href="${url}"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="${meta.label}"
          >
            <i class="${meta.icon}" aria-hidden="true"></i>
          </a>
          <span class="social-rail__tooltip" role="tooltip">${meta.label}</span>
        </li>
      `;
    })
    .join("");
}

/**
 * Renders the "Let's Connect" buttons — only for platforms that actually
 * have a URL set in socialLinks, per the "no invented links" rule.
 */
function renderConnectActions() {
  const container = document.getElementById("connectActions");
  if (!container) return;

  const buttons = [];

  if (socialLinks.github) {
    buttons.push(`
      <a href="${socialLinks.github}" class="btn btn--primary" id="button"target="_blank" rel="noopener noreferrer">
        <i class="fa-brands fa-github" aria-hidden="true"></i>
        View GitHub
      </a>
    `);
  }

  if (socialLinks.linkedin) {
    buttons.push(`
      <a href="${socialLinks.linkedin}" class="btn btn--ghost" target="_blank" rel="noopener noreferrer">
        <i class="fa-brands fa-linkedin-in" aria-hidden="true"></i>
        Connect on LinkedIn
      </a>
    `);
  }

  container.innerHTML = buttons.join("");
}

/* ---------- 3. Mobile nav ----------------------------------------------- */

function initMobileNav() {
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close the mobile menu whenever a nav link is used
  links.querySelectorAll("[data-nav]").forEach((link) => {
    link.addEventListener("click", () => {
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* ---------- 4. Smooth scroll --------------------------------------------- */

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

/* ---------- 5. Active nav link on scroll --------------------------------- */

function initActiveNavOnScroll() {
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav__link[data-nav]");
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          const isMatch = link.getAttribute("href") === `#${id}`;
          link.classList.toggle("is-active", isMatch);
        });
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

/* ---------- 6. Scroll-reveal animation ----------------------------------- */

function initScrollReveal() {
  const revealEls = document.querySelectorAll(".reveal:not(.hero .reveal)");
  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealEls.forEach((el) => observer.observe(el));
}

/* ---------- 7. Footer year ----------------------------------------------- */

function setFooterYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/* ---------- 8. Init -------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  renderFeaturedProjects();
  renderOtherProjects();
  renderSkills();
  renderSocialLinks();
  renderConnectActions();

  initMobileNav();
  initSmoothScroll();
  initActiveNavOnScroll();
  initScrollReveal();
  setFooterYear();
});