import { useState } from "react";
import ThreeScene from "./ThreeScene";
import { PHI } from "./constants";

function App() {
  const [numLeaves, setNumLeaves] = useState(250);
  const [angle, setAngle] = useState((Math.PI * 2) / (PHI + 1));
  return (
    <div className="h-screen">
      <div className="flex flex-col md:flex-row h-full">
        <div className="flex-1">
          <ThreeScene numLeaves={numLeaves} angle={angle} />
        </div>
        <div className="h-40 md:h-full md:w-96 p-4 bg-gray-200 flex-shrink-0">
          <label htmlFor="num-leaves">
            Number of leaves: <code>{numLeaves}</code>
          </label>
          <input
            type="range"
            id="num-leaves"
            min="10"
            max="500"
            value={numLeaves}
            onChange={(e) => {
              setNumLeaves(parseInt(e.target.value));
            }}
            className="w-full"
          />
          <label htmlFor="angle">
            Angle: <code>{angle.toFixed(6)}</code>
          </label>
          <input
            type="range"
            id="angle"
            min="0"
            max={Math.PI}
            value={angle}
            step={0.0001}
            onChange={(e) => {
              setAngle(Number(e.target.value));
            }}
            className="w-full"
          />
          <div className="flex justify-between">
            <button
              className="rounded border border-gray-500 px-4"
              onClick={() => setAngle((Math.PI * 2) / 5)}
            >
              2π/5
            </button>
            <button
              className="rounded border border-gray-500 px-4"
              onClick={() => setAngle((Math.PI * 2) / 4)}
            >
              2π/4
            </button>
            <button
              className="rounded border border-gray-500 px-4"
              onClick={() => setAngle((Math.PI * 2) / 3)}
            >
              2π/3
            </button>
            <button
              className="rounded border border-gray-500 px-4"
              onClick={() => setAngle((Math.PI * 2) / (PHI + 1))}
            >
              2π/(φ+1)
            </button>
            <button
              className="rounded border border-gray-500 px-4"
              onClick={() => setAngle((Math.PI * 2) / 2)}
            >
              π
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
