import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Register(){

  const navigate = useNavigate();

  const [form,setForm] = useState({
    name:"",
    email:"",
    phone:"",
    password:"",
    bloodGroup:"O_POSITIVE",
    role:"DONOR",
    latitude:"",
    longitude:""
  });


  const handleChange=(e)=>{
    setForm({
      ...form,
      [e.target.name]:e.target.value
    });
  };


  const handleRegister=async(e)=>{

    e.preventDefault();

    try{

      await API.post("/auth/register",{
        ...form,
        latitude:Number(form.latitude),
        longitude:Number(form.longitude)
      });


      alert("Registration successful");

      navigate("/login");


    }
    catch(error){

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Registration failed"
      );

    }

  };


  return(
    <div className="card">

      <h1>Blood Donation Registration</h1>


      <form onSubmit={handleRegister}>


        <input
        name="name"
        placeholder="Name"
        onChange={handleChange}
        />


        <br/>


        <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
        />


        <br/>


        <input
        name="phone"
        placeholder="Phone"
        onChange={handleChange}
        />


        <br/>


        <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        />


        <br/>


        <select
        name="bloodGroup"
        onChange={handleChange}
        >

          <option>O_POSITIVE</option>
          <option>O_NEGATIVE</option>
          <option>A_POSITIVE</option>
          <option>A_NEGATIVE</option>
          <option>B_POSITIVE</option>
          <option>B_NEGATIVE</option>
          <option>AB_POSITIVE</option>
          <option>AB_NEGATIVE</option>

        </select>


        <br/>


        <select
        name="role"
        onChange={handleChange}
        >

          <option>DONOR</option>
          <option>RECEIVER</option>

        </select>


        <br/>


        <input
        name="latitude"
        placeholder="Latitude"
        onChange={handleChange}
        />


        <br/>


        <input
        name="longitude"
        placeholder="Longitude"
        onChange={handleChange}
        />


        <br/>


        <button>
          Register
        </button>


      </form>

    </div>
  );

}

export default Register;