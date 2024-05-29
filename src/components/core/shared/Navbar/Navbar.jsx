import * as React from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { userContext } from "@/src/storage/contextApi";
import Link from "next/link";
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Drawer } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const MyNavbar = () => {
  const { user, setControl, control } = React.useContext(userContext);
  const router = useRouter();

const [open, setOpen] = React.useState(false)
  // handle logout -------------
  const handleLogOut = () => {
    localStorage.removeItem("access-token");
    setControl(!control);
    toast.success("Log out successfully");
  };

  const menuOpen = ()=>{
    
    setOpen(!open)
  }

  return (
    <>
      <nav className="border-white border-b bg-primary ">
        <div className="customContainer  xl:px-0 flex flex-row  gap-y-5 px-5 items-center justify-between py-4">
          <div>
            <a
              href="#"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img
                src="/images/client/logo.svg"
                className="w-[120px] md:w-[180px]"
                alt="Flowbite Logo"
              />
            </a>
          </div>

          <div className="hidden md:flex gap-x-2 sm:gap-x-5 items-center  ">
            <div>
              <button className="button text-[#f1f2f2] hover:text-[#0080ff] text-[12px] sm:text-base font-[300]">
                USD
              </button>
            </div>
            {user ? (
              <div>
                <button onClick={handleLogOut} className="button text-[#f1f2f2] hover:text-[#0080ff] text-[12px] sm:text-base font-[300]">
                  Log out
                </button>
              </div>
            ) : (
              <div className="flex md:gap-5 gap-3 md:mt-0  items-center">
                <Link href={"/auth"} className="button text-[#f1f2f2] hover:text-[#0080ff] text-[12px] sm:text-base font-[300]">
                  Sign-In
                </Link>
                <div className="button text-[#f1f2f2] hover:text-[#0080ff] text-[12px] sm:text-base font-[300]">Contact us</div>
              </div>
            )}
          </div>
          <div className="md:hidden">
            <button onClick={menuOpen}>
              <MenuIcon className="text-white" />
            </button>
          </div>
        </div>
      </nav>
      <Drawer
      
            anchor={"right"}
            open={open}
            onClose={()=>setOpen(false)}
            sx={{
              display:{
                sm:"none"
              }
            }}
          >
            <Box sx={{
              width:"300px",
              height:"100vh",
              bgcolor:"#0080ff",
              position:"relative"
            }}>
            <div className="flex flex-col justify-center gap-y-3 items-center h-full">
            <div>
              <button className="button text-[#f1f2f2] hover:text-[#0080ff]  text-base font-[300]">
                USD
              </button>
            </div>
            {user ? (
              <div>
                <button onClick={handleLogOut} className="button text-[#f1f2f2] hover:text-[#0080ff]  text-base font-[300]">
                  Log out
                </button>
              </div>
            ) : (
              <div className="flex flex-col md:gap-5 gap-3 md:mt-0 ">
                <Link href={"/auth"} className="button text-[#f1f2f2] hover:text-[#0080ff] text-base font-[300]">
                  Sign-In
                </Link>
                <div className="button text-[#f1f2f2] hover:text-[#0080ff]  text-base font-[300]">Contact us</div>
              </div>
            )}
            <button className="absolute top-2 right-2" onClick={()=> setOpen(false)}>
              <CloseIcon  sx={{
                fontSize:"32px",
                color:"#fff",
                cursor:"pointer"
              }} />
            </button>
          
            </div>
            </Box>
          </Drawer>
    </>
  );
};

export default MyNavbar;
