# Project Instructions

## Project

Build Victor Ngenge's personal portfolio as a lightweight static website using semantic HTML, CSS, and vanilla JavaScript. The initial scope is the homepage only.

## Structure

- `index.html` — page content and metadata
- `css/style.css` — all presentation and responsive styles
- `js/script.js` — interactive behavior, including the ambient canvas background
- `assets/images/` — image assets
- `assets/icons/` — icon assets

Keep HTML, CSS, and JavaScript separate. Do not add a framework or unnecessary dependencies.

## Visual direction

- Digital Universe: near-black (`#05070D`) background, white typography, muted grey secondary text, and restrained electric-blue accents.
- Place a soft electric-blue nebula behind the hero, using layered CSS radial gradients with soft edges, balanced visibility, and responsive positioning. Let it float very slowly through a 35–50 second CSS transform and opacity cycle; it must not respond to pointer movement and must stop moving for reduced-motion users.
- Use a decorative Canvas starfield above the nebula with slow, unobtrusive drift and the existing subtle constellation lines. Stars near a mouse or pen pointer should grow slightly and glow electric blue, then return to their normal appearance when the pointer moves away. Do not add click ripples, cursor-following particles, or pointer-reactive network lines. Touch devices keep the ambient starfield without hover behavior.
- Keep the visual stacking order as page content, starfield Canvas, floating nebula, then base background. Background layers must not intercept interaction.
- Aim for a minimalist, premium, professional appearance that works on desktop and mobile.

## Accessibility and implementation

- Use semantic landmarks, a logical heading hierarchy, descriptive link text, visible keyboard focus, and sufficient contrast.
- Respect `prefers-reduced-motion`; decorative animation must not be required to understand or use the page.
- Treat the canvas as decorative and provide a non-canvas fallback background.
- Keep code clean and maintainable, with no unnecessary dependencies.

## Content accuracy

The supplied facts are: BSc Cybersecurity from Caleb University; Second Class Honours (Upper Division); experience in web development; skills in HTML, CSS, JavaScript, WordPress, and Linux; interests in web development, cybersecurity, and emerging technologies.

Do not invent roles, employers, projects, awards, metrics, contact details, or other professional achievements. If a destination or contact detail has not been supplied, use a clear in-page destination or omit the unsupported detail.
