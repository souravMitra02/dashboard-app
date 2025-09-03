"use client";

import AOS from "aos";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchUserById } from "@/utils/fetchUsers";
import { User } from "@/types/User";
import { motion } from "framer-motion";
import Link from "next/link";
import "aos/dist/aos.css";

export default function UserDetailsPage() {
  const params = useParams<{ id: string }>();
  const userId = params?.id;

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1200,
      easing: "ease-in-out",
      once: false,
    });
  }, []);

  useEffect(() => {
    if (!userId) return;

    const getUser = async () => {
      setLoading(true);
      try {
        const data = await fetchUserById(userId);
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner text-blue-500 text-4xl"></span>
      </div>
    );
  }

  if (!user) return <p className="text-center mt-10 text-red-500">User not found</p>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-blue-50 p-6"
    >
      <div className="max-w-6xl mx-auto">
        {/* Back Button + Title */}
        <div className="flex items-center  justify-between  md:items-center mb-6 gap-4">
          <Link
            href="/users"
            className="inline-block px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
          >
            &larr; Back to Users
          </Link>
          <h1 className="text-xl lg:text-3xl font-bold text-gray-800">User Details</h1>
        </div>

       
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Info */}
          <div
            data-aos="fade-right"
            className="bg-white p-6 rounded-lg shadow flex flex-col gap-4"
          >
            <h2 className="text-xl font-bold mb-4">Personal Information</h2>
            <p className="flex flex-col">
              Name
              <span className="text-xl">{user.name}</span>
            </p>
            <p className="flex flex-col">
              Username
              <span className="text-xl">@{user.username}</span>
            </p>
            <p className="flex flex-col">
              Email
              <span className="text-xl">{user.email}</span>
            </p>
            <p className="flex flex-col">
              Phone
              <span className="text-xl">{user.phone}</span>
            </p>
            <p className="flex flex-col">
              Website
              <span className="text-xl text-blue-500 hover:underline">
                <a
                  href={`https://${user.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  {user.website}
                </a>
              </span>
            </p>
          </div>

          {/* Address */}
          <div
            data-aos="fade-left"
            className="bg-white p-6 rounded-lg shadow flex flex-col gap-4"
          >
            <h2 className="text-xl font-bold mb-4">Address</h2>
            <p className="flex flex-col">
              Street
              <span className="text-xl">{user?.address?.street}</span>
            </p>
            <p className="flex flex-col">
              Suite
              <span className="text-xl">{user?.address?.suite}</span>
            </p>
            <p className="flex flex-col">
              City
              <span className="text-xl">{user?.address?.city}</span>
            </p>
            <p className="flex flex-col">
              Zipcode
              <span className="text-xl">{user?.address?.zipcode}</span>
            </p>
            <p className="flex flex-col">
              Geo Location
              <span className="text-xl">
                {user?.address?.geo?.lat}, {user?.address?.geo?.lng}
              </span>
            </p>
          </div>
        </div>

        {/* Company Section */}
        <div
          data-aos="fade-up"
          className="bg-white p-6 rounded-lg shadow mt-6"
        >
          <h2 className="text-2xl font-bold mb-4">Company</h2>
          <div className="flex flex-wrap gap-5 justify-between">
            <p className="flex flex-col w-full sm:w-auto">
              Company Name
              <span className="text-xl">{user?.company?.name}</span>
            </p>

            <p className="flex flex-col w-full sm:w-auto mt-2">
              Catch Phrase
              <span className="text-xl">{user?.company?.catchPhrase}</span>
            </p>

            <p className="flex flex-col w-full sm:w-auto mt-2">
              Business
              <span className="text-xl">{user?.company?.bs}</span>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
