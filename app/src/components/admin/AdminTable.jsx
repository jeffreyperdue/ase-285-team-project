import React from 'react';
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
	const [data, setData] = React.useState([]);

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
					console.log('response is ok. users:', users);
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

	const navigate = useNavigate();

	const handlePromote = (event) => {
		event.preventDefault();
		navigate('/admin');
	};

	const handleDemote = (event) => {
		event.preventDefault();
		navigate('/admin');
	};

	const handleRemoveAccess = (event) => {
		event.preventDefault();
		navigate('/admin');
	};

	const getBtn = (status) => {
		switch (status) {
			case 'user':
				return (
					<button
						type='submit'
						className='button promote-btn'
						onClick={handlePromote}
					>
						Promote to Admin
					</button>
				);
			case 'admin':
				return (
					<button
						type='submit'
						className='button demote-btn'
						onClick={handleDemote}
					>
						Demote to User
					</button>
				);
			default:
				return <></>;
		}
	};

	const table = useMaterialReactTable({
		columns,
		data,
		enableRowSelection: true,
		enableRowActions: true,
		positionActionsColumn: 'last',
		layoutMode: 'grid-no-grow',
		renderRowActions: ({ row }) => (
			<Box>
				{getBtn(row.original.status)}

				<button
					type='submit'
					className='button remove-access-btn'
					onClick={handleRemoveAccess}
				>
					Remove User Access
				</button>
			</Box>
		),
	});

	return (
		<Stack>
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
