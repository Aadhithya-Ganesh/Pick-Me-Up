import { Phone, Mail } from 'lucide-react';

const DriverInformationCard = ({ driver }) => {
  const getInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : '?';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Driver Information</h2>

      <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
        <div 
          className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold"
          style={{ backgroundColor: '#ffca20' }}
        >
          {getInitials(driver.name)}
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900">{driver.name}</h3>
          <p className="text-gray-500 text-sm">Member since {driver.memberSince}</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Phone className="w-5 h-5 text-gray-400" />
          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p className="text-gray-900 font-medium">{driver.phone}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Mail className="w-5 h-5 text-gray-400" />
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-gray-900 font-medium">{driver.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

DriverInformationCard.defaultProps = {
  driver: {
    name: 'Sarah Johnson',
    memberSince: '2021',
    phone: '+1 234 567 8901',
    email: 'sarah.j@email.com'
  }
};

export default DriverInformationCard;