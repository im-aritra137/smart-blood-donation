import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import DonorDashboard from "./pages/DonorDashboard";
import ReceiverDashboard from "./pages/ReceiverDashboard";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>

<Route path="/" element={<Home />} />

<Route path="/login" element={<Login />} />

<Route path="/register" element={<Register />} />

<Route 
 path="/donor/dashboard" 
 element={<DonorDashboard />} 
/>

<Route 
 path="/receiver/dashboard" 
 element={<ReceiverDashboard />} 
/>

</Routes>
    </BrowserRouter>
  );
}

export default App;
