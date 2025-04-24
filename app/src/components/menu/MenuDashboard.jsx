import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MenuCard from './MenuCard';
import '../../css/MenuDashboard.css';
import deleteIcon from '../../icons/delete.png';

function MenuDashboard() {
    const [menus, setMenus] = useState([]);
    const [showConfirm, setShowConfirm] = useState(false);
    const [menuToDelete, setMenuToDelete] = useState(null);

    // Fetch menus from backend on initial render
    useEffect(() => {
        const fetchMenus = async () => {
            try {
                const res = await axios.get('/api/menus');
                const fetchedMenus = res.data.map(menu => ({
                    ...menu,
                    isEditable: menu.title !== 'Master Menu',
                }));
                setMenus(fetchedMenus);
            } catch (err) {
                console.error('Error fetching menus:', err);
            }
        };
        fetchMenus();
    }, []);

    // Add a new menu to backend and update state
    const handleAddMenu = async () => {
        try {
            const res = await axios.post('/api/menus', {
                title: 'Untitled Menu',
                description: 'New menu created',
                restaurant: 'PLACEHOLDER_ID', // Replace with actual restaurant ID
                menuItems: []
            });
            const newMenu = { ...res.data, isEditable: true };
            setMenus([...menus, newMenu]);
        } catch (err) {
            console.error('Error adding menu:', err);
        }
    };

    const handleRequestDelete = (index) => {
        setMenuToDelete(index);
        setShowConfirm(true);
    };

    const handleConfirmDelete = () => {
        setMenus(menus.filter((_, i) => i !== menuToDelete));
        setMenuToDelete(null);
        setShowConfirm(false);
    };

    const handleCancelDelete = () => {
        setShowConfirm(false);
        setMenuToDelete(null);
    };

    const handleTitleChange = (index, newTitle) => {
        const updatedMenus = menus.map((menu, i) =>
            i === index ? { ...menu, title: newTitle } : menu
        );
        setMenus(updatedMenus);
    };

    const handleDescriptionChange = (index, newDescription) => {
        const updatedMenus = menus.map((menu, i) =>
            i === index ? { ...menu, description: newDescription } : menu
        );
        setMenus(updatedMenus);
    };

    return (
        <div className='dashboard-container'>
            <div className='dashboard-header'>
                <button className='button add-menu-btn' onClick={handleAddMenu}>
                    + Add a Menu
                </button>
                <h2 className='dashboard-title'>Your Menu Dashboard</h2>
            </div>

            <div className='menu-grid'>
                {menus.map((menu, index) => (
                    <div className='menu-card-wrapper' key={menu._id || index}>
                        {menu.isEditable && (
                            <img
                                src={deleteIcon}
                                alt='Delete'
                                className='delete-icon'
                                onClick={() => handleRequestDelete(index)}
                            />
                        )}
                        <MenuCard
                            title={menu.title}
                            description={menu.description}
                            buttonLabel='View Menu'
                            isEditable={menu.isEditable}
                            onTitleChange={(newTitle) => handleTitleChange(index, newTitle)}
                            onDescriptionChange={(newDesc) => handleDescriptionChange(index, newDesc)}
                        />
                    </div>
                ))}
            </div>

            {showConfirm && (
                <div className='confirm-delete-box'>
                    <div className='confirm-content'>
                        <p className='confirm-title'>Confirm Deletion?</p>
                        <p className='confirm-message'>
                            You are deleting <strong>{menus[menuToDelete]?.title}</strong>.
                        </p>
                    </div>
                    <div className='delete-buttons-box'>
                        <button className='delete-cancel' onClick={handleCancelDelete}>
                            No, do not Delete
                        </button>
                        <button className='delete-confirm' onClick={handleConfirmDelete}>
                            Yes, Delete
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MenuDashboard;
