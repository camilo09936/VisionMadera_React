import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pantallas/Login"
import Registro from "./pantallas/Registro";
import Home from "./pantallas/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/registro" element={<Registro/>}/>
        <Route path="/home" element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  );
}
export default App;