
import { motion } from "framer-motion";
import { useState } from "react";


const Dashboard = () => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto mt-6"
    >
      Main Dashboard Component
    </motion.div>
  );
};

export default Dashboard;
