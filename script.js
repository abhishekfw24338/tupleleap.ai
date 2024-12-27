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
    aboutSection.style.display = 'none';
    productsSection.style.display = 'none';
    customersSection.style.display = 'none';

    targetSection.style.display = 'block';

    // Remove the "visible" class from all sections
    aboutContent.classList.remove('visible');
    productsContent.classList.remove('visible');
    customersContent.classList.remove('visible');

    // Add the "visible" class to the target content to trigger animation
    targetContent.classList.add('visible');
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
document.addEventListener("DOMContentLoaded", function() {
  let lines = document.querySelectorAll('.line');
  
  function startTypewriterEffect() {
      let delay = 0;
      lines.forEach((line, index) => {
          setTimeout(() => {
              line.style.width = '100%'; // Trigger the typewriter animation
              line.style.opacity = '1';  // Reveal the line
          }, delay);
          delay += 5000; // Add a delay between each line's appearance
      });
  }

  startTypewriterEffect(); // Start the animation after the page is loaded
});
