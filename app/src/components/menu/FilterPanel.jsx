import React, { useState } from 'react';
import '../../css/FilterPanel.css';
import GenerateAllergenList from '../auth/AllergenList';
import GenerateDietList from '../auth/DietList';

const FilterPanel = ({ onFilterChange }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedAllergens, setSelectedAllergens] = useState([]);
    const [selectedDiets, setSelectedDiets] = useState([]);
    const [zipCode, setZipCode] = useState('');
    const [distance, setDistance] = useState(10); // Default 10 miles

    /*const handleSearch = () => {
        if (typeof onSearch === 'function') {
            onSearch({
                searchTerm,
                allergens: selectedAllergens,
                diets: selectedDiets,
                zipCode,
                distance
            });
        }
    };

    const handleCancel = () => {
        // Reset all filters
        setSearchTerm('');
        setSelectedAllergens([]);
        setSelectedDiets([]);
        setZipCode('');
        setDistance(10);
        
        if (typeof onCancel === 'function') {
            onCancel();
        }
    };*/

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        /*onFilterChange({ 
            search: e.target.value, 
            allergens: selectedAllergens,
            diets: selectedDiets,
            zipCode,
            distance
        });*/
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
        /*onFilterChange({ 
            search: searchTerm, 
            allergens: newAllergens,
            diets: selectedDiets,
            zipCode,
            distance
        });*/
    };

    const handleDietChange = (e) => {
        const { value, checked } = e.target;
        let newDiets = [...selectedDiets];
        
        if (checked) {
            newDiets.push(value);
        } else {
            newDiets = newDiets.filter(d => d !== value);
        }
        
        setSelectedDiets(newDiets);
        /*onFilterChange({ 
            search: searchTerm, 
            allergens: selectedAllergens,
            diets: newDiets,
            zipCode,
            distance
        });*/
    };

    const handleZipCodeChange = (e) => {
        const value = e.target.value;
        setZipCode(value);
        /*onFilterChange({ 
            search: searchTerm, 
            allergens: selectedAllergens,
            diets: selectedDiets,
            zipCode: value,
            distance
        });*/
    };

    const handleDistanceChange = (e) => {
        const value = parseInt(e.target.value);
        setDistance(value);
        onFilterChange({ 
            search: searchTerm, 
            allergens: selectedAllergens,
            diets: selectedDiets,
            zipCode,
            distance: value
        });
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
            
            <div className="location-filter">
                <h4>Location Filter</h4>
                <div className="location-controls">
                    <input
                        type="text"
                        placeholder="Enter ZIP code"
                        value={zipCode}
                        onChange={handleZipCodeChange}
                        maxLength="5"
                        pattern="\d{5}"
                    />
                    <div className="distance-control">
                        <span>Within {distance} miles</span>
                        <input
                            type="range"
                            min="1"
                            max="100"
                            value={distance}
                            onChange={handleDistanceChange}
                        />
                    </div>
                </div>
            </div>

            <div className="filter-sections">
                <div className="filter-section">
                    <h4>Filter by Allergens</h4>
                    <div className="filter-list">
                        <GenerateAllergenList 
                            onChange={handleAllergenChange} 
                            selected={selectedAllergens} 
                        />
                    </div>
                </div>
                <div className="filter-section">
                    <h4>Filter by Dietary Preferences</h4>
                    <div className="filter-list">
                        <GenerateDietList 
                            onChange={handleDietChange} 
                            selected={selectedDiets} 
                        />
                    </div>
                </div>
            </div>
            <div className="filter-actions">
                <button className="cancel-button" /*onClick={handleCancel}*/>
                    Cancel
                </button>
                <button className="search-button" /*</div>onClick={handleSearch}*/>
                    Search
                </button>
            </div>
        </div>
    );
};

export default FilterPanel;