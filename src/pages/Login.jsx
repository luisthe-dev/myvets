import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../components/apis/adminApi";
import { setUserDetails } from "../store/user";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [responseData, setResponseData] = useState({});

  const myDispatch = useDispatch();
  const myNavigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setResponseData({});

    const loginData = {
      email: email,
      password: password,
    };
    const loginRes = await loginAdmin(loginData);
    setResponseData({
      status: loginRes.status,
      message: loginRes.message,
    });
    myDispatch(setUserDetails(loginRes.user));
    myNavigate("/dashboard");

    setIsLoading(false);
  };

  return (
    <>
      <div className="fullScreenDiv">
        <div className="authFormContain">
          <h4> Login </h4>
          <form onSubmit={handleSubmit}>
            {responseData?.status !== "" &&
              responseData?.status !== undefined && (
                <div
                  className={
                    responseData?.status
                      ? "responseBlock success"
                      : "responseBlock error"
                  }
                >
                  {responseData?.message}
                </div>
              )}
            <label> Email </label>
            <input
              type={"text"}
              placeholder={"Email"}
              value={email}
              onInput={(e) => setEmail(e.target.value)}
            />
            <label> Password </label>
            <input
              type={"password"}
              placeholder={"Password"}
              value={password}
              onInput={(e) => setPassword(e.target.value)}
            />
            <button type={"submit"} disabled={isLoading}>
              {isLoading ? `Please Wait...` : `Sign In`}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
