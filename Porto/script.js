// =========================================================
// 1. NAVBAR — mengubah gaya saat discroll + toggle mobile menu
// =========================================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

function handleNavbarScroll() {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleNavbarScroll);
handleNavbarScroll(); // jalankan sekali saat load, jaga-jaga user reload di tengah scroll

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

// Tutup menu mobile setiap kali sebuah link menu diklik
document.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// =========================================================
// 2. SMOOTH SCROLL — untuk semua tautan navigasi berbasis #id
// =========================================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href');
    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// =========================================================
// 3. NAV LINK AKTIF — menandai menu sesuai section yang terlihat
// =========================================================
const sections = document.querySelectorAll('main section[id]');
const navItems = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const id = entry.target.getAttribute('id');
      navItems.forEach((item) => {
        item.classList.toggle('active', item.getAttribute('href') === `#${id}`);
      });
    });
  },
  { rootMargin: '-45% 0px -45% 0px' } // aktif saat section berada di tengah viewport
);

sections.forEach((section) => sectionObserver.observe(section));

// =========================================================
// 4. FILTER PROYEK — menampilkan/menyembunyikan kartu berdasarkan kategori
// =========================================================
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const emptyState = document.getElementById('emptyState');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;

    // Ubah status tombol aktif
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');

    let visibleCount = 0;

    projectCards.forEach((card) => {
      const matches = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('hidden', !matches);
      if (matches) visibleCount++;
    });

    // Tampilkan pesan jika tidak ada proyek pada kategori tersebut
    emptyState.hidden = visibleCount !== 0;
  });
});

// =========================================================
// 5. FORM KONTAK — validasi ringan & simulasi pengiriman (tanpa backend)
// =========================================================
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = contactForm.name.value.trim();
  const email = contactForm.email.value.trim();
  const message = contactForm.message.value.trim();

  if (!name || !email || !message) {
    formStatus.textContent = 'Mohon lengkapi semua kolom sebelum mengirim.';
    return;
  }

  // Di sini biasanya kode akan memanggil API/backend.
  // Karena ini murni front-end, kita simulasikan konfirmasi pengiriman.
  formStatus.textContent = `Terima kasih, ${name}! Pesan Anda telah tersimpan.`;
  contactForm.reset();
});

// =========================================================
// 6. TOMBOL "KEMBALI KE ATAS"
// =========================================================
const backToTop = document.getElementById('backToTop');

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// =========================================================
// 7. TAHUN HAK CIPTA OTOMATIS DI FOOTER
// =========================================================
document.getElementById('year').textContent = new Date().getFullYear();