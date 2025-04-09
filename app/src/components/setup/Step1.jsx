import '../../css/setup.scss';

function Step1() {
	return (
		<>
			<h1>Basic Business Information</h1>

			<form
				name='setUpStep1Form'
				className='step1-form'
			>
				<div className='business-info'>
					<span className='question'>
						Please enter your business name and website URL
						(if applicable):
					</span>

					<div className='name-website-container'>
						<div>
							<input
								type='text'
								name='businessName'
								placeholder='Business Name*'
								maxLength={30}
								required
								className='business-name'
							/>
						</div>

						<div>
							<input
								type='text'
								name='website'
								placeholder='Web Profile URL'
								className='website'
							/>
						</div>
					</div>

					<span className='question'>
						Please enter your business's address:
					</span>

					<div className='address-container'>
						<div>
							<input
								type='text'
								name='streetAddress1'
								placeholder='Street Address*'
								className='street-address'
							/>
						</div>

						<div>
							<input
								type='text'
								name='streetAddress2'
								placeholder='Street Address 2'
								className='street-address'
							/>
						</div>

						<div className='city-state-zip'>
							<input
								type='text'
								name='city'
								placeholder='City*'
								maxLength={50}
								className='city'
							/>

							<input
								type='text'
								name='state'
								placeholder='State*'
								maxLength={2}
								className='state'
							/>

							<input
								type='number'
								name='zipCode'
								placeholder='ZIP*'
								min='00500'
								max='99999'
								defaultValue=''
								className='zip'
							/>
						</div>
					</div>
				</div>

				<div className='notes'>
					<h2>Please Note:</h2>

					<ul>
						<li>
							Information given in this section will be
							shown publicly to the users (your customers).
							Please only give info you want them to see.
						</li>
						<br />
						<li>
							If you are a mobile food truck service, please
							put your most recent or upcoming location, or
							the location of an event, in the “Location
							Address” box. This location can be changed at
							anytime via the “business info” settings.
						</li>
						<br />
						<li>
							Additional locations can be added later in the
							business info settings.
						</li>
					</ul>
				</div>
			</form>
		</>
	);
}

export default Step1;
