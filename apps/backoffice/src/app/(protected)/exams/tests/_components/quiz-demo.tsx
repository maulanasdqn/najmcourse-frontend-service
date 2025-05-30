import { FC, ReactElement } from "react";
import { QuizDisplay } from "./quiz-display";

const sampleQuestion = {
  id: "1",
  question:
    "Nasionalisme pada masa sebelum kemerdekaan ditandai dengan munculnya berbagai organisasi pergerakan perintis keerdekaan salah satunya yaitu Sarekat Dagang Islam. Organisasi pergerakan Nasional Serikat Dagang Islam ini kemudian berubah menjadi Sarekat Islam dan menjadi ancaman bagi pemerintah kolonial Belanda. Hal ini dikarenakan ...",
  question_image_url: "",
  discussion:
    "Sarekat Islam menjadi ancaman karena memiliki basis massa yang besar dan ideologi yang kuat dalam melawan penjajahan.",
  discussion_image_url: "",
  options: [
    {
      id: "a",
      label: "Menjadi organisasi politik pertama yang berdiri di masa Hindia Belanda",
      image_url: "",
      is_correct: false,
      points: "0",
    },
    {
      id: "b",
      label: "Kemajuan dalam bidang pengolangan dana pendidikan bagi masyarakat pribumi",
      image_url: "",
      is_correct: false,
      points: "0",
    },
    {
      id: "c",
      label: "Karena berafiat nonkooperatif terhadap pemerintahan kolonial Belanda",
      image_url: "",
      is_correct: false,
      points: "0",
    },
    {
      id: "d",
      label: "Perkembangan yang begitu pesat yang membuatnya berubah menjadi partai politik",
      image_url: "",
      is_correct: true,
      points: "5",
    },
    {
      id: "e",
      label: "Memberikan bantuan dalam memberikan kritik terhadap pemerintahan kolonial Belanda",
      image_url: "",
      is_correct: false,
      points: "0",
    },
  ],
};

export const QuizDemo: FC = (): ReactElement => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Quiz Layout Demo</h1>
      <QuizDisplay
        question={sampleQuestion}
        questionIndex={0}
        showAnswers={true}
        isPreview={true}
      />
    </div>
  );
};
