import { Category } from "@prisma/client";
import { Map, Paperclip, SquareActivity } from "lucide-react";
import { IconType } from "react-icons";
import {
  FcCircuit,
  FcComboChart,
  FcCommandLine,
  FcEditImage,
  FcEnteringHeavenAlive,
  FcLock,
  FcMultipleCameras,
  FcMultipleSmartphones,
  FcMusic,
} from "react-icons/fc";

export const StepperOptions = [
  { id: 0, name: "Catégorie", icon: SquareActivity },
  { id: 1, name: "Sujet", icon: Paperclip },
  { id: 2, name: "Options", icon: Map },
];

export const iconMap: Record<Category["name"], IconType> = {
  Musique: FcMusic,
  Photographie: FcMultipleCameras,
  programmation: FcCommandLine,
  Comptabilité: FcComboChart,
  Infographie: FcEditImage,
  "Sécurité informatique": FcLock,
  "Intelligence artificielle": FcMultipleSmartphones,
  "Cloud computing": FcEnteringHeavenAlive,
  React: FcCircuit,
};
