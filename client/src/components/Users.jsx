import React, { useState, useEffect } from "react";
import { getUsers } from "../api/Api";
import "../styles/users.css";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState([]);

  const getAllUsers = async () => {
    const data = await getUsers();
    console.log(data);
    setUsers(data);
  };

  useEffect(() => {
    getAllUsers();
    return () => {};
  }, []);
  const style = (index) => {
    const newShow = show.map((e) => false); //init to false
    newShow[index] = !show[index];
    setShow(newShow);
  };

  const showUsers = () => {
    return (
      <div className="user-info">
        <table className="styled-table">
          <thead>
            <tr>
              <td> User ID </td>
              <td> Name </td>
              <td> Cash </td>
              <td> Credit </td>
            </tr>
          </thead>
          <tbody>
            {users.length !== 0 &&
              users.map((line, i) => {
                return (
                  <tr className={show[i] ? "active-row" : ""} key={i} onClick={() => style(i)}>
                    <td> {line._id}</td>
                    <td> {line.name}</td>
                    <td> {line.cash}</td>
                    <td> {line.credit}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    );
  };
  return <div>{users && showUsers()}</div>;
}
