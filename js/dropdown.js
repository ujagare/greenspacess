// Mobile Dropdown Toggle for Projects
document.addEventListener("DOMContentLoaded", function () {
  const dropdownItems = document.querySelectorAll(".nav-item.dropdown");

  dropdownItems.forEach(function (dropdown) {
    const dropdownToggle = dropdown.querySelector(".dropdown-toggle");

    if (dropdownToggle) {
      // Add click event to the toggle link
      dropdownToggle.addEventListener("click", function (e) {
        // Only prevent default and toggle on mobile
        if (window.innerWidth <= 768) {
          e.preventDefault();
          e.stopPropagation();

          // Close other dropdowns
          dropdownItems.forEach(function (item) {
            if (item !== dropdown) {
              item.classList.remove("active");
            }
          });

          // Toggle current dropdown
          dropdown.classList.toggle("active");

          // Log for debugging
          console.log(
            "Dropdown toggled:",
            dropdown.classList.contains("active"),
          );
        }
      });
    }
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", function (e) {
    if (window.innerWidth <= 768) {
      if (!e.target.closest(".nav-item.dropdown")) {
        dropdownItems.forEach(function (dropdown) {
          dropdown.classList.remove("active");
        });
      }
    }
  });
});
