# Menu Items Module

Manages individual menu items, including creation, editing, and dietary tagging.

---

## **Table of Contents**

- **Features**
- **API Integration**
- **State Management**
- **Error Handling**
- **Styling**
- **Dependencies**

---

## **Features**

| **Feature** | **Description** | **Component** | **File** |
| --- | --- | --- | --- |
| **Item Creation** | Add new menu items with allergens/diets | **`AddMenuItemForm`** | **`AddMenuItem.jsx`** |
| **Item Editing** | Modify name/description/ingredients | **`MenuItemPanel`** | **`MenuItemPanel.jsx`** |
| **Allergen Tagging** | Track allergens per item | **`AllergenList`** | **`AllergenList.jsx`** |
| **Menu Assignment** | Assign items to multiple menus | **`MenuItemPicklist`** | **`MenuItemSwap.jsx`** |
| **Search & Filter** | Filter items by name | **`MenuItemsPage`** | **`MenuItemsPage.jsx`** |

---

## **API Integration**

### **Endpoints**

| **Endpoint** | **Method** | **Payload** | **Called In** | **File** |
| --- | --- | --- | --- | --- |
| **`/api/menuitems/add-menu-item`** | **`POST`** | **`{ name, description, allergens, menuIDs }`** | **`handleSave()`** | **`AddMenuItem.jsx`** |
| **`/api/menuitems/:id`** | **`PUT`** | **`{ name, description, ingredients }`** | **`handleSave()`** | **`MenuItemPanel.jsx`** |
| **`/api/menuitems/:id`** | **`DELETE`** | None | **`handleConfirmDelete()`** | **`MenuItemPanel.jsx`** |
| **`/api/menuitems/menuswap-items`** | **`GET`** | **`masterMenuID`** | **`fetchData()`** | **`MenuItemSwap.jsx`** |

---

## **State Management**

| **State Variable** | **Type** | **Component** | **Purpose** |
| --- | --- | --- | --- |
| **`menuItems`** | **`Array`** | **`MenuItemsPage.jsx`** | Stores items for current menu |
| **`selectedAllergens`** | **`Array`** | **`AddMenuItemForm.jsx`** | Tracks allergens for new items |
| **`searchTerm`** | **`string`** | **`MenuItemsPage.jsx`** | Filters items by name |
| **`selectedKeys`** | **`Set`** | **`MenuItemPicklist.jsx`** | Tracks items for menu swapping |

---

## **Error Handling**

| **Scenario** | **Handling Method** | **File** |
| --- | --- | --- |
| API Failures | **`alert()`** + console.error | **`MenuItemPanel.jsx`** |
| Empty Results | Displays "No items found" | **`MenuItemSwap.jsx`** |

---

## **Styling**

| **File** | **Key Styles** | **Components Affected** |
| --- | --- | --- |
| **`picklist.scss`** | Dual-panel layout | **`MenuItemSwap.jsx`** |
| **`styles.css`** | Base styles for item cards | **`MenuItemPanel.jsx`, `AddMenuItem.jsx`, `MenuItemsPage.jsx`** |
| **`MenuDashboard.css`** | Grid layouts | **`MenuDashboard.jsx`** |

---

## **Dependencies**

| **Dependency** | **Purpose** |
| --- | --- |
| **`react-icons`** | Edit/delete icons |
| **`axios`** | API calls for CRUD operations |
| **`react-router-dom`** | Navigation between pages |