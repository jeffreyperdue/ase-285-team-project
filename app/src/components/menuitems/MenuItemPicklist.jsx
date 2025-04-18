import { useState, useEffect } from 'react';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa'; 
import Checkbox from './assets/Checkbox';
import '../../css/styles.css';

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

    // Initialize masterMenu and otherMenus directly from the menus array
    const masterMenu = menus.find(menu => menu.menuID === "0");
    const otherMenus = menus.filter(menu => menu.menuID !== "0");

    // When a checkbox is clicked, select that item and get its parent menuID too
    const handleCheckboxChange = (menuID, itemID) => {
        setMenus(prevMenus =>
            prevMenus.map(menu =>
                menu.menuID === menuID
                    ? {
                          ...menu,
                          menuItems: menu.menuItems.map(item =>
                              item.itemID === itemID
                                  ? { ...item, isSelected: !item.isSelected }
                                  : item
                          )
                      }
                    : menu
            )
        );
    };

    // Rendering the Tree of Menus and their MenuItems
    const renderMenuTree = (menu) => {
        return (
            <div key={menu.menuID} className="menu-tree">
                <div className="font-bold">{menu.name}</div>
                <ul className="ml-4 mt-2">
                    {menu.menuItems.map(item => (
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

    // TODO:
    const handleMoveToMenu = () => {
        /* When this is clicked, we move the Menu Item ID
         from MasterMenu to the MenuItem array in the 
         target menu. */
        console.log("Move to menu clicked");
    };

    // TODO:
    const handleMoveToMasterMenu = () => {
        /* When this is clicked, we move the Menu Item ID
        from SourceMenu to the MenuItem array in the 
        MasterMenu. */
        console.log("Move to Master Menu clicked");
    };

    return (
        <div className="flex-container menu-items-container">
            {/* Left Tree for Other Menus */}
            <div className="menu-tree-container">
                <h3 className="menu-header-row">Other Menus</h3>
                {otherMenus.map(menu => renderMenuTree(menu))}
            </div>

            <div className="menu-buttons-container">
                <button className="menu-button" onClick={handleMoveToMenu}>
                    <FaChevronLeft size={20} />
                </button>
                <button className="menu-button" onClick={handleMoveToMasterMenu}>
                    <FaChevronRight size={20} />
                </button>
            </div>

            {/* Right Tree for Master Menu */}
            <div className="menu-tree-container">
                <h3 className="menu-header-row">Master Menu</h3>
                {masterMenu && renderMenuTree(masterMenu)}
            </div>
        </div>
    );
};

export default MenuItemPicklist;