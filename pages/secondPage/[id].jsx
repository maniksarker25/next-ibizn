import PropertyPage from "@/src/components/app/PropertyPage/PropertyPage";
import { useParams } from "next/navigation";

const propertyPage = () => {
  const params = useParams();

  return <PropertyPage id={params?.id} />;
};

export default propertyPage;
