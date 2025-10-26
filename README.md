# Ashwanth Samuel - Personal Website

A fast, mobile-responsive, minimalist personal website built with pure HTML, CSS, and vanilla JavaScript. No frameworks, no build step—just clean, performant code.

## 🚀 Features

- **Fixed Sidebar Navigation** - 280px left sidebar with collapsible mobile hamburger menu
- **Minimalist Design** - Black/white color scheme with blue accent, clean typography, ample whitespace
- **Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- **Accessible** - WCAG AA compliant with keyboard navigation and proper ARIA labels
- **Performance Optimized** - Under 100KB total CSS/JS, no external dependencies
- **SEO Ready** - Meta tags, Open Graph, and semantic HTML

## 📁 Project Structure

```
.
├── index.html                          # About page (home)
├── stablecoin-work.html                # Stablecoin Related Work page
├── side-projects.html                  # Side Projects page
├── contact.html                        # Contact page
├── writing.html                        # Writing page (links to Substack)
├── assets/
│   ├── css/
│   │   └── main.css                    # All styles (CSS variables, components)
│   ├── js/
│   │   └── main.js                     # Navigation and mobile menu logic
│   └── img/
│       ├── headshot.jpg                # Headshot image
│       ├── favicon.png                 # Site favicon
│       ├── kinexys-payment-tokens.png  # Sample work tile image
│       └── *.svg                       # SVG assets
└── README.md                           # This file
```

## 🎨 Customization Guide

### Updating Your Information

#### Personal Details
1. Replace "Ashwanth Samuel" with your name in all HTML files
2. Update the tagline "Mainly stablecoins." in `index.html`
3. Replace bio content in `index.html` about section
4. Update email address in `contact.html`

#### External Links
Update all instances of these placeholder URLs:
- `https://calendly.com/yourhandle` → Your Calendly link
- `https://yoursubstack.substack.com` → Your Substack URL
- `https://linkedin.com/in/yourhandle` → Your LinkedIn profile
- `https://twitter.com/yourhandle` → Your Twitter/X profile
- `https://github.com/yourhandle` → Your GitHub profile
- `ashwanth@example.com` → Your email address

**Find and replace tip:** Search for `yourhandle` and `example.com` across all files.

#### Images
1. **Headshot**: Replace `assets/img/headshot.svg` with your photo (200x200px recommended, circular crop in CSS)
2. **Favicon**: Replace `assets/img/favicon.png` with your custom favicon (32x32px PNG)

### Adding Work Tiles

The site uses two separate pages for showcasing work:
- **Stablecoin Related Work** (`stablecoin-work.html`)
- **Side Projects** (`side-projects.html`)

#### Adding a New Work Tile

1. **Prepare your image**: Save it to `assets/img/` (recommended size: 800x450px for optimal display)

2. **Add to the appropriate page** (`stablecoin-work.html` or `side-projects.html`):

   ```html
   <a href="https://your-link-here.pdf" class="card work-tile" target="_blank" rel="noopener noreferrer">
     <img src="assets/img/your-image.png" alt="Project title" class="work-tile-image">
     <div class="work-tile-content">
       <p class="work-tile-date">Month Year</p>
       <h2 class="card-title">Your Project Title</h2>
       <p class="card-description">
         A brief description of the project (2-3 sentences).
       </p>
     </div>
   </a>
   ```

3. **For internal pages** (instead of external PDFs), create a new HTML page and link to it with `href="your-page.html"`

### Updating the Sidebar Navigation

The sidebar is repeated in every HTML file. To update navigation:

1. **For root-level pages** (index.html, contact.html, writing.html):
   - Find the `<nav aria-label="Main navigation">` section
   - Update link text and href attributes as needed

2. **For project pages** (projects/*.html):
   - Use `../` prefix for links to parent directory
   - Example: `href="../index.html"`

**Important**: Keep the sidebar consistent across all pages. When you add/remove navigation items, update all HTML files.

## 🎨 Design Customization

### Colors

Edit CSS variables in `assets/css/main.css`:

```css
:root {
  --color-bg: #ffffff;        /* Background */
  --color-text: #000000;      /* Text */
  --color-accent: #0066cc;    /* Links, buttons, highlights */
  --color-border: #e0e0e0;    /* Borders */
  --color-hover: #f5f5f5;     /* Hover states */
}
```

### Typography

Adjust font sizes and families:

```css
:root {
  --font-body: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, ...;
  --font-size-body: 18px;
  --font-size-h1: 36px;
  --font-size-h2: 28px;
  --font-size-h3: 22px;
}
```

### Spacing

Modify spacing scale:

```css
:root {
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 1.5rem;
  --spacing-lg: 2rem;
  --spacing-xl: 3rem;
}
```

### Sidebar Width

Change sidebar width (also update breakpoint if needed):

```css
:root {
  --sidebar-width: 280px;  /* Adjust as needed (260-300px recommended) */
}
```

## 🔧 Components

### Button
```html
<a href="#" class="btn">Primary Button</a>
<a href="#" class="btn btn-secondary">Secondary Button</a>
```

### Card
```html
<article class="card">
  <h2 class="card-title">Card Title</h2>
  <p class="card-description">Card description text.</p>
  <a href="#" class="card-link">Read more →</a>
</article>
```

### Section
```html
<section class="section">
  <h1 class="section-title">Page Title</h1>
  <h2 class="section-subtitle">Section Heading</h2>
  <div class="section-content">
    <p>Section content...</p>
  </div>
</section>
```

### Footer
```html
<footer class="footer">
  <p>&copy; 2024 Your Name. All rights reserved.</p>
</footer>
```

## 📱 Responsive Behavior

- **Desktop (>768px)**: Fixed sidebar, scrollable content pane
- **Mobile (≤768px)**: Collapsible sidebar with hamburger menu
- **Small Mobile (≤480px)**: Reduced font sizes and spacing

## ♿ Accessibility Features

- Semantic HTML5 elements
- ARIA labels on interactive elements
- Keyboard navigation support (Tab, Enter, Esc)
- Focus visible states
- Color contrast ≥4.5:1 (WCAG AA)
- External link indicators

## 🌐 SEO Configuration

Update meta tags in each HTML file's `<head>`:

```html
<meta name="description" content="Your page description">
<meta property="og:title" content="Your Page Title">
<meta property="og:description" content="Your page description">
<meta property="og:url" content="https://yourwebsite.com">
<meta property="og:image" content="https://yourwebsite.com/assets/img/og-image.png">
```

## 🚀 Deployment

This is a static site that can be deployed anywhere:

1. **GitHub Pages**: Push to a repository, enable Pages in settings
2. **Netlify**: Drag and drop the entire folder
3. **Vercel**: Connect your Git repository
4. **Traditional hosting**: Upload via FTP to any web server

No build step required—just upload the files!

## 📦 Performance

- Total CSS: ~8KB (minified would be ~6KB)
- Total JS: ~1KB
- No external dependencies
- No web fonts loaded (system font stack)
- Images: SVG placeholders (replace with optimized photos)

**Target**: First Contentful Paint < 1s on 3G

## 🔍 Browser Support

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

This is a personal website template. Feel free to use it for your own site.

## 💡 Tips

1. **Keep it simple**: The minimalist design is intentional—resist adding complexity
2. **Optimize images**: Replace SVG placeholders with optimized JPG/WebP photos
3. **Update regularly**: Keep your projects and bio current
4. **Test mobile**: Most visitors will view on mobile—test thoroughly
5. **Maintain consistency**: When updating navigation, update all pages

## 🆘 Troubleshooting

**Sidebar not showing on mobile:**
- Check that `assets/js/main.js` is loaded
- Verify the hamburger button has the correct class names

**Links not working:**
- Check relative paths (`../` for parent directory)
- Ensure file names match exactly (case-sensitive on most servers)

**Styles not loading:**
- Verify `assets/css/main.css` path is correct
- Check browser console for 404 errors

**Active link not highlighting:**
- JavaScript uses pathname matching—ensure your paths are consistent

---

**Questions?** Review the code comments or check the structure of existing pages for examples.
