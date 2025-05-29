'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditUserPage() {
  const router = useRouter();
  const params = useParams();
  const userId = params.id;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    status: 'Active',
  });

  useEffect(() => {
    // Fetch existing user data
    const fetchUser = async () => {
      const res = await fetch(`https://localhost:7267/api/user/${userId}`);
      const data = await res.json();
      setFormData({
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber || '',
        status: data.status,
      });
    };

    fetchUser();
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://localhost:7267/api/user/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('User updated successfully!');
        router.push('/'); // Go back to list
      } else {
        const error = await response.text();
        alert(`Failed to update user: ${error}`);
      }
    } catch (err) {
      alert(`Error: ${err}`);
    }

  };

  const handleCancel = () => {
    router.push('/');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit User</h1>
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
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
            Save Changes
            </button>
            <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
                Cancel
            </button>
        </div>
      </form>
    </div>
  );
}