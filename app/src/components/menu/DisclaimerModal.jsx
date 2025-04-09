import { useState } from 'react';
import '../../css/styles.css';

const DisclaimerModal = ({ isOpen, onClose, onSave, menuAllergens }) => {
    const [customDisclaimer, setCustomDisclaimer] = useState('');
    const [useCustom, setUseCustom] = useState(false);

    // Generate disclaimer based on allergens
    const generateDisclaimer = () => {
        if (!menuAllergens || menuAllergens.length === 0) {
            return "Our kitchen is free from common allergens.";
        }
        
        const allergenList = menuAllergens.join(', ');
        return `Our menu contains items with the following allergens: ${allergenList}. Please inform your server of any food allergies before ordering.`;
    };

    const handleSave = () => {
        onSave(useCustom ? customDisclaimer : generateDisclaimer());
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="disclaimer-modal">
                <h2>Allergen Disclaimer</h2>
                <div className="disclaimer-options">
                    <label>
                        <input
                            type="radio"
                            name="disclaimerType"
                            checked={!useCustom}
                            onChange={() => setUseCustom(false)}
                        />
                        Use Generated Disclaimer
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="disclaimerType"
                            checked={useCustom}
                            onChange={() => setUseCustom(true)}
                        />
                        Use Custom Disclaimer
                    </label>
                </div>
                
                {!useCustom ? (
                    <div className="generated-disclaimer">
                        <p>{generateDisclaimer()}</p>
                    </div>
                ) : (
                    <textarea
                        className="custom-disclaimer-input"
                        value={customDisclaimer}
                        onChange={(e) => setCustomDisclaimer(e.target.value)}
                        placeholder="Enter your custom allergen disclaimer..."
                    />
                )}
                
                <div className="modal-buttons">
                    <button type="button" onClick={onClose}>Cancel</button>
                    <button type="button" onClick={handleSave}>Save</button>
                </div>
            </div>
        </div>
    );
};

export default DisclaimerModal;