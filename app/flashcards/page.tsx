
"use client";

import { useState } from "react";
import Flashcard from "../components/Flashcard";

export default function FlashcardPage() {
  const [topic, setTopic] = useState("");
  const [cards, setCards] = useState([]);

  async function generateFlashcards() {
    const res = await fetch("/api/flashcard", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic }),
    });

    const data = await res.json();
    setCards(data.flashcards || []);
  }

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">AI Flashcard Generator</h1>

      <input
        className="border p-2 mr-2"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter a topic (e.g., Algebra, Cells, WW2)"
      />

      <button
        onClick={generateFlashcards}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Generate
      </button>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
        {cards.map((card :any, i) => (
          <Flashcard key={i} front={card.front} back={card.back} />
        ))}
      </div>
    </div>
  );
}
