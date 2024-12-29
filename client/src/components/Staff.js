import React, { useState } from 'react';

const initialStaff = [
  { id: 1, name: 'John Doe', position: 'Manager', contact: 'john@example.com' },
  { id: 2, name: 'Jane Smith', position: 'Chef', contact: 'jane@example.com' },
  { id: 3, name: 'Bob Johnson', position: 'Waiter', contact: 'bob@example.com' },
];

function Staff() {
  const [staff, setStaff] = useState(initialStaff);
  const [newStaff, setNewStaff] = useState({ name: '', position: '', contact: '' });

  const handleInputChange = (e) => {
    setNewStaff({ ...newStaff, [e.target.name]: e.target.value });
  };

  const handleAddStaff = (e) => {
    e.preventDefault();
    setStaff([...staff, { ...newStaff, id: staff.length + 1 }]);
    setNewStaff({ name: '', position: '', contact: '' });
  };

  return (
    (<div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Staff Management</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Add New Staff</h3>
          <form onSubmit={handleAddStaff}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                name="name"
                value={newStaff.name}
                onChange={handleInputChange}
                required />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="position">
                Position
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="position"
                type="text"
                name="position"
                value={newStaff.position}
                onChange={handleInputChange}
                required />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contact">
                Contact
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="contact"
                type="text"
                name="contact"
                value={newStaff.contact}
                onChange={handleInputChange}
                required />
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit">
              Add Staff
            </button>
          </form>
        </div>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {staff.map((member) => (
                <tr key={member.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{member.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{member.position}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{member.contact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>)
  );
}

export default Staff;

