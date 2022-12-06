import { Routes, Route } from "react-router-dom";
import Landing from "./Components/Landing/Landing";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register"
import Home from "./Components/Home/Home"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
      <Route path="/home" element={<Home/>}></Route>
    </Routes>
  );
}

export default App;
