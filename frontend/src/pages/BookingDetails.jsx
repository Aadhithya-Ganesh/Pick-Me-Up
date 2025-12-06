import { ArrowLeft, CheckCircle, Clock, Check, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import DriverInformationCard from "../components/DriverInformationCard";
import TripInformationCard from "../components/TripInformationCard";
import CancelBookingModal from "../components/CancelBookingModal";

function BookingDetails() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const trip = {
    status: 'pending',
    origin: {
      city: 'New York, NY',
      address: 'adad'
    },
    destination: {
      city: 'Boston, MA',
      address: 'dada'
    },
    date: '2024-12-20',
    time: '08:00 AM',
    seats: 1,
    price: 25,
    vehicle: 'Toyota Camry (Silver)'
  };

  const driver = {
    name: 'Sarah Johnson',
    memberSince: '2021',
    phone: '+1 234 567 8901',
    email: 'sarah.j@email.com'
  };

  const getStatusConfig = (status) => {
    const configs = {
      pending: {
        icon: Clock,
        text: 'Pending',
        bgColor: 'bg-yellow-100',
        textColor: 'text-yellow-700',
        iconColor: 'text-yellow-700'
      },
      confirmed: {
        icon: CheckCircle,
        text: 'Confirmed',
        bgColor: 'bg-green-100',
        textColor: 'text-green-600',
        iconColor: 'text-green-600'
      },
      completed: {
        icon: Check,
        text: 'Completed',
        bgColor: 'bg-blue-100',
        textColor: 'text-blue-600',
        iconColor: 'text-blue-600'
      },
      cancelled: {
        icon: XCircle,
        text: 'Cancelled',
        bgColor: 'bg-red-100',
        textColor: 'text-red-600',
        iconColor: 'text-red-600'
      }
    };
    return configs[status] || configs.pending;
  };

  const statusConfig = getStatusConfig(trip.status);
  const StatusIcon = statusConfig.icon;

  const handleCancelClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmCancel = () => {
    console.log('Booking cancelled');
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-6 font-medium transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-4xl font-bold text-gray-900">Booking Details</h1>
          
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${statusConfig.bgColor}`}>
            <StatusIcon className={`w-5 h-5 ${statusConfig.iconColor}`} />
            <span className={`font-semibold ${statusConfig.textColor}`}>
              {statusConfig.text}
            </span>
          </div>
        </div>

        <div className="mb-6">
          <TripInformationCard trip={trip} />
        </div>

        <div className="mb-6">
          <DriverInformationCard driver={driver} />
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <button 
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200"
            onClick={handleCancelClick}
          >
            Cancel Booking
          </button>
        </div>
      </div>

      <CancelBookingModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmCancel}
      />
    </div>
  );
}

export default BookingDetails;