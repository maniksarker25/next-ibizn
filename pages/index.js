import Head from "next/head";
import Image from "next/image";
import Home from "@/src/components/app/Home/Home/Home";
import {  useEffect } from "react";
import { useRouter } from "next/router";
export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("access-token")) {
      router.push("/");
    } else {
      router.push("/");
    }
  }, []);
  
  return <Home />;
}
