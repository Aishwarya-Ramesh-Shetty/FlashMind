import React, { useState } from 'react';
import FlashcardGenerator from './FlashcardGenerator.jsx';
import Quiz from './Quiz.jsx';

const Flashcards = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [showQuiz, setShowQuiz] = useState(false);

  return (
    <div>
      {!showQuiz && (
        <>
          <FlashcardGenerator flashcards={flashcards} setFlashcards={setFlashcards} />
          {flashcards.length > 0 && (
            <div className="text-center mt-6">
              <button
                className="border-2 border-[#268740] text-[#268740] px-4 py-2 rounded hover:bg-[#e6f3eb]"
                onClick={() => setShowQuiz(true)}
              >
                Start Quiz
              </button>
            </div>
          )}
        </>
      )}
      {showQuiz && <Quiz flashcards={flashcards} />}
    </div>
  );
};

export default Flashcards;
