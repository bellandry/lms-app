import { AlertCircleIcon } from "lucide-react";
import Link from "next/link";

const AiGeneratorHome = () => {
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-32 flex my-auto h-full items-center mt-[70px]">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="bg-gradient-to-r from-slate-800 via-blue-500 to-slate-800 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
            Créez des cours personnalisés.
            <span className="sm:block"> assisté par l&apos;IA </span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
            Créez des cours sur les domaines d&apos;apprentissage de votre choix
            grace à la puissance de l&apos;intelligence artificielle et apprenez
            à votre rythme
          </p>
          <AlertCircleIcon size={60} className="text-yellow-500 mx-auto mt-4" />
          <p className="mx-auto mt-4 max-w-xl text-2xl text-yellow-500">
            Cette fonctionnalité est encore en cours de développement
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              className="block w-full rounded border border-slate-800 bg-slate-800 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-slate-800 focus:outline-none focus:ring active:text-opacity-75 sm:w-auto transition-all"
              href="/"
            >
              Retour à l&apos;accueil
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiGeneratorHome;
