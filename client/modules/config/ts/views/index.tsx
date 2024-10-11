import * as React from 'react';
import { routing } from '@beyond-js/kernel/routing';

export /*bundle*/
function View() {

	const handleLogout = () => {
		localStorage.removeItem('authToken'); 
		routing.pushState('/login');
	};

	return (
		<main className='page_config-container'>
			<h2>Configuration Page</h2>
			<button onClick={handleLogout}>Logout</button>
		</main >
	);
}
