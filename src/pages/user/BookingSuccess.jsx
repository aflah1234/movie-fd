import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CheckCircle, Download, Printer, Home, List } from "lucide-react";

const BookingSuccess = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [seconds, setSeconds] = useState(10);

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

  const downloadTicket = async () => {
    try {
      const ticketElement = document.querySelector('.ticket-print');
      if (!ticketElement) {
        alert('Ticket not found. Please try again.');
        return;
      }

      // Dynamically import html2canvas
      const html2canvas = (await import('html2canvas')).default;
      
      // Create canvas from ticket element
      const canvas = await html2canvas(ticketElement, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
      });

      // Convert canvas to blob and download
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        const fileName = `cinema-ticket-${bookingDetails.movieName.replace(/\s+/g, '-')}-${bookingDetails.bookingId.slice(-8)}.png`;
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 'image/png');

    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please try the print option instead.');
    }
  };

  if (!bookingDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 flex items-center justify-center p-4">
        <div className="loading loading-spinner loading-lg text-emerald-400"></div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 text-white p-4 sm:p-6 lg:p-8"
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
        <div className="max-w-3xl mx-auto mb-8 ticket-print">
          <div 
            className="bg-white rounded-lg shadow-2xl overflow-hidden relative"
            style={{
              clipPath: 'polygon(0 0, 2% 3%, 4% 0, 6% 3%, 8% 0, 10% 3%, 12% 0, 14% 3%, 16% 0, 18% 3%, 20% 0, 22% 3%, 24% 0, 26% 3%, 28% 0, 30% 3%, 32% 0, 34% 3%, 36% 0, 38% 3%, 40% 0, 42% 3%, 44% 0, 46% 3%, 48% 0, 50% 3%, 52% 0, 54% 3%, 56% 0, 58% 3%, 60% 0, 62% 3%, 64% 0, 66% 3%, 68% 0, 70% 3%, 72% 0, 74% 3%, 76% 0, 78% 3%, 80% 0, 82% 3%, 84% 0, 86% 3%, 88% 0, 90% 3%, 92% 0, 94% 3%, 96% 0, 98% 3%, 100% 0, 100% 100%, 98% 97%, 96% 100%, 94% 97%, 92% 100%, 90% 97%, 88% 100%, 86% 97%, 84% 100%, 82% 97%, 80% 100%, 78% 97%, 76% 100%, 74% 97%, 72% 100%, 70% 97%, 68% 100%, 66% 97%, 64% 100%, 62% 97%, 60% 100%, 58% 97%, 56% 100%, 54% 97%, 52% 100%, 50% 97%, 48% 100%, 46% 97%, 44% 100%, 42% 97%, 40% 100%, 38% 97%, 36% 100%, 34% 97%, 32% 100%, 30% 97%, 28% 100%, 26% 97%, 24% 100%, 22% 97%, 20% 100%, 18% 97%, 16% 100%, 14% 97%, 12% 100%, 10% 97%, 8% 100%, 6% 97%, 4% 100%, 2% 97%, 0 100%)'
            }}
          >
            
            {/* Top Section */}
            <div className="bg-gradient-to-r from-gray-100 to-gray-50 p-6 border-b-2 border-dashed border-gray-400">
              <div className="flex items-center justify-between">
                {/* Left: Cinema Ticket Text */}
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="flex items-center gap-1 mb-1">
                      <span className="text-2xl">⭐</span>
                      <span className="text-2xl">⭐</span>
                      <span className="text-2xl">⭐</span>
                    </div>
                    <h3 className="text-2xl font-bold tracking-widest text-gray-800">CINEMA</h3>
                    <p className="text-lg font-bold tracking-widest text-gray-700">TICKET</p>
                  </div>
                  
                  {/* Barcode */}
                  <div className="ml-4">
                    <svg width="120" height="60" viewBox="0 0 120 60">
                      {Array.from({ length: 30 }).map((_, i) => (
                        <rect
                          key={i}
                          x={i * 4}
                          y="10"
                          width={Math.random() > 0.5 ? 3 : 2}
                          height="40"
                          fill="black"
                        />
                      ))}
                    </svg>
                  </div>
                </div>

                {/* Right: Film Strip & Cinema Ticket */}
                <div className="text-right">
                  <div className="flex items-center gap-3 mb-2">
                    {/* Film Strip */}
                    <div className="relative">
                      <svg width="100" height="60" viewBox="0 0 100 60">
                        <rect x="0" y="0" width="100" height="60" fill="#333" rx="3"/>
                        <circle cx="10" cy="10" r="3" fill="white"/>
                        <circle cx="10" cy="50" r="3" fill="white"/>
                        <circle cx="90" cy="10" r="3" fill="white"/>
                        <circle cx="90" cy="50" r="3" fill="white"/>
                        <rect x="20" y="10" width="20" height="40" fill="white" opacity="0.3"/>
                        <rect x="45" y="10" width="20" height="40" fill="white" opacity="0.3"/>
                        <rect x="70" y="10" width="10" height="40" fill="white" opacity="0.3"/>
                      </svg>
                    </div>
                    
                    {/* Movie Camera */}
                    <div>
                      <svg width="60" height="50" viewBox="0 0 60 50">
                        <rect x="10" y="15" width="30" height="20" fill="#333" rx="2"/>
                        <circle cx="25" cy="25" r="8" fill="#555"/>
                        <circle cx="25" cy="25" r="5" fill="#777"/>
                        <circle cx="45" cy="15" r="8" fill="#333"/>
                        <circle cx="45" cy="15" r="5" fill="#555"/>
                        <circle cx="50" cy="35" r="6" fill="#333"/>
                        <circle cx="50" cy="35" r="4" fill="#555"/>
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold tracking-widest text-gray-800">CINEMA TICKET</h3>
                  <p className="text-xs tracking-wider text-gray-600">ADMIT ONE</p>
                </div>
              </div>
            </div>

            {/* Bottom Section - Dark Header */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🎬</span>
                  <span className="text-white font-bold tracking-wider text-lg">MR. CINEBOOK</span>
                </div>
                <h2 className="text-white font-bold tracking-widest text-2xl">MOVIE TICKET</h2>
              </div>
            </div>

            {/* Main Content */}
            <div className="bg-white p-6">
              <div className="flex gap-6">
                {/* Left Side - Icons */}
                <div className="flex flex-col items-center justify-center gap-4 border-r-2 border-dashed border-gray-300 pr-6">
                  {/* Seat Icon */}
                  <div className="text-center">
                    <svg width="50" height="50" viewBox="0 0 50 50" className="mx-auto mb-1">
                      <rect x="10" y="20" width="30" height="20" fill="#333" rx="3"/>
                      <rect x="8" y="18" width="5" height="25" fill="#333" rx="2"/>
                      <rect x="37" y="18" width="5" height="25" fill="#333" rx="2"/>
                      <rect x="15" y="15" width="20" height="8" fill="#555" rx="4"/>
                    </svg>
                    <p className="text-xs font-bold text-gray-700">AUDITORIUM</p>
                    <p className="text-lg font-bold text-gray-900">SEAT: {bookingDetails.selectedSeats.join(', ')}</p>
                  </div>

                  {/* Date/Time */}
                  <div className="text-center text-xs text-gray-600">
                    <p className="font-semibold">DATE: {bookingDetails.showDate}</p>
                    <p className="font-semibold">TIME: {bookingDetails.showTime}</p>
                  </div>
                </div>

                {/* Right Side - Details */}
                <div className="flex-1">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-gray-900 mb-1 tracking-wide uppercase">
                      {bookingDetails.movieName}
                    </h3>
                    <p className="text-sm text-gray-600 font-semibold">
                      {bookingDetails.theaterName}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                      <p className="text-gray-500 font-semibold">THEATER:</p>
                      <p className="font-bold text-gray-900">{bookingDetails.theaterName}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 font-semibold">DATE:</p>
                      <p className="font-bold text-gray-900">{bookingDetails.showDate}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 font-semibold">TIME:</p>
                      <p className="font-bold text-gray-900">{bookingDetails.showTime}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 font-semibold">PRICE:</p>
                      <p className="font-bold text-gray-900 text-2xl">₹{bookingDetails.totalPrice}</p>
                    </div>
                  </div>

                  {/* Bottom Info */}
                  <div className="flex items-center justify-between pt-4 border-t-2 border-gray-200">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="text-xs text-gray-500 font-semibold">TICKET ID</p>
                        <p className="font-mono text-sm font-bold text-gray-900">
                          {bookingDetails.bookingId.slice(-8).toUpperCase()}
                        </p>
                      </div>
                      <div className="h-8 w-px bg-gray-300"></div>
                      <div>
                        <p className="text-xs text-green-600 font-bold">✓ PAID VIA</p>
                        <p className="font-bold text-green-600 text-sm">CINEPAY</p>
                      </div>
                    </div>
                    
                    {/* Movie Camera Icon */}
                    <div>
                      <svg width="80" height="60" viewBox="0 0 80 60">
                        <rect x="15" y="20" width="35" height="25" fill="#333" rx="3"/>
                        <circle cx="32" cy="32" r="10" fill="#555"/>
                        <circle cx="32" cy="32" r="6" fill="#777"/>
                        <circle cx="55" cy="20" r="10" fill="#333"/>
                        <circle cx="55" cy="20" r="6" fill="#555"/>
                        <circle cx="62" cy="42" r="8" fill="#333"/>
                        <circle cx="62" cy="42" r="5" fill="#555"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center print:hidden">
          <button
            onClick={downloadTicket}
            className="flex items-center justify-center gap-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <Download size={20} />
            Download Ticket
          </button>
          
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

      <style>{`
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
          }
          .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default BookingSuccess;
