import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	MRT_TableBodyCellValue,
	MRT_ToolbarAlertBanner,
	flexRender,
	useMaterialReactTable,
} from 'material-react-table';
import {
	Box,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material';
import removeUserIcon from '../../icons/remove-user.png';
import demoteAdminIcon from '../../icons/demote-admin.png';
import promoteAdminIcon from '../../icons/promote-admin.png';
import GetConfirmationMessage from '../ConfirmationMessage';
import ErrorMessage from '../ErrorMessage';

//define TData type with JSDoc
/**
 * @typedef {Object} User
 * @property {number} id
 * @property {string} email
 * @property {number} age
 */

//import MRT_ColumnDef type with JSDoc
/**
 * @type {import('material-react-table').MRT_ColumnDef<User>[]}
 */
const columns = [
	{
		accessorKey: 'first_name',
		header: 'First Name',
	},
	{
		accessorKey: 'last_name',
		header: 'Last Name',
	},
	{
		accessorKey: 'email',
		header: 'User Email',
		muiTableHeadCellProps: {
			textAlign: 'left',
			sx: {
				// backgroundColor: 'lightblue',
				// fontWeight: 'bold',
			}, // Header cell styles
		},
		textAlign: 'left',
		muiTableBodyCellProps: {
			textAlign: 'left', // Body cell styles
		},
	},
	{
		accessorKey: 'status',
		header: 'Status',
	},
];

const AdminTable = () => {
	const navigate = useNavigate();
	const [data, setData] = useState([]);
	const [message, setMessage] = useState(
		'Something went wrong.'
	);
	const [showError, setShowError] = useState(false);
	const [showConfirmation, setShowConfirmation] =
		useState(false);

	// Get a list of users associated w/ the user's business
	React.useEffect(() => {
		const getUsers = async () => {
			try {
				const response = await fetch(
					'http://localhost:5000/api/admin/get-user-list',
					{
						method: 'POST',
						credentials: 'include',
						headers: {
							'Content-Type': 'application/json',
						},
					}
				);

				if (response.ok) {
					const users = await response.json();
					setData(users);
				} else {
					console.error(
						'Error: response not ok:',
						response.error
					);
				}
			} catch (err) {
				console.error('Error: ', err.message);
			}
		};

		getUsers();
	}, []);

	// Change a user's admin status
	const changeAdminStatus = async (action, targetEmail) => {
		const data = {
			action: action,
			targetEmail: targetEmail,
		};

		try {
			const response = await fetch(
				'http://localhost:5000/api/admin/change-admin-status',
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
				setMessage(
					action === 'promote'
						? 'Promoted user to admin successfully.'
						: 'Demoted admin to user successfully.'
				);
				setShowConfirmation(true);
			} else {
				setMessage(
					action === 'promote'
						? `There was an error promoting user to admin.`
						: `There was an error demoting admin to user.`
				);
				setShowError(true);
			}
		} catch (err) {
			console.error('Error:', err.message);
		}
	};

	// Remove a user's access to a business
	const removeUserAccess = async (targetEmail) => {
		try {
			const response = await fetch(
				'http://localhost:5000/api/admin/remove-user-access',
				{
					method: 'POST',
					credentials: 'include',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ email: targetEmail }),
				}
			);

			if (response.ok) {
				setMessage(`Removed user access successfully.`);
				setShowConfirmation(true);
			} else {
				setMessage(
					`There was an error removing user access.`
				);
				setShowError(true);
			}
		} catch (err) {
			console.error('Error:', err.message);
		}
	};

	// Get admin table Actions btns
	const getBtn = (status, email) => {
		switch (status) {
			case 'user':
				return (
					<i title='Promote user to admin'>
						<img
							src={promoteAdminIcon}
							onClick={() =>
								changeAdminStatus('promote', email)
							}
							alt='Promote user icon'
							className='admin-table-icon'
						/>
					</i>
				);
			case 'admin':
				return (
					<i title='Demote admin to user'>
						<img
							src={demoteAdminIcon}
							onClick={() =>
								changeAdminStatus('demote', email)
							}
							alt='Demote admin icon'
							className='admin-table-icon'
						/>
					</i>
				);
			default:
				return <></>;
		}
	};

	const table = useMaterialReactTable({
		columns,
		data,
		enableRowSelection: false,
		enableRowActions: true,
		positionActionsColumn: 'last',
		layoutMode: 'grid-no-grow',
		renderRowActions: ({ row }) => (
			<Box
				sx={{
					display: 'flex',
					gap: '15px',
				}}
			>
				{getBtn(row.original.status, row.original.email)}

				<i title='Remove user access'>
					<img
						src={removeUserIcon}
						alt='Remove user access icon'
						onClick={() =>
							removeUserAccess(row.original.email)
						}
						className='admin-table-icon'
					/>
				</i>
			</Box>
		),
	});

	return (
		<Stack>
			{showConfirmation ? (
				<GetConfirmationMessage
					message={message}
					destination={0}
				/>
			) : (
				<></>
			)}

			{showError ? (
				<ErrorMessage
					message={message}
					destination={0}
				/>
			) : (
				<></>
			)}

			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			></Box>

			<TableContainer>
				<Table
					sx={{ fontFamily: 'Josefin Sans, sans-serif' }}
				>
					<TableHead>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableCell
										align='left'
										sx={{ fontWeight: 'bold' }}
										variant='head'
										key={header.id}
									>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.Header ??
														header.column.columnDef.header,
													header.getContext()
											  )}
									</TableCell>
								))}
							</TableRow>
						))}
					</TableHead>
					<TableBody>
						{table
							.getRowModel()
							.rows.map((row, rowIndex) => (
								<TableRow
									key={row.id}
									selected={row.getIsSelected()}
								>
									{row
										.getVisibleCells()
										.map((cell, _columnIndex) => (
											<TableCell
												align='left'
												variant='body'
												key={cell.id}
											>
												<MRT_TableBodyCellValue
													cell={cell}
													table={table}
													staticRowIndex={rowIndex} //just for batch row selection to work
												/>
											</TableCell>
										))}
								</TableRow>
							))}
					</TableBody>
				</Table>
			</TableContainer>
			<MRT_ToolbarAlertBanner
				stackAlertBanner
				table={table}
			/>
		</Stack>
	);
};

export default AdminTable;
