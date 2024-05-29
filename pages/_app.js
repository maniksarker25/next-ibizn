import Layout from "@/src/components/core/layout/Layout";
import ContextApi, { userContext } from "@/src/storage/contextApi";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import Dashboard from "@/src/components/core/layout/Dashboard";
import { useContext, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { CssBaseline } from "@mui/material";
export default function App({ Component, pageProps }) {
  const router = useRouter();
  // console.log(router.pathname);
  const isDashboard = router.asPath.startsWith("/dashboard");
  useEffect(()=>{
    if(isDashboard){
      if(!localStorage.getItem('access-token')){
        router.push('/auth')
      }
    }
    
  },[isDashboard])
  return (
    <ContextApi>
      <CssBaseline/>
      {isDashboard ? (
        <Dashboard>
          <Component {...pageProps} />
        </Dashboard>
      ) : router.pathname === "/auth" ? (
        <Component {...pageProps} />
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
      <Toaster />
    </ContextApi>
  );
}
