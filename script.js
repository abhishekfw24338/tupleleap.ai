document.addEventListener('DOMContentLoaded', () => {
  const goToTopButton = document.querySelector('.back-to-top');
  const navbar = document.querySelector('.navbar');
  const aboutLink = document.querySelector('a[href="#about"]');
  const productsLink = document.querySelector('a[href="#products"]');
  const customersLink = document.querySelector('a[href="#customers"]');
  const aboutSection = document.getElementById('about');
  const productsSection = document.getElementById('products');
  const customersSection = document.getElementById('customers');
  const aboutContent = document.querySelector('.about-1');
  const productsContent = document.querySelector('.product');
  const customersContent = document.querySelector('.customer');
  const menuToggle = document.getElementById('menu-toggle');
  const menu = document.querySelector('.menu');
  const navbarHeight = navbar.offsetHeight;
  const typingSpeed = 5;
  const lineDelay = 500;

  if (!goToTopButton || !navbar || !aboutLink || !aboutSection || !productsSection || !customersSection || !aboutContent || !productsContent || !customersContent) {
    console.error("Required elements not found in the DOM.");
    return;
  }

  window.addEventListener('scroll', () => {
    const navbarBottom = navbar.getBoundingClientRect().bottom;
    if (navbarBottom <= 0) {
      goToTopButton.style.display = 'block';
    } else {
      goToTopButton.style.display = 'none';
    }
  });

  const smoothScrollWithOffset = (targetSection) => {
    const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
  };

  const resetTypewriterAnimation = (section) => {
    const lines = section.querySelectorAll('.typewriter-line');
    lines.forEach(line => {
      line.classList.remove('visible');
      line.textContent = line.getAttribute('data-original-text') || line.textContent;
      if (!line.getAttribute('data-original-text')) {
        line.setAttribute('data-original-text', line.textContent);
      }
      line.textContent = '';
    });
  };

  const startTypewriterAnimation = (section) => {
    const lines = section.querySelectorAll('.typewriter-line');
    let currentLine = 0;

    const typeLine = (lineElement) => {
      const originalText = lineElement.getAttribute('data-original-text');
      let currentText = '';
      let charIndex = 0;

      lineElement.classList.add('visible');

      const typeNextChar = () => {
        if (charIndex < originalText.length) {
          currentText += originalText.charAt(charIndex);
          lineElement.textContent = currentText;
          charIndex++;
          setTimeout(typeNextChar, typingSpeed);
        } else if (currentLine < lines.length - 1) {
          currentLine++;
          setTimeout(() => typeLine(lines[currentLine]), lineDelay);
        }
      };

      typeNextChar();
    };

    if (lines.length > 0) {
      typeLine(lines[0]);
    }
  };

  const showSection = (targetSection, targetContent) => {
    // Hide all sections first
    [aboutSection, productsSection, customersSection].forEach(section => {
      section.style.display = 'none';
    });

    // Show target section
    targetSection.style.display = 'block';

    // Reset and start animation for the target content
    resetTypewriterAnimation(targetContent);
    targetContent.classList.add('visible');
    setTimeout(() => startTypewriterAnimation(targetContent), 100);
  };

  // Event listeners for navigation links
  aboutLink.addEventListener('click', (e) => {
    e.preventDefault();
    showSection(aboutSection, aboutContent);
    smoothScrollWithOffset(aboutSection);
  });

  productsLink.addEventListener('click', (e) => {
    e.preventDefault();
    showSection(productsSection, productsContent);
    smoothScrollWithOffset(productsSection);
  });

  customersLink.addEventListener('click', (e) => {
    e.preventDefault();
    showSection(customersSection, customersContent);
    smoothScrollWithOffset(customersSection);
  });

  // Hamburger menu functionality
  menuToggle.addEventListener('change', () => {
    menu.style.display = menuToggle.checked ? 'flex' : 'none';
  });

  // Window resize handler
  window.addEventListener('resize', () => {
    if (window.innerWidth > 854) {
      menuToggle.checked = false;
      menu.style.display = 'flex';
    } else if (window.innerWidth <= 854) {
      menu.style.display = 'none';
    }
  });

  // Store original text content on load
  document.querySelectorAll('.typewriter-line').forEach(line => {
    line.setAttribute('data-original-text', line.textContent);
    line.textContent = '';
  });
});
