import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NotesScreen from "./features/authentication/screens/NotesScreen";

function App() {
  const AppRoutes: React.FC = () => {
    return (
      <Routes>
        <Route path={"/"} element={<NotesScreen />} />
      </Routes>
    );
  };

  return (
    <div className="App">
      <Router>
        <AppRoutes />
      </Router>
    </div>
  );
}

export default App;
