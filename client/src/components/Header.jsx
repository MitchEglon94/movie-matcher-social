// // Copyright 2022 mitchelleglon
// //
// // Licensed under the Apache License, Version 2.0 (the "License");
// // you may not use this file except in compliance with the License.
// // You may obtain a copy of the License at
// //
// //     http://www.apache.org/licenses/LICENSE-2.0
// //
// // Unless required by applicable law or agreed to in writing, software
// // distributed under the License is distributed on an "AS IS" BASIS,
// // WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// // See the License for the specific language governing permissions and
// // limitations under the License.
// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../features/user/userSlice";
// import { useNavigate, Link } from "react-router-dom";
// function Header() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const user = useSelector((store) => store.user.user);
//   return (
//     <div className="header-container">
//       <div className="navbar">
//         <h1>MovMatch</h1>

//         <p>Browse V</p>
//         <Link to={`/`}>Home</Link>
//         {user && <Link to={`/liked`}>Liked</Link>}
//         {user && <Link to={`/usersearch`}>Search Users</Link>}

//         {user && (
//           <button
//             onClick={() => {
//               dispatch(logout());
//               navigate("/login");
//             }}
//           >
//             Logout
//           </button>
//         )}
//         {!user && (
//           <button
//             onClick={() => {
//               navigate("/login");
//             }}
//           >
//             Login
//           </button>
//         )}
//         {!user && (
//           <button
//             onClick={() => {
//               navigate("/signup");
//             }}
//           >
//             Sign Up
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Header;

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import PersonIcon from "@mui/icons-material/Person";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/user/userSlice";

const pages = ["Home", "My List", "User Search"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user.user);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#000000f2",
        boxShadow: "0 0 10px 10px black",
        position: "sticky",
        top: "0",
        zIndex: "1111111",
        border: "none",
        marginBlockEnd: "20px",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            MOVIEMATCH
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {/* {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Link to=""/>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))} */}
              <MenuItem key={"home"} onClick={handleCloseNavMenu}>
                <Link to={"/"}>
                  <Typography textAlign="center">Home</Typography>
                </Link>
              </MenuItem>
              {user && (
                <MenuItem key={"my-list"} onClick={handleCloseNavMenu}>
                  <Link to={"/liked"}>
                    <Typography textAlign="center">my List</Typography>
                  </Link>
                </MenuItem>
              )}
              <MenuItem key={"user-search"} onClick={handleCloseNavMenu}>
                <Link to={"/usersearch"}>
                  <Typography textAlign="center">User Search</Typography>
                </Link>
              </MenuItem>
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            MOVIEMATCH
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {/* {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))} */}
            <Button
              key={"home"}
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              <Link to={"/"}>
                <Typography textAlign="center">Home</Typography>
              </Link>
            </Button>
            {user && (
              <Button
                key={"list"}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Link to={"/liked"}>
                  <Typography textAlign="center">my List</Typography>
                </Link>
              </Button>
            )}
            {user && (
              <Button
                key={"usersearch"}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Link to={"/usersearch"}>
                  <Typography textAlign="center">User Search</Typography>
                </Link>
              </Button>
            )}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{ p: 0, color: "white" }}
              >
                <PersonIcon />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {/* {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))} */}
              {!user && (
                <MenuItem
                  key={"login"}
                  onClick={() => {
                    handleCloseUserMenu();
                    navigate("/login");
                  }}
                >
                  <Typography textAlign="center">Login</Typography>
                </MenuItem>
              )}
              {user && (
                <MenuItem
                  key={"logout"}
                  onClick={() => {
                    handleCloseUserMenu();
                    dispatch(logout());
                    navigate("/login");
                  }}
                >
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              )}
              {!user && (
                <MenuItem
                  key={"signup"}
                  onClick={() => {
                    handleCloseUserMenu();

                    navigate("/signup");
                  }}
                >
                  <Typography textAlign="center">Sign Up</Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
