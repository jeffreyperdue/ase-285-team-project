import { useState, useEffect } from 'react';
import { FaChevronRight, FaChevronLeft, FaRegTrashAlt } from 'react-icons/fa'; 
import Checkbox from './assets/Checkbox';
// import '../../css/styles.css';
import '../../css/picklist.scss';

const MenuItemPicklist = () => {
    const [menus, setMenus] = useState([
        { 
            menuID: "0", 
            name: "Master Menu", 
            description: "Master Menu", 
        },
        { 
            menuID: "1", 
            name: "Summer Specials", 
            description: "Summer menu",
        },
        { 
            menuID: "2", 
            name: "Spring Surprise", 
            description: "Spring menu",
        },
    ]);

    const [menuItems, setMenuItems] = useState([
        { 
             
            itemID: "1A",
            name: "Item 1",
            description: "sammich",
            allergens: [],
            isSelected: false,
            menuIDs: ["0", "1"]
        },
        { 
            itemID: "2A",
            name: "Item 2",
            description: "hot dog",
            allergens: [],
            isSelected: false,
            menuIDs: ["0", "1"]
        },
        { 
            itemID: "1C",
            name: "Menu Item 1",
            description: "lala",
            allergens: [],
            isSelected: false,
            menuIDs: ["0"]
        },
        { 
            itemID: "2C",
            name: "Menu Item 2",
            description: "test 2",
            allergens: [],
            isSelected: false,
            menuIDs: ["0"]
        },
        
        { 
            itemID: "1B",
            name: "Spring Item 1",
            description: "Green Ham and Cheese",
            allergens: [],
            isSelected: false,
            menuIDs: ["0", "2"]
        },
        { 
            itemID: "2B",
            name: "Spring Item 2",
            description: "Roasted duck",
            allergens: [],
            isSelected: false,
            menuIDs: ["0", "2"]
        },
    ]);

    const [searchTerms, setSearchTerms] = useState({ masterMenu: '', otherMenus: '' });

    const [selectedItemID, setSelectedItemID] = useState(null);


    // Initialize masterMenu and otherMenus directly from the menus array
    const masterMenu = menus.find(menu => menu.menuID === "0");
    const otherMenus = menus.filter(menu => menu.menuID !== "0");

    const handleSearchChange = (menuID, value) => {
        setSearchTerms((prev) => ({ ...prev, [menuID]: value }));
    };

    const filteredMenuItems = (menu, searchTerm) => {
        return menuItems.filter(item => 
          item.menuIDs.includes(menu.menuID) &&
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      };

    // When a checkbox is clicked, select that item and get its parent menuIDs too
    const handleCheckboxChange = (itemID) => {
        setMenuItems((prevItems) =>
          prevItems.map(item =>
            item.itemID === itemID
              ? { ...item, isSelected: !item.isSelected }
              : item
          )
        );
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
        // Getting the items for the tree.
        const itemsForThisMenu = menuItems.filter(item =>
            // this item belongs to this menu
            item.menuIDs.includes(menu.menuID) &&
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
          );

        return (
            <div key={menu.menuID} className="menu-tree">
                {/* Checkbox for the menu itself */}
                <Checkbox
                    label={menu.name}
                    isSelected={menu.isSelected || false} // Add isSelected for the menu
                    onCheckboxChange={() => handleMenuCheckboxChange(menu.menuID)}
                />
                <ul className="ml-4 mt-2">
                    {itemsForThisMenu.length > 0? (
                        itemsForThisMenu.map(item => (
                            <li key={item.itemID} className="text-sm text-gray-500">
                            <Checkbox
                                label={item.name}
                                isSelected={item.isSelected}
                                onCheckboxChange={() =>
                                    handleCheckboxChange(item.itemID)
                                }
                            />
                        </li>
                    )))
                    : (
                        <li className="text-sm text-gray-400 italic">No items found</li>
                    )}
                </ul>
            </div>
        );
    };

    const handleMoveToMenu = () => {
        // Find the selected menu (excluding Master Menu "0")
        const targetMenu = menus.find((menu) => menu.isSelected && menu.menuID !== "0");

        if (!targetMenu) {
        alert("No target menu selected.");
        return prevItems;
        }

        setMenuItems((prevItems) => {
        // Get all the previous items and loop through
        return prevItems.map(item => {
            if (item.isSelected) {
                if (!item.menuIDs.includes(targetMenu.menuID)) {
                    return {
                        ...item,
                        menuIDs: [...item.menuIDs, targetMenu.menuID],
                        isSelected: false
                    };
                }
                return {
                    ...item,
                    isSelected: false
                };
            }
            return item;
        });
        });
      
        // Optionally, deselect the menu after moving
        setMenus(prevMenus =>
            prevMenus.map(menu =>
            menu.menuID === targetMenu.menuID
                ? { ...menu, isSelected: false }
                : menu
            )
        )
    };

    const handleDeleteItem = () => {
        setMenuItems((prevItems) => {
          return prevItems.map(item => {
            if (item.isSelected) {
              const parentMenu = menus.find(menu => menu.isSelected);
      
              if (!parentMenu) {
                alert("Please select parent menu to delete from first.");
                return item;
              }
      
              // If selected parent menu is Master Menu ("0"), do nothing
              if (parentMenu.menuID === "0") {
                alert("Cannot remove from Master Menu.");
                return { ...item, isSelected: false }; // Just deselect
              }
            
              if (!item) {
                alert("Select an item on the Other Menus side.")
              }

              // Remove the parent menuID from this item's menuIDs
              const updatedMenuIDs = item.menuIDs.filter(id => id !== parentMenu.menuID);
      
              return { 
                ...item,
                menuIDs: updatedMenuIDs,
                isSelected: false // Deselect after operation
              };
            }
            return item;
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
            <button className="menu-button" onClick={handleDeleteItem}>
                <FaRegTrashAlt size={20}/>
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