import backArrowIcon from '../icons/back-arrow-white.png';
import backArrowIconBlackSmall from '../icons/back-arrow-black.png';
import { useNavigate } from 'react-router-dom';

// const Btn = ({ classes }) => {
// 	const navigate = useNavigate();

// 	return (
// 		<button
// 			className={`gray-btn btn ${classes ? classes : ''}`}
// 			onClick={() => navigate('/dashboard')}
// 		>
// 			<img
// 				src={backArrowIcon}
// 				alt='back arrow'
// 			/>
// 			Back to Dashboard
// 		</button>
// 	);
// };

const Btn = ({ classes }) => {
	const navigate = useNavigate();

	return (
		<i title='Back to Dashboard'>
			<img
				src={backArrowIconBlackSmall}
				alt='back arrow'
				onClick={() => navigate('/dashboard')}
				className='back-arrow'
			/>
		</i>
	);
};

export default Btn;
