import React from 'react'
import { useState } from 'react'
import jsPDF from "jspdf";

const FlashcardGenerator = () => {
  const [content,setContent] = useState("");
  const [loading,setLoading] = useState(false)
  const [flashcards,setFlashcards] = useState([])
  

  const generateflashcards = async () => {
  if (!content.trim()) return;
  setLoading(true);
  try {
    const res = await fetch("http://localhost:5000/api/flashcard/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
    const data = await res.json();
    console.log("Received from backend:", data);
    setFlashcards(data.flashcards || []);
  } catch (error) {
    console.error("Generation error:", error);
    alert("Failed to generate flashcards");
  } finally {
    setLoading(false);
  }
};



  const downloadFlashcards = () => {
    const doc = new jsPDF();
  let y = 10; // Starting Y position

  flashcards.forEach((card, index) => {
    const question = `Q${index + 1}: ${card.question}`;
    const answer = `A${index + 1}: ${card.answer}`;
    
    doc.setFontSize(12);
    doc.text(question, 10, y);
    y += 7;

    // Split long answers to avoid overflow
    const splitAnswer = doc.splitTextToSize(answer, 180);
    doc.text(splitAnswer, 10, y);
    y += splitAnswer.length * 7 + 5;
    if (y > 270) {
      doc.addPage();
      y = 10;
    }
  });

  doc.save("flashcards.pdf");
  };

  const copyToClipboard = () => {
    const text = flashcards.map(f => `Q: ${f.question}\nA: ${f.answer}\n`).join('\n');
    navigator.clipboard.writeText(text);
    alert("Flashcards copied to clipboard!");
  };



  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4 mt-10 text-center text-[#003D16]">One click closer to acing that test — no stress, just flex!</h2>
      <h3 className="text-xl font-bold mb-4 mt-10 text-center text-[#003D16]">Turn boring notes into brain-boosting flashcards!</h3>
      <textarea
        value={content}
        onChange={(e)=>setContent(e.target.value)}
        placeholder='Paste your content here'
        rows={6}
        className="w-full border-2 border-[#268740] rounded-lg p-4 focus:outline-none"
      />
      <button onClick={generateflashcards} className="mt-4 bg-[#268740] text-white px-6 py-2 rounded hover:bg-[#1f6a35]">{loading?'Generating ..':'Generate Flashcards'}</button>
      
      {flashcards.length > 0 && (
        <button onClick={downloadFlashcards} className="mt-6 ml-20 border-2 text-[#003D16] border-[#003d16]  bg-transparent px-4 py-2  rounded-lg ">Download Flashcards</button>
        
      )}

      {flashcards.length > 0 && (
        
        <button onClick={copyToClipboard} className="mt-6 ml-20 border-2 text-[#003D16] border-[#003d16]  bg-transparent px-4 py-2  rounded-lg ">Copy to Clipboard</button>
      )}


      <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {flashcards.map((card,index)=>(
          <div key={index} className="group [perspective:1000px]">
            <div className="relative h-48 w-full rounded-xl shadow-xl transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
              <div className="absolute inset-0 bg-white p-4 rounded-xl backface-hidden">
                <h3 className="text-lg font-semibold text-[#003D16]"> {card.question.replace(/\*\*/g, '')}</h3>
              </div>
              <div className="absolute inset-0 bg-[#268740] text-white p-4 rounded-xl [transform:rotateY(180deg)] backface-hidden">
                <h3>{card.answer.replace(/\*\*/g, '')}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FlashcardGenerator