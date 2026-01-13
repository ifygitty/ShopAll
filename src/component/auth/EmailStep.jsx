import { useState } from "react";
import { useCheckEmail, useSendOtp } from "@/query/queryUser-auth";
import SweetLoader from "../SweetLoader";
export default function EmailStep({ onSuccess }) {
  const [email, setEmail] = useState("");

  const checkEmail = useCheckEmail();
  const sendOtp = useSendOtp();

  const handleSubmit = async () => {
    const result = await checkEmail.mutateAsync(email);

    await sendOtp.mutateAsync({
      email,
      ...(result.exists ? {} : { name: "", phone: "" }),
    });

    onSuccess(email);
  };

  return (
    <>
      {/* <h2 className="text-2xl font-bold text-center">Welcome 👋</h2>
      <p className="text-center text-gray-500 mt-2">
        Enter your email to continue
      </p>

      <input
        type="email"
        className="w-full mt-6 p-3 border rounded-lg"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value.toLowerCase())}
      />

      <button
        onClick={handleSubmit}
        className="w-full mt-4 py-3 bg-black text-white rounded-lg"
      >
        Continue
      </button> */}
      <SweetLoader />
    </>
  );
}
