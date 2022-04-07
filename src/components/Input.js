import { useState } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { AiFillLock } from "react-icons/ai";

export default function Input({ Login, error, setError }) {
  const [details, setDetails] = useState({ username: "", password: "" });
  const [usernameTouched, setUsernameTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [showPass, setShowPass] = useState(true);

  const usernameIsValid = details.username.trim() !== "";
  const usernameIsInvalid = !usernameIsValid && usernameTouched;

  const passwordIsValid = details.password.trim() !== "";
  const passwordIsInvalid = !passwordIsValid && passwordTouched;

  const nameInputBlurHandler = () => {
    setUsernameTouched(true);
  };

  const passwordInputBlurHandler = () => {
    setPasswordTouched(true);
  };

  const onChangeName = (event) => {
    setDetails({ ...details, username: event.target.value }, setError(""));
  };

  const onChangePass = (event) => {
    setDetails({ ...details, password: event.target.value }, setError(""));
  };

  const showPassHandler = () => {
    setShowPass((show) => !show);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (!usernameIsValid) {
      setUsernameTouched(true);
      return;
    }
    if (!passwordIsValid) {
      setPasswordTouched(true);
      return;
    }

    Login(details);
    setUsernameTouched(false);
    setPasswordTouched(false);
  };

  const nameInputClasses = usernameIsInvalid
    ? "form-control invalid"
    : "form-control";

  const passwordInputClasses = passwordIsInvalid
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={submitHandler}>
      <div className="form">
        <h2 className="topbar">Login Form</h2>

        <div className={nameInputClasses}>
          <input
            placeholder="Username"
            type="email"
            id="email"
            onChange={onChangeName}
            onBlur={nameInputBlurHandler}
            value={details.username}
          />
          <BsFillPersonFill className="logo-person" />

          {usernameIsInvalid && (
            <p className="error-text">Username must not be empty.</p>
          )}
        </div>
        <div className={passwordInputClasses}>
          <input
            placeholder="Password"
            type={showPass ? "password" : "text"}
            id="password"
            onChange={onChangePass}
            onBlur={passwordInputBlurHandler}
            value={details.password}
          />
          <AiFillLock className="logo-lock" onClick={showPassHandler} />

          {passwordIsInvalid && (
            <p className="error-text">Please enter a valid password.</p>
          )}
        </div>
        <div className="button-error">
          <button>Sign In</button>{" "}
          {error !== "" ? <div className="incorrect-text">{error}</div> : ""}
        </div>
      </div>
    </form>
  );
}
