import React from "react";
import { Form } from 'pragmate-ui/form';
import { Input } from 'pragmate-ui/form';

export function ContentForm() {

    const [username, setUsername] = React.useState<string>('');
	const [password, setPassword] = React.useState<string>('');
	const [error, setError] = React.useState<string>('');
	
	const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    try {
      	const response = await fetch('/api/login', {
			method: 'POST',
			headers: {
			'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username, password }),
		});

      	const data = await response.json();

      	if (data.success) {
        	alert('Login successful');
		} else {
			setError(data.message);
		}
	} catch (err) {
			setError('Failed to login. Please try again.');
		}
    };
    
    return (
        <>
            <Form onSubmit={handleSubmit}>
				<h2>Login</h2>
				<div className="input-group">
				<label htmlFor="username">Username</label>
				<Input
					type="text"
					id="username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					required
				/>
				</div>
				<div className="input-group">
				<label htmlFor="password">Password</label>
				<Input
					type="password"
					id="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				</div>
				{error && <p className="error">{error}</p>}
				<button type="submit">Login</button>
			</Form>
        </>
    )
}