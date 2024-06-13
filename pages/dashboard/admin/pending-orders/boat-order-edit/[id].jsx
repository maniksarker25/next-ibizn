import BoatEdit from "@/src/components/app/Dashboard/admin/PendingOrders/Edit/BoatEdit/BoatEdit";
import { useParams } from "next/navigation";
import React from "react";

const BoatOrderEdit = () => {
  const params = useParams();
  return <BoatEdit id={params?.id} />;
};

export default BoatOrderEdit;
