# Barba.js Setup Guide - GREENSPACESS

## ✅ Implementation Complete!

All HTML files have been updated with Barba.js wrapper structure for smooth page transitions.

### Files Updated:

- index.html ✅ DONE
- about.html ✅ DONE
- service.html ✅ DONE
- project.html ✅ DONE
- contact.html ✅ DONE
- purandhar.html ✅ DONE
- kokan.html ✅ DONE (konkan)
- khed.html ✅ DONE
- mulshi.html ✅ DONE

## Structure Implemented

### Opening (after <body>):

```html
<body>
  <div data-barba="wrapper">
    <div data-barba="container" data-barba-namespace="page-name">
      <!-- All page content here -->
    </div>
  </div>
</body>
```

### Closing (before </body>):

```html
    </div><!-- data-barba="container" -->
  </div><!-- data-barba="wrapper" -->

  <!-- Barba.js for smooth page transitions -->
  <script src="https://cdn.jsdelivr.net/npm/@barba/core@2.9.7/dist/barba.umd.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
  <script src="js/barba-init.js"></script>
</body>
```

## Page Namespaces

- index.html: data-barba-namespace="home"
- about.html: data-barba-namespace="about"
- service.html: data-barba-namespace="services"
- project.html: data-barba-namespace="projects"
- contact.html: data-barba-namespace="contact"
- purandhar.html: data-barba-namespace="purandhar"
- kokan.html: data-barba-namespace="kokan"
- khed.html: data-barba-namespace="khed"
- mulshi.html: data-barba-namespace="mulshi"

## Features

✅ Smooth fade transitions between pages
✅ GSAP animations for smooth effects
✅ AOS animations re-initialized after page load
✅ Carousel re-initialized on project pages
✅ Active navigation updated automatically
✅ Mobile menu closes after navigation
✅ External links work normally (no Barba)
✅ Anchor links work normally (no Barba)
✅ Mailto/Tel links work normally

## Testing

Visit your website and click on navigation links. You should see smooth fade transitions between pages instead of hard page reloads.

## Implementation Status

✅ **COMPLETE** - All 9 pages now have Barba.js smooth page transitions!
