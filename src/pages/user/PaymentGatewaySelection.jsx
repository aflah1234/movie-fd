import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Zap, Shield } from "lucide-react";
import { Button } from "../../components/ui/Buttons";

const PaymentGatewaySelection = () => {
  const { showId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const {
    selectedSeats,
    totalPrice,
    bookingId,
    movieTitle,
    theaterName,
    theaterLocation,
    showTime,
    poster,
  } = state || {};

  if (!selectedSeats || !totalPrice || !bookingId) {
    navigate(`/user/seat-selection/${showId}`);
    return null;
  }

  const handleProceedToPayment = () => {
    const paymentState = {
      selectedSeats,
      totalPrice,
      bookingId,
      movieTitle,
      theaterName,
      theaterLocation,
      showTime,
      poster,
    };

    navigate(`/user/cinepay-payment/${showId}`, { state: paymentState });
  };

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center py-12 px-4 sm:px-8 lg:px-8">
      <div className="bg-base-300 p-8 rounded-xl shadow-lg w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="text-green-500" size={40} />
            <h1 className="text-4xl font-bold text-primary">CinePay</h1>
          </div>
          <p className="text-gray-400">Secure & Fast Payment Gateway</p>
        </div>

        {/* Movie Info Summary */}
        <div className="flex items-center gap-4 mb-8 p-6 bg-base-200 rounded-lg border-2 border-green-500/30">
          <img
            src={poster || "https://via.placeholder.com/100x150?text=No+Poster"}
            alt={`${movieTitle} Poster`}
            className="w-20 h-28 rounded-md object-cover shadow-lg"
            loading="lazy"
          />
          <div className="flex-1">
            <h2 className="text-2xl font-semibold base mb-2">{movieTitle}</h2>
            <p className="text-sm text-gray-400 mb-1">
              <span className="font-medium">Theater:</span> {theaterName}
            </p>
            <p className="text-sm text-gray-400 mb-1">
              <span className="font-medium">Location:</span> {theaterLocation}
            </p>
            <p className="text-sm text-gray-400 mb-2">
              <span className="font-medium">Seats:</span> {selectedSeats.join(", ")}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-gray-400">Total Amount:</span>
              <span className="text-2xl font-bold text-green-500">₹{totalPrice}</span>
            </div>
          </div>
        </div>

        {/* Payment Gateway Card */}
        <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 p-8 rounded-xl border-2 border-green-500/50 mb-6">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="w-24 h-24 bg-green-500/30 rounded-full flex items-center justify-center">
              <Zap size={48} className="text-green-500" />
            </div>
            
            <div>
              <h3 className="text-2xl font-bold base mb-2">Pay with CinePay</h3>
              <p className="text-gray-400 mb-1">
                Fast, Secure & Reliable Payment Processing
              </p>
              <p className="text-sm text-gray-500">
                Your payment information is encrypted and secure
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 w-full text-center">
              <div className="bg-base-300/50 p-3 rounded-lg">
                <Shield className="mx-auto mb-2 text-green-500" size={24} />
                <p className="text-xs text-gray-400">256-bit Encryption</p>
              </div>
              <div className="bg-base-300/50 p-3 rounded-lg">
                <Zap className="mx-auto mb-2 text-green-500" size={24} />
                <p className="text-xs text-gray-400">Instant Processing</p>
              </div>
              <div className="bg-base-300/50 p-3 rounded-lg">
                <Shield className="mx-auto mb-2 text-green-500" size={24} />
                <p className="text-xs text-gray-400">100% Secure</p>
              </div>
            </div>

            <Button
              title={`Proceed to Pay ₹${totalPrice}`}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 text-lg"
              onClick={handleProceedToPayment}
            />
          </div>
        </div>

        {/* Test Cards Info */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6">
          <p className="text-blue-400 text-sm font-semibold mb-2">💳 Test Cards for Demo:</p>
          <div className="space-y-1 text-xs">
            <p className="text-green-400">✅ Success: Any card NOT ending in 0 or 9</p>
            <p className="text-red-400">❌ Declined: Cards ending in 0</p>
            <p className="text-yellow-400">⚠️ Insufficient: Cards ending in 9</p>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center">
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-gray-400 hover:text-gray-300 transition-colors"
          >
            ← Back to seat selection
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentGatewaySelection;
