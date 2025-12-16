"use client";

import { useState } from "react";

interface FlashcardProps {
  front: string;
  back: string;
}

export default function Flashcard({ front, back }: FlashcardProps) {
  const [showBack, setShowBack] = useState(false);

  return (
    <div
      onClick={() => setShowBack(!showBack)}
      className="cursor-pointer p-6 border rounded-xl shadow-md bg-white w-64 text-center transition"
    >
      {!showBack ? <p className="font-bold">{front}</p> : <p>{back}</p>}
    </div>
  );
}
