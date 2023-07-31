import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [newEmployeeName, setNewEmployeeName] = useState("");
  const [newEmployeePosition, setNewEmployeePosition] = useState("");
  const [newEmployeeEmail, setNewEmployeeEmail] = useState("");
  const [newEmployeePhone, setNewEmployeePhone] = useState("");
  const [newEmployeeAddress, setNewEmployeeAddress] = useState("");

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/employees");
      setEmployees(response.data);
    } catch (error) {
      console.log("Error fetching employees:", error);
    }
  };

  const handleAddEmployee = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/employees", {
        name: newEmployeeName,
        position: newEmployeePosition,
        email: newEmployeeEmail,
        phone: newEmployeePhone,
        address: newEmployeeAddress,
      });
      setEmployees([...employees, response.data]);
      setNewEmployeeName("");
      setNewEmployeePosition("");
      setNewEmployeeEmail("");
      setNewEmployeePhone("");
      setNewEmployeeAddress("");
    } catch (error) {
      console.log("Error adding employee:", error);
    }
  };

  const handleUpdateEmployee = async (id) => {
    try {
      const employeeToUpdate = employees.find(
        (employee) => employee._id === id
      );

      if (!employeeToUpdate) {
        console.log("Employee not found.");
        return;
      }

      setNewEmployeeName(employeeToUpdate.name);
      setNewEmployeePosition(employeeToUpdate.position);
      setNewEmployeeEmail(employeeToUpdate.email);
      setNewEmployeePhone(employeeToUpdate.phone);
      setNewEmployeeAddress(employeeToUpdate.address);

    } catch (error) {
      console.log("Error updating employee:", error);
    }
  };

  const handleSaveUpdate = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/employees/${id}`, {
        name: newEmployeeName,
        position: newEmployeePosition,
        email: newEmployeeEmail,
        phone: newEmployeePhone,
        address: newEmployeeAddress,
      });
      fetchEmployees();
      setNewEmployeeName("");
      setNewEmployeePosition("");
      setNewEmployeeEmail("");
      setNewEmployeePhone("");
      setNewEmployeeAddress("");
    } catch (error) {
      console.log("Error updating employee:", error);
    }
  };

  const handleDeleteEmployee = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/employees/${id}`);
      fetchEmployees();
    } catch (error) {
      console.log("Error deleting employee:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Employee Management Dashboard</h2>
      <div className="add-employee">
        <input
          type="text"
          value={newEmployeeName}
          onChange={(e) => setNewEmployeeName(e.target.value)}
          placeholder="Name"
        />
        <input
          type="text"
          value={newEmployeePosition}
          onChange={(e) => setNewEmployeePosition(e.target.value)}
          placeholder="Position"
        />
        <input
          type="text"
          value={newEmployeeEmail}
          onChange={(e) => setNewEmployeeEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="text"
          value={newEmployeePhone}
          onChange={(e) => setNewEmployeePhone(e.target.value)}
          placeholder="Phone"
        />
        <input
          type="text"
          value={newEmployeeAddress}
          onChange={(e) => setNewEmployeeAddress(e.target.value)}
          placeholder="Address"
        />
        <button onClick={handleAddEmployee}>Add Employee</button>
      </div>
      <table className="employee-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id} className="employee">
              <td>
                <input
                  type="text"
                  value={employee.name}
                  onChange={(e) => handleUpdateEmployee(employee._id)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={employee.position}
                  onChange={(e) => handleUpdateEmployee(employee._id)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={employee.email}
                  onChange={(e) => handleUpdateEmployee(employee._id)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={employee.phone}
                  onChange={(e) => handleUpdateEmployee(employee._id)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={employee.address}
                  onChange={(e) => handleUpdateEmployee(employee._id)}
                />
              </td>
              <td>
                <button className="btn-update" onClick={() => handleSaveUpdate(employee._id)}>
                  Update
                </button>
                <button onClick={() => handleDeleteEmployee(employee._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
