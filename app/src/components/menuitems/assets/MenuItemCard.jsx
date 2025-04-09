const MenuItemCard = (props) => {
    return (  
        <div className="menu-item-card">
            {menuItems.map((menuItem) => (
                <div className="item-preview" key={menuItem.id}>
                    <h4>menuItem.name</h4>
                    <div className="edit-icon"></div>
                    <div className="delete-icon"></div>
                </div>
            ))}
        </div>
    );
}
 
export default MenuItemCard;