import ThreeScene from "./ThreeScene";

function App() {
  return (
    <>
      <div className="flex flex-col md:flex-row h-screen">
        <div className="flex-1 flex justify-center items-center bg-gray-100 md:h-full">
          <div className="w-full h-full md:w-[calc(100vh)] md:h-[calc(100vh)] bg-blue-300 max-w-full max-h-full">
            <ThreeScene />
          </div>
        </div>
        <div className="w-full md:w-1/4 lg:w-1/6 min-w-[200px] p-4 bg-gray-200">
          control panel
        </div>
      </div>{" "}
    </>
  );
}

export default App;
