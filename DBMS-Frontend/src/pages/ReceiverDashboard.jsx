import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

import API from "../api/axios";

function ReceiverDashboard(){
  const { user, logout } = useContext(AuthContext);

  const [bloodGroup,setBloodGroup] = useState("O_POSITIVE");
  const [urgency,setUrgency] = useState("HIGH");
  const [latitude,setLatitude] = useState("");
  const [longitude,setLongitude] = useState("");

  const [requestId,setRequestId] = useState("");
  const [donors,setDonors] = useState([]);


  const createRequest = async(e)=>{

    e.preventDefault();

    try{

      const res = await API.post("/emergency",{
        bloodGroup,
        urgency,
        latitude:Number(latitude),
        longitude:Number(longitude)
      });

      alert("Request created");

      console.log(res.data);

      setRequestId(res.data.request.id);

    }
    catch(error){
      console.log(error);
      alert("Request failed");
    }

  };


  const findDonors = async()=>{

    try{

      const res = await API.get(
        `/emergency/${requestId}/matches`
      );

      console.log(res.data);

      setDonors(res.data.donors);

    }
    catch(error){

      console.log(error);
      alert("Could not find donors");

    }

  };


  return(

    <div className="card">

      <h1>Receiver Dashboard</h1>

    <p>
    Welcome {user?.name || "Receiver"}
    </p>

    <button onClick={logout}>
    Logout
    </button>


      <h3>Create Emergency Request</h3>


      <form onSubmit={createRequest}>


        <select
        value={bloodGroup}
        onChange={(e)=>setBloodGroup(e.target.value)}
        >

          <option>O_POSITIVE</option>
          <option>O_NEGATIVE</option>
          <option>A_POSITIVE</option>
          <option>B_POSITIVE</option>
          <option>AB_POSITIVE</option>

        </select>


        <br/><br/>


        <select
        value={urgency}
        onChange={(e)=>setUrgency(e.target.value)}
        >

          <option>LOW</option>
          <option>MEDIUM</option>
          <option>HIGH</option>
          <option>CRITICAL</option>

        </select>


        <br/><br/>


        <input
        placeholder="Latitude"
        value={latitude}
        onChange={(e)=>setLatitude(e.target.value)}
        />


        <br/><br/>


        <input
        placeholder="Longitude"
        value={longitude}
        onChange={(e)=>setLongitude(e.target.value)}
        />


        <br/><br/>


        <button>
          Create Request
        </button>


      </form>


      <hr/>


      <h3>Find Matching Donors</h3>


      <input
      placeholder="Request ID"
      value={requestId}
      onChange={(e)=>setRequestId(e.target.value)}
      />


      <button onClick={findDonors}>
        Find Donors
      </button>



      {
        donors.map((donor)=>(
          <div key={donor.id}>

            <h3>{donor.name}</h3>

            <p>
              Blood: {donor.bloodGroup}
            </p>

            <p>
              Phone: {donor.phone}
            </p>

          </div>
        ))
      }


    </div>
  )

}

export default ReceiverDashboard;