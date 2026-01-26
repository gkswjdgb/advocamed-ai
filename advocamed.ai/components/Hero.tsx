<!DOCTYPE html>
<html lang="en" class="light">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- Resource Hints for Performance -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    
    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

    <meta name="description" content="AdvocaMed.ai: Free AI medical bill advocate. Detect billing errors, generate appeal letters, and find charity care eligibility under IRS 501(r)." />
    <meta name="keywords" content="medical bill dispute, hospital bill error, charity care, medical coding errors, AI patient advocate" />
    
    <!-- Google AdSense Verification Meta Tag -->
    <meta name="google-adsense-account" content="ca-pub-9757952393788382">

    <!-- PWA & Mobile Optimization -->
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    <meta name="theme-color" content="#1152d4">

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&family=Noto+Sans:wght@300..800&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet">

    <!-- Third-party Script Lazy Loader (Performance & Security) -->
    <script>
      (function() {
        // Flags to prevent double loading
        let adsLoaded = false;
        let analyticsLoaded = false;

        function loadScripts() {
          if (adsLoaded && analyticsLoaded) return;

          // 1. Google Analytics (GTM)
          if (!analyticsLoaded) {
            analyticsLoaded = true;
            const script = document.createElement('script');
            script.src = 'https://www.googletagmanager.com/gtag/js?id=G-NLMH7ERZZ3';
            script.async = true;
            document.head.appendChild(script);

            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-NLMH7ERZZ3');
          }

          // 2. Google AdSense (Heavy script - loaded last)
          if (!adsLoaded) {
            adsLoaded = true;
            const script = document.createElement('script');
            script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9757952393788382';
            script.async = true;
            script.crossOrigin = "anonymous";
            document.head.appendChild(script);
          }
        }

        // Trigger on user interaction or timeout
        const events = ['scroll', 'mousemove', 'touchstart', 'click'];
        function onInteraction() {
          loadScripts();
          events.forEach(evt => window.removeEventListener(evt, onInteraction));
        }

        events.forEach(evt => window.addEventListener(evt, onInteraction, { passive: true }));
        
        // Fallback: Load after 4 seconds if no interaction
        setTimeout(loadScripts, 4000);
      })();
    </script>
    
    <!-- Inline Manifest for PWA -->
    <link rel="manifest" href="data:application/json;base64,eyJuYW1lIjoiQWR2b2NhTWVkLmFpIiwic2hvcnRfbmFtZSI6IkFkdm9jYU1lZCIsInN0YXJ0X3VybCI6Ii4iLCJkaXNwbGF5Ijoic3RhbmRhbG9uZSIsImJhY2tncm91bmRfY29sb3IiOiIjZmZmZmZmIiwidGhlbWVfY29sb3IiOiIjMTE1MmQ0IiwiaWNvbnMiOlt7InNyYyI6Imh0dHBzOi8vcGxhY2Vob2xkLmNvLzE5MngxOTIvMTE1MmQ0L2ZmZmZmZj90ZXh0PUFNIiwic2l6ZXMiOiIxOTJ4MTkyIiwidHlwZSI6ImltYWdlL3BuZyJ9LHsic3JjIjoiaHR0cHM6Ly9wbGFjZWhvbGQuY28vNTEyeDUxMi8xMTUyZDQvZmZmZmZmP3RleHQ9QU0iLCJzaXplcyI6IjUxMng1MTIiLCJ0eXBlIjoiaW1hZ2UvcG5nIn1dfQ==" />

    <title>AdvocaMed.ai - AI Medical Bill Advocate & Dispute Tool</title>
    
    <!-- Tailwind CDN -->
    <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
    <script>
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            colors: {
              "primary": "#1152d4",
              "primary-hover": "#0d3fa6",
              "background-light": "#f8f9fc",
              "background-dark": "#101622",
              "surface-light": "#ffffff",
              "surface-dark": "#1a2234",
              "text-main-light": "#0d121b",
              "text-main-dark": "#ffffff",
              "text-secondary-light": "#4c669a",
              "text-secondary-dark": "#9aaebb",
              "border-light": "#e7ebf3",
              "border-dark": "#2a3447"
            },
            fontFamily: {
              "display": ["Manrope", "sans-serif"],
              "body": ["Noto Sans", "sans-serif"],
            },
            borderRadius: { "DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "2xl": "1rem", "full": "9999px" },
            animation: {
              'fade-in-up': 'fadeInUp 0.8s ease-out',
            },
            keyframes: {
              fadeInUp: {
                '0%': { opacity: '0', transform: 'translateY(20px)' },
                '100%': { opacity: '1', transform: 'translateY(0)' },
              }
            }
          },
        },
      }
    </script>
    <style>
      body { font-family: 'Manrope', sans-serif; -webkit-tap-highlight-color: transparent; }
      .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
      img { max-width: 100%; height: auto; }
    </style>
<script type="importmap">
{
  "imports": {
    "react": "https://esm.sh/react@^19.2.3",
    "react-dom/": "https://esm.sh/react-dom@^19.2.3/",
    "react/": "https://esm.sh/react@^19.2.3/",
    "@google/genai": "https://esm.sh/@google/genai@^1.34.0",
    "recharts": "https://esm.sh/recharts@^3.6.0",
    "react-helmet-async": "https://esm.sh/react-helmet-async@^2.0.5",
    "react-router-dom": "https://esm.sh/react-router-dom@^7.11.0",
    "vite": "https://esm.sh/vite@^7.3.0",
    "@vitejs/plugin-react": "https://esm.sh/@vitejs/plugin-react@^5.1.2",
    "fs": "https://esm.sh/fs@^0.0.1-security",
    "path": "https://esm.sh/path@^0.12.7",
    "url": "https://esm.sh/url@^0.11.4"
  }
}
</script>
  </head>
  <body class="bg-background-light dark:bg-background-dark font-display text-text-main-light dark:text-text-main-dark flex flex-col min-h-screen transition-colors duration-200">
    <div id="root"></div>
    <script type="module" src="./index.tsx"></script>
  </body>
</html>
