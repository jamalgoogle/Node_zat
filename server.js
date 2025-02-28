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
    welcome: 'Bienvenido!',
    greeting: 'Hola, mundo!',
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
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          max-width: 800px;
          margin: 0 auto;
          padding: 0px;
          text-align: center;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        h1 {
          color: #2c3e50;
          margin-bottom: 20px;
          font-size: 2.5em;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
          letter-spacing: 1px;
        }
        p {
          color: #34495e;
          line-height: 1.8;
          font-size: 1.2em;
          margin: 15px 0;
        }
        a {
          color: #3498db;
          text-decoration: none;
          padding: 8px 15px;
          margin: 0 5px;
          border-radius: 20px;
          transition: all 0.3s ease;
          background-color: rgba(255,255,255,0.7);
        }
        a:hover {
          background-color: #3498db;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }
        .language-switcher {
          margin: 30px 0;
          padding: 20px;
          background-color: rgba(255,255,255,0.9);
          border-radius: 15px;
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
          backdrop-filter: blur(5px);
          border: 1px solid rgba(255,255,255,0.3);
          animation: fadeIn 0.5s ease-out;
        }
      //   @keyframes fadeIn {
      //     from {
      //       opacity: 0;
      //       transform: translateY(-20px);
      //     }
      //     to {
      //       opacity: 1;
      //       transform: translateY(0);
      //     }
      //   }
        .container {
          background-color: rgba(255,255,255,0.8);
          padding: 30px;
          border-radius: 20px;
          box-shadow: 0 15px 30px rgba(0,0,0,0.1);
          margin: 20px 0;
          width: 90%;
          max-width: 600px;
          transition: transform 0.3s ease;
        }
        .container:hover {
          transform: scale(1.02);
        }
      </style>
    </head>
    <body>
    <div class="language-switcher">
      <a href="/?lang=en">English</a> |
      <a href="/?lang=es">Español</a> |
      <a href="/?lang=fr">Français</a>
    </div>
    <div class="container">
      <h1>${req.t.welcome}</h1>
      <p>${req.t.greeting}</p>
      <p>${req.t.changeLanguage}: ${req.lang}</p>
    </div>
    </body>
    </html>
  `;
  res.send(html);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
