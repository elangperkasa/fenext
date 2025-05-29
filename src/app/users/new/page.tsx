'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewUserPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
    status: 'Active',
  });

   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

   const handleCancel = () => {
    router.push('/users/view');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
          const token = localStorage.getItem('token');
          if (token) {
              console.log('Token:', token);
          } else {
              console.log('No token found');
          }
          
        const response = await fetch('https://localhost:7267/api/User/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`},
          body: JSON.stringify(formData),
        });


      if (response.ok) {
        alert('User created successfully!');
        router.push('/users/view'); // navigate back to list
      } else {
        const error = await response.text();
        alert(`Failed to create user: ${error}`);
      }
    } catch (err) {
      alert(`Error: ${err}`);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add New User</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
         <input
          name="name"
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          name="phoneNumber"
          type="text"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <div className="flex gap-4 mt-4">
          <button
            type="submit"
            className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
          <button
              type="button"
              onClick={handleCancel}
              className="cursor-pointer bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
              Cancel
        </button>
        </div>
      </form>
    </div>
  );
}
