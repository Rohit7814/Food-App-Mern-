import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login/Login';
import Register from './components/Regster/Register';
import Body from './components/Body/Body';
function App() {
 
  return (
    <BrowserRouter>
    <Routes>
      <Route index path='/' element={<Login  />} />
      <Route path='/register' element={<Register />}/>
      <Route  path='/body' element={<Body />}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
