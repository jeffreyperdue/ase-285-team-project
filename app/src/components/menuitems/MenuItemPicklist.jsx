import { useState, useEffect } from 'react';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa'; 
import Checkbox from './assets/Checkbox';
// import '../../css/styles.css';
import '../../css/picklist.scss';

const MenuItemPicklist = () => {
    const [menus, setMenus] = useState([
        { 
            menuID: "0", 
            name: "Master Menu", 
            description: "Master Menu", 
            menuItems: [
                { 
                    itemID: "1C",
                    name: "Item 1",
                    description: "sammich",
                    allergens: [],
                    isSelected: false
                },
                { 
                    itemID: "2A",
                    name: "Item 2",
                    description: "hot dog",
                    allergens: [],
                    isSelected: false
                },
            ]
        },
        { 
            menuID: "1", 
            name: "Summer Specials", 
            description: "Summer menu", 
            menuItems: [
                { 
                    itemID: "1A",
                    name: "Menu Item 1",
                    description: "lala",
                    allergens: [],
                    isSelected: false
                },
                { 
                    itemID: "2A",
                    name: "Menu Item 2",
                    description: "test 2",
                    allergens: [],
                    isSelected: false
                },
            ]
        },
        { 
            menuID: "2", 
            name: "Spring Surprise", 
            description: "Spring menu", 
            menuItems: [
                { 
                    itemID: "1B",
                    name: "Spring Item 1",
                    description: "Green Ham and Cheese",
                    allergens: [],
                    isSelected: false
                },
                { 
                    itemID: "2B",
                    name: "Spring Item 2",
                    description: "Roasted duck",
                    allergens: [],
                    isSelected: false
                },
            ]
        },
    ]);

    const [searchTerms, setSearchTerms] = useState({ masterMenu: '', otherMenus: '' });

    // Initialize masterMenu and otherMenus directly from the menus array
    const masterMenu = menus.find(menu => menu.menuID === "0");
    const otherMenus = menus.filter(menu => menu.menuID !== "0");

    const handleSearchChange = (menuID, value) => {
        setSearchTerms((prev) => ({ ...prev, [menuID]: value }));
    };

    const filteredMenuItems = (menu, searchTerm) => {
        return menu.menuItems.filter(item => 
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    // When a checkbox is clicked, select that item and get its parent menuID too
    const handleCheckboxChange = (menuID, itemID) => {
        setMenus((prevMenus) => {
            // Map through the menus array
            return prevMenus.map((menu) => {
                // Check if the current menu matches the menuID
                if (menu.menuID === menuID) {
                    // Map through the menuItems array to toggle the isSelected property
                    const updatedMenuItems = menu.menuItems.map((item) => {
                        if (item.itemID === itemID) {
                            // Toggle the isSelected property for the matching item
                            return { ...item, isSelected: !item.isSelected };
                        }
                        // Return the item unchanged if it doesn't match
                        return item;
                    });
    
                    // Return the updated menu with the modified menuItems array
                    return { ...menu, menuItems: updatedMenuItems };
                }
    
                // Return the menu unchanged if it doesn't match the menuID
                return menu;
            });
        });
    };

    const handleMenuCheckboxChange = (menuID) => {
        setMenus((prevMenus) =>
            prevMenus.map((menu) =>
                menu.menuID === menuID
                    ? { ...menu, isSelected: !menu.isSelected } // Toggle isSelected for the menu
                    : menu
            )
        );
    };

    // Rendering the Tree of Menus and their MenuItems
    const renderMenuTree = (menu, searchTerm) => {
        return (
            <div key={menu.menuID} className="menu-tree">
                {/* Checkbox for the menu itself */}
                <Checkbox
                    label={menu.name}
                    isSelected={menu.isSelected || false} // Add isSelected for the menu
                    onCheckboxChange={() => handleMenuCheckboxChange(menu.menuID)}
                />
                <ul className="ml-4 mt-2">
                    {filteredMenuItems(menu, searchTerm).map(item => (
                        <li key={item.itemID} className="text-sm text-gray-500">
                            <Checkbox
                                label={`${item.name}`}
                                isSelected={item.isSelected}
                                onCheckboxChange={() =>
                                    handleCheckboxChange(menu.menuID, item.itemID)
                                }
                            />
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    
    const handleMoveToMenu = () => {
        setMenus((prevMenus) => {
            // Find the selected menu in "Other Menus"
            const targetMenu = prevMenus.find((menu) => menu.isSelected && menu.menuID !== "0");
    
            if (!targetMenu) {
                console.log("No target menu selected.");
                return prevMenus; // If no menu is selected, return the original menus
            }
    
            // Find the selected menu item in the "Master Menu"
            const selectedItem = masterMenu.menuItems.find((item) => item.isSelected);
    
            if (!selectedItem) {
                console.log("No menu item selected in Master Menu.");
                return prevMenus; // If no item is selected, return the original menus
            }
    
            // Remove the selected item from the Master Menu
            const updatedMasterMenu = {
                ...masterMenu,
                menuItems: masterMenu.menuItems.filter((item) => item.itemID !== selectedItem.itemID),
            };
    
            // Add the selected item to the target menu
            const updatedTargetMenu = {
                ...targetMenu,
                menuItems: [...targetMenu.menuItems, { ...selectedItem, isSelected: false }], // Reset isSelected
            };
    
            // Update the menus array
            return prevMenus.map((menu) => {
                if (menu.menuID === masterMenu.menuID) {
                    return updatedMasterMenu; // Update the Master Menu
                } else if (menu.menuID === targetMenu.menuID) {
                    return updatedTargetMenu; // Update the target menu
                }
                return menu; // Return other menus unchanged
            });
        });
    };

    
    const handleMoveToMasterMenu = () => {
        setMenus((prevMenus) => {
            // Find the menu that contains the selected menu item
            const sourceMenu = prevMenus.find((menu) =>
                menu.menuItems.some((item) => item.isSelected)
            );
    
            if (!sourceMenu) {
                console.log("No menu item selected to move.");
                return prevMenus; // If no item is selected, return the original menus
            }
    
            // Get the selected menu item
            const selectedItem = sourceMenu.menuItems.find((item) => item.isSelected);
    
            // Remove the selected item from the source menu
            const updatedSourceMenu = {
                ...sourceMenu,
                menuItems: sourceMenu.menuItems.filter((item) => item.itemID !== selectedItem.itemID),
            };
    
            // Add the selected item to the Master Menu
            const updatedMasterMenu = {
                ...masterMenu,
                menuItems: [...masterMenu.menuItems, { ...selectedItem, isSelected: false }], // Reset isSelected
            };
    
            // Update the menus array
            return prevMenus.map((menu) => {
                if (menu.menuID === sourceMenu.menuID) {
                    return updatedSourceMenu; // Update the source menu
                } else if (menu.menuID === masterMenu.menuID) {
                    return updatedMasterMenu; // Update the Master Menu
                }
                return menu; // Return other menus unchanged
            });
        });
    };

    return (
        <div className="flex-container menu-items-container">
          {/* Left Tree for Other Menus */}
          <div className="menu-wrapper">
            <div className="menu-header-wrapper">
              <h3 className="menu-header-row">Other Menus</h3>
            </div>
            <input
                type="text"
                placeholder="Search Other Menus"
                value={searchTerms.otherMenus}
                onChange={(e) => handleSearchChange('otherMenus', e.target.value)}
                className="menu-search-bar"
            />
            <div className="menu-tree-container">
              {otherMenus.map((menu) => renderMenuTree(menu, searchTerms.otherMenus))}
            </div>
          </div>
      
          {/* Buttons in the middle */}
          <div className="menu-buttons-container">
            <button className="menu-button" onClick={handleMoveToMenu}>
              <FaChevronLeft size={20} />
            </button>
            <button className="menu-button" onClick={handleMoveToMasterMenu}>
              <FaChevronRight size={20} />
            </button>
          </div>
      
          {/* Right Tree for Master Menu */}
          <div className="menu-wrapper">
            <div className="menu-header-wrapper">
              <h3 className="menu-header-row">Master Menu</h3>
            </div>
            <input
                type="text"
                placeholder="Search Master Menu"
                value={searchTerms.masterMenu}
                onChange={(e) => handleSearchChange('masterMenu', e.target.value)}
                className="menu-search-bar"
            />
            <div className="menu-tree-container">
              {masterMenu && renderMenuTree(masterMenu, searchTerms.masterMenu)}
            </div>
          </div>
        </div>
    );
};

export default MenuItemPicklist;