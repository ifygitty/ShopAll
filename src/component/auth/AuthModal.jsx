import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import EmailStep from "./EmailStep";
import OtpStep from "./OtpStep";
import SweetLoader from "../SweetLoader";

const AUTH_STEP = {
  EMAIL: "email",
  OTP: "otp",
};

export default function AuthModal({ onClose }) {
  const [step, setStep] = useState(AUTH_STEP.EMAIL);
  const [email, setEmail] = useState("");

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <SweetLoader />

      {/* <div className="relative  rounded-2xl w-full max-w-md p-6 shadow-xl">
        <AnimatePresence mode="wait">
          {step === AUTH_STEP.EMAIL && (
            <motion.div
              key="email"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <EmailStep
                onSuccess={(email) => {
                  setEmail(email);
                  setStep(AUTH_STEP.OTP);
                }}
              />
            </motion.div>
          )}

          {step === AUTH_STEP.OTP && (
            <motion.div
              key="otp"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <OtpStep email={email} onSuccess={onClose} />
            </motion.div>
          )}
        </AnimatePresence>
      </div> */}
    </div>
  );
}
