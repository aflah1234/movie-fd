import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CheckCircle, Calendar, Clock, MapPin, Users, CreditCard, Printer, Home, List } from "lucide-react";

const BookingSuccess = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [seconds, setSeconds] = useState(10);

  // Debug logging to verify new UI is loading
  console.log("🎉 NEW BOOKING SUCCESS UI LOADED - v2024.12.24");
  console.log("✨ Modern success theme active");

  const bookingDetails = state?.booking;

  useEffect(() => {
    if (!bookingDetails) {
      navigate("/user/bookings");
      return;
    }

    const timeout = setTimeout(() => {
      navigate("/user/bookings");
    }, 10000);

    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [navigate, bookingDetails]);

  if (!bookingDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
        <div className="loading loading-spinner loading-lg text-purple-400"></div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 text-white p-4 sm:p-6 lg:p-8"
      style={{
        background: 'linear-gradient(135deg, #064e3b 0%, #0f766e 50%, #155e75 100%)',
        minHeight: '100vh',
        color: 'white'
      }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={48} className="text-white" />
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            Booking Confirmed!
          </h1>
          
          <p className="text-xl text-gray-300 mb-2">
            Your seats have been successfully reserved
          </p>
          <p className="text-gray-400">
            Redirecting to bookings in {seconds} seconds...
          </p>
        </div>

        {/* Vintage Cinema Ticket */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="bg-white rounded-lg shadow-2xl overflow-hidden border-2 border-gray-300 ticket-print">
            <div className="flex">
              {/* Main Ticket Section */}
              <div className="bg-white text-black p-6 flex-1 relative">
                {/* Perforated Edge */}
                <div className="absolute right-0 top-0 bottom-0 w-4">
                  <div className="h-full flex flex-col justify-between py-2">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div key={i} className="w-2 h-2 bg-gray-400 rounded-full mx-auto"></div>
                    ))}
                  </div>
                </div>
                
                {/* Header with Film Strip Design */}
                <div className="mb-4 flex items-start justify-between pr-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">🎬</span>
                      <div>
                        <h2 className="text-xl font-bold tracking-wider text-black">CINEMA</h2>
                        <h3 className="text-lg font-bold tracking-wider text-black">TICKET</h3>
                      </div>
                      {/* Visual indicator for new design */}
                      <div className="ml-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">
                        NEW v2024
                      </div>
                    </div>
                    <p className="text-sm font-semibold tracking-wider text-gray-600">ADMIT ONE</p>
                  </div>
                  
                  {/* Film Strip Design */}
                  <div className="text-right">
                    <div className="relative">
                      {/* Film Strip */}
                      <div className="w-16 h-12 bg-gray-800 rounded-sm relative overflow-hidden">
                        {/* Film holes */}
                        <div className="absolute left-1 top-1 w-2 h-2 bg-white rounded-full"></div>
                        <div className="absolute left-1 bottom-1 w-2 h-2 bg-white rounded-full"></div>
                        <div className="absolute right-1 top-1 w-2 h-2 bg-white rounded-full"></div>
                        <div className="absolute right-1 bottom-1 w-2 h-2 bg-white rounded-full"></div>
                        {/* Film frames */}
                        <div className="absolute inset-2 border border-white opacity-50"></div>
                        <div className="absolute left-1/2 top-2 bottom-2 w-px bg-white opacity-30"></div>
                      </div>
                      {/* Movie Camera */}
                      <div className="mt-1 flex justify-center">
                        <div className="w-8 h-6 bg-black rounded-sm relative">
                          <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-2 h-3 bg-black rounded-full"></div>
                          <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-1 h-1 bg-black rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Movie Details */}
                <div className="space-y-3 pr-6">
                  <div className="border-b border-gray-300 pb-2">
                    <h4 className="text-lg font-bold text-black uppercase tracking-wide">{bookingDetails.movieName}</h4>
                    <p className="text-gray-600 text-sm font-medium">{bookingDetails.theaterName}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500 uppercase text-xs font-semibold tracking-wide">DATE</p>
                      <p className="font-bold text-black">{bookingDetails.showDate}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 uppercase text-xs font-semibold tracking-wide">TIME</p>
                      <p className="font-bold text-black">{bookingDetails.showTime}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 uppercase text-xs font-semibold tracking-wide">SEATS</p>
                      <p className="font-bold text-black">{bookingDetails.selectedSeats.join(', ')}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 uppercase text-xs font-semibold tracking-wide">PRICE</p>
                      <p className="font-bold text-black text-lg">₹{bookingDetails.totalPrice}</p>
                    </div>
                  </div>

                  <div className="border-t border-gray-300 pt-3 flex justify-between items-center">
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-semibold tracking-wide">STATUS</p>
                      <p className="font-bold text-green-600">{bookingDetails.status.toUpperCase()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 uppercase font-semibold tracking-wide">TICKET ID</p>
                      <p className="font-mono text-xs text-black">{bookingDetails.bookingId.slice(-8)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Barcode Section */}
              <div className="bg-white text-black p-4 w-20 flex flex-col items-center justify-between border-l-2 border-dashed border-gray-400">
                {/* Barcode */}
                <div className="transform rotate-90 flex-1 flex items-center">
                  <div className="flex gap-px">
                    {Array.from({ length: 30 }).map((_, i) => (
                      <div
                        key={i}
                        className="bg-black"
                        style={{
                          width: Math.random() > 0.5 ? '2px' : '1px',
                          height: '45px'
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
                
                {/* Ticket Number */}
                <div className="text-center">
                  <p className="text-xs font-mono text-black transform -rotate-90 whitespace-nowrap">
                    {bookingDetails.bookingId.slice(-6)}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Footer */}
            <div className="bg-gray-100 px-6 py-2 border-t border-gray-300">
              <div className="flex justify-between items-center text-xs text-gray-600">
                <span className="font-semibold">🎬 CINEBOOK THEATERS</span>
                <span>Present this ticket at entrance</span>
                <span className="font-mono">{new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => window.print()}
            className="flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <Printer size={20} />
            Print Ticket
          </button>
          
          <button
            onClick={() => navigate("/user/bookings")}
            className="flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <List size={20} />
            View All Bookings
          </button>
          
          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <Home size={20} />
            Back to Home
          </button>
        </div>
      </div>

      <style jsx>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .ticket-print, .ticket-print * {
            visibility: visible;
          }
          .ticket-print {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            background: white !important;
            color: black !important;
          }
          .bg-white {
            background-color: white !important;
          }
          .bg-gray-100 {
            background-color: #f3f4f6 !important;
          }
          .bg-black {
            background-color: black !important;
          }
          .text-black {
            color: black !important;
          }
          .border-gray-300 {
            border-color: #d1d5db !important;
          }
          .border-gray-400 {
            border-color: #9ca3af !important;
          }
        }
      `}</style>
    </div>
  );
};

export default BookingSuccess;