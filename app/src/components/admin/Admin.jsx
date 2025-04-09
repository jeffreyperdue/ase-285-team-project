import '../../css/admin.scss';
import AdminTable from './AdminTable';
import { useNavigate } from 'react-router-dom';

function Admin() {
	const navigate = useNavigate();

	const handleAddUser = (event) => {
		event.preventDefault();
		navigate('/admin');
	};

	return (
		<div className='admin-container'>
			<h1>User Maintenance</h1>

			<div className='user-maintenance-container'>
				{/* TO DO: add radio btns for choosing Admin/User status */}
				<form
					name='addUserForm'
					className='add-user-container'
				>
					<div class='question'>Add a user:</div>

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

					<button
						type='submit'
						onClick={handleAddUser}
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

export default Admin;
