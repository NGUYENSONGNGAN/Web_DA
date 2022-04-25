import React, { useState } from "react";
import { Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../firebase";

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("home");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const handleClick = (e) => {
    setCurrent(e.key);
  };
  const logout = () => {
    signOut(auth)
      .then(() => {
        dispatch({
          type: "LOGOUT",
          payload: null,
        });

        navigate("/login");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
        toast.error(error.message);
      });
  };
  return (
    <Menu
      onClick={handleClick}
      selectedKeys={[current]}
      mode="horizontal"
      style={{ display: "block" }}
    >
      <Item key="home" icon={<AppstoreOutlined />}>
        <Link to="/">Home</Link>
      </Item>
      {!user ? (
        <>
          <Item key="register" icon={<UserAddOutlined />} className="float-end">
            <Link to="/register">Register</Link>
          </Item>
          <Item key="login" icon={<UserOutlined />} className="float-end">
            <Link to="/login">Login</Link>
          </Item>
        </>
      ) : (
        <SubMenu
          key="SubMenu"
          icon={<SettingOutlined />}
          title={user && user.email.split("@")[0]}
          className="float-end"
        >
          <Item key="setting:1">Option 1</Item>
          <Item key="setting:2">Option 2</Item>
          <Item key="logout" onClick={logout}>
            Logout
          </Item>
        </SubMenu>
      )}
    </Menu>
  );
};

export default Header;
