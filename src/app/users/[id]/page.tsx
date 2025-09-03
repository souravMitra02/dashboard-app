"use client";

import AOS from 'aos';
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchUserById } from "@/utils/fetchUsers";
import { User } from "@/types/User";
import { motion } from "framer-motion";
import Link from "next/link";
import 'aos/dist/aos.css';
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

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!user) return <p className="text-center mt-10">User not found</p>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white shadow-xl mx-auto p-6 min-h-screen"
    >
      {/* Back button */}
          <div className="flex justify-between">
              <Link
        href="/users"
        className="inline-block px-4 py-2 mb-6 rounded-lg bg-blue-500 text-white hover:bg-gray-200 transition "
      >
        &larr; Back to Users
      </Link>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">User Details</h1>

      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Info */}
       <div
  data-aos="fade-right"
  data-aos-duration="1200"
  className="bg-gray-50 p-6 rounded-lg shadow flex flex-col gap-4"
>
  <h2 className="text-xl  mb-4 font-bold">Personal Information</h2>

  <p className="flex flex-col">
    Name
    <span className="text-xl ">{user.name}</span>
  </p>

  <p className="flex flex-col">
    Username
    <span className="text-xl">@{user.username}</span>
  </p>

  <p className="flex flex-col">
    Email
    <span className="text-xl ">{user.email}</span>
  </p>

  <p className="flex flex-col">
    Phone
    <span className="text-xl ">{user.phone}</span>
  </p>

  <p className="flex flex-col">
    Website
    <span className="text-xl  text-blue-500 hover:underline">
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
  data-aos-duration="1200"
  className="bg-gray-50 p-6 rounded-lg shadow flex flex-col gap-4"
>
  <h2 className="text-xl mb-4 font-bold">Address</h2>

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

      {/* Company */}
      <div
  data-aos="fade-up"
  data-aos-duration="1500"
  className="bg-gray-50 p-6 rounded-lg shadow mt-6"
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

    </motion.div>
  );
}
