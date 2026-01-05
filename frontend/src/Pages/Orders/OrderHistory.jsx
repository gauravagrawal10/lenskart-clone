import React, { useEffect, useState } from 'react';
import { Box, SimpleGrid, Image, Text, Button, VStack, HStack, Heading, useToast, Center, Badge } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getOrderStatusFromDate, getDaysElapsed, formatDate } from '../../utils/orderStatusHelper';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${process.env.REACT_APP_BASEURL}/orders/my`, {
        headers: { Authorization: `${token}` },
      });
      setOrders(res.data || []);
    } catch (err) {
      console.error(err);
      toast({ title: 'Failed to fetch orders', status: 'error', duration: 3000, isClosable: true });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [token]);

  if (loading) return <Center mt={10}><Text>Loading...</Text></Center>;
  if (!orders.length) return <Center mt={10}><Text>No past orders found.</Text></Center>;

  const getProgressLabel = (status) => {
    switch (status) {
      case 'Placed':
        return 'Order placed';
      case 'Shipped':
        return 'Order shipped';
      case 'Out for Delivery':
        return 'Out for delivery';
      case 'Delivered':
        return 'Delivered';
      case 'Cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'Placed':
        return 'blue';
      case 'Shipped':
        return 'orange';
      case 'Out for Delivery':
        return 'purple';
      case 'Delivered':
        return 'green';
      case 'Cancelled':
        return 'red';
      default:
        return 'gray';
    }
  };

  return (
    <Box w="80%" m="20px auto">
      <Heading mb={4}>My Orders</Heading>
      <VStack spacing={4} align="stretch">
        {orders.map((o) => {
          const calculatedStatus = getOrderStatusFromDate(o.createdAt);
          const daysElapsed = getDaysElapsed(o.createdAt);
          return (
          <SimpleGrid key={o._id} columns={{ base: 1, md: 3 }} spacing={4} p={4} borderRadius="md" borderWidth="1px" bg="gray.50">
            <HStack spacing={4}>
              <Image src={o.image} boxSize="120px" objectFit="cover" borderRadius="md"/>
              <VStack align="start">
                <Text fontWeight="bold">{o.title}</Text>
                <Text fontSize="sm">Quantity: {o.quantity}</Text>
                <Text fontSize="sm" color="gray.600">₹{o.price}</Text>
                <Text fontSize="xs" color="gray.500">{formatDate(o.createdAt)}</Text>
              </VStack>
            </HStack>

            <VStack align="start" justify="center">
              <Text fontWeight="semibold" fontSize="sm">Status:</Text>
              <Badge colorScheme={getStatusBadgeColor(calculatedStatus)} fontSize="sm">
                {getProgressLabel(calculatedStatus)}
              </Badge>
              <Text fontSize="xs" color="gray.600">{daysElapsed} days ago</Text>
            </VStack>

            <VStack align="end" justify="center" spacing={2}>
              <Button size="sm" colorScheme="teal" onClick={() => {
                navigator.clipboard?.writeText(o._id);
                toast({ title: 'Order ID copied', status: 'info', duration: 2000, isClosable: true });
              }}>Copy Order ID</Button>
              <Button size="sm" colorScheme="green" onClick={() => navigate(`/ordertracking/${o._id}`)}>Track Order</Button>
            </VStack>
          </SimpleGrid>
        );
        })}
      </VStack>
    </Box>
  );
};

export default OrderHistory;
