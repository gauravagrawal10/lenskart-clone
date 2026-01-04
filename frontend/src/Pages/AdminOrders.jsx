import React, { useEffect, useState } from "react";
import {
  ButtonGroup,
  Flex,
  IconButton,
  Image,
  SimpleGrid,
  Stack,
  Text,
  chakra,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { AiFillEdit } from "react-icons/ai";
import axios from "axios";
import AdminNavbar from "../AdminPage/AdminNavbar";

const AdminOrders = () => {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const toast = useToast();

  const handleUpdate = (id) => {
    const order = data.find(o => o._id === id);
    if (!order) return;

    let nextStatus = "";
    if (order.status === "Placed") nextStatus = "Shipped";
    else if (order.status === "Shipped") nextStatus = "Delivered";
    else return;

    axios.patch(
      `${process.env.REACT_APP_BASEURL}/orders/update/${id}`,
      { status: nextStatus }
    )
    .then(() => {
      toast({
        title: `Order marked as ${nextStatus}`,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top"
      });
      setUpdate(!update);
    })
    .catch(err => console.log(err));
  };

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASEURL}/orders`)
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, [update]);

  const bg = useColorModeValue("white", "gray.800");
  const bg3 = useColorModeValue("gray.100", "gray.700");

  return (
    <>
      <AdminNavbar />
      <Text fontSize="2xl" textAlign="center" my={4} textDecoration="underline">
        List of All Orders
      </Text>

      <Flex w="full" p={5} justifyContent="center">
        <Stack w="full" bg={bg} shadow="lg">
          {data.map(order => (
            <Flex key={order._id} direction="column">
              <SimpleGrid columns={5} bg={bg3} p={4} fontWeight="bold">
                <span>User</span>
                <span>Price</span>
                <span>Status</span>
                <span>Image</span>
                <span style={{ textAlign: "right" }}>Action</span>
              </SimpleGrid>

              <SimpleGrid columns={5} alignItems="center" p={4}>
                <span>{order.userName}</span>
                <span>₹{order.price}</span>
                <span>{order.status}</span>
                <Image w="80px" src={order.image} />
                <ButtonGroup justifyContent="flex-end">
                  <IconButton
                    isDisabled={order.status === "Delivered"}
                    onClick={() => handleUpdate(order._id)}
                    colorScheme="green"
                    icon={<AiFillEdit />}
                  />
                </ButtonGroup>
              </SimpleGrid>
            </Flex>
          ))}
        </Stack>
      </Flex>
    </>
  );
};

export default AdminOrders;
