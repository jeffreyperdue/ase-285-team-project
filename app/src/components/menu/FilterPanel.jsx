import React, { useState } from 'react';
//import '../../css/FilterPanel.css';
import GenerateAllergenList from '../auth/AllergenList';

const FilterPanel = ({ onFilterChange }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedAllergens, setSelectedAllergens] = useState([]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        onFilterChange({ search: e.target.value, allergens: selectedAllergens });
    };

    const handleAllergenChange = (e) => {
        const { value, checked } = e.target;
        let newAllergens = [...selectedAllergens];
        
        if (checked) {
            newAllergens.push(value);
        } else {
            newAllergens = newAllergens.filter(a => a !== value);
        }
        
        setSelectedAllergens(newAllergens);
        onFilterChange({ search: searchTerm, allergens: newAllergens });
    };

    return (
        <div className="filter-panel">
            <div className="search-box">
                <input
                    type="text"
                    placeholder="Search menu items..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
            <div className="allergen-filter">
                <h4>Filter by Allergens</h4>
                <div className="allergen-list">
                    <GenerateAllergenList onChange={handleAllergenChange} selected={selectedAllergens} />
                </div>
            </div>
        </div>
    );
};

export default FilterPanel;