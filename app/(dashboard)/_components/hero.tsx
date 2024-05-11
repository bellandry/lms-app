import DisplayHour from "@/components/display-hour";

export const HeroSection = () => {
  return (
    <div className="w-full mx-auto flex flex-col gap-8 md:w-4/5 px-8 py-8 md:py-12 md:px-16 md:rounded-md bg-gradient-to-r from-gray-950 to-gray-800 text-white ">
      <h2 className="py-2 px-8 bg-opacity-10 bg-slate-400 w-fit rounded-sm font-semibold"><DisplayHour initialTime={new Date()} /></h2>
      <div className="flex flex-col gap-4 ">
        <h1 className="text-4xl md:text-5xl font-bold">Bienvenu sur Laclass Learn</h1>
        <p className="font-semibold md:text-lg">Apprendre par la pratique</p>
        <p className="text-sm md:text-md">Chaque Mois un nouveau cours pour aller encore plus loin</p>
      </div>
    </div>
  );
}
