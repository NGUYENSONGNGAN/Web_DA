import { Button, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { sendSignInLinkToEmail } from 'firebase/auth';
import { toast } from 'react-toastify';

const RegisterComplete = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = async e => {
		e.preventDefault();

    
	};

  useEffect(() => {
    setEmail(window.localStorage.getItem('emailForSignIn'));
  },[])

	const RegisterForm = () => (
		<form onSubmit={handleSubmit}>
			<Input
				className="mt-5"
				placeholder="Email"
				value={email}
        disabled
			/>
			<Input
				className="mt-3"
				placeholder="Password"
				value={password}
				type="password"
				onChange={e => setPassword(e.target.value)}
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