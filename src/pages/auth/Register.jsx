import { Button, Input } from 'antd';
import React, { useState } from 'react';
import { auth } from '../../firebase';
import { sendSignInLinkToEmail } from 'firebase/auth';
import { toast } from 'react-toastify';

const Register = () => {
	const [email, setEmail] = useState('');

	const handleSubmit = async e => {
		e.preventDefault();
		const config = {
			url: 'http://localhost:3000/register/complete',
			handleCodeInApp: true
		};

		await sendSignInLinkToEmail(auth, email, config).then(() => {
			// The link was successfully sent. Inform the user.
			// Save the email locally so you don't need to ask the user for it again
			// if they open the link on the same device.
			window.localStorage.setItem('emailForSignIn', email);
			// ...
		});
		toast.success(`Email is sent to ${email}. Click the link to complete your registration`);
		setEmail('');
	};

	const RegisterForm = () => (
		<form onSubmit={handleSubmit}>
			<Input
				className="mt-5"
				placeholder="Email"
				value={email}
				type="email"
				onChange={e => setEmail(e.target.value)}
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

export default Register;