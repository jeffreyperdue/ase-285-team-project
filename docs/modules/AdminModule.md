# Admin Module

Manages user access control, including promoting/demoting admins and removing users.

---

## **Table of Contents**

- Features
- API Integration
- State Management
- Error Handling
- Styling
- Dependencies

---

## **Features**

| **Feature** | **Description** | **Component** |
| --- | --- | --- |
| **User List Fetch** | Fetches all users from the backend  | **`AdminTable`** |
| **Role Management** | Promote/demote users between **`admin`** and **`user`** roles | **`changeAdminStatus()`** |
| **User Removal** | Revoke access to the business | **`removeUserAccess()`** |
| **Real-Time Updates** | Reflects changes after API calls | **`useState`** in **`AdminTable`** |
| **Confirmation Dialogs** | Handles success/error feedback | **`GetConfirmationMessage`**, **`ErrorMessage`** |

---

## **API Integration**

### **Endpoints**

| **Endpoint** | **Method** | **Payload** | **Called In** |
| --- | --- | --- | --- |
| **`/api/admin/get-user-list`** | **`POST`** | None | **`useEffect`** in **`AdminTable`** |
| **`/api/admin/change-admin-status`** | **`POST`** | **`{ action: string, targetEmail: string }`** | **`changeAdminStatus()`** |
| **`/api/admin/remove-user-access`** | **`POST`** | **`{ email: string }`** | **`removeUserAccess()`** |

---

## **State Management**

| **State Variable** | **Type** | **Purpose** |
| --- | --- | --- |
| **`data`** | **`Array<User>`** | Stores user list (**`{ email, status }`**) |
| **`showError`** | **`boolean`** | Toggles error messages |
| **`showConfirmation`** | **`boolean`** | Toggles success messages |

---

## **Error Handling**

- **API Failures**:
    
    ```
    if (!response.ok) {
      setMessage("Error promoting user");
      setShowError(true);
    }
    ```
    
- **Validation**:
    - Ensures **`targetEmail`** exists before API calls.

---

## **8. Styling**

- **`admin.scss`**

---

## **9. Dependencies**

| **Dependency** | **Purpose** |
| --- | --- |
| **`material-react-table`** | Interactive user table |
| **`react-router-dom`** | Navigation after actions |
| **`@mui/material`** | UI components (Table, Buttons) |