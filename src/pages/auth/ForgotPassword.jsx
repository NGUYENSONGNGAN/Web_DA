import { Button, Input } from "antd";
import React, { useState } from "react";
import { auth } from "../../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      url: "http://localhost:3000/login",
      handleCodeInApp: true,
    };

    sendPasswordResetEmail(auth, email, config)
      .then(() => {
        setEmail("");
        toast.success("Vui long check email");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const RegisterForm = () => (
    <form onSubmit={handleSubmit}>
      <Input
        className="mt-5"
        placeholder="Email"
        value={email}
        type="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button onClick={handleSubmit} type="primary" className="mt-3">
        ForgotPassword
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

export default ForgotPassword;
