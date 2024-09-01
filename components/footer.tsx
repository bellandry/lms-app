import Link from "next/link";
import Logo from "./logo";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-4">
      <div className="container mx-auto flex flex-col gap-4 justify-start sm:flex-row sm:justify-between items-center">
        <div className="flex items-center space-x-2">
          <Logo />
        </div>
        <div className="flex space-x-4">
          <Link href="/privacy-policy" className="text-sm hover:underline">
            Politique de Confidentialité
          </Link>
          <Link href="/terms-of-service" className="text-sm hover:underline">
            Conditions d'Utilisation
          </Link>
        </div>
      </div>
      <div className="container text-center mt-2 pt-2 border-t-2 border-slate-600">
        <p className="text-xs text-gray-400">
          &copy; 2024 Laclass Learn. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
