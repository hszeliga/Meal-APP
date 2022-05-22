import "./App.css";
import Navbar from "./components";
//import MyJumbotron from "./components/Jumbotron";
import Home from "./pages/Home";
import AppContext, { MyContext } from "./context";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ErrorPage from "./pages/Home/404/404";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import { useContext } from "react";
function App() {
  const { user } = useContext(MyContext);
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        {!user && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </>
        )}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
