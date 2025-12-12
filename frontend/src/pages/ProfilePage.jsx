import axios from "axios";
import { useEffect, useState } from "react";
import MaleUser from "../assets/MaleUser.png";
import FemaleUser from "../assets/FemaleUser.png";
import User from "../assets/User.png";
import { UserCircle, Mail, Phone, Calendar } from "lucide-react";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    axios.get("http://localhost:8000/users/me", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => setUser(res.data))
    .catch(err => console.error(err));
  }, [token]);

  if (!token) return <p>Please login first.</p>;

  if (!user) {
    return (
      <div className="flex justify-center items-center h-64 text-lg font-semibold">
        Loading profile...
      </div>
    );
  }
  const formattedDate = new Date(user.created_at).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  return (
  <div className="w-full flex justify-center py-20 bg-gradient-to-r from-yellow-50 to-white">
    <div className="backdrop-blur-xl bg-white/50 border border-white/40 shadow-xl rounded-3xl p-10 max-w-lg w-full">

      <div className="flex justify-center">
        <img
          src={
            user.gender === "Male"
              ? MaleUser
              : user.gender === "Female"
              ? FemaleUser
              : User
          }
          alt="avatar"
          className="w-24 h-24 rounded-full border-2 border-gray-300 shadow-lg"
        />
      </div>

      <h2 className="text-3xl font-bold text-center mt-4">
        {user.firstName} {user.lastName}
      </h2>

      <p className="text-center text-gray-700">{user.email}</p>

      <div className="text-center mt-3">
        <p className="text-lg font-semibold text-primary">
          Member Since: {formattedDate}
        </p>
      </div>

      <div className="mt-6 space-y-3">
        <p><strong>User ID:</strong> {user.id}</p>
        <p><strong>Gender:</strong> {user.gender}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
      </div>




    </div>
  </div>
);

}
