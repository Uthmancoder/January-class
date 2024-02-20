// import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";

const EditProfile = () => {
  const [FullName, setFullName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [userDetails, setuserDetails] = useState({})

  const token = localStorage.getItem("token") || ""

  useEffect(() => {
    const editFunction = async () => {
      const response = await axios.get("http://localhost:4000/Api/User/currentUser", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const data = response.data
      setuserDetails(data.userDetails)
      console.log("User Details : ", data)
    }
    editFunction()
    
  }, [])


  useEffect(() => {
  setFullName(userDetails.FullName)
  setEmail(userDetails.Email)
  }, [])

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const userDetails = {
      FullName,
      Email,
      Password,
    };
    try {
      const response = await axios.post("http://localhost:4000/Api/User/sign-up", userDetails)
      console.log(response.data)
      if (response.data.status === "success") {
        alert(response.data.message)
      }
    } catch (error) {
      console.log("Error Making post request")
      alert("error creating account, try again later")
    }
  };

  return (
    <div className="">
      <h1 className="text-primary fs-2 text-center">Edit Profile</h1>
      <div className="col-10 col-md-8 col-lg-6 mx-auto">
        <form
          action=""
          onSubmit={handleSubmit}
          className=" mx-auto shadow p-4 ml-5"
          style={{ width: "500px" }}
        >
          <input
            onChange={(ev) => setFullName(ev.target.value)}
            type="text"
            value={FullName}
            placeholder="Enter Full Name"
            className="form-control my-2 w-full"
          />
          <input
            onChange={(ev) => setEmail(ev.target.value)}
            type="email"
            placeholder="Enter Email"
            value={Email}
            autoComplete="off"
            className="form-control my-2"
          />
          <input
            onChange={(ev) => setPassword(ev.target.value)}
            type="password"
            autoComplete="off"
            placeholder="Enter Password"
            className="form-control my-2"
            
          />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
