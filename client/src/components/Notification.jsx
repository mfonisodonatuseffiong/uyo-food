import { motion } from "framer-motion";

export default function Notification({ message, type = "error" }) {
  if (!message) return null;

  // Choose background color based on type
  const bgColor =
    type === "success" ? "bg-success" :
    type === "info" ? "bg-info" :
    "bg-danger"; // default error

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0, 1, 0] }} // blinking effect
      transition={{ duration: 3 }}
      className={`position-fixed top-0 start-50 translate-middle-x mt-3 px-4 py-2 ${bgColor} text-white rounded shadow-lg fw-bold`}
      style={{ zIndex: 9999 }}
    >
      {message}
    </motion.div>
  );
}
