import React, { useEffect, useState } from "react";
import { Box, Text, Stack } from "@chakra-ui/react";
import axios from "axios";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get(
      `${process.env.REACT_APP_BASEURL}/orders/my`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    )
    .then(res => setOrders(res.data))
    .catch(err => console.log(err));
  }, []);

  return (
    <Stack p={6}>
      <Text fontSize="2xl" mb={4}>My Orders</Text>
      {orders.map(order => (
        <Box key={order._id} p={4} shadow="md" borderWidth="1px">
          <Text><b>Product:</b> {order.title}</Text>
          <Text><b>Price:</b> ₹{order.price}</Text>
          <Text><b>Status:</b> {order.status}</Text>
        </Box>
      ))}
    </Stack>
  );
};

export default MyOrders;
