import { useState, useEffect } from 'react';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa'; 
import { useLocation } from 'react-router-dom';
import Checkbox from './assets/Checkbox'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import '../../css/styles.css';
import '../../css/picklist.scss';

const MenuItemPicklist = () => {
    const [menus, setMenus] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    const [masterMenu, setMasterMenu] = useState([]);
    const [otherMenus, setOtherMenus] = useState([]);
    const [masterMenuID, setMasterMenuID] = useState([]);
    const [selectedItemID, setSelectedItemID] = useState(null);
    const [selectedKeys, setSelectedKeys] = useState(new Set());
    const [searchTerms, setSearchTerms] = useState({ masterMenu: '', otherMenus: '' });
    const location = useLocation();
    const menuTitle = location.state?.menuTitle || 'Untitled Menu';
    const navigate = useNavigate();


    // Call the functions to pull in the menus and menu items.
    useEffect(() => {
      const fetchData = async () => {
        try {
            const businessID = localStorage.getItem('business_id');
            if (!businessID) return alert("No business ID found.");
          
            // Get the menus based on business ID
            const menusRes = await axios.get(`http://localhost:5000/api/menuitems/menuswap-menus?businessID=${businessID}`);
            setMenus(menusRes.data);

            const masterMenu = menusRes.data.find(menu => menu.title === "Master Menu");
            setOtherMenus(menusRes.data.filter(menu => menu.title !== "Master Menu"));

            if (masterMenu) {
                setMasterMenu(masterMenu);
                setMasterMenuID(masterMenu._id);

                const itemsRes = await axios.get(`http://localhost:5000/api/menuitems/menuswap-items?menuID=${masterMenu._id}`);
                setMenuItems(itemsRes.data);
            }

        } catch (error) {
          console.error('Error loading data:', error);
          alert("Unable to load the menus.")
        };
      };
    
      fetchData();
    }, []);
    

    // Filter the lists in real time
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
    const handleCheckboxChange = (uniqueKey) => {
      setSelectedItemID(uniqueKey.split('_')[0]); // still for highlighting by itemID
    
      setSelectedKeys((prevKeys) => {
        const updated = new Set(prevKeys);
        if (updated.has(uniqueKey)) {
          updated.delete(uniqueKey);
        } else {
          updated.add(uniqueKey);
        }
        return updated;
      });
    };
    
    // Menu checkbox changes
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

        const localCounter = 0;
        return (
          <div key={menu.menuID} className="menu-tree">
            <Checkbox
              label={menu.title}
              isSelected={menu.isSelected || false}
              onCheckboxChange={() => handleMenuCheckboxChange(menu.menuID)}
            />
            <ul className="ml-4 mt-2">
                {itemsForThisMenu.length > 0 ? (
                    localCounter++,
                    itemsForThisMenu.map((item, index) => {
                        return (
                        <li
                        key={`${item.itemID}_${index}`}
                        className={`text-sm ${item.itemID === selectedItemID ? "bg-yellow-100" : "text-gray-500"}`}
                        >
                        <Checkbox
                            label={item.name}
                            isSelected={selectedKeys.has(`${item.itemID}_${index}`)}
                            onCheckboxChange={() => handleCheckboxChange(`${item.itemID}_${index}`)}
                        />
                        </li>
                        );
                    })
                ) : (
                <li className="text-sm text-gray-400 italic">No items found</li>
              )}
            </ul>
          </div>
        );
    };
    // Menu is moved
    const handleMoveToMenu = () => {
      const targetMenu = menus.find((menu) => menu.isSelected && menu.menuID !== "0");
    
      if (!targetMenu) {
        alert("No target menu selected.");
        return;
      }
      // showing the menuItems
      setMenuItems((prevItems) => {
        return prevItems.map(item  => {
          const itemSelected = [...selectedKeys].some(key => key.startsWith(item.itemID));
          if (itemSelected) {
            if (!item.menuIDs.includes(targetMenu.menuID)) {
              return { 
                ...item, 
                menuIDs: [...item.menuIDs, targetMenu.menuID]
              };
            }
          }
          return item;
        });
      });
    
      // Clear selection after move
      setSelectedKeys(new Set());
      // Clear menus
      setMenus(prevMenus =>
        prevMenus.map(menu => ({
          ...menu,
          isSelected: false
        }))
      );
    };

    // Removing an item from a menu.
    const handleDeleteItem = () => {
      const parentMenu = menus.find(menu => menu.isSelected);
    
      if (!parentMenu) {
        alert("Please select parent menu to delete from first.");
        return;
      }
    
      if (parentMenu.menuID === "0") {
        alert("Cannot remove from Master Menu.");
        return;
      }
    
      setMenuItems((prevItems) => {
        return prevItems.map(item => {
          const itemSelected = [...selectedKeys].some(key => key.startsWith(item.itemID));
          if (itemSelected) {
            const updatedMenuIDs = item.menuIDs.filter(id => id !== parentMenu.menuID);
            return { 
              ...item,
              menuIDs: updatedMenuIDs
            };
          }
          return item;
        });
      });
    
      // Clear selection after delete
      setSelectedKeys(new Set());
      // Clear Menus
      setMenus(prevMenus =>
        prevMenus.map(menu => ({
          ...menu,
          isSelected: false
        }))
      );
    };
    
    // Saving the altered menuItems
    const handleSave = async () => {
      try {
        const saveRequests = menuItems.map(menuItem =>
          axios.post('http://localhost:5000/api/menuitems/swap-menu', {
            name: menuItem.name,
            description: menuItem.description,
            ingredients: menuItem.ingredients,
            allergens: menuItem.selectedAllergens || [],
            menuIDs: menuItem.menuIDs
          })
        );
        await Promise.all(saveRequests);
    
        alert('All items saved successfully!');
      } catch (err) {
        console.error('Error saving items:', err);
        alert('Failed to save all items.');
      }
    }

    // Go back to menu
    const toMenu = (event) => {
        navigate('/menuitems', {
            state: { menuTitle: menuTitle }, 
        });
    };

    return (
      <div className='center add-center-flex'>
        {/* Top section: buttons + menu name */}
        <div className="picklist-header-row">
          <div style={{ flex: 1, textAlign: 'left' }}>
            <button className="button" onClick={handleSave}>Save</button>
          </div>
          <div className="menu-name" style={{ flex: 1, textAlign: 'center' }}>Add Item to Menu</div>
          <div style={{ flex: 1}}><button className="button" onClick={toMenu}>Return to Menu</button></div>
        </div>

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
            {otherMenus.map((menu) => (
                <div key={menu.menuID}>
                    {renderMenuTree(menu, searchTerms.otherMenus)}
                </div>
            ))}
            </div>
          </div>
      
          {/* Buttons in the middle */}
          <div className="menu-buttons-container">
            <button className="menu-button">
              <FaChevronRight size={20} onClick={handleDeleteItem} />
            </button>
            <button className="menu-button" onClick={handleMoveToMenu}>
              <FaChevronLeft size={20} />
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
      </div>
    );
};

export default MenuItemPicklist;