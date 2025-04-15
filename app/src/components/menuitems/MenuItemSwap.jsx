import { useState, useEffect } from 'react';
import { PickList } from 'primereact/picklist';
import { Tree } from 'primereact/tree';
import '../../css/styles.css'

const MenuItemSwap = () => {
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
    const [source, setSource] = useState([]);
    const [target, setTarget] = useState([]);
    const [menuItems, setmenuItems] = useState([]);

    useEffect(() => {
        // Flatten all menuItems from menus into a single array
        const allMenuItems = menus.flatMap(menu => menu.menuItems);
        setSource(allMenuItems);
    }, [menus]);
    

    const onChange = (event) => {
        setSource(event.source);
        setTarget(event.target);
    };

    // itemTemplate here
    const itemTemplate = (item) => {
        return (
            <div className="p-2 border-round bg-white shadow-sm">
                <div className="font-bold text-lg">{item.name}</div>
                <div className="text-sm text-gray-600">{item.description}</div>
                <div className="text-xs text-gray-400">ID: {item.itemID}</div>
            </div>
        );
    };

    return ( 
        <div className="flex-container-picklist">
            <div className="picklist-card">
                <PickList dataKey="itemID" source={source} 
                    target={target} onChange={onChange} 
                    filter filterBy="name" itemTemplate={itemTemplate} 
                    breakpoint="1280px" sourceHeader="Available Menu Items" 
                    targetHeader="Master Menu Items" sourceStyle={{ height: '24rem' }} 
                    targetStyle={{ height: '24rem' }} />
            </div>
        </div>
     );
}
 
export default MenuItemSwap;