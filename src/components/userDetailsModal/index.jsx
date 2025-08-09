// src/components/auth/UserDetailsModal.jsx
import React, { useState } from 'react';

const UserDetailsModal = ({ onSave }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ firstName, lastName, phone });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-lg">
        <h3 className="text-xl font-bold mb-4">Complete Your Profile</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="First Name"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full border p-3 rounded-lg"
          />
          <input
            type="text"
            placeholder="Last Name"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full border p-3 rounded-lg"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border p-3 rounded-lg"
          />
          <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserDetailsModal;
