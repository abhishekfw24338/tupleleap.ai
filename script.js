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

    aboutContent.classList.remove('visible');
    productsContent.classList.remove('visible');
    customersContent.classList.remove('visible');

    targetContent.classList.add('visible');
  };

  // Event listener for "About" link
  aboutLink.addEventListener('click', (e) => {
    e.preventDefault();

    // Show "About" section before scrolling
    showSection(aboutSection, aboutContent);

    // Smoothly scroll to the "About" section with offset
    smoothScrollWithOffset(aboutSection);
  });

  // Event listener for "Products" link
  productsLink.addEventListener('click', (e) => {
    e.preventDefault();

    // Show "Products" section before scrolling
    showSection(productsSection, productsContent);

    // Smoothly scroll to the "Products" section with offset
    smoothScrollWithOffset(productsSection);
  });

  // Event listener for "Customers" link
  customersLink.addEventListener('click', (e) => {
    e.preventDefault();

    // Show "Customers" section before scrolling
    showSection(customersSection, customersContent);

    // Smoothly scroll to the "Customers" section with offset
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
