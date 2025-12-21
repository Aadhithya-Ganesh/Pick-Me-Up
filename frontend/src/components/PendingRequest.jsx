import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function PendingRequests({ requests }) {
  const [open, setOpen] = useState(false);

  if (!requests || requests.length === 0) return null;

  const handleAccept = async (requestId) => {
    try {
      const res = await fetch(
        `http://localhost/api/rides/requests/${requestId}/accept`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        },
      );

      if (!res.ok) throw new Error("Failed to accept request");

      alert("Request accepted!");
      window.location.reload(); // refresh UI
    } catch (err) {
      console.error(err);
      alert("Error accepting request.");
    }
  };

  const handleReject = async (requestId) => {
    try {
      const res = await fetch(
        `http://localhost/api/rides/requests/${requestId}/reject`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        },
      );

      if (!res.ok) throw new Error("Failed to reject request");

      alert("Request rejected.");
      window.location.reload(); // refresh UI
    } catch (err) {
      console.error(err);
      alert("Error rejecting request.");
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-700";
      case "ACCEPTED":
        return "bg-green-100 text-green-700";
      case "REJECTED":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-200 text-gray-600";
    }
  };

  return (
    <div className="mt-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="text-primary flex w-full items-center justify-between font-semibold hover:text-yellow-500"
      >
        Requests ({requests.length}){open ? <ChevronUp /> : <ChevronDown />}
      </button>

      {open && (
        <div className="mt-4 space-y-3">
          {requests.map((req) => (
            <div key={req.id} className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
              <div>
                <p className="font-semibold">{req.seats} seats requested</p>
                <p className="text-sm text-gray-500">
                  From {req.pickup_location} → {req.dropoff_location}
                </p>
                <span
                  className={`mt-2 inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium ${getStatusStyle(
                    req.status,
                  )}`}
                >
                  {req.status}
                </span>
              </div>

              {req.status === "PENDING" && (
                <div className="flex gap-3">
                  <button
                    onClick={() => handleAccept(req.id)}
                    className="rounded-lg bg-green-500 px-3 py-1 text-white hover:bg-green-600"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleReject(req.id)}
                    className="rounded-lg bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
