const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;

app.use(cookieParser());

// Define your translations
const translations = {
  en: {
    welcome: 'Welcome!',
    greeting: 'Hello, world!',
    changeLanguage: 'Change Language',
  },
  es: {
    welcome: '¡Bienvenido!',
    greeting: '¡Hola, mundo!',
    changeLanguage: 'Cambiar Idioma',
  },
  fr: {
    welcome: 'Bienvenue!',
    greeting: 'Bonjour, le monde!',
    changeLanguage: 'Changer de langue',
  },
  // Add more languages as needed
};

// Middleware to determine the language
app.use((req, res, next) => {
  let lang = req.cookies.lang || 'en'; // Default to English
  if (req.query.lang && translations[req.query.lang]) {
    lang = req.query.lang;
    res.cookie('lang', lang);
  }
  req.lang = lang;
  req.t = translations[lang]; // Attach translation object to request
  next();
});

// Route to display the content
app.get('/', (req, res) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${req.t.welcome}</title>
    </head>
    <body>
      <h1>${req.t.welcome}</h1>
      <p>${req.t.greeting}</p>

      <a href="/?lang=en">English</a> |
      <a href="/?lang=es">Español</a> |
      <a href="/?lang=fr">Français</a>

      <p>${req.t.changeLanguage}: ${req.lang}</p>
    </body>
    </html>
  `;
  res.send(html);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});