import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import { styled, useTheme } from "@mui/material/styles";
import * as React from "react";

import toast from "react-hot-toast";
// import icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import InventoryIcon from "@mui/icons-material/Inventory";
import { useRouter } from "next/router";

import { userContext } from "@/src/storage/contextApi";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import LogoutIcon from "@mui/icons-material/Logout";
import Link from "next/link";
const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const oparatorSideBarData = [
  {
    name: "Profile",
    router: "/dashboard/profile",
    icon: <AccountCircleIcon />,
  },
  {
    name: "Orders",
    icon: <InventoryIcon />,
    submenu: [
      {
        name: "Pending Orders",
        router: "/dashboard/pending-orders",
      },
      {
        name: "Past Orders",
        router: "/dashboard/past-orders",
      },
    ],
  },
  {
    name: "Property",
    icon: <AddBusinessIcon />,
    submenu: [
      {
        name: "Boat",
        router: "/dashboard/boat",
      },
      {
        name: "Resort",
        router: "/dashboard/resort",
      },
    ],
  },
];
const adminSideBarData = [
  {
    name: "Profile",
    router: "/dashboard/profile",
    icon: <AccountCircleIcon />,
  },
  {
    name: "Operator List",
    router: "/dashboard/admin/operators-of-list",
    icon: <AccountCircleIcon />,
  },
  {
    name: "Pending Orders",
    router: "/dashboard/admin/pending-orders",
    icon: <AccountCircleIcon />,
  },
  {
    name: "Pending Property List",
    router: "/dashboard/admin/pending-property",
    icon: <AccountCircleIcon />,
  },
  {
    name: "Property List",
    router: "/dashboard/admin/property-of-list",
    icon: <AccountCircleIcon />,
  },
  {
    name: "Resort Items",
    router: "/dashboard/admin/resort-items",
    icon: <InventoryIcon />,
  },
  {
    name: "Boat Items",
    router: "/dashboard/admin/boat-items",
    icon: <AddBusinessIcon />,
  },
];


export default function PersistentDrawerLeft({ children }) {
  const router = useRouter();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [expand, setExpand] = React.useState(-1);
  const [subExpend, setSubExpand] = React.useState(-1);
  const { user, control, setControl } = React.useContext(userContext);
  //   console.log(user);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // handle logout ----------------
  const handleLogout = () => {
    localStorage.removeItem("access-token");
    setControl(!control);
    toast.success("Log out successfully");
    router.push("/auth");
  };
  const handleRouter = (path) => {
    router.push(path)
    setExpand(-1)
  }
  const currentRoute = (route) => {
    const currentPath= router.pathname
    let path = 'rgba(0,0,0,0.5)'
    if (route.router === currentPath) {
      path = 'black'
    }

    if (route?.submenu) {
      const isPath = route.submenu?.find(menu => menu.router === currentPath)
      if (isPath) {
        path = 'black'
      }
    }

    return path;
  }
  
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar sx={{ bgcolor: "white" }} position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="black"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          {/* <Typography variant="h6" noWrap component="div">
            INFINITE BLUE
          </Typography> */}
          <img src="/logo.png" className="w-[150px]  object-cover" alt="" />
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        {open === true && (
          <div className="flex flex-col items-center justify-center my-6 ">
            {/* <img
              className="w-20 h-20 rounded-full"
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              alt="profile image"
            /> */}
            <h2 className="text-xl font-semibold mt-4 mb-1">
              {user?.fullName}
            </h2>
            <h2>{user?.email}</h2>
            {/* <p>{user?.status}</p> */}
          </div>
        )}
        <Divider />
        <List>
          {(user?.role === "admin"
            ? adminSideBarData
            : oparatorSideBarData
          )?.map((route, index) => (
            <ListItem
              key={index}
              disablePadding
              sx={{ display: "block" }}
              onClick={() =>
                route.router
                  ? (handleRouter(route.router))
                  : setExpand((prevEndex) => (index))
              }


            >
              <ListItemButton
                sx={{
                  //   minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,

                }}
                style={{ textAlign: "left", color: "black", }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {route?.icon}
                </ListItemIcon>
                <ListItemText
                  primary={route?.name}
                  sx={{
                    opacity: open ? 1 : 0, fontWeight: router.pathname === route.router ? '700' : 'initial',
                    color: currentRoute(route),
                  }}
                />
                {route?.submenu?.length > 0 && expand === index ? (
                  <ExpandMoreRoundedIcon width={10} />
                ) : (
                  route?.submenu?.length && (
                    <ArrowForwardIosIcon style={{ fontSize: 16 }} />
                  )
                )}
              </ListItemButton>
              {expand === index && (
                <List>
                  {route.submenu?.map((subItem, subIndex) => (
                    <ListItem
                      key={subIndex}
                      sx={{ marginTop: -2 }}
                    // onClick={() =>
                    //   subItem.router
                    //     && router.push(subItem?.router)

                    // }
                    >
                      <ListItemButton>
                        {/* <ListItemText primary={subItem?.name} /> */}
                        <Link href={subItem?.router}>{subItem?.name}</Link>
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              )}
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["Logout"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {children}
      </Main>
    </Box>
  );
}
