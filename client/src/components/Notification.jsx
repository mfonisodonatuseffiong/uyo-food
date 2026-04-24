import { motion, AnimatePresence } from "framer-motion";

export default function NotificationStack({ notifications, onDismiss }) {
  return (
    <div
      className="position-fixed bottom-0 end-0 mb-4 me-4 d-flex flex-column align-items-end"
      style={{ zIndex: 9999, gap: "0.5rem" }}
    >
      <AnimatePresence>
        {notifications.map((n) => {
          const bgColor =
            n.type === "success" ? "bg-success" :
            n.type === "info" ? "bg-info" :
            "bg-danger"; // default error

          const icon =
            n.type === "success" ? "✅" :
            n.type === "info" ? "ℹ️" :
            "❌";

          return (
            <motion.div
              key={n.id}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className={`px-4 py-2 ${bgColor} text-white rounded shadow-lg fw-bold d-flex justify-content-between align-items-center`}
              style={{ minWidth: "280px" }}
            >
              <span>{icon} {n.message}</span>
              <button
                onClick={() => onDismiss(n.id)}
                className="btn-close btn-close-white ms-3"
                aria-label="Close"
              ></button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
