import { useRouter, useParams } from "next/router";
import EditResort from "../../../../src/components/app/Dashboard/Resort/EditResort/Editresort";
import { useEffect, useState } from "react";

const EditPage = () => {
  const router = useRouter();
  const { id } = router?.query;
  const [resortId ,setResortId]  = useState(id || null)

  useEffect(()=>{
    setResortId(id)
  },[id])
  console.log(resortId);

  return <> <EditResort id={resortId} /></>;
};

export default EditPage;
