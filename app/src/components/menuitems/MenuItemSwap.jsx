import { useState, changeState } from 'react';
import '../../css/styles.css'

const MenuItemSearch = () => {
        // For testing the dynamically created check list.
        const [menus, setMenus] = useState([
            { 
                menuID: "1", 
                name:"Summer Specials", 
                description: "Summer menu", 
                menuItems: [
                    { 
                        itemID: "1A",
                        name: "Menu Item 1",
                        description: " lala",
                        allergens: [] 
                    },
                    { 
                        itemID: "2A",
                        name: "Menu Item 2",
                        description: "test 2",
                        allergens: [] },
            ]},
            { 
                menuID: "1", 
                name:"Spring Surprise", 
                description: "Spring menu", 
                menuItems: [
                    { 
                        itemID: "1B",
                        name: "Spring Item 1",
                        description: "Green Ham and Cheese",
                        allergens: [] 
                    },
                    { 
                        itemID: "2B",
                        name: "Spring Item 2",
                        description: "Roasted duck",
                        allergens: [] },
            ]},
        ]);

        const [menuItems, setmenuItems] = useState([])

    return ( 
        <div className="flex-container">
            <div className="left-side">
                <h4>Available Menu Items</h4>
                <div className="search-bar">
                    
                </div>
                <div className="panel">
                {menus.map((menu) => (
                        <div>
                            <input 
                                type="checkbox"
                                id={menu.menuID}
                                className="checkbox" 
                                key={menu.menuID}
                            />
                            <label for={menu.menuID}>{ menu.name}</label>
                            
                            {menu.menuItems.map((menuItem) => (
                                <div className="margin-left">
                                    <input
                                        type="checkbox"
                                        id={menuItem.itemID}
                                        className="checkbox"
                                        key={menuItem.itemID}
                                    />
                                    <label for={menuItem.itemID}>{ menuItem.name }</label>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <div className="right-side">
                <h4>Master Menu Items</h4>
                <div className="search-bar">
                    
                </div>
                <div className="panel">
                    
                </div>
            </div>
        </div>
     );
}
 
export default MenuItemSearch;