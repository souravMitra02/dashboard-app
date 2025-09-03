import Link from "next/link";
import { motion } from "framer-motion";
import { User } from "../types/User";

interface Props {
  user: User;
}

export default function UserCard({ user }: Props) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -3 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 cursor-pointer transition"
    >
      <Link href={`/users/${user.id}`}>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
          <p className="text-sm text-gray-500">{user.email}</p>
          <p className="mt-1 text-sm text-gray-600 truncate">
            {user.company.name} • {user.website}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
