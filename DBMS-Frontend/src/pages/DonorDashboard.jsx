import { useContext,useState } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../api/axios";

function DonorDashboard(){
  const { user, logout } = useContext(AuthContext);

  const [available,setAvailable] = useState(false);
  const [requestId,setRequestId] = useState("");


  const updateAvailability = async()=>{

    try{

      await API.patch("/users/availability",{
        isAvailable: !available
      });

      setAvailable(!available);

      alert("Availability updated");

    }
    catch(error){
      console.log(error);
      alert("Failed");
    }

  };


  const acceptDonation = async()=>{

    try{

      const res = await API.post("/donations",{
        requestId
      });


      console.log(res.data);

      alert("Donation accepted successfully");


    }
    catch(error){

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Accept failed"
      );

    }

  };


  return(

    <div>

      <h1>Donor Dashboard</h1>

    <p>
       Welcome {user?.name || "Donor"}
    </p>

    <button onClick={logout}>
       Logout
    </button>


      <h3>
        Status:
        {available ? " Available" : " Not Available"}
      </h3>


      <button onClick={updateAvailability}>
        Toggle Availability
      </button>


      <hr/>


      <h3>
        Accept Emergency Request
      </h3>


      <input
        placeholder="Emergency Request ID"
        value={requestId}
        onChange={(e)=>setRequestId(e.target.value)}
      />


      <button onClick={acceptDonation}>
        Accept Donation
      </button>


    </div>

  );

}

export default DonorDashboard;