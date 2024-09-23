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
  responseMimeType: "application/json",
};

export const GenerateCourseModel = model.startChat({
  generationConfig,
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

export const GenerateCourseContent = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "explain the concept in detail on Topic: 'Gestion avancée des sessions utilisateur en PHP', Chapter: 'Sessions avancées : Concepts et techniques' in json format with field as title, descriptions in detail with no decorations. each description field is a part of 'descriptions' array ans should be a json object, with the two fields 'content' and 'type', type field can be: 'Paragraph' for a paragraph, 'BlockQuote' for a quote; 'Callout' for a callout; 'HeadingOne' for a heading one texte; 'HeadingTwo' for a heading two text; 'HeadingThree' for a heading three text; 'Code' for code example if applicable with additional field such as 'language'; 'BulletedList' for a lists and all items of the list in a field called 'items'. language: 'French'",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "title": "Gestion Avancée des Sessions Utilisateur en PHP",\n  "descriptions": [\n    {\n      "content": "Sessions Avancées : Concepts et Techniques",\n      "type": "HeadingOne"\n    },\n    {\n      "content": "Ce chapitre explore des techniques avancées de gestion de sessions utilisateur en PHP, permettant d\'améliorer la sécurité, la performance et la flexibilité des applications web.",\n      "type": "Paragraph"\n    },\n    {\n      "content": "Sessions et Sécurité",\n      "type": "HeadingTwo"\n    },\n    {\n      "content": "La gestion de sessions joue un rôle crucial dans la sécurité des applications web. Les sessions stockent des informations sensibles sur l\'utilisateur, comme son identifiant de connexion, ses préférences et son panier d\'achat. Il est donc essentiel de sécuriser correctement le mécanisme de session pour prévenir les attaques comme le vol de session et la falsification de requêtes.",\n      "type": "Paragraph"\n    },\n    {\n      "content": "Techniques de Sécurité Avancées",\n      "type": "HeadingThree"\n    },\n    {\n      "content": [\n        "Utilisation de Cookies Sécurisés: Les cookies de session doivent être configurés pour être envoyés uniquement via HTTPS, empêchant ainsi leur interception par des attaquants.",\n        "Génération de Tokens Sécurisés: Les identifiants de session (SID) doivent être générés de manière aléatoire et cryptographiquement sécurisée, rendant difficile la prédiction ou la falsification de l\'identifiant.",\n        "Expiration des Sessions: Définir une durée d\'expiration pour les sessions, après laquelle l\'utilisateur sera automatiquement déconnecté.",\n        "Réutilisation des Identifiants de Session: Eviter de réutiliser un même identifiant de session pour plusieurs utilisateurs, ce qui pourrait compromettre la sécurité.",\n        "Protection contre les Attaques CSRF: Implémenter des mécanismes de protection contre les attaques CSRF (Cross-Site Request Forgery) pour empêcher la falsification de requêtes provenant de sites web tiers.",\n        "Utilisation d\'une Librairie de Sessions: Utiliser une librairie de session spécialisée pour simplifier la gestion de la sécurité et de la complexité de l\'implémentation."\n      ],\n      "type": "BulletedList"\n    },\n    {\n      "content": "Sessions et Performance",\n      "type": "HeadingTwo"\n    },\n    {\n      "content": "La performance de la gestion de sessions est essentielle pour une expérience utilisateur fluide. Des sessions trop volumineuses ou mal gérées peuvent entraîner des temps de chargement plus longs et des latences accrues.",\n      "type": "Paragraph"\n    },\n    {\n      "content": "Optimisation des Sessions",\n      "type": "HeadingThree"\n    },\n    {\n      "content": [\n        "Réduction de la Taille des Données de Session: Ne stocker que les données essentielles dans la session, en évitant les données redondantes ou inutiles.",\n        "Utilisation d\'un Stockage de Session Efficace: Choisir un mécanisme de stockage adapté aux besoins de l\'application, comme la mémoire partagée ou une base de données.",\n        "Expiration et Nettoyage des Sessions: Supprimer les sessions expirées ou inactives régulièrement pour libérer de l\'espace et améliorer les performances.",\n        "Utilisation d\'un Cache de Session: Implémenter un cache de session pour stocker temporairement les données de session fréquemment consultées, réduisant ainsi les accès au stockage principal."\n      ],\n      "type": "BulletedList"\n    },\n    {\n      "content": "Sessions et Flexibilité",\n      "type": "HeadingTwo"\n    },\n    {\n      "content": "Une gestion de session flexible permet d\'adapter l\'application à différents scénarios et besoins. Il est important de pouvoir gérer les sessions de manière indépendante, de les personnaliser et de les intégrer avec d\'autres systèmes.",\n      "type": "Paragraph"\n    },\n    {\n      "content": "Techniques de Flexibilité",\n      "type": "HeadingThree"\n    },\n    {\n      "content": [\n        "Gestion de Sessions Multiples: Permettre à un utilisateur de gérer plusieurs sessions simultanément, par exemple pour différents navigateurs ou appareils.",\n        "Sessions Basées sur les Données de l\'Utilisateur: Stocker les informations de session liées aux données spécifiques de l\'utilisateur, comme ses préférences ou son historique de navigation.",\n        "Sessions Synchronisées: Synchroniser les sessions entre différents serveurs pour assurer la cohérence des données, même en cas de charge élevée.",\n        "Intégration avec des Systèmes Externes: Intégrer la gestion des sessions avec des systèmes d\'authentification ou de gestion des utilisateurs externes."\n      ],\n      "type": "BulletedList"\n    }\n  ]\n}\n```',
        },
      ],
    },
  ],
});
