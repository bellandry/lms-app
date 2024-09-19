/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export const GenerateCourseModel = model.startChat({
  generationConfig,
  // safetySettings: Adjust safety settings
  // See https://ai.google.dev/gemini-api/docs/safety-settings
  history: [
    {
      role: "user",
      parts: [
        {
          text: 'Generate a course tutorial on following detail with field as course name, description, along with chapter name, about, duration: Category: "programming", topic: "php", description: "mettre sur pied et gérer un système de sessions utilisateurs" level: "basic", duration: "1 hours\' NoOf Chapters: 5, language: "french", in Json format',
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "course": {\n    "name": "Maîtriser les Sessions Utilisateurs avec PHP",\n    "description": "Ce cours vous guidera à travers les concepts fondamentaux des sessions utilisateurs en PHP. Vous apprendrez comment mettre en place un système de sessions sécurisé et efficace pour gérer l\'authentification et la gestion des utilisateurs sur vos sites web.",\n    "category": "programmation",\n    "topic": "php",\n    "level": "débutant",\n    "duration": "1 heure",\n    "language": "français",\n    "chapters": [\n      {\n        "name": "Introduction aux Sessions en PHP",\n        "about": "Comprendre le concept de sessions et leur rôle dans la gestion des utilisateurs. Nous aborderons les bases de la création, de l\'accès et de la destruction des sessions.",\n        "duration": "15 minutes"\n      },\n      {\n        "name": "Configuration des Sessions",\n        "about": "Apprendre à configurer les sessions en utilisant la fonction `session_start()` et à personnaliser les paramètres de la session, tels que le nom de la session, le chemin de stockage et la durée de vie.",\n        "duration": "20 minutes"\n      },\n      {\n        "name": "Gestion des Variables de Session",\n        "about": "Explorer les différentes manières de stocker et de récupérer des informations dans les variables de session, en utilisant des techniques telles que `$_SESSION` et `session_register()`.",\n        "duration": "15 minutes"\n      },\n      {\n        "name": "Authentification des Utilisateurs",\n        "about": "Mettre en œuvre un système d\'authentification simple en utilisant les sessions pour vérifier les informations d\'identification des utilisateurs et les connecter à votre site web.",\n        "duration": "20 minutes"\n      },\n      {\n        "name": "Sécurité des Sessions",\n        "about": "Aborder les aspects importants de la sécurité des sessions, tels que la protection contre la falsification de requêtes inter-sites (CSRF) et les attaques de fixation de session.",\n        "duration": "10 minutes"\n      }\n    ]\n  }\n}\n```\n',
        },
      ],
    },
  ],
});
