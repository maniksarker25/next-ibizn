import UserVerification from "@/src/components/app/UserVerification/UserVerification";
import { useRouter } from "next/router";
export default function Home() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <UserVerification id={id} />
    </>
  );
}
