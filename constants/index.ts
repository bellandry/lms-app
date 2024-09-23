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

export const parseJSON = (text: string) => {
  let jsonResponse;
  try {
    jsonResponse = JSON.parse(text);
  } catch (error) {
    const cleanedText = text.replace(
      /^\s*json\s*|^\s*[^{}[\],":\s]*|[^{}[\],":\s]*$/g,
      ""
    );
    jsonResponse = JSON.parse(cleanedText);
  }
  return jsonResponse;
};

export const pascalToSlug = (input: string): string => {
  return input.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
};

export const ContentHeading = ({
  type,
  slug,
  value,
  uid,
}: {
  type: string;
  slug: string;
  value: string;
  uid: string;
}) => {
  return `{
      "9d98408d-b990-4ffc-${uid}-387084291b00": {
        "id": "9d98408d-b990-4ffc-${uid}-387084291b00",
        "value": [
            {
                "id": "0508777e-52a4-4168-${uid}-bc7661e57aab",
                "type": "${slug}",
                "children": [
                    {
                        "text": "${value}"
                    }
                ],
                "props": {
                    "nodeType": "block"
                }
            }
        ],
        "type": "${type}",
        "meta": {
            "order": 0,
            "depth": 0
        }
      },
    }`;
};

export const BulletedListItem = ({
  item,
  index,
}: {
  item: string;
  index: number;
}) => {
  return `{
      "128d0660-6cc8-4f6a-be${index}a-ecb48cc7e9ce": {
        "id": "128d0660-6cc8-4f6a-be${index}a-ecb48cc7e9ce",
        "value": [
            {
                "id": "3a629393-8cd5-4223-995e-2${index}cc0515affc",
                "type": "bulleted-list",
                "children": [
                    {
                        "text": "${item}"
                    }
                ],
                "props": {
                    "nodeType": "block"
                }
            }
        ],
        "type": "BulletedList",
        "meta": {
            "order": 5,
            "depth": 0
        }
      }
    }`;
};

export const codeContent = ({
  value,
  language,
  index,
}: {
  value: string;
  index: number;
  language: string;
}) => {
  return `
      {
        "ad15458a-10c9-41fa-819${index}-e86e393fc9d6": {
          "id": "ad15458a-10c9-41fa-819${index}-e86e393fc9d6",
          "value": [
              {
                  "id": "3f9508b0-ac86-49e3-9ad${index}-5c22575d4b2a",
                  "type": "code",
                  "children": [
                      {
                          "text": "${value} {\n  const editor = useMemo(() => createYooptaEditor(), []);\n\n  return (\n    <div>\n      <YooptaEditor\n        editor={editor}\n        plugins={plugins}\n        tools={TOOLS}\n        marks={MARKS}\n      />\n    </div>\n  );\n}"
                      }
                  ],
                  "props": {
                      "nodeType": "void",
                      "language": "${language}",
                      "theme": "VSCode"
                  }
              }
          ],
          "type": "Code",
          "meta": {
              "order": 7,
              "depth": 1
          }
        }
      }
    `;
};
