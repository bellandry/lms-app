import { LoaderCircle } from "lucide-react";

const Loading = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center mt-36">
        <h2 className="font-semibold text-xl">Chargement</h2>
        <LoaderCircle className="size-6 animate-spin" />
      </div>
    </>
  );
};

export default Loading;
