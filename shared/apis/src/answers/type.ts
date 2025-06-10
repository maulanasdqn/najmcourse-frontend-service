import { TResponseDetail } from "@/shared/commons/types/response";

export type TRequestCreateAnswer = {
  answers: Array<{
    option_id: string;
    question_id: string;
  }>;
  session_id: string;
  test_id: string;
  sub_test_id: string;
  user_id: string;
};

export type TAnswerItem = {
  created_at: string;
  id: string;
  name: string;
  questions: Array<{
    created_at: string;
    discussion: string;
    discussion_image_url: string;
    id: string;
    options: Array<{
      created_at: string;
      id: string;
      image_url: string;
      is_correct: boolean;
      is_user_selected: boolean;
      label: string;
      points: number;
      updated_at: string;
    }>;
    question: string;
    question_image_url: string;
    updated_at: string;
  }>;
  score: number;
  updated_at: string;
};

export type TResponseAnswer = TResponseDetail<TAnswerItem>;
