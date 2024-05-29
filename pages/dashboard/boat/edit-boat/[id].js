import { useRouter } from "next/router";
import EditBoat from "../../../../src/components/app/Dashboard/Boat/EditBoat/EditBoat"
const editBoat = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);
  return (
    <div>
      <EditBoat id={id}/>
    </div>
  );
};
export default editBoat;
