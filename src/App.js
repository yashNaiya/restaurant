import { Routes, Route } from "react-router-dom";
import Landing from "./Components/Landing/Landing";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register"
import Home from "./Components/Home/Home"
import Cart from "./Components/Cart/Cart";
import Account from "./Components/Account/Account";
import AdminMain from "./Components/Admin/AdminMain";
import About from "./Components/About/About";
import ContactPage from "./Components/ContactPage";
import Offers from "./Components/Offers/Offers";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
      <Route path="/home" element={<Home/>}></Route>
      <Route path="/cart" element={<Cart/>}></Route>
      <Route path="/account" element={<Account/>}></Route>
      <Route path="/adminpage" element={<AdminMain/>}></Route>
      <Route path="/about" element={<About/>}></Route>
      <Route path="/contact" element={<ContactPage/>}></Route>
      <Route path="/offers" element={<Offers/>}></Route>
    </Routes>
  );
}

export default App;
