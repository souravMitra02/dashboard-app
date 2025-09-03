"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchUsers } from "@/utils/fetchUsers";
import { User } from "@/types/User";
import SearchBar from "@/components/SearchBar";
import Pagination from "@/components/Pagination";
import { FiGrid, FiList } from "react-icons/fi";
import Link from "next/link";

const USERS_PER_PAGE = 8;

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  useEffect(() => {
    const getUsers = async () => {
      const data = await fetchUsers();
      setUsers(data);
    };
    getUsers();
  }, []);

 
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination calculations
  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const startIndex = (currentPage - 1) * USERS_PER_PAGE;
  const currentUsers = filteredUsers.slice(
    startIndex,
    startIndex + USERS_PER_PAGE
  );

  const handlePageChange = (page: number) => setCurrentPage(page);


  const rowVariant = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="p-10 min-h-screen bg-white shadow-xl rounded-xl">
      {/* Header & View Toggle */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Users Dashboard</h1>
        <button
          onClick={() =>
            setViewMode(viewMode === "grid" ? "table" : "grid")
          }
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          {viewMode === "grid" ? <FiList size={20} /> : <FiGrid size={20} />}
        </button>
      </div>

      {/* Search */}
      <SearchBar
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
      />

      {/* Grid View */}
      {viewMode === "grid" && (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.05 } },
          }}
        >
          {currentUsers.length > 0 ? (
            currentUsers.map((user) => (
              <motion.div
                key={user.id}
                variants={rowVariant}
                whileHover={{ scale: 1.03 }}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer border border-gray-100 p-6 flex flex-col justify-between"
                onClick={() => (window.location.href = `/users/${user.id}`)}
              >
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors">
                    {user.name}
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">{user.email}</p>
                </div>

                <div className="flex flex-col gap-1 text-gray-600 text-sm">
                  <p>
                    <span className="font-medium">Phone:</span> {user.phone}
                  </p>
                  <p>
                    <span className="font-medium">Company:</span>{" "}
                    {user.company.name}
                  </p>
                  <p>
                    <span className="font-medium">Website:</span>{" "}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(`https://${user.website}`, "_blank");
                      }}
                      className="text-blue-500 hover:underline"
                    >
                      {user.website}
                    </button>
                  </p>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-center py-8 text-gray-400 col-span-full">
              No users found.
            </p>
          )}
        </motion.div>
      )}

      {/* Table View */}
      {viewMode === "table" && (
        <div className="overflow-x-auto mt-6">
          <table className="min-w-full bg-white border border-gray-200 rounded-xl shadow-lg">
            <thead className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white uppercase text-sm tracking-wider">
              <tr>
                <th className="py-3 px-6">Name</th>
                <th className="py-3 px-6">Email</th>
                <th className="py-3 px-6">Phone</th>
                <th className="py-3 px-6">Company</th>
              </tr>
            </thead>
            <motion.tbody
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
            >
              {currentUsers.length > 0 ? (
                currentUsers.map((user, idx) => (
                  <motion.tr
                    key={user.id}
                    variants={rowVariant}
                    className={`cursor-pointer transition-colors duration-200 text-center ${
                      idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-blue-50`}
                    onClick={() => (window.location.href = `/users/${user.id}`)}
                  >
                    <td className="py-3 px-6">{user.name}</td>
                    <td className="py-3 px-6">{user.email}</td>
                    <td className="py-3 px-6">{user.phone}</td>
                    <td className="py-3 px-6">{user.company.name}</td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-gray-400">
                    No users found.
                  </td>
                </tr>
              )}
            </motion.tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
