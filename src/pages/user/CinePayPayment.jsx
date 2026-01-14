import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axiosInstance.js";
import { Button } from "../../components/ui/Buttons";
import toast from "react-hot-toast";
import { useAuthStore } from "../../store/useAuthStore.js";
import { CreditCard, Lock, Shield } from "lucide-react";

const CinePayPayment = () => {
  const { showId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { user } = useAuthStore();

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

  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!selectedSeats || !totalPrice || !bookingId) {
      toast.error("Invalid payment details.");
      navigate(`/user/seat-selection/${showId}`);
    }
  }, [selectedSeats, totalPrice, bookingId, navigate, showId]);

  // Format card number with spaces
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  // Format expiry date
  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.slice(0, 2) + "/" + v.slice(2, 4);
    }
    return v;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "cardNumber") {
      formattedValue = formatCardNumber(value);
      if (formattedValue.replace(/\s/g, "").length > 16) return;
    } else if (name === "expiryDate") {
      formattedValue = formatExpiryDate(value);
      if (formattedValue.length > 5) return;
    } else if (name === "cvv") {
      formattedValue = value.replace(/[^0-9]/gi, "");
      if (formattedValue.length > 3) return;
    } else if (name === "cardHolder") {
      formattedValue = value.replace(/[^a-zA-Z\s]/gi, "");
    }

    setCardDetails((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!cardDetails.cardNumber || cardDetails.cardNumber.replace(/\s/g, "").length !== 16) {
      newErrors.cardNumber = "Please enter a valid 16-digit card number";
    }

    if (!cardDetails.cardHolder || cardDetails.cardHolder.trim().length < 3) {
      newErrors.cardHolder = "Please enter cardholder name";
    }

    if (!cardDetails.expiryDate || cardDetails.expiryDate.length !== 5) {
      newErrors.expiryDate = "Please enter expiry date (MM/YY)";
    } else {
      const [month, year] = cardDetails.expiryDate.split("/");
      const currentYear = new Date().getFullYear() % 100;
      const currentMonth = new Date().getMonth() + 1;
      
      if (parseInt(month) < 1 || parseInt(month) > 12) {
        newErrors.expiryDate = "Invalid month";
      } else if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
        newErrors.expiryDate = "Card has expired";
      }
    }

    if (!cardDetails.cvv || cardDetails.cvv.length !== 3) {
      newErrors.cvv = "Please enter 3-digit CVV";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill all fields correctly");
      return;
    }

    setLoading(true);

    try {
      // Step 1: Create transaction
      const createResponse = await axiosInstance.post("/cinepay/createTransaction", {
        amount: totalPrice,
        bookingId,
        cardDetails: {
          cardNumber: cardDetails.cardNumber.replace(/\s/g, ""),
          expiryDate: cardDetails.expiryDate,
          cvv: cardDetails.cvv,
        },
      });

      const { transactionId } = createResponse.data;
      console.log("✅ CinePay transaction created:", transactionId);
      toast.success("Processing payment...");

      // Step 2: Process payment
      setTimeout(async () => {
        try {
          const processResponse = await axiosInstance.post("/cinepay/processPayment", {
            transactionId,
            bookingId,
            cardDetails: {
              cardNumber: cardDetails.cardNumber.replace(/\s/g, ""),
              expiryDate: cardDetails.expiryDate,
              cvv: cardDetails.cvv,
            },
          });

          console.log("✅ CinePay payment successful");
          toast.success("Payment successful!");
          navigate("/user/payment-success");
        } catch (processError) {
          console.error("❌ CinePay payment failed:", processError);
          const errorMessage = processError.response?.data?.message || "Payment failed";
          toast.error(errorMessage);
          navigate("/user/payment-failed");
        }
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("❌ CinePay transaction creation failed:", error);
      toast.error(error.response?.data?.message || "Failed to initiate payment");
      setLoading(false);
    }
  };

  if (!selectedSeats || !totalPrice || !bookingId) {
    return null;
  }

  const [date, time] = showTime ? ["TBD", showTime] : ["TBD", "TBD"];

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center py-12 px-4 sm:px-8 lg:px-8">
      <div className="bg-base-300 p-8 rounded-xl shadow-lg w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Shield className="text-primary" size={32} />
            <h1 className="text-3xl font-bold text-primary">CinePay</h1>
          </div>
          <p className="text-sm text-gray-400">Secure Payment Gateway</p>
        </div>

        {/* Movie Info Summary */}
        <div className="flex items-center gap-4 mb-6 p-4 bg-base-200 rounded-lg">
          <img
            src={poster || "https://via.placeholder.com/100x150?text=No+Poster"}
            alt={`${movieTitle} Poster`}
            className="w-16 h-24 rounded-md object-cover shadow-sm"
            loading="lazy"
          />
          <div className="flex-1">
            <h2 className="text-lg font-semibold base mb-1">{movieTitle}</h2>
            <p className="text-xs text-gray-400">{theaterName}</p>
            <p className="text-xs text-gray-400">Seats: {selectedSeats.join(", ")}</p>
            <p className="text-lg font-bold text-primary mt-1">₹{totalPrice}</p>
          </div>
        </div>

        {/* Payment Form */}
        <form onSubmit={handlePayment} className="space-y-4">
          {/* Card Number */}
          <div>
            <label className="block text-sm font-medium mb-2">Card Number</label>
            <div className="relative">
              <input
                type="text"
                name="cardNumber"
                value={cardDetails.cardNumber}
                onChange={handleInputChange}
                placeholder="1234 5678 9012 3456"
                className={`w-full px-4 py-3 bg-base-200 rounded-lg border ${
                  errors.cardNumber ? "border-red-500" : "border-gray-600"
                } focus:outline-none focus:border-primary`}
              />
              <CreditCard className="absolute right-3 top-3 text-gray-400" size={20} />
            </div>
            {errors.cardNumber && (
              <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>
            )}
          </div>

          {/* Card Holder */}
          <div>
            <label className="block text-sm font-medium mb-2">Cardholder Name</label>
            <input
              type="text"
              name="cardHolder"
              value={cardDetails.cardHolder}
              onChange={handleInputChange}
              placeholder="NAME"
              className={`w-full px-4 py-3 bg-base-200 rounded-lg border ${
                errors.cardHolder ? "border-red-500" : "border-gray-600"
              } focus:outline-none focus:border-primary uppercase`}
            />
            {errors.cardHolder && (
              <p className="text-red-500 text-xs mt-1">{errors.cardHolder}</p>
            )}
          </div>

          {/* Expiry and CVV */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Expiry Date</label>
              <input
                type="text"
                name="expiryDate"
                value={cardDetails.expiryDate}
                onChange={handleInputChange}
                placeholder="MM/YY"
                className={`w-full px-4 py-3 bg-base-200 rounded-lg border ${
                  errors.expiryDate ? "border-red-500" : "border-gray-600"
                } focus:outline-none focus:border-primary`}
              />
              {errors.expiryDate && (
                <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">CVV</label>
              <div className="relative">
                <input
                  type="password"
                  name="cvv"
                  value={cardDetails.cvv}
                  onChange={handleInputChange}
                  placeholder="123"
                  maxLength="3"
                  className={`w-full px-4 py-3 bg-base-200 rounded-lg border ${
                    errors.cvv ? "border-red-500" : "border-gray-600"
                  } focus:outline-none focus:border-primary`}
                />
                <Lock className="absolute right-3 top-3 text-gray-400" size={16} />
              </div>
              {errors.cvv && (
                <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>
              )}
            </div>
          </div>

          {/* Security Notice */}
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
            <div className="flex items-center gap-2 text-green-500 text-sm">
              <Shield size={16} />
              <span>Your payment is secured with 256-bit encryption</span>
            </div>
          </div>

          {/* Test Cards Info */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
            <p className="text-blue-400 text-xs font-semibold mb-1">Test Cards:</p>
            <p className="text-blue-300 text-xs">✅ Success: Any card not ending in 0 or 9</p>
            <p className="text-red-300 text-xs">❌ Declined: Cards ending in 0</p>
            <p className="text-yellow-300 text-xs">⚠️ Insufficient: Cards ending in 9</p>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            title={loading ? "Processing..." : `Pay ₹${totalPrice} with CinePay`}
            disabled={loading}
            loading={loading}
            className="w-full"
          />
        </form>

        {/* Back Button */}
        <div className="mt-4 text-center">
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-gray-400 hover:text-gray-300"
            disabled={loading}
          >
            ← Back to payment options
          </button>
        </div>
      </div>
    </div>
  );
};

export default CinePayPayment;
