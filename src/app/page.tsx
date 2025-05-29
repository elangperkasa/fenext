'use client';

import Link from 'next/link';
// import router from 'next/router';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  status: string;
}

export default function HomePage() {
  const [users, setUsers] = useState<User[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('https://localhost:7267/api/User/');
        if (!res.ok) throw new Error('Failed to fetch users');
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
      const res = await fetch(`https://localhost:7267/api/user/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        alert('User deleted successfully!');
        setUsers((prev) => prev.filter((user) => user.id !== id));
      } else {
        const error = await res.text();
        alert(`Failed to delete user: ${error}`);
      }
    } catch (err) {
      alert(`Error: ${err}`);
    }
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <Link href="/users/new">
          <button className="cursor-pointer bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            + Add New
          </button>
        </Link>
       <div className="px-4 py-2"></div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">No.</th> 
              {/* <th className="px-4 py-2 border">ID</th> */}
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Phone Number</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id} className="text-center hover:bg-gray-50">
                <td className="px-4 py-2 border">{index + 1}</td> 
                {/* <td className="px-4 py-2 border">{user.id}</td> */}
                <td className="px-4 py-2 border">{user.name}</td>
                <td className="px-4 py-2 border">{user.email}</td>
                <td className="px-4 py-2 border">{user.phoneNumber || '-'}</td>
                <td className={`px-4 py-2 border ${user.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
                  {user.status}
                </td>
                <td className="px-4 py-2 border " >
                  <div className='flex justify-center space-x-2'>
                      <button
                          onClick={() => router.push(`/users/${user.id}/edit`)}
                          className="cursor-pointer bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                          >
                          Edit
                      </button>
                      <button
                          onClick={() => handleDelete(user.id)}
                          className="cursor-pointer bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                          >
                          Delete
                      </button>
                      </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}