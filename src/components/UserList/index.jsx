import React from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

import "./styles.css";
import models from "../../modelData/models";
import { useState, useEffect } from "react";
import fetchModel from "../../lib/fetchModelData";
import { useNavigate } from "react-router-dom";
import ItemUser from "./item/ItemUser";


function UserList() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/users/${id}`);
  };


  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      const response = await fetchModel("/api/user/list", "GET", null, token);
      if (response.success) {
        setUsers(response.data);
      }
    };
    fetchUsers();
  }, []);



  return (
    <div style={{
      height: '75vh',
      overflowY: 'auto',
      padding: '8px'
    }}>
      <Typography variant="h5" color={"black"} fontWeight={"bold"} p={2}>List users</Typography>
      <List component="nav" sx={{ width: '100%' }}>
        {users?.map((item, index) => (
          <ItemUser
            item={item}
            handleClick={handleClick}
            key={index}
            isLast={index === users?.length - 1}
          />
        ))}
      </List>
    </div>
  );
};

export default UserList;
