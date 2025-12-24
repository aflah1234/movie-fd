import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../../config/axiosInstance.js";
import toast from "react-hot-toast";

const Verification = ({ role = "user" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [isVerifying, setIsVerifying] = useState(true);

  const user = {
    role: "user",
    verifyAPI: "user/verify-otp",
    redirectRoute: "/login",
    errRedirectionRoute: "/register",
  };

  if (role == "theaterOwner") {
    user.role = "theaterOwner";
    user.verifyAPI = "admin/verify-otp";
    user.redirectRoute = "/owner/login";
    user.errRedirectionRoute = "/owner/register";
  }

  if (role == "admin") {
    user.role = "admin";
    user.verifyAPI = "admin/verify-otp";
    user.redirectRoute = "/admin/login";
    user.errRedirectionRoute = "/admin/register";
  }

  // Auto-verify user on mount
  useEffect(() => {
    const autoVerify = async () => {
      const params = new URLSearchParams(location.search);
      const userEmail = params.get("email") || localStorage.getItem("userEmail");

      if (userEmail) {
        setEmail(userEmail);
        
        try {
          // Auto-verify without OTP (backend will handle it)
          const response = await axiosInstance.post(user.verifyAPI, {
            email: userEmail,
            otp: "000000" // Dummy OTP since backend skips validation
          });
          
          toast.success("Registration successful! Redirecting to login...");
          localStorage.removeItem("userEmail");
          
          // Redirect after a short delay
          setTimeout(() => {
            navigate(user.redirectRoute);
          }, 1500);
          
        } catch (error) {
          toast.error("Verification failed. Redirecting to registration...");
          setTimeout(() => {
            navigate(user.errRedirectionRoute);
          }, 2000);
        }
      } else {
        toast.error("Invalid access. Redirecting...");
        navigate(user.errRedirectionRoute);
      }
      
      setIsVerifying(false);
    };

    autoVerify();
  }, [location, navigate]);

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center">
      <div className="bg-base-300 p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h2 className="text-3xl font-bold text-primary mb-6">
          Verifying Registration
        </h2>
        
        {isVerifying ? (
          <div className="space-y-4">
            <div className="loading loading-spinner loading-lg text-primary"></div>
            <p className="text-base">
              Completing your registration...
            </p>
            {email && (
              <p className="text-sm text-base-content/70">
                Email: {email}
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-success text-6xl">✓</div>
            <p className="text-base">
              Registration completed successfully!
            </p>
            <p className="text-sm text-base-content/70">
              Redirecting to login...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Verification;