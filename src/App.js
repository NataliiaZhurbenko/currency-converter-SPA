import NavBar from "./component/NavBar/NavBar";
import ErrorDialog from "./component/ErrorDialog/ErrorDialog";
import { BrowserRouter as Router } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <NavBar />
      <ErrorDialog />
    </Router>
  );
}
