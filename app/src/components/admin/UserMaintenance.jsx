import '../../css/admin.scss';
import AdminTable from './AdminTable';
import { useNavigate } from 'react-router-dom';

function UserMaintenance() {
	const navigate = useNavigate();

	const addUserAccess = async (event) => {
		event.preventDefault();

		const form = event.target;
		const data = {
			email: form.userEmail.value,
			status: form.status.value,
		};

		try {
			const response = await fetch(
				'http://localhost:5000/api/admin/add-user-access',
				{
					method: 'POST',
					credentials: 'include',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(data),
				}
			);

			if (response.ok) {
				navigate(0);
			}
		} catch (err) {
			console.error('Error:', err.message);
		}
	};

	return (
		<div className='admin-container'>
			<h1>User Maintenance</h1>

			<div className='user-maintenance-container'>
				<form
					name='addUserForm'
					method='POST'
					onSubmit={addUserAccess}
					className='add-user-form'
				>
					<div className='add-user-container'>
						<div className='question'>Add a user:</div>

						<div>
							<input
								type='email'
								name='userEmail'
								placeholder='User Email*'
								required
								maxLength={50}
								className='user-email'
							/>
						</div>
					</div>

					<div className='add-user-status-container'>
						<div className='question'>
							Select user status:
						</div>

						<label
							key='user'
							className='radio-label'
						>
							<input
								type='radio'
								name='status'
								value='user'
								required
							/>
							User
						</label>

						<label
							key='admin'
							className='radio-label'
						>
							<input
								type='radio'
								name='status'
								value='admin'
							/>
							Admin
						</label>
					</div>

					<button
						type='submit'
						className='button add-user-btn'
					>
						Add User
					</button>
				</form>

				<div className='admin-table-container'>
					<AdminTable />
				</div>
			</div>
		</div>
	);
}

export default UserMaintenance;
