import { MapPin, Calendar, Clock, Users, DollarSign, Car, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const TripInformationCard = ({ trip }) => {
  const getStatusConfig = (status) => {
    const configs = {
      confirmed: {
        icon: CheckCircle,
        text: 'Confirmed',
        bgColor: 'bg-green-50',
        textColor: 'text-green-600',
        iconColor: 'text-green-600'
      },
      pending: {
        icon: AlertCircle,
        text: 'Pending',
        bgColor: 'bg-yellow-50',
        textColor: 'text-yellow-600',
        iconColor: 'text-yellow-600'
      },
      cancelled: {
        icon: XCircle,
        text: 'Cancelled',
        bgColor: 'bg-red-50',
        textColor: 'text-red-600',
        iconColor: 'text-red-600'
      }
    };
    return configs[status] || configs.pending;
  };

  const statusConfig = getStatusConfig(trip.status);
  const StatusIcon = statusConfig.icon;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Trip Information</h2>

      <div className="mb-6">
        <div className="flex items-start gap-3 mb-2">
          <MapPin color="#ffca20" className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-bold text-gray-900">{trip.origin.city}</h3>
            <p className="text-gray-500 text-sm">{trip.origin.address}</p>
          </div>
        </div>

        <div className="ml-3 border-l-2 border-dashed border-gray-300 h-12"></div>

        <div className="flex items-start gap-3">
          <MapPin className="w-6 h-6 text-gray-400 mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-bold text-gray-900">{trip.destination.city}</h3>
            <p className="text-gray-500 text-sm">{trip.destination.address}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6 pb-6 border-b border-gray-200">
        <div className="flex items-start gap-3">
          <Calendar className="w-6 h-6 text-gray-400 flex-shrink-0" />
          <div>
            <p className="text-sm text-gray-500 mb-1">Date</p>
            <p className="text-base font-semibold text-gray-900">{trip.date}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Clock className="w-6 h-6 text-gray-400 flex-shrink-0" />
          <div>
            <p className="text-sm text-gray-500 mb-1">Time</p>
            <p className="text-base font-semibold text-gray-900">{trip.time}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Users className="w-6 h-6 text-gray-400 flex-shrink-0" />
          <div>
            <p className="text-sm text-gray-500 mb-1">Seats</p>
            <p className="text-base font-semibold text-gray-900">{trip.seats}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <DollarSign className="w-6 h-6 text-gray-400 flex-shrink-0" />
          <div>
            <p className="text-sm text-gray-500 mb-1">Total</p>
            <p className="text-base font-semibold text-gray-900">${trip.price}</p>
          </div>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <Car className="w-6 h-6 text-gray-400 flex-shrink-0" />
        <div>
          <p className="text-sm text-gray-500 mb-1">Vehicle</p>
          <p className="text-base font-semibold text-gray-900">{trip.vehicle}</p>
        </div>
      </div>
    </div>
  );
};

TripInformationCard.defaultProps = {
  trip: {
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
  }
};

export default TripInformationCard;