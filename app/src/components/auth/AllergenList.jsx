import '../../css/styles.css';

function GenerateAllergenList() {
	const allergens = [
		{ label: 'Lactose (milk)', value: 'lactose' },
		{ label: 'Gluten', value: 'gluten' },
		{ label: 'Meat', value: 'meat' },
		{ label: 'Fish', value: 'fish' },
		{ label: 'Animal Products', value: 'animalProducts' },
		{ label: 'Eggs', value: 'eggs' },
		{ label: 'Shellfish', value: 'shellfish' },
		{ label: 'Tree Nuts', value: 'treeNuts' },
		{ label: 'Peanuts', value: 'peanuts' },
	];

	let allergenList = [];

	for (const allergen of allergens) {
		allergenList.push(
			<label
				key={allergen.value}
				className='allergen-label'
			>
				<input
					type='checkbox'
					name='allergens'
					value={allergen.value}
					className='checkbox'
				/>
				{allergen.label}
			</label>
		);
	}

	return <>{allergenList}</>;
}

export default GenerateAllergenList;
