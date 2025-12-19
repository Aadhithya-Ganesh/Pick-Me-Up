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
      "http://localhost/api/users/me",
      form,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    localStorage.setItem(
        "username",
        res.data.firstName + " " + res.data.lastName
      );
      localStorage.setItem("gender", res.data.gender);

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

    await axios.delete("http://localhost/api/users/delete", {
      headers: { Authorization: `Bearer ${token}` }
    });

    localStorage.clear();
    navigate("/login");
  };

return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center pt-24 z-50">
      <div className="bg-white rounded-3xl w-full max-w-md p-6 space-y-4 max-h-[85vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Edit Profile
        </h2>
        <div className="space-y-4">
          <Input label="First Name" name="firstName" value={form.firstName} onChange={handleChange} />
          <Input label="Last Name" name="lastName" value={form.lastName} onChange={handleChange} />
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-yellow-400"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Not Prefer to Say">Not Prefer to Say</option>
          </select>

          <Input label="Phone" name="phone" value={form.phone} onChange={handleChange} />
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleUpdate}
            className="flex-1 bg-primary hover:bg-yellow-400 text-white py-3 rounded-xl font-semibold transition"
          >
            Save Changes
          </button>
          <button
            onClick={onClose}
            className="flex-1 border py-3 rounded-xl font-semibold hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
        <div className="pt-4 border-t">
          <button
            onClick={handleDelete}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold"
          >
            Delete My Account
          </button>
        </div>
      </div>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="text-sm text-gray-600">{label}</label>
      <input
        {...props}
        className="w-full mt-1 border rounded-xl p-3 focus:ring-2 focus:ring-yellow-400"
      />
    </div>
  );
}