import axios from "axios";
import { useEffect, useState } from "react";
import MaleUser from "../assets/MaleUser.png";
import FemaleUser from "../assets/FemaleUser.png";
import User from "../assets/User.png";
import EditProfileModal from "../components/EditProfileModal";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    axios.get(`http://localhost/api/users/me`, {
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
  <>
    <div className="min-h-screen flex justify-center items-start pt-20 bg-gradient-to-br from-yellow-50 via-white to-yellow-100">
        <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-xl p-10">
          <div className="absolute -top-14 left-1/2 -translate-x-1/2">
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

          <div className="mt-16 bg-gray-50 rounded-xl text-center">
            <h2 className="text-3xl font-bold text-gray-800">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-gray-500 mt-1">{user.email}</p>
          </div>

        <div className="mt-6 flex justify-center">
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            <p className="text-sm text-gray-600">
              Joined on <span className="font-semibold">{formattedDate}</span>
            </p>
          </div>
        </div>

          <div className="mt-6 space-y-3">
            <InfoRow label="User ID" value={user.id} />
            <InfoRow label="Gender" value={user.gender || "—"} />
            <InfoRow label="Phone" value={user.phone || "—"} />
          </div>
          <button
            onClick={() => setShowEdit(true)}
            className="mt-6 w-full bg-gray-900 hover:bg-green-800 text-white py-3 rounded-xl font-semibold transition"
          >
            Edit Profile
          </button>
        </div>
      </div>

    {showEdit && (
          <EditProfileModal
            user={user}
            onClose={() => setShowEdit(false)}
            onUpdated={(updatedUser) => {
              setUser(updatedUser);
              setShowEdit(false);
            }}
          />
        )}
    </>
  );
}
function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between items-center border-b pb-2">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium text-gray-800">{value}</span>
    </div>
  );
}