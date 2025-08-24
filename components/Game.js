import { useState } from "react";
import { challenges } from "../utils/challenges";

export default function Game() {
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("javascript");

  const challenge = challenges[challengeIndex];

  const runCode = async () => {
    const res = await fetch(`/api/run-${language}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });
    const data = await res.json();
    setOutput(data.output);
  };

  const nextChallenge = () => {
    setChallengeIndex((prev) => (prev + 1) % challenges.length);
    setOutput("");
    setCode("");
  };

  return (
    <div className="p-6 bg-gray-800 rounded-xl shadow-lg w-[90%] max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">Programming Game 🚀</h1>
      <p className="mb-2">{challenge.description}</p>

      <select
        className="mb-2 p-2 text-black"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
      </select>

      <textarea
        className="w-full h-40 p-2 text-black rounded"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder={`Escribe tu solución en ${language}...`}
      />

      <div className="flex gap-2 mt-3">
        <button
          onClick={runCode}
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
        >
          Ejecutar
        </button>
        <button
          onClick={nextChallenge}
          className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
        >
          Siguiente
        </button>
      </div>

      <pre className="mt-4 p-2 bg-black rounded h-32 overflow-auto">
        {output || "Salida aquí..."}
      </pre>
    </div>
  );
}
