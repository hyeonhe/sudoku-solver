import "./App.css";
import SudokuSolver from "./SudokuSolver";

function App() {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fbfcaa",
      }}
    >
      <SudokuSolver />
    </div>
  );
}

export default App;
