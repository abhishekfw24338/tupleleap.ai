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
  const navbarHeight = navbar.offsetHeight; // Get the height of the navbar
  const lines = document.querySelectorAll("#typewriter-container p");
  const typingSpeed = 10; // Speed for typing each character (ms)
  const lineDelay = 1000;  // Delay between lines (ms)

  if (!goToTopButton || !navbar || !aboutLink || !aboutSection || !productsSection || !customersSection || !aboutContent || !productsContent || !customersContent) {
    console.error("Required elements not found in the DOM.");
    return;
  }

  // Scroll event to show/hide "Back to Top" button
  window.addEventListener('scroll', () => {
    const navbarBottom = navbar.getBoundingClientRect().bottom;

    if (navbarBottom <= 0) {
      goToTopButton.style.display = 'block';
    } else {
      goToTopButton.style.display = 'none';
    }
  });

  // Smooth scroll function with offset
  const smoothScrollWithOffset = (targetSection) => {
    const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
  };

  // Function to show the target section and hide others
  const showSection = (targetSection, targetContent) => {
    // Hide all sections
    aboutSection.style.display = 'none';
    productsSection.style.display = 'none';
    customersSection.style.display = 'none';

    // Show only the target section
    targetSection.style.display = 'block';

    // Reset the typewriter animation for all sections first
    resetTypewriterAnimation();

    // Trigger the animation only for the selected section
    targetContent.classList.add('visible');
    startTypewriterAnimation(targetContent);
  };

  // Function to reset the typewriter animation by removing the visible class
  const resetTypewriterAnimation = () => {
    const allContentSections = [aboutContent, productsContent, customersContent];
    allContentSections.forEach(content => {
      content.classList.remove('visible');
    });
  };

  // Function to start the typewriter animation on a specific section
  const startTypewriterAnimation = (sectionContent) => {
    const lines = sectionContent.querySelectorAll('.typewriter-line');
    let currentLine = 0;

    const typeLine = (lineElement, text, index) => {
      let currentText = '';
      let charIndex = 0;

      const typeNextChar = () => {
        if (charIndex < text.length) {
          currentText += text.charAt(charIndex);
          lineElement.innerHTML = currentText;
          charIndex++;
          setTimeout(typeNextChar, typingSpeed);
        }
      };

      typeNextChar();
    };

    const showNextLine = () => {
      if (currentLine < lines.length) {
        const line = lines[currentLine];
        line.classList.add('visible'); // Make the current line visible
        typeLine(line, line.textContent, currentLine); // Start typing the line

        currentLine++;

        // Wait for the typing to finish, then show the next line
        setTimeout(showNextLine, lineDelay + (lines[currentLine - 1].textContent.length * typingSpeed));
      }
    };

    // Start the typewriter animation for the target section
    showNextLine();
  };

  // Event listener for "About" link
  aboutLink.addEventListener('click', (e) => {
    e.preventDefault();
    showSection(aboutSection, aboutContent);
    smoothScrollWithOffset(aboutSection);
  });

  // Event listener for "Products" link
  productsLink.addEventListener('click', (e) => {
    e.preventDefault();
    showSection(productsSection, productsContent);
    smoothScrollWithOffset(productsSection);
  });

  // Event listener for "Customers" link
  customersLink.addEventListener('click', (e) => {
    e.preventDefault();
    showSection(customersSection, customersContent);
    smoothScrollWithOffset(customersSection);
  });

  // Toggle menu visibility for the hamburger menu
  menuToggle.addEventListener('change', () => {
    if (menuToggle.checked) {
      menu.style.display = 'flex';
    } else {
      menu.style.display = 'none';
    }
  });

  // Adjust menu visibility when resizing the window
  window.addEventListener('resize', () => {
    if (window.innerWidth > 854) {
      menuToggle.checked = false;
      menu.style.display = 'flex';
    } else if (window.innerWidth <= 854) {
      menu.style.display = 'none';
    }
  });
});
