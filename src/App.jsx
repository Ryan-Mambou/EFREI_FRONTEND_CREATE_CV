import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Timeline from "./pages/timeline";
import Error from "./pages/Error";
import BuildResume from "./pages/buildResume";
import CVPdf from "./pages/cvPDF";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-tippy/dist/tippy.css";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Login />}></Route>
        <Route path="/signup" exact element={<SignUp />}></Route>
        <Route
          path="/timeline"
          exact
          element={
            <ProtectedRoute>
              <Timeline />
            </ProtectedRoute>
          }
        ></Route>
        <Route path="/buildResume" exact element={<BuildResume />}></Route>
        <Route
          path="/resume/:cvId"
          exact
          element={
            <ProtectedRoute>
              <CVPdf />
            </ProtectedRoute>
          }
        ></Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
