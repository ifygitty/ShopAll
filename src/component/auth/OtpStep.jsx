import { useState } from "react";
import { useVerifyOtp, useResendOtp } from "@/query/queryUser-auth";

export default function OtpStep({ email, onSuccess }) {
  const [otp, setOtp] = useState("");

  const verifyOtp = useVerifyOtp();
  const resendOtp = useResendOtp();

  const handleVerify = async () => {
    await verifyOtp.mutateAsync({ email, otp });
    localStorage.setItem("USER_LOGGED_IN", "real_user");
    onSuccess();
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-center">Verify Email</h2>
      <p className="text-center text-gray-500 mt-2">
        Enter the 6-digit code sent to {email}
      </p>

      <input
        maxLength={6}
        className="w-full text-center tracking-widest text-2xl mt-6 p-3 border rounded-lg"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />

      <button
        onClick={handleVerify}
        className="w-full mt-4 py-3 bg-black text-white rounded-lg"
      >
        Verify
      </button>

      <button
        onClick={() => resendOtp.mutate(email)}
        className="mt-3 text-sm text-gray-500 block mx-auto"
      >
        Resend code
      </button>
    </>
  );
}
