import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Student = ({ role }) => {
  let [receipt_number, setReciept] = useState("");
  let [user, setUser] = useState(role);

  useEffect(() => {
    getMe();
  }, []);

  const verifyPayment = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      const data = {
        receipt_number,
      };
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const res = await axios.post("http://localhost:4000/api/payments", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      getMe();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const getMe = async () => {
    try {
      const token = localStorage.getItem("token");
      const getMe = await axios.get("http://localhost:4000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(getMe.data.user);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="p-4">
        <div>Name: {user.name}</div>
        <div>Registration number: {user.reg_no}</div>
        <div>
          Hostel Allocated -{" "}
          {user.hostel_allocated ? user.hostel_allocated.name : <>none</>}
        </div>
        <div>
          Room Number -{" "}
          {user.room_allocated ? user.room_allocated.room_number : <>none</>}
        </div>

        {user.hostel_allocated ? (
          <>Allocation completed</>
        ) : (
          <form action="" method="post">
            <div class="text-center mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                for="username"
              >
                Receipt Number
              </label>
              <input
                value={receipt_number}
                onChange={(e) => setReciept(e.target.value)}
                required
                className="bg-gray-50 appearance-none border-2 border-gray-300 
                        rounded py-2 px-4 text-gray-700 text-sm
                        leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                type="number"
                placeholder="5009839"
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                onClick={verifyPayment}
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                // onClick={closeModal}
              >
                submit
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default Student;
