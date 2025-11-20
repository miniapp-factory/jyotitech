"use client";
import { useState, useMemo } from "react";
import { animalImages } from "./animal-images";
import QuizResult from "./quiz-result";
import { Button } from "@/components/ui/button";
import { Share } from "@/components/share";
import { url } from "@/lib/metadata";

const questions = [
  {
    question: "What is your favorite type of food?",
    options: [
      { text: "Fish", animal: "cat" },
      { text: "Meat", animal: "dog" },
      { text: "Berries", animal: "fox" },
      { text: "Seeds", animal: "hamster" },
      { text: "Grain", animal: "horse" },
    ],
  },
  {
    question: "Which activity do you enjoy most?",
    options: [
      { text: "Chasing mice", animal: "cat" },
      { text: "Playing fetch", animal: "dog" },
      { text: "Hunting in the woods", animal: "fox" },
      { text: "Storing food", animal: "hamster" },
      { text: "Racing in fields", animal: "horse" },
    ],
  },
  {
    question: "What is your preferred living environment?",
    options: [
      { text: "Indoor cozy", animal: "cat" },
      { text: "Outdoor friendly", animal: "dog" },
      { text: "Forest", animal: "fox" },
      { text: "Cage", animal: "hamster" },
      { text: "Open pasture", animal: "horse" },
    ],
  },
  {
    question: "How do you like to communicate?",
    options: [
      { text: "Purrs", animal: "cat" },
      { text: "Barks", animal: "dog" },
      { text: "Howls", animal: "fox" },
      { text: "Squeaks", animal: "hamster" },
      { text: "Neighs", animal: "horse" },
    ],
  },
  {
    question: "What is your favorite pastime?",
    options: [
      { text: "Sleeping", animal: "cat" },
      { text: "Playing", animal: "dog" },
      { text: "Exploring", animal: "fox" },
      { text: "Nibbling", animal: "hamster" },
      { text: "Running", animal: "horse" },
    ],
  },
];

function shuffleArray<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({
    cat: 0,
    dog: 0,
    fox: 0,
    hamster: 0,
    horse: 0,
  });
  const [showResult, setShowResult] = useState(false);
  const [resultAnimal, setResultAnimal] = useState<string>("");

  const shuffledOptions = useMemo(() => shuffleArray(questions[current].options), [current]);

  const handleAnswer = (animal: string) => {
    setScores((prev) => ({ ...prev, [animal]: prev[animal] + 1 }));
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      const max = Math.max(...Object.values(scores));
      const topAnimals = Object.entries(scores).filter(([, v]) => v === max).map(([k]) => k);
      const chosen = topAnimals[0];
      setResultAnimal(chosen);
      setShowResult(true);
    }
  };

  const retake = () => {
    setCurrent(0);
    setScores({
      cat: 0,
      dog: 0,
      fox: 0,
      hamster: 0,
      horse: 0,
    });
    setShowResult(false);
    setResultAnimal("");
  };

  if (showResult) {
    return <QuizResult animal={resultAnimal} onRetake={retake} />;
  }

  return (
    <div className="w-full max-w-md">
      <h2 className="text-xl mb-4">{questions[current].question}</h2>
      <div className="flex flex-col gap-2">
        {shuffledOptions.map((opt, idx) => (
          <Button key={idx} onClick={() => handleAnswer(opt.animal)} variant="outline">
            {opt.text}
          </Button>
        ))}
      </div>
    </div>
  );
}
