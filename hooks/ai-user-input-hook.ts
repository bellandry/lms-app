import { create } from "zustand";

type Store = {
  userCourseInput: {
    category: string;
    subject: { subject: string; description: string };
    options: {
      level: string;
      duration: string;
      video: boolean;
      chapters: number;
    };
  };
  setUserCourseInput: (newState: {
    category: string;
    subject: { subject: string; description: string };
    options: {
      level: string;
      duration: string;
      video: boolean;
      chapters: number;
    };
  }) => void;
};

export const useUserCourseInputStore = create<Store>()((set) => ({
  userCourseInput: {
    category: "",
    subject: { subject: "", description: "" },
    options: { level: "", duration: "", video: false, chapters: 1 },
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
