import { Button, Input } from "antd";
import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { signInWithEmailLink, updatePassword } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const RegisterComplete = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Email and password is required");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    await signInWithEmailLink(auth, email, window.location.href)
      .then(async (result) => {
        if (result.user.emailVerified) {
          // remove user email fom local storage
          window.localStorage.removeItem("emailForSignIn");
          // get user id token
          let user = auth.currentUser;
          await updatePassword(user, password);
          const idTokenResult = await user.getIdTokenResult();
          // redux store
          console.log("user", user, "idTokenResult", idTokenResult);
          toast.success("Register Success");
          // redirect
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForSignIn"));
  }, []);

  const RegisterForm = () => (
    <form onSubmit={handleSubmit}>
      <Input className="mt-5" placeholder="Email" value={email} disabled />
      <Input
        className="mt-3"
        placeholder="Password"
        value={password}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleSubmit} type="primary" className="mt-3">
        Register
      </Button>
    </form>
  );
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register</h4>

          {RegisterForm()}
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
