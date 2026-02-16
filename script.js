const sections = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
      }
    });
  },
  { threshold: 0.15 }
);

sections.forEach((section) => observer.observe(section));

document.getElementById("footer-text").textContent =
  `Copyright ${new Date().getFullYear()} Manojkumar M. Built with HTML, CSS, and JavaScript.`;
