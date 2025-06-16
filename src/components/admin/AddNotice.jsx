import { motion } from "framer-motion";
import { useState } from "react";
import { Notice } from "../shared/home/Announcements";
import axios from "axios";
import { toast } from "react-toastify";
import { Button, Card, CardBody, Input } from "@heroui/react";

const AddNotice = () => {

  const [loading, setLoading] = useState(false);
	const [notice, setNotice] = useState(
		[
			{
				title:"dfdffdf",
				description:"",
				link:"here will be add some link",
			},
		]
	)

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto mt-6 grid grid-cols-5 gap-6"
    >
      <form className="space-y-4">
        <Input
          type="text"
          label="Title"
          value={notice.title}
		  onChange={(e)=>setNotice(e.target.value)}
          className="w-full"
        />
        <Input
          type="text"
          label="Description"
          value={notice.description}
          className="w-full"
        />
        <Input
          type="text"
          label="Paste extrnal link"
          value={notice.link}
          className="w-full"
        />
        <Button color="primary" className="w-full mt-4" isLoading={loading}>
          Publish
        </Button>
      </form>

      {/* Preview  */}
      <Notice />
    </motion.div>
  );
};

export default AddNotice;
