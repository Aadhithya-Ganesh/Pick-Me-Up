// RETYPE
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EditProfileModal({ user, onClose, onUpdated }) {
  const [form, setForm] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    gender: user.gender || "",
    phone: user.phone || ""
  });

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleUpdate = async () => {
    try {
    const res = await axios.put(
      "http://localhost:8082/api/users/me",
      form,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    localStorage.setItem(
        "userName",
        res.data.firstName + " " + res.data.lastName
      );
      localStorage.setItem("gender", res.data.gender);

      // 🔄 Notify Navbar
      window.dispatchEvent(new Event("storage"));

      onUpdated(res.data);
      onClose();
    } catch (err) {
      console.error("UPDATE FAILED:", err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("This will permanently delete your account. Continue?"))
      return;

    await axios.delete("http://localhost:8082/api/users/delete", {
      headers: { Authorization: `Bearer ${token}` }
    });

    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md space-y-4">

        <h2 className="text-xl font-bold">Edit Profile</h2>

        <input
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="First Name"
        />

        <input
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Last Name"
        />

        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Not Prefer to Say">Not Prefer to Say</option>
        </select>

        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Phone"
        />

        <div className="flex gap-3 pt-4">
          <button
            onClick={handleUpdate}
            className="flex-1 bg-primary text-white py-2 rounded"
          >
            Update
          </button>

          <button
            onClick={onClose}
            className="flex-1 border py-2 rounded"
          >
            Cancel
          </button>
        </div>

        <button
          onClick={handleDelete}
          className="w-full mt-4 bg-red-500 text-white py-2 rounded"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}
