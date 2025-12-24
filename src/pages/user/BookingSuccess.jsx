import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import successAnimation from "../../assets/animationFiles/Animation - 1744520855804.json";

// Add print styles
const printStyles = `
  @media print {
    body * {
      visibility: hidden;
    }
    .ticket-print, .ticket-print * {
      visibility: visible;
    }
    .ticket-print {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
    }
    .no-print {
      display: none !important;
    }
  }
`;

const BookingSuccess = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [seconds, setSeconds] = useState(8);

  const bookingDetails = state?.booking;

  useEffect(() => {
    // Redirect if no booking details
    if (!bookingDetails) {
      navigate("/user/bookings");
      return;
    }

    // Set up the redirect timeout
    const timeout = setTimeout(() => {
      navigate("/user/bookings");
    }, 8000);

    // Update countdown every second
    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Cleanup timeout and interval on component unmount
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [navigate, bookingDetails]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: 0.2 },
    },
  };

  const ticketVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, delay: 0.5 },
    },
  };

  if (!bookingDetails) {
    return (
      <div className="min-h-screen bg-base-100 flex items-center justify-center">
        <div className="loading loading-spinner loading-lg text-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 flex flex-col items-center justify-start py-8 px-4 sm:px-6 lg:px-8 w-full">
      {/* Add print styles */}
      <style>{printStyles}</style>
      
      {/* Success Animation */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full h-48 overflow-hidden no-print"
      >
        <Lottie
          animationData={successAnimation}
          loop={false}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </motion.div>

      {/* Success Message */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-4xl mt-4 text-center"
      >
        <motion.h1
          variants={textVariants}
          className="text-3xl font-bold text-green-400 flex items-center justify-center gap-2 mb-2"
        >
          <span role="img" aria-label="party-popper">🎉</span> Booking Confirmed!
        </motion.h1>
        <motion.p
          variants={textVariants}
          className="text-lg text-green-600 mb-6"
        >
          Your seats have been reserved! Here's your ticket:
        </motion.p>

        {/* Booking Ticket */}
        <motion.div
          variants={ticketVariants}
          initial="hidden"
          animate="visible"
          className="ticket-print bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-dashed border-primary/30 rounded-lg p-6 mb-6 max-w-2xl mx-auto"
        >
          {/* Ticket Header */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-primary mb-2">🎬 MOVIE TICKET</h2>
            <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
          </div>

          {/* Movie Details */}
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            {/* Movie Poster */}
            <div className="flex-shrink-0 mx-auto md:mx-0">
              <img
                src={bookingDetails.poster || "https://via.placeholder.com/120x180?text=No+Poster"}
                alt={bookingDetails.movieName}
                className="w-24 h-36 rounded-lg object-cover shadow-lg"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/120x180?text=No+Poster";
                }}
              />
            </div>

            {/* Booking Information */}
            <div className="flex-1 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400 uppercase tracking-wide">Movie</p>
                  <p className="text-lg font-semibold text-primary">{bookingDetails.movieName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 uppercase tracking-wide">Booking ID</p>
                  <p className="text-lg font-mono text-secondary">{bookingDetails.bookingId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 uppercase tracking-wide">Theater</p>
                  <p className="text-lg font-semibold">{bookingDetails.theaterName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 uppercase tracking-wide">Location</p>
                  <p className="text-lg font-semibold">{bookingDetails.location}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 uppercase tracking-wide">Date</p>
                  <p className="text-lg font-semibold">{bookingDetails.showDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 uppercase tracking-wide">Time</p>
                  <p className="text-lg font-semibold">{bookingDetails.showTime}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 uppercase tracking-wide">Status</p>
                  <p className="text-lg font-bold text-green-500">✅ {bookingDetails.status.toUpperCase()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 uppercase tracking-wide">Total Price</p>
                  <p className="text-lg font-bold text-green-500">₹{bookingDetails.totalPrice}</p>
                </div>
              </div>

              {/* Seats */}
              <div>
                <p className="text-sm text-gray-400 uppercase tracking-wide mb-2">Seats</p>
                <div className="flex flex-wrap gap-2">
                  {bookingDetails.selectedSeats.map((seat, index) => (
                    <span
                      key={index}
                      className="bg-primary text-primary-content px-3 py-1 rounded-full text-sm font-semibold"
                    >
                      {seat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Ticket Footer */}
          <div className="text-center pt-4 border-t border-dashed border-primary/30">
            <p className="text-sm text-gray-500 mb-2">
              Please arrive 15 minutes before showtime
            </p>
            <p className="text-xs text-gray-400 mb-2">
              Show this ticket at the theater entrance
            </p>
            <p className="text-xs text-yellow-600 font-semibold">
              💳 Payment to be collected at the theater counter
            </p>
          </div>
        </motion.div>

        {/* Timer Message */}
        <motion.p
          variants={textVariants}
          className="text-base text-gray-500 mb-4 no-print"
        >
          Redirecting to your bookings in {seconds} second{seconds !== 1 ? "s" : ""}...
        </motion.p>

        {/* Action Buttons */}
        <motion.div variants={textVariants} className="flex flex-col sm:flex-row gap-4 justify-center no-print">
          <button
            onClick={() => window.print()}
            className="bg-accent hover:bg-accent/80 text-accent-content font-semibold py-3 px-6 rounded-lg transition duration-300"
          >
            🖨️ Print Ticket
          </button>
          <button
            onClick={() => navigate("/user/bookings")}
            className="bg-primary hover:bg-primary/80 text-primary-content font-semibold py-3 px-6 rounded-lg transition duration-300"
          >
            View All Bookings
          </button>
          <button
            onClick={() => navigate("/")}
            className="bg-secondary hover:bg-secondary/80 text-secondary-content font-semibold py-3 px-6 rounded-lg transition duration-300"
          >
            Back to Home
          </button>
        </motion.div>

        {/* Footer Message */}
        <motion.p
          variants={textVariants}
          className="text-sm base mt-6 no-print"
        >
          🎫 Your booking has been confirmed! Payment will be collected at the theater.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default BookingSuccess;