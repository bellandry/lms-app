import { AlertCircleIcon } from "lucide-react";
import Link from "next/link";

const AiGeneratorHome = () => {
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-16 flex h-full items-center">
        <div className="mx-auto my-auto max-w-3xl text-center h-fit">
          <h1 className="bg-gradient-to-r from-slate-800 via-blue-500 to-slate-800 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
            Créez des cours personnalisés
            <span className="sm:block"> assisté par l&apos;IA </span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
            Créez des cours sur les domaines d&apos;apprentissage de votre choix
            grace à la puissance de l&apos;intelligence artificielle et apprenez
            à votre rythme
          </p>
          <AlertCircleIcon size={60} className="text-yellow-500 mx-auto mt-4" />
          <p className="mx-auto mt-4 max-w-xl text-2xl text-yellow-500">
            Cette fonctionnalité est dans sa phase de test, si vous rencontrez
            des problèmes contactez le webmaster en ajoutant une capture d'écran
            à votre message.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              className="relative block w-full rounded-xl border border-slate-800 bg-slate-800 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-slate-800 focus:outline-none focus:ring active:text-opacity-75 sm:w-auto transition-all"
              href="/ai-generator/create"
            >
              Générer un cours{" "}
              <span className="text-yellow-500 top-1 animate-pulse">
                ( Béta ){" "}
              </span>
              <span className="h-3 w-3 absolute rounded-full bg-yellow-600 animate-ping" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiGeneratorHome;
