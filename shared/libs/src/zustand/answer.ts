// store/answer.ts
import { create } from "zustand";

export interface AnswerItem {
  question_id: string;
  option_id: string;
}

interface AnswerState {
  session_id: string;
  test_id: string;
  sub_test_id: string;
  user_id: string;
  answers: AnswerItem[];
  setMeta: (payload: {
    session_id: string;
    test_id: string;
    user_id: string;
    sub_test_id?: string;
  }) => void;
  setAnswer: (answer: AnswerItem) => void;
  clearAnswer: (question_id: string) => void;
  getPayload: () => {
    session_id: string;
    test_id: string;
    sub_test_id: string;
    user_id: string;
    answers: AnswerItem[];
  };
  reset: () => void;
}

export const useAnswerStore = create<AnswerState>((set, get) => ({
  session_id: "",
  test_id: "",
  sub_test_id: "",
  user_id: "",
  answers: [],

  setMeta: ({ session_id, test_id, user_id, sub_test_id }) =>
    set({ session_id, test_id, user_id, sub_test_id: sub_test_id || "" }),

  setAnswer: ({ question_id, option_id }) => {
    const { answers } = get();
    const updated = answers.filter((a) => a.question_id !== question_id);
    updated.push({ question_id, option_id });
    set({ answers: updated });
  },

  clearAnswer: (question_id) => {
    const { answers } = get();
    set({ answers: answers.filter((a) => a.question_id !== question_id) });
  },

  getPayload: () => ({
    session_id: get().session_id,
    test_id: get().test_id,
    sub_test_id: get().sub_test_id,
    user_id: get().user_id,
    answers: get().answers,
  }),

  reset: () =>
    set({
      session_id: "",
      test_id: "",
      user_id: "",
      answers: [],
    }),
}));
