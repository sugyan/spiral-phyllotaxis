import { useState } from "react";
import ThreeScene from "./ThreeScene";
import { PHI } from "./constants";

function App() {
  const [numLeaves, setNumLeaves] = useState(250);
  const [angle, setAngle] = useState((2 * Math.PI) / (PHI + 1));
  return (
    <>
      <div className="flex flex-col md:flex-row h-screen">
        <div className="flex-1 flex justify-center items-center bg-gray-100 md:h-full">
          <div className="w-full h-full md:w-[calc(100vh)] md:h-[calc(100vh)] bg-blue-300 max-w-full max-h-full">
            <ThreeScene numLeaves={numLeaves} angle={angle} />
          </div>
        </div>
        <div className="w-full md:w-1/4 lg:w-1/4 min-w-[200px] p-4 bg-gray-200">
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
            Angle: <code>{angle.toFixed(4)}</code>
          </label>
          <input
            type="range"
            id="num-leaves"
            min="0"
            max={Math.PI}
            value={angle}
            step={0.0001}
            onChange={(e) => {
              setAngle(Number(e.target.value));
            }}
            className="w-full"
          />
        </div>
      </div>{" "}
    </>
  );
}

export default App;
