import { create } from "zustand";

type Store = {
  userCourseInput: {
    category: { id: string; name: string };
    subject: { subject: string; description: string };
    options: {
      level: string;
      duration: string;
      video: boolean;
      chapters: number;
      language: string;
    };
  };
  setUserCourseInput: (newState: {
    category: { id: string; name: string };
    subject: { subject: string; description: string };
    options: {
      level: string;
      duration: string;
      video: boolean;
      chapters: number;
      language: string;
    };
  }) => void;
};

export const useUserCourseInputStore = create<Store>()((set) => ({
  userCourseInput: {
    category: { id: "", name: "" },
    subject: { subject: "", description: "" },
    options: {
      level: "",
      duration: "",
      video: false,
      chapters: 1,
      language: "french",
    },
  },
  setUserCourseInput: (newState) =>
    set((state) => ({
      ...state,
      userCourseInput: {
        ...state.userCourseInput,
        ...newState,
      },
    })),
}));
