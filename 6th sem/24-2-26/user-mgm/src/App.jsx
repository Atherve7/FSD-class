import React, { useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    contact: "",
    email: "",
    address: "",
    company: "",
    designation: ""
  });
  const [editIndex, setEditIndex] = useState(null);
  const [searchId, setSearchId] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddUser = () => {
    if (!formData.id || !formData.name) {
      alert("ID and Name are required");
      return;
    }

    if (editIndex !== null) {
      const updatedUsers = [...users];
      updatedUsers[editIndex] = formData;
      setUsers(updatedUsers);
      setEditIndex(null);
    } else {
      setUsers([...users, formData]);
    }

    setFormData({
      id: "",
      name: "",
      contact: "",
      email: "",
      address: "",
      company: "",
      designation: ""
    });
  };

  const handleEdit = (index) => {
    setFormData(users[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
  };

  const filteredUsers = searchId
    ? users.filter((user) => user.id.includes(searchId))
    : users;

  return (
    <div className="container">
      <h2>User Management System</h2>

      <div className="form-section">
        <input name="id" placeholder="ID" value={formData.id} onChange={handleChange} />
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
        <input name="contact" placeholder="Contact" value={formData.contact} onChange={handleChange} />
        <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
        <input name="company" placeholder="Company" value={formData.company} onChange={handleChange} />
        <input name="designation" placeholder="Designation" value={formData.designation} onChange={handleChange} />

        <button onClick={handleAddUser}>
          {editIndex !== null ? "Update User" : "Add User"}
        </button>
      </div>

      <div className="search-section">
        <input
          placeholder="Search by ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Contact</th>
            <th>Email</th>
            <th>Address</th>
            <th>Company</th>
            <th>Designation</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <tr key={index}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.contact}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td>{user.company}</td>
                <td>{user.designation}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(index)}>
                    Edit
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(index)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No Users Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;