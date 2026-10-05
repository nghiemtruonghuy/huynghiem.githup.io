/**
 * BLACKPINK / BORN PINK PORTFOLIO SCRIPT — VIỆT HÓA 100%
 * High-Fashion Interaction Engine for NGHIÊM TRƯỜNG HUY
 * Sinh viên Khoa Kinh tế Quốc tế — Đại học Ngoại thương (FTU)
 */

document.addEventListener('DOMContentLoaded', () => {
  initCoachellaIntro();
  initCustomCursor();
  initMobileMenu();
  initScrollSpy();
  initStatsCounter();
  initProjectFiltering();
  initProjectModal();
  initContactForm();
  initClipboardButtons();
  initVideoControls();
  initCVModal();
  initPhotoCustomizer();
});

/* ==========================================================================
   1. CUSTOM NEON CURSOR & MAGNETIC FOLLOW
   ========================================================================== */
function initCustomCursor() {
  const cursor = document.getElementById('custom-cursor');
  const follower = document.getElementById('custom-cursor-follower');

  if (!cursor || !follower || window.innerWidth < 1024) return;

  let mouseX = -100;
  let mouseY = -100;
  let followerX = -100;
  let followerY = -100;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
  });

  function renderFollower() {
    followerX += (mouseX - followerX) * 0.18;
    followerY += (mouseY - followerY) * 0.18;
    follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
    requestAnimationFrame(renderFollower);
  }
  requestAnimationFrame(renderFollower);

  // Hover states on interactive items
  const interactives = document.querySelectorAll('a, button, input, textarea, select, .portfolio-card, .filter-btn');
  interactives.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('active');
      follower.classList.add('active');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('active');
      follower.classList.remove('active');
    });
  });
}

/* ==========================================================================
   2. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('menu-toggle');
  const closeBtn = document.getElementById('menu-close');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !mobileDrawer) return;

  function openMenu() {
    mobileDrawer.classList.remove('translate-x-full');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileDrawer.classList.add('translate-x-full');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  navLinks.forEach((link) => {
    link.addEventListener('click', closeMenu);
  });
}

/* ==========================================================================
   3. SCROLL SPY & HEADER BACKDROP EFFECT
   ========================================================================== */
function initScrollSpy() {
  const header = document.getElementById('main-header');
  const sections = document.querySelectorAll('section[id]');
  const desktopLinks = document.querySelectorAll('.desktop-nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('bg-black/90', 'backdrop-blur-xl', 'border-b', 'border-[#ff2a85]/20', 'shadow-[0_10px_30px_rgba(0,0,0,0.8)]');
    } else {
      header.classList.remove('bg-black/90', 'border-b', 'border-[#ff2a85]/20', 'shadow-[0_10px_30px_rgba(0,0,0,0.8)]');
    }

    let currentId = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    desktopLinks.forEach((link) => {
      link.classList.remove('text-[#ff2a85]', 'font-bold');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('text-[#ff2a85]', 'font-bold');
      }
    });
  });
}

/* ==========================================================================
   4. STATS COUNTER ANIMATION
   ========================================================================== */
function initStatsCounter() {
  const statsElements = document.querySelectorAll('[data-counter]');
  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        statsElements.forEach((el) => {
          const target = parseFloat(el.getAttribute('data-counter'));
          const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
          const duration = 1800; // ms
          const startTime = performance.now();

          function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentVal = easeOut * target;

            el.textContent = currentVal.toFixed(decimals);

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              el.textContent = target.toFixed(decimals);
            }
          }
          requestAnimationFrame(updateCounter);
        });
      }
    });
  }, { threshold: 0.25 });

  const statsSection = document.getElementById('about');
  if (statsSection) observer.observe(statsSection);
}

/* ==========================================================================
   5. PROJECT FILTERING ENGINE
   ========================================================================== */
function initProjectFiltering() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.portfolio-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filterValue = btn.getAttribute('data-filter');

      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.96)';
          card.classList.remove('hidden');
          setTimeout(() => {
            card.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 40);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.96)';
          setTimeout(() => {
            card.classList.add('hidden');
          }, 300);
        }
      });
    });
  });
}

/* ==========================================================================
   6. PROJECT MODAL CASE STUDY VIEWER (VIỆT HÓA THEO CV)
   ========================================================================== */
const projectDetails = {
  fbis: {
    title: "Xúc Tiến Tài Trợ & Đối Ngoại Doanh Nghiệp — FBIS FTU",
    badge: "QUAN HỆ ĐỐI NGOẠI • PHÁT TRIỂN ĐỐI TÁC",
    subtitle: "Phó Ban Đối Ngoại (Deputy Head of External Relations) // FBIS FTU (2024 - 2025)",
    date: "2024 - 2025",
    description: "Trực tiếp điều phối và hỗ trợ các hoạt động đối ngoại của CLB Hệ thống Thông tin Kinh doanh Quốc tế (FBIS FTU). Phụ trách tiếp cận các đối tác chiến lược, các nhãn hàng và nhà tài trợ doanh nghiệp, đồng thời bảo đảm tiến độ triển khai quyền lợi truyền thông trong các sự kiện quy mô toàn trường.",
    deliverables: [
      "Hỗ trợ các hoạt động đối ngoại, tiếp cận và kết nối mạng lưới các nhà tài trợ, đối tác truyền thông.",
      "Xây dựng và duy trì mối quan hệ bền vững với các tổ chức, doanh nghiệp và đối tác chuyên môn bên ngoài.",
      "Trực tiếp đóng góp ý tưởng và soạn thảo hồ sơ mời tài trợ (sponsorship proposals), thư mời trang trọng và ấn phẩm truyền thông hợp tác.",
      "Phối hợp liên ban tổ chức thành công các chiến dịch tuyển dụng thường niên, chuỗi workshops và các diễn đàn sinh viên."
    ],
    tools: ["Public Relations", "Project Management", "Thương thảo Hợp tác", "Leadership", "Teamwork", "Effective Communication"]
  },
  research: {
    title: "Dự Án Nghiên Cứu Học Thuật Kinh Tế Quốc Tế & Thương Mại",
    badge: "NGHIÊN CỨU KHOA HỌC • KINH TẾ LƯỢNG",
    subtitle: "Thành viên Nhóm Nghiên cứu (Research Team Member) // FTU (2024 - 2025)",
    date: "2024 - 2025",
    description: "Thực hiện nghiên cứu chuyên sâu về các chủ đề kinh tế quốc tế, kinh tế phát triển, thương mại và các giải pháp hướng tới phát triển bền vững. Áp dụng phương pháp phân tích định lượng và lý thuyết kinh tế hiện đại để đánh giá các vấn đề kinh tế thực tế.",
    deliverables: [
      "Thu thập, làm sạch và xử lý các tập dữ liệu kinh tế vĩ mô quốc tế từ các cơ sở dữ liệu học thuật uy tín (World Bank, UNCTAD).",
      "Rà soát, tổng hợp hệ thống tài liệu nghiên cứu (literature review) trong và ngoài nước.",
      "Xây dựng đề cương nghiên cứu khoa học và chuẩn bị slide báo cáo thuyết trình cho các dự án học thuật.",
      "Vận dụng mô hình lý thuyết kinh tế vĩ mô và kinh tế lượng để kiểm định các giả thuyết kinh tế thực tiễn."
    ],
    tools: ["International Economics", "Econometrics", "Phân tích Định lượng", "Critical Thinking", "Nghiên cứu Học thuật"]
  },
  circular: {
    title: "Mô Hình Kinh Tế Tuần Hoàn & Phát Triển Bền Vững",
    badge: "CHÍNH SÁCH KINH TẾ • KINH TẾ TUẦN HOÀN",
    subtitle: "Đề Án Học Thuật Chuyên Sâu // Khoa Kinh Tế Quốc Tế FTU",
    date: "2024 - 2025",
    description: "Nghiên cứu lộ trình chuyển đổi chuỗi cung ứng sản xuất theo mô hình kinh tế tuần hoàn (Circular Economy) tại các quốc gia đang phát triển. Đánh giá tính khả thi, chi phí chuyển đổi và lợi ích kinh tế lâu dài cho các doanh nghiệp xuất khẩu Việt Nam.",
    deliverables: [
      "Báo cáo phân tích chuyên sâu về kinh tế tuần hoàn và xu hướng quy định xanh trong thương mại quốc tế.",
      "Đánh giá tác động của các rào cản kỹ thuật môi trường đối với chuỗi cung ứng hàng hóa Việt Nam.",
      "Đề xuất các khuyến nghị chính sách thúc đẩy tái chế và giảm thiểu phát thải trong công nghiệp."
    ],
    tools: ["Circular Economy", "Development Economics", "Phân tích Chính sách", "Critical Thinking"]
  },
  gala: {
    title: "Chuỗi Sự Kiện Tuyển Dụng & Workshop Doanh Nghiệp FBIS",
    badge: "TỔ CHỨC SỰ KIỆN • TRUYỀN THÔNG ĐỐI NGOẠI",
    subtitle: "FBIS FTU — Chiến Dịch Flagship Hàng Năm",
    date: "2024 - 2025",
    description: "Điều phối công tác truyền thông đối tác, đón tiếp khách mời VIP, diễn giả chuyên gia và các đại diện doanh nghiệp tham dự chuỗi sự kiện tuyển sinh viên và diễn đàn chuyên môn của FBIS FTU.",
    deliverables: [
      "Tiếp cận hơn 500+ sinh viên FTU và các trường đại học khối kinh tế tham gia sự kiện.",
      "Lập kế hoạch hậu cần, điều phối khách mời và chuẩn bị kịch bản đón tiếp đối tác trang trọng.",
      "Quản lý tiến độ truyền thông bảo trợ và giải quyết các tình huống phát sinh trong sự kiện."
    ],
    tools: ["Event Organization", "Time Management", "Effective Communication", "Teamwork"]
  },
  tutoring: {
    title: "Chương Trình Giảng Dạy & Kèm Cặp Toán Học Chuyên Sâu",
    badge: "GIÁO DỤC • TƯ DUY TOÁN HỌC LOGIC",
    subtitle: "Gia Sư Tự Do Môn Toán (Private Tutor) // Hà Nội (2023 - Nay)",
    date: "2023 - PRESENT",
    description: "Cung cấp giải pháp gia sư toán học và rèn luyện tư duy logic cho học sinh cấp 2 và cấp 3. Thiết kế giáo án cá nhân hóa theo từng trình độ học sinh, giúp tối ưu hóa điểm số thi cử và khơi dậy đam mê giải quyết vấn đề toán học.",
    deliverables: [
      "Xây dựng kế hoạch học tập cá nhân hóa phù hợp với học lực và mục tiêu từng học sinh.",
      "Trao đổi định kỳ, liên tục cập nhật tiến độ học tập và tư vấn giải pháp học tập cho phụ huynh.",
      "Giúp học sinh cải thiện rõ rệt điểm số học kỳ và kỳ thi chuyển cấp/tốt nghiệp.",
      "Trau dồi năng lực truyền đạt, tư duy sư phạm và kỹ năng lắng nghe, thấu hiểu."
    ],
    tools: ["Pedagogical Design", "Toán học Nâng cao", "Giao tiếp Hiệu quả", "Time Management", "Problem Solving"]
  },
  fdi: {
    title: "Nghiên Cứu Dòng Vốn Đầu Tư Quốc Tế (FDI) & Thương Mại",
    badge: "ĐẦU TƯ QUỐC TẾ • CHIẾN LƯỢC KINH TẾ",
    subtitle: "Môn học Chuyên ngành: International Investment // FTU",
    date: "2024 - PRESENT",
    description: "Khảo sát và phân tích các dòng vốn đầu tư trực tiếp nước ngoài (FDI) đổ vào Việt Nam trong bối cảnh tái định hình chuỗi cung ứng toàn cầu. Phân tích các chính sách ưu đãi đầu tư, hiệp định song phương và tác động đến nền kinh tế vĩ mô.",
    deliverables: [
      "Phân tích ma trận các yếu tố tác động đến quyết định rót vốn của các tập đoàn đa quốc gia.",
      "Đánh giá rủi ro tỷ giá, lạm phát và môi trường pháp lý đối với dự án FDI.",
      "Tổng kết các giải pháp nâng cao chất lượng dòng vốn FDI xanh."
    ],
    tools: ["International Investment", "Macroeconomics", "Kinh tế Phát triển", "Quantitative Analysis"]
  }
};

function initProjectModal() {
  const modal = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close');
  const modalTriggerBtns = document.querySelectorAll('[data-modal-target]');

  if (!modal) return;

  modalTriggerBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-modal-target');
      const data = projectDetails[projectId];
      if (!data) return;

      document.getElementById('modal-badge').textContent = data.badge;
      document.getElementById('modal-title').textContent = data.title;
      document.getElementById('modal-subtitle').textContent = data.subtitle;
      document.getElementById('modal-date').textContent = data.date;
      document.getElementById('modal-desc').textContent = data.description;

      const delivList = document.getElementById('modal-deliverables');
      delivList.innerHTML = '';
      data.deliverables.forEach((item) => {
        const li = document.createElement('li');
        li.className = 'flex items-start gap-3 text-gray-300 text-sm';
        li.innerHTML = `<span class="text-[#ff2a85] font-bold mt-0.5">✦</span><span>${item}</span>`;
        delivList.appendChild(li);
      });

      const toolsContainer = document.getElementById('modal-tools');
      toolsContainer.innerHTML = '';
      data.tools.forEach((tool) => {
        const pill = document.createElement('span');
        pill.className = 'badge-pink';
        pill.textContent = tool;
        toolsContainer.appendChild(pill);
      });

      modal.classList.remove('hidden');
      setTimeout(() => {
        modal.classList.remove('opacity-0');
        modal.querySelector('.modal-content-box').classList.remove('scale-95');
      }, 10);
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modal.classList.add('opacity-0');
    modal.querySelector('.modal-content-box').classList.add('scale-95');
    setTimeout(() => {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }, 250);
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.classList.contains('modal-backdrop')) {
      closeModal();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   7. CV VIEW & DOWNLOAD MODAL
   ========================================================================== */
function initCVModal() {
  const cvModal = document.getElementById('cv-modal');
  const openBtns = document.querySelectorAll('[data-open-cv]');
  const closeBtn = document.getElementById('cv-modal-close');
  const printBtn = document.getElementById('cv-print-btn');

  if (!cvModal) return;

  function openCV() {
    cvModal.classList.remove('hidden');
    setTimeout(() => {
      cvModal.classList.remove('opacity-0');
      cvModal.querySelector('.modal-content-box').classList.remove('scale-95');
    }, 10);
    document.body.style.overflow = 'hidden';
  }

  function closeCV() {
    cvModal.classList.add('opacity-0');
    cvModal.querySelector('.modal-content-box').classList.add('scale-95');
    setTimeout(() => {
      cvModal.classList.add('hidden');
      document.body.style.overflow = '';
    }, 250);
  }

  openBtns.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    openCV();
  }));

  if (closeBtn) closeBtn.addEventListener('click', closeCV);
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  cvModal.addEventListener('click', (e) => {
    if (e.target === cvModal || e.target.classList.contains('modal-backdrop')) {
      closeCV();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !cvModal.classList.contains('hidden')) {
      closeCV();
    }
  });
}

/* ==========================================================================
   8. BLACKPINK COACHELLA VIDEO CONTROLS
   ========================================================================== */
function initVideoControls() {
  const videoToggleBtn = document.getElementById('coachella-sound-toggle');
  const videoIframe = document.getElementById('coachella-bg-video');
  const bars = document.querySelectorAll('.sound-bar');

  if (!videoToggleBtn || !videoIframe) return;

  let isMuted = true;

  videoToggleBtn.addEventListener('click', () => {
    isMuted = !isMuted;
    
    // Toggle postMessage to YouTube IFrame API
    try {
      const message = isMuted 
        ? '{"event":"command","func":"mute","args":""}' 
        : '{"event":"command","func":"unMute","args":""}';
      videoIframe.contentWindow.postMessage(message, '*');

      const volumeMessage = isMuted
        ? '{"event":"command","func":"setVolume","args":[0]}'
        : '{"event":"command","func":"setVolume","args":[100]}';
      videoIframe.contentWindow.postMessage(volumeMessage, '*');
    } catch (err) {
      console.warn("Cross-origin postMessage restricted on local file protocol.", err);
    }

    if (!isMuted) {
      videoToggleBtn.innerHTML = `
        <span class="text-[#ff2a85] font-bold">🔊</span>
        <span>ÂM THANH ‘TYPA GIRL’: BẬT</span>
      `;
      bars.forEach(b => b.style.animationPlayState = 'running');
      showToast('🔥 Đang phát âm thanh BLACKPINK - ‘Typa Girl’ Live tại Coachella 2023!', 'success');
    } else {
      videoToggleBtn.innerHTML = `
        <span class="text-gray-400">🔇</span>
        <span>ÂM THANH ‘TYPA GIRL’: TẮT</span>
      `;
      bars.forEach(b => b.style.animationPlayState = 'paused');
      showToast('🔇 Đã tắt âm thanh nền ‘Typa Girl’.', 'info');
    }
  });
}

/* ==========================================================================
   9. CONTACT FORM VALIDATION & HOT PINK TOAST
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('portfolio-contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const messageInput = document.getElementById('contact-message');
    const submitBtn = form.querySelector('button[type="submit"]');

    if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
      showToast('⚠️ Vui lòng điền đầy đủ các thông tin bắt buộc.', 'warning');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      showToast('⚠️ Địa chỉ email chưa đúng định dạng. Vui lòng kiểm tra lại.', 'warning');
      return;
    }

    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = `
      <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      ĐANG GỬI THÔNG ĐIỆP...
    `;
    submitBtn.disabled = true;

    setTimeout(() => {
      form.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      showToast(`💖 Cảm ơn bạn, ${nameInput.value}! Tin nhắn đã được gửi. Huy sẽ phản hồi bạn trong thời gian sớm nhất!`, 'success');
    }, 1200);
  });
}

/* ==========================================================================
   10. CLIPBOARD COPY BUTTONS
   ========================================================================== */
function initClipboardButtons() {
  const copyButtons = document.querySelectorAll('[data-copy-value]');
  copyButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const val = btn.getAttribute('data-copy-value');
      const label = btn.getAttribute('data-copy-label') || 'thông tin';

      navigator.clipboard.writeText(val).then(() => {
        showToast(`✨ Đã sao chép ${label} vào bộ nhớ tạm: ${val}`, 'success');
      }).catch(() => {
        showToast(`Đã sao chép: ${val}`, 'info');
      });
    });
  });
}

/* ==========================================================================
   11. HOT PINK TOAST NOTIFIER
   ========================================================================== */
function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast-msg';

  let icon = '✦';
  if (type === 'warning') icon = '⚡';
  if (type === 'success') icon = '★';

  toast.innerHTML = `
    <span class="text-[#ff2a85] font-bold text-lg">${icon}</span>
    <span class="text-sm font-medium tracking-wide font-body">${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'all 0.3s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

/* ==========================================================================
   12. INTERACTIVE PHOTO CHANGER (CUSTOM PORTRAIT SWAPPER)
   ========================================================================== */
function initPhotoCustomizer() {
  const heroBtn = document.getElementById('change-hero-photo-btn');
  const aboutBtn = document.getElementById('change-about-photo-btn');

  // Clear any legacy placeholder unsplash URLs from localStorage
  const savedHeroPhoto = localStorage.getItem('born_pink_hero_portrait');
  if (savedHeroPhoto && !savedHeroPhoto.includes('unsplash.com')) {
    const heroImg = document.getElementById('hero-portrait-img');
    if (heroImg) heroImg.src = savedHeroPhoto;
  } else {
    localStorage.removeItem('born_pink_hero_portrait');
  }

  const savedAboutPhoto = localStorage.getItem('born_pink_about_portrait');
  if (savedAboutPhoto && !savedAboutPhoto.includes('unsplash.com')) {
    const aboutImg = document.getElementById('about-portrait-img');
    if (aboutImg) aboutImg.src = savedAboutPhoto;
  } else {
    localStorage.removeItem('born_pink_about_portrait');
  }

  if (heroBtn) {
    heroBtn.addEventListener('click', (e) => {
      e.preventDefault();
      promptChangePhoto('hero-portrait-img', 'born_pink_hero_portrait');
    });
  }

  if (aboutBtn) {
    aboutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      promptChangePhoto('about-portrait-img', 'born_pink_about_portrait');
    });
  }
}

window.promptChangePhoto = function(targetImgId, storageKey = 'born_pink_hero_portrait') {
  const currentImg = document.getElementById(targetImgId);
  const currentUrl = currentImg ? currentImg.src : '';
  const newUrl = prompt("Nhập đường dẫn URL ảnh chân dung của bạn (hoặc link ảnh từ máy tính/Google Drive/Unsplash):", currentUrl);
  
  if (newUrl && newUrl.trim() !== '') {
    const testImg = new Image();
    testImg.onload = () => {
      if (currentImg) {
        currentImg.src = newUrl.trim();
        localStorage.setItem(storageKey, newUrl.trim());
        showToast('✨ Đã cập nhật ảnh chân dung của bạn thành công!', 'success');
      }
    };
    testImg.onerror = () => {
      showToast('⚠️ Không thể tải ảnh từ liên kết này. Vui lòng kiểm tra lại URL.', 'warning');
    };
    testImg.src = newUrl.trim();
  }
};

/* ==========================================================================
   13. COACHELLA 30-SECOND CINEMATIC INTRO EXPERIENCE
   ========================================================================== */
function initCoachellaIntro() {
  const overlay = document.getElementById('coachella-intro-overlay');
  const iframe = document.getElementById('intro-coachella-iframe');
  const countdownEl = document.getElementById('intro-countdown-timer');
  const progressBar = document.getElementById('intro-progress-bar');
  const timeElapsedEl = document.getElementById('intro-time-elapsed');
  const soundToggleBtn = document.getElementById('intro-sound-toggle-btn');
  const soundIcon = document.getElementById('intro-sound-icon');
  const soundText = document.getElementById('intro-sound-text');
  const eqWaves = document.getElementById('intro-eq-waves');
  const skipBtn = document.getElementById('intro-skip-btn');
  const replayBtn = document.getElementById('replay-intro-btn');
  const mobileReplayBtn = document.getElementById('mobile-replay-intro-btn');

  if (!overlay || !iframe) return;

  const TOTAL_DURATION = 30000; // 30 seconds
  let startTime = Date.now();
  let introTimerInterval = null;
  let isIntroClosed = false;
  let isMuted = true;

  function sendIframeCommand(func, args = []) {
    try {
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage(JSON.stringify({
          event: 'command',
          func: func,
          args: args
        }), '*');
      }
    } catch (err) {
      console.warn('Intro iFrame postMessage error:', err);
    }
  }

  function startIntroTimer() {
    if (introTimerInterval) clearInterval(introTimerInterval);
    startTime = Date.now();
    isIntroClosed = false;

    introTimerInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, TOTAL_DURATION - elapsed);
      const remainingSec = Math.ceil(remaining / 1000);
      const elapsedSec = Math.min(30, Math.floor(elapsed / 1000));
      const progressPercent = Math.min(100, (elapsed / TOTAL_DURATION) * 100);

      if (countdownEl) countdownEl.textContent = `${remainingSec}s`;
      if (progressBar) progressBar.style.width = `${progressPercent}%`;
      if (timeElapsedEl) timeElapsedEl.textContent = `0:${elapsedSec.toString().padStart(2, '0')}`;

      if (elapsed >= TOTAL_DURATION) {
        finishIntro(false);
      }
    }, 100);
  }

  function finishIntro(isManualSkip = false) {
    if (isIntroClosed) return;
    isIntroClosed = true;
    if (introTimerInterval) clearInterval(introTimerInterval);

    // Mute and pause the intro video so audio does not leak into the website
    sendIframeCommand('mute');
    sendIframeCommand('pauseVideo');

    overlay.classList.add('intro-hidden');

    if (isManualSkip) {
      showToast('⚡ Chào mừng bạn đến với Born Pink Portfolio của Nghiêm Trường Huy!', 'pink');
    } else {
      showToast('✨ Đoạn Intro 30s hoàn tất! Chào mừng bạn khám phá Portfolio.', 'pink');
    }
  }

  function replayIntro() {
    if (introTimerInterval) clearInterval(introTimerInterval);
    overlay.classList.remove('intro-hidden');
    isIntroClosed = false;

    // Reset progress UI
    if (countdownEl) countdownEl.textContent = '30s';
    if (progressBar) progressBar.style.width = '0%';
    if (timeElapsedEl) timeElapsedEl.textContent = '0:00';

    // Unhide mobile menu if open
    const mobileDrawer = document.getElementById('mobile-drawer');
    if (mobileDrawer) mobileDrawer.classList.add('translate-x-full');

    // Rewind video and play
    sendIframeCommand('seekTo', [0, true]);
    sendIframeCommand('playVideo');

    // If sound was already unmuted, ensure volume is up
    if (!isMuted) {
      sendIframeCommand('unMute');
      sendIframeCommand('setVolume', [100]);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
    startIntroTimer();
    showToast('🎬 Đang phát lại đoạn Intro Coachella 30s!', 'pink');
  }

  // Audio Toggle Button
  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (isMuted) {
        sendIframeCommand('unMute');
        sendIframeCommand('setVolume', [100]);
        sendIframeCommand('playVideo');
        isMuted = false;
        if (soundIcon) soundIcon.textContent = '🔊';
        if (soundText) soundText.textContent = 'TẮT ÂM THANH';
        if (eqWaves) eqWaves.style.display = 'flex';
        showToast('🎵 Đã bật âm thanh Coachella Live Stage!', 'pink');
      } else {
        sendIframeCommand('mute');
        isMuted = true;
        if (soundIcon) soundIcon.textContent = '🔇';
        if (soundText) soundText.textContent = 'BẬT ÂM THANH';
        if (eqWaves) eqWaves.style.display = 'none';
        showToast('🔇 Đã tắt tiếng intro.', 'info');
      }
    });
  }

  // Skip Button
  if (skipBtn) {
    skipBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      finishIntro(true);
    });
  }

  // Allow clicking anywhere outside control buttons to skip or press Escape
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !isIntroClosed) {
      finishIntro(true);
    }
  });

  // Replay buttons in Navigation
  if (replayBtn) {
    replayBtn.addEventListener('click', (e) => {
      e.preventDefault();
      replayIntro();
    });
  }

  if (mobileReplayBtn) {
    mobileReplayBtn.addEventListener('click', (e) => {
      e.preventDefault();
      replayIntro();
    });
  }

  // Launch initial 30s timer
  startIntroTimer();
}


