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
  history: [
    {
      role: "user",
      parts: [
        {
          text: "explain the concept in detail on Topic: 'typescript', Chapter: 'Introduction à TypeScript' in valid JSON format with field as title, descriptions in detail and really informative and 80% practical for with no decorations. each description field is a part of 'descriptions' array ans should be a json object,   with the two fields 'content' and 'type', type field can be:   'Paragraph' for a paragraph, 'BlockQuote' for a quote; 'Callout' for a callout;    'HeadingOne' for a heading one texte; 'HeadingTwo' for a heading two text; 'HeadingThree' for a heading three text;   'Code' for code example (always as one line plain text) if applicable with additional field such as 'language';   'BulletedList' for a lists and all items of the list in a field called 'items'.  language: 'français'. don't forget to always escape special characters like slashes to give clean and valid JSON with no errors   and avoid unterminated JSON string.",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "title": "Introduction à TypeScript",\n  "descriptions": [\n    {\n      "content": "TypeScript est un langage de programmation open source développé par Microsoft. Il est un sur-ensemble de JavaScript, ce qui signifie qu\'il inclut toutes les fonctionnalités de JavaScript et ajoute des fonctionnalités supplémentaires pour améliorer la sécurité de type et la maintenance du code.",\n      "type": "Paragraph"\n    },\n    {\n      "content": "TypeScript est compilé en JavaScript, ce qui signifie que le code TypeScript est traduit en code JavaScript qui peut être exécuté par tous les navigateurs Web et les plateformes JavaScript.",\n      "type": "Paragraph"\n    },\n    {\n      "content": "Voici quelques avantages clés de l\'utilisation de TypeScript :",\n      "type": "HeadingTwo"\n    },\n    {\n      "type": "BulletedList",\n      "items": [\n        "**Sécurité de type :** TypeScript permet aux développeurs de définir les types de données des variables, ce qui permet de détecter les erreurs de type à la compilation plutôt qu\'à l\'exécution.",\n        "**Meilleure maintenance du code :** TypeScript rend le code plus lisible et plus facile à maintenir grâce à son système de typage fort et à sa capacité de définition d\'interfaces et de classes.",\n        "**Réduction des erreurs :** La sécurité de type et les fonctionnalités d\'autocomplétion de TypeScript contribuent à réduire le nombre d\'erreurs dans le code.",\n        "**Collaboration améliorée :** TypeScript facilite la collaboration entre les développeurs en fournissant un langage commun et une base solide pour la documentation.",\n        "**Support de l\'écosystème JavaScript :** TypeScript s\'intègre parfaitement à l\'écosystème JavaScript existant, vous permettant d\'utiliser les bibliothèques et les frameworks JavaScript existants."\n      ]\n    },\n    {\n      "content": "**Exemple de code TypeScript**",\n      "type": "HeadingTwo"\n    },\n    {\n      "content": "```typescript\\nlet message: string = \\"Bonjour, monde !\\";\\nconsole.log(message);\\n```",\n      "type": "Code",\n      "language": "typescript"\n    },\n    {\n      "content": "Dans cet exemple, la variable `message` est déclarée avec le type `string`. Cela signifie que la variable `message` ne peut contenir que des valeurs de type chaîne. Si vous essayez d\'assigner une valeur numérique à la variable `message`, TypeScript générera une erreur de compilation.",\n      "type": "Paragraph"\n    },\n    {\n      "content": "**Conclusion**",\n      "type": "HeadingTwo"\n    },\n    {\n      "content": "TypeScript est un langage de programmation puissant et flexible qui offre de nombreux avantages pour le développement d\'applications JavaScript. Ses fonctionnalités de sécurité de type, sa meilleure maintenance du code et son intégration avec l\'écosystème JavaScript en font un choix idéal pour les développeurs qui souhaitent créer du code JavaScript de haute qualité.",\n      "type": "Paragraph"\n    }\n  ]\n}\n```',
        },
      ],
    },
    {
      role: "user",
      parts: [{ text: "no need decorations like '*'\n" }],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "title": "Introduction à TypeScript",\n  "descriptions": [\n    {\n      "content": "TypeScript est un langage de programmation open source développé par Microsoft. Il est un sur-ensemble de JavaScript, ce qui signifie qu\'il inclut toutes les fonctionnalités de JavaScript et ajoute des fonctionnalités supplémentaires pour améliorer la sécurité de type et la maintenance du code.",\n      "type": "Paragraph"\n    },\n    {\n      "content": "TypeScript est compilé en JavaScript, ce qui signifie que le code TypeScript est traduit en code JavaScript qui peut être exécuté par tous les navigateurs Web et les plateformes JavaScript.",\n      "type": "Paragraph"\n    },\n    {\n      "content": "Voici quelques avantages clés de l\'utilisation de TypeScript:",\n      "type": "HeadingTwo"\n    },\n    {\n      "type": "BulletedList",\n      "items": [\n        "Sécurité de type: TypeScript permet aux développeurs de définir les types de données des variables, ce qui permet de détecter les erreurs de type à la compilation plutôt qu\'à l\'exécution.",\n        "Meilleure maintenance du code: TypeScript rend le code plus lisible et plus facile à maintenir grâce à son système de typage fort et à sa capacité de définition d\'interfaces et de classes.",\n        "Réduction des erreurs: La sécurité de type et les fonctionnalités d\'autocomplétion de TypeScript contribuent à réduire le nombre d\'erreurs dans le code.",\n        "Collaboration améliorée: TypeScript facilite la collaboration entre les développeurs en fournissant un langage commun et une base solide pour la documentation.",\n        "Support de l\'écosystème JavaScript: TypeScript s\'intègre parfaitement à l\'écosystème JavaScript existant, vous permettant d\'utiliser les bibliothèques et les frameworks JavaScript existants."\n      ]\n    },\n    {\n      "content": "Exemple de code TypeScript",\n      "type": "HeadingTwo"\n    },\n    {\n      "content": "```typescript\\nlet message: string = \\"Bonjour, monde !\\";\\nconsole.log(message);\\n```",\n      "type": "Code",\n      "language": "typescript"\n    },\n    {\n      "content": "Dans cet exemple, la variable `message` est déclarée avec le type `string`. Cela signifie que la variable `message` ne peut contenir que des valeurs de type chaîne. Si vous essayez d\'assigner une valeur numérique à la variable `message`, TypeScript générera une erreur de compilation.",\n      "type": "Paragraph"\n    },\n    {\n      "content": "Conclusion",\n      "type": "HeadingTwo"\n    },\n    {\n      "content": "TypeScript est un langage de programmation puissant et flexible qui offre de nombreux avantages pour le développement d\'applications JavaScript. Ses fonctionnalités de sécurité de type, sa meilleure maintenance du code et son intégration avec l\'écosystème JavaScript en font un choix idéal pour les développeurs qui souhaitent créer du code JavaScript de haute qualité.",\n      "type": "Paragraph"\n    }\n  ]\n}\n```',
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
          text: "explain the concept in detail on Topic: 'javascript', Chapter: 'Introduction à la POO' in valid JSON format with field as title, descriptions well detailed, really informative and 80% practical. each description field is a part of 'descriptions' array and should be a JSON object, with the two fields 'content' and 'type', type field can be:  'Paragraph' for a paragraph, 'BlockQuote' for a quote; 'Callout' for a callout;  'HeadingOne' for a heading one texte; 'HeadingTwo' for a heading two text; 'HeadingThree' for a heading three text;  'Code' for code example (always as one line plain text) if applicable with additional field such as 'language';   'BulletedList' for a lists and all items of the list in a field called 'items'.  language: 'français'. don't forget to always escape special characters like slashes to give clean and valid JSON with no errors  and avoid unterminated JSON string.\n",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{"title": "Introduction à la POO en JavaScript", "descriptions": [{"content": "La Programmation Orientée Objet (POO) est un paradigme de programmation qui utilise des objets comme éléments de base pour la modélisation et la résolution de problèmes.", "type": "Paragraph"}, {"content": "En JavaScript, la POO est un concept fondamental, et sa compréhension est essentielle pour développer des applications complexes et maintenables.", "type": "Paragraph"}, {"content": "Voici les concepts clés de la POO en JavaScript :", "type": "HeadingTwo"}, {"content": "**1. Objets**", "type": "HeadingThree"}, {"content": "Un objet représente une entité réelle ou abstraite, avec des propriétés (attributs) et des méthodes (fonctions) associées.", "type": "Paragraph"}, {"content": "**Exemple :**", "type": "HeadingThree"}, {"content": "\n```',
        },
      ],
    },
    {
      role: "user",
      parts: [{ text: 'with no decorations such as * and "' }],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{"title": "Introduction à la POO en JavaScript", "descriptions": [{"content": "La Programmation Orientée Objet (POO) est un paradigme de programmation qui utilise des objets comme éléments de base pour la modélisation et la résolution de problèmes.", "type": "Paragraph"}, {"content": "En JavaScript, la POO est un concept fondamental, et sa compréhension est essentielle pour développer des applications complexes et maintenables.", "type": "Paragraph"}, {"content": "Voici les concepts clés de la POO en JavaScript:", "type": "HeadingTwo"}, {"content": "1. Objets", "type": "HeadingThree"}, {"content": "Un objet représente une entité réelle ou abstraite, avec des propriétés (attributs) et des méthodes (fonctions) associées.", "type": "Paragraph"}, {"content": "Exemple:", "type": "HeadingThree"}, {"content": "```javascript\\nconst voiture = {\\n  marque: \\"Toyota\\",\\n  modele: \\"Corolla\\",\\n  annee: 2023,\\n  demarrer: function() {\\n    console.log(\\"La voiture démarre\\");\\n  }\\n};\\n```", "type": "Code", "language": "javascript"}, {"content": "Dans cet exemple, `voiture` est un objet avec les propriétés `marque`, `modele`, `annee` et la méthode `demarrer`.", "type": "Paragraph"}, {"content": "2. Classes", "type": "HeadingThree"}, {"content": "Une classe est un plan ou un modèle pour la création d\'objets. Elle définit les propriétés et les méthodes communes à tous les objets de ce type.", "type": "Paragraph"}, {"content": "Exemple:", "type": "HeadingThree"}, {"content": "```javascript\\nclass Voiture {\\n  constructor(marque, modele, annee) {\\n    this.marque = marque;\\n    this.modele = modele;\\n    this.annee = annee;\\n  }\\n  demarrer() {\\n    console.log(\\"La voiture démarre\\");\\n  }\\n}\\n```", "type": "Code", "language": "javascript"}, {"content": "La classe `Voiture` définit un modèle pour créer des objets `Voiture` avec les propriétés `marque`, `modele`, `annee` et la méthode `demarrer`.", "type": "Paragraph"}, {"content": "3. Instanciation", "type": "HeadingThree"}, {"content": "L\'instanciation consiste à créer un objet à partir d\'une classe.", "type": "Paragraph"}, {"content": "Exemple:", "type": "HeadingThree"}, {"content": "```javascript\\nconst maVoiture = new Voiture(\\"Toyota\\", \\"Corolla\\", 2023);\\n```", "type": "Code", "language": "javascript"}, {"content": "Ici, `maVoiture` est une instance de la classe `Voiture`.", "type": "Paragraph"}, {"content": "4. Héritage", "type": "HeadingThree"}, {"content": "L\'héritage permet de créer des classes filles qui héritent des propriétés et des méthodes des classes mères.", "type": "Paragraph"}, {"content": "Exemple:", "type": "HeadingThree"}, {"content": "```javascript\\nclass VehiculeElectrique extends Voiture {\\n  constructor(marque, modele, annee, autonomie) {\\n    super(marque, modele, annee);\\n    this.autonomie = autonomie;\\n  }\\n  charger() {\\n    console.log(\\"La voiture est en charge\\");\\n  }\\n}\\n```", "type": "Code", "language": "javascript"}, {"content": "La classe `VehiculeElectrique` hérite de la classe `Voiture` et ajoute la propriété `autonomie` et la méthode `charger`.", "type": "Paragraph"}, {"content": "5. Polymorphisme", "type": "HeadingThree"}, {"content": "Le polymorphisme permet de réutiliser des méthodes avec des comportements différents dans différentes classes.", "type": "Paragraph"}, {"content": "Exemple:", "type": "HeadingThree"}, {"content": "```javascript\\nclass Camion extends VehiculeElectrique {\\n  charger() {\\n    console.log(\\"Le camion est en charge lente\\");\\n  }\\n}\\n```", "type": "Code", "language": "javascript"}, {"content": "La classe `Camion` redéfinie la méthode `charger` pour avoir un comportement spécifique.", "type": "Paragraph"}, {"content": "En résumé, la POO en JavaScript permet de structurer le code de manière plus organisée, réutilisable et évolutive.", "type": "Paragraph"}]}\n```',
        },
      ],
    },
  ],
});
