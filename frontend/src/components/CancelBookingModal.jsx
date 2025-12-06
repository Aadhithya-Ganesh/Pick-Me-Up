const CancelBookingModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 z-40"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        onClick={onClose}
      ></div>

      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Are you sure?
          </h2>

          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            This action cannot be undone. Your booking will be cancelled and you'll need to make a new booking if you change your mind.
          </p>

          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 bg-white text-gray-900 font-semibold py-4 px-6 rounded-xl border-2 border-blue-500 hover:bg-blue-50 transition-colors duration-200"
            >
              Keep Booking
            </button>

            <button
              onClick={onConfirm}
              className="flex-1 bg-red-500 text-white font-semibold py-4 px-6 rounded-xl hover:bg-red-600 transition-colors duration-200"
            >
              Cancel Booking
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CancelBookingModal;