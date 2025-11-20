"use client";
import { Button } from "@/components/ui/button";
import { Share } from "@/components/share";
import { animalImages } from "./animal-images";
import { url } from "@/lib/metadata";

export default function QuizResult({ animal, onRetake }: { animal: string; onRetake: () => void }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl">You are a {animal}!</h2>
      <img src={animalImages[animal as keyof typeof animalImages]} alt={animal} width={512} height={512} />
      <Share text={`I am a ${animal}! ${url}`} />
      <Button onClick={onRetake}>Retake Quiz</Button>
    </div>
  );
}
