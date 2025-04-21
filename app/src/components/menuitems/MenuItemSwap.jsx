import { useState, useEffect } from 'react';
import { PickList } from 'primereact/picklist';
import Checkbox from './assets/Checkbox';
import { Tree } from 'primereact/tree';
import '../../css/styles.css'

const MenuItemSwap = () => {
    // For testing the dynamically created check list.
    const [menus, setMenus] = useState([
        { 
            menuID: "0", 
            name:"Master Menu", 
            description: "Master Menu", 
            menuItems: [
                { 
                    itemID: "1C",
                    name: "Item 1",
                    description: "sammich",
                    allergens: [] 
                },
                { 
                    itemID: "2A",
                    name: "Item 2",
                    description: "hot dog",
                    allergens: [] },
        ]},
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
    
   // Initialize source and target states
   const [source, setSource] = useState([]);
   const [target, setTarget] = useState([]);

   useEffect(() => {
       // Separate Master Menu into the target and the rest into the source
       const masterMenu = menus.find(menu => menu.menuID === "0");
       const otherMenus = menus.filter(menu => menu.menuID !== "0");

       setSource(otherMenus.map(menu => ({
           ...menu,
           children: menu.menuItems
       })));

       setTarget(masterMenu ? [{
           ...masterMenu,
           children: masterMenu.menuItems
       }] : []);
   }, [menus]);

    const onChange = (event) => {
        setSource(event.source);
        setTarget(event.target);
    };

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

    const itemTemplate = (item) => {
        return (
            <div className="p-2 border-round bg-white shadow-sm">
                <div className="font-bold text-lg">{item.name}</div>
                {item.children && (
                    <ul className="ml-4 mt-2 item-swap">
                        {item.children.map(child => (
                            <li key={child.itemID} className="text-sm text-gray-500">
                                <Checkbox
                                    label={`${child.name}`}
                                    isSelected={child.isSelected}
                                    onCheckboxChange={() =>
                                        handleCheckboxChange(item.menuID, child.itemID)
                                    }
                                />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        );
    };

    return ( 
        <div className="flex-container-picklist">
            <div className="picklist-card">
                <PickList 
                    dataKey="menuID" 
                    source={source} 
                    target={target} 
                    onChange={onChange} 
                    filter 
                    filterBy="name" 
                    itemTemplate={itemTemplate} 
                    breakpoint="1280px" 
                    sourceHeader="Available Menus" 
                    targetHeader="Master Menu" 
                    sourceStyle={{ height: '24rem' }} 
                    targetStyle={{ height: '24rem' }} 
                />
            </div>
        </div>
    );
};

export default MenuItemSwap;