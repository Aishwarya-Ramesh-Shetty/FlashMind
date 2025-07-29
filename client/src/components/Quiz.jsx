import React, { useState, useEffect } from 'react';

const Quiz = ({ flashcards }) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [questions, setQuestions] = useState([]);

 
  useEffect(() => {
    const shuffled = flashcards.map((card) => {
      const wrongAnswers = flashcards
        .filter(fc => fc.answer !== card.answer)
        .sort(() => 0.5 - Math.random())
        .slice(0, 2)
        .map(fc => fc.answer);

      const options = [...wrongAnswers, card.answer].sort(() => 0.5 - Math.random());

      return { question: card.question, answer: card.answer, options };
    });

    setQuestions(shuffled);
  }, [flashcards]);

  const handleAnswer = (choice) => {
    setSelected(choice);
    if (choice === questions[currentQ].answer) setScore(prev => prev + 1);

    setTimeout(() => {
      if (currentQ + 1 < questions.length) {
        setCurrentQ(prev => prev + 1);
        setSelected(null);
      } else {
        setShowResult(true);
      }
    }, 800);
  };

  if (flashcards.length === 0) return <p className="text-center text-red-600">No flashcards available for quiz.</p>;

  if (showResult) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-3xl font-bold text-[#003D16]">Quiz Complete!</h2>
        <p className="text-xl mt-4">Your Score: <span className="font-semibold">{score} / {questions.length}</span></p>
        <button
          className="mt-6 bg-[#268740] text-white px-6 py-2 rounded hover:bg-[#1f6a35]"
          onClick={() => {
            setCurrentQ(0);
            setScore(0);
            setShowResult(false);
          }}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border-2 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-4">{questions[currentQ]?.question}</h3>
      <div className="flex flex-col gap-3">
        {questions[currentQ]?.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswer(option)}
            className={`px-4 py-2 rounded border ${
              selected
                ? option === questions[currentQ].answer
                  ? 'bg-green-500 text-white'
                  : option === selected
                  ? 'bg-red-500 text-white'
                  : 'bg-white'
                : 'hover:bg-gray-100'
            }`}
            disabled={!!selected}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Quiz;
