"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { User } from "@/types/User";
import { fetchUserById } from "@/utils/fetchUsers";

export default function UserDetailsPage() {
  const params = useParams();
  const userId = params.id;

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      const data = await fetchUserById(userId);
      setUser(data);
      setLoading(false);
    };
    getUser();
  }, [userId]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!user) return <p className="text-center mt-10">User not found</p>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md mt-6"
    >
      <Link
        href="/users"
        className="text-blue-500 hover:underline mb-4 inline-block"
      >
        &larr; Back to Users
      </Link>

      <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
      <p className="text-gray-600 mb-1">
        <strong>Username:</strong> {user.username}
      </p>
      <p className="text-gray-600 mb-1">
        <strong>Email:</strong> {user.email}
      </p>
      <p className="text-gray-600 mb-1">
        <strong>Phone:</strong> {user.phone}
      </p>
      <p className="text-gray-600 mb-1">
        <strong>Website:</strong>{" "}
        <a href={`https://${user.website}`} target="_blank" className="text-blue-500 hover:underline">
          {user.website}
        </a>
      </p>

      <div className="mt-4">
        <h3 className="font-semibold">Address</h3>
        <p>
          {user.address.street}, {user.address.suite}, {user.address.city},{" "}
          {user.address.zipcode}
        </p>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold">Company</h3>
        <p>{user.company.name}</p>
        <p className="text-gray-600">{user.company.catchPhrase}</p>
        <p className="text-gray-600">{user.company.bs}</p>
      </div>
    </motion.div>
  );
}
