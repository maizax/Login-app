import { useState, useEffect, useCallback } from "react";
import Input from "./Input";

export default function Verification() {
  const [data, setData] = useState();
  const [error, setError] = useState("");
  const [person, setPerson] = useState(() => {
    const localData = localStorage.getItem("Name");
    return localData ? JSON.parse(localData) : null;
  });

  const getData = useCallback(async () => {
    const response = await fetch("data.json");

    const info = await response.json();
    setData(info.response[0]);
  }, []);

  useEffect(() => {
    getData();
    localStorage.setItem("Name", JSON.stringify(person));
  }, [getData, person]);

  const Login = (details) => {
    const loginsMatch =
      details.username === data.user && details.password === data.pass;
    if (loginsMatch) {
      setPerson({
        username: details.username,
      });
      alert("You are now logged in!");
      setError("");
    } else {
      setError("Username or Password is incorrect!");
    }
  };

  const Logout = () => {
    setPerson(null);
  };

  useEffect(() => {
    if (person !== null && localStorage.Name !== null) {
      alert("Welcome back!");
    }
  }, []);

  return (
    <div className="App">
      {person ? (
        <div className="welcome">
          <h2 className="logoutBar">Welcome</h2>{" "}
          <p className="personName">{person.username}</p>
          <button onClick={Logout} className="logoutButton">
            Logout
          </button>
        </div>
      ) : (
        <Input Login={Login} error={error} setError={setError} />
      )}
    </div>
  );
}
