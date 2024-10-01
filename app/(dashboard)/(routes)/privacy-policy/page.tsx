const PrivacyPage = () => {
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-4 flex h-full items-center">
        <div className="mx-auto my-auto max-w-3xl h-fit text-justify">
          <h1 className="font-semibold sm:text-2xl">
            Politique de Confidentialité
          </h1>

          <p className="mt-3">Dernière mise à jour : 01 Oct 2024</p>
          <p className="mt-5">
            Introduction Bienvenue sur notre plateforme LMS. Nous nous engageons
            à protéger et à respecter votre vie privée. Cette politique de
            confidentialité explique comment nous collectons, utilisons,
            partageons et protégeons vos informations personnelles lorsque vous
            utilisez notre plateforme.
          </p>
          <h2 className="font-semibold text-xl my-4">1. Informations</h2>
          <p>
            que nous collectons Lorsque vous utilisez notre plateforme, nous
            pouvons collecter différents types d'informations : Informations
            personnelles identifiables (PII) : telles que
          </p>
          <ul className="list-disc ml-4">
            <li>votre nom</li>
            <li>adresse e-mail</li>
            <li>Numéro de téléphone</li>
            <li>
              ou toute autre information personnelle que vous nous fournissez
              lors de l'inscription ou de l'utilisation de la plateforme
            </li>
            <li>
              Informations sur l'utilisation : y compris les pages consultées,
              le temps passé sur la plateforme, les cours suivis, les résultats
              d'évaluation, etc. Informations techniques : comme votre adresse
              IP, type de navigateur, système d'exploitation, et d'autres
              données de connexion.
            </li>
          </ul>
          <h2 className="font-semibold text-xl my-4">
            2. Utilisation des informations
          </h2>
          <p>
            Les informations collectées sont utilisées pour : Gérer et améliorer
            la plateforme LMS. Vous fournir un accès aux cours, contenus, et
            fonctionnalités de la plateforme. Personnaliser votre expérience
            d'apprentissage. Traiter les paiements et transactions financières
            (le cas échéant). Assurer le suivi des progrès et des performances.
            Vous envoyer des notifications importantes, des mises à jour ou des
            offres relatives à la plateforme.{" "}
          </p>
          <h2 className="font-semibold text-xl my-4">
            3. Partage des informations
          </h2>
          <p>
            Nous ne partageons pas vos informations personnelles avec des tiers,
            sauf dans les cas suivants : Fournisseurs de services : Nous pouvons
            partager vos informations avec des prestataires de services qui nous
            aident à gérer et exploiter la plateforme (hébergement, support
            technique, traitement des paiements, etc.). Obligations légales :
            Nous pouvons être amenés à divulguer vos informations pour se
            conformer à des obligations légales ou des demandes
            gouvernementales. Consentement explicite : Nous partagerons vos
            informations si vous nous donnez votre consentement explicite.{" "}
          </p>
          <h2 className="font-semibold text-xl my-4">
            4. Protection des données
          </h2>
          <p>
            Nous mettons en œuvre des mesures de sécurité appropriées pour
            protéger vos informations contre les accès non autorisés, les
            modifications, la divulgation ou la destruction. Ces mesures
            comprennent l'utilisation du cryptage SSL, des contrôles d'accès
            stricts et des audits réguliers de sécurité.{" "}
          </p>
          <h2 className="font-semibold text-xl my-4">5. Vos droits</h2>
          <p>
            Vous disposez des droits suivants concernant vos données
            personnelles :{" "}
          </p>
          <ul className="list-disc ml-4">
            <li>
              Accès : Vous avez le droit de demander l'accès aux informations
              personnelles que nous détenons à votre sujet.
            </li>
            <li>
              Rectification : Vous pouvez demander la correction de toute donnée
              inexacte ou incomplète.
            </li>
            <li>
              Suppression : Vous pouvez demander la suppression de vos
              informations, sous réserve de certaines conditions.
            </li>
            <li>
              Opposition : Vous pouvez vous opposer à l'utilisation de vos
              informations à des fins de marketing.
            </li>
          </ul>

          <p>
            Pour exercer ces droits, vous pouvez nous contacter à{" "}
            <b>contact@laclass.dev</b>.
          </p>
          <h2 className="font-semibold text-xl my-4">6. Cookies</h2>
          <p>
            Notre plateforme utilise des cookies pour améliorer votre expérience
            utilisateur. Les cookies sont de petits fichiers de données stockés
            sur votre appareil. Vous pouvez gérer vos préférences en matière de
            cookies dans les paramètres de votre navigateur.{" "}
          </p>
          <h2 className="font-semibold text-xl my-4">
            7. Modifications de la politique de confidentialité
          </h2>
          <p>
            Nous pouvons mettre à jour cette politique de confidentialité de
            temps à autre. Toute modification sera affichée sur cette page et,
            si nécessaire, vous serez informé(e) par e-mail ou via la
            plateforme. Nous vous encourageons à consulter régulièrement cette
            politique pour rester informé(e) des dernières mises à jour.{" "}
          </p>
          <h2 className="font-semibold text-xl my-4">8. Contact</h2>
          <p>
            Si vous avez des questions ou des préoccupations concernant cette
            politique de confidentialité, vous pouvez nous contacter à l'adresse
            suivante : Laclass Dev Group, contact@laclass.dev
          </p>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPage;
