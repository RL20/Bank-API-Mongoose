import React, { useState, useEffect } from "react";
import { creatUser } from "../api/Api";
function UsersActions() {
  // const [id, setID] = useState("");
  // const [cash, setCash] = useState("");
  // const [credit, setCredit] = useState("");
  // const [message, setMessage] = useState("");

  return (
    <div>Actions</div>
    // <div>
    //   <form
    //     onSubmit={(e) => {
    //       e.preventDefault();
    //       fetch("https://bankapi-mongoose.herokuapp.com/api/users", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({
    //           id: id,
    //           cash: +cash,
    //           credit: +credit,
    //         }),
    //       })
    //         .then((res) => res.json())
    //         .then((data) => {
    //           console.log(data);
    //           if (data.status === "success") {
    //             setMessage(data.message);
    //           } else {
    //             setMessage(data.message);
    //           }
    //         });
    //     }}
    //   >
    //     <div>
    //       <label>User's ID:</label>
    //       <input type="text" placeholder="User's ID" id="id" onChange={(e) => setID(e.target.value)} />
    //     </div>
    //     <div>
    //       <label>User's Cash:</label>
    //       <input type="number" placeholder="User's Cash" id="cash" min="0" onChange={(e) => setCash(e.target.value)} />
    //     </div>
    //     <div>
    //       <label>User's Credit </label>
    //       <input type="number" placeholder="User's Credit" id="credit" min="0" onChange={(e) => setCredit(e.target.value)} />
    //     </div>
    //     <input type="submit" value="Add User" />
    //   </form>
    //   <div>{message}</div>
    // </div>
  );
}

export default UsersActions;
