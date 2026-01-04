import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  VStack,
  HStack,
  Text,
  Image,
  Button,
  Center,
  useToast,
  Heading,
  Badge,
  Divider,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
} from '@chakra-ui/react';
import axios from 'axios';

const OrderTracking = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      // Fetch all user's orders and find the matching one
      const res = await axios.get(`${process.env.REACT_APP_BASEURL}/orders/my`, {
        headers: { Authorization: `${token}` },
      });
      const foundOrder = res.data?.find((o) => o._id === orderId);
      if (foundOrder) {
        setOrder(foundOrder);
      } else {
        toast({
          title: 'Order not found',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        navigate('/myorders');
      }
    } catch (err) {
      console.error(err);
      toast({
        title: 'Failed to fetch order',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const statusSteps = ['Placed', 'Shipped', 'Delivered'];
  const getStepIndex = (status) => {
    const index = statusSteps.indexOf(status);
    return index >= 0 ? index : 0;
  };

  const statusColors = {
    Placed: 'blue',
    Shipped: 'orange',
    Delivered: 'green',
    Cancelled: 'red',
  };

  if (loading) return <Center mt={10}><Text>Loading...</Text></Center>;
  if (!order) return <Center mt={10}><Text>Order not found.</Text></Center>;

  const currentStep = getStepIndex(order.status);

  return (
    <Box w="90%" maxW="900px" m="20px auto">
      <Button mb={4} onClick={() => navigate('/myorders')}>← Back to Orders</Button>

      {/* Order Header */}
      <Box borderWidth="1px" borderRadius="md" p={6} mb={6} bg="gray.50">
        <HStack justify="space-between" mb={4}>
          <VStack align="start">
            <Heading size="lg">{order.title}</Heading>
            <Text fontSize="sm" color="gray.600">Order ID: {order._id}</Text>
          </VStack>
          <Badge colorScheme={statusColors[order.status]} fontSize="lg" p={2}>
            {order.status}
          </Badge>
        </HStack>
        <Divider my={4} />
        <HStack justify="space-between">
          <VStack align="start">
            <Text fontWeight="bold">Quantity</Text>
            <Text>{order.quantity}</Text>
          </VStack>
          <VStack align="start">
            <Text fontWeight="bold">Price</Text>
            <Text>₹{order.price}</Text>
          </VStack>
          <VStack align="start">
            <Text fontWeight="bold">Total</Text>
            <Text fontSize="lg" fontWeight="bold">₹{order.price * order.quantity}</Text>
          </VStack>
        </HStack>
      </Box>

      {/* Product Image */}
      <Box textAlign="center" mb={6}>
        <Image src={order.image} maxH="300px" mx="auto" objectFit="cover" borderRadius="md" />
      </Box>

      {/* Tracking Timeline - Only show if not Cancelled */}
      {order.status !== 'Cancelled' && (
        <Box borderWidth="1px" borderRadius="md" p={6} mb={6}>
          <Heading size="md" mb={6}>Order Timeline</Heading>
          <Stepper index={currentStep} orientation="vertical" gap="0">
            {statusSteps.map((status, index) => (
              <Step key={status}>
                <StepIndicator>
                  <StepStatus
                    complete={<StepIcon />}
                    incomplete={<StepNumber />}
                    active={<StepNumber />}
                  />
                </StepIndicator>
                <Box flex="1">
                  <StepTitle>{status}</StepTitle>
                  <StepDescription>
                    {index <= currentStep ? (
                      <Text color="green.500" fontSize="sm">
                        ✓ {status === 'Placed' ? 'Order confirmed' : status === 'Shipped' ? 'On the way' : 'Delivered successfully'}
                      </Text>
                    ) : (
                      <Text color="gray.500" fontSize="sm">Pending</Text>
                    )}
                  </StepDescription>
                </Box>
                {index < statusSteps.length - 1 && <StepSeparator />}
              </Step>
            ))}
          </Stepper>
        </Box>
      )}

      {/* Cancelled Status */}
      {order.status === 'Cancelled' && (
        <Box borderWidth="1px" borderRadius="md" p={6} mb={6} borderColor="red.200" bg="red.50">
          <Heading size="md" color="red.600" mb={2}>Order Cancelled</Heading>
          <Text color="red.600">This order has been cancelled. Contact support for more details.</Text>
        </Box>
      )}

      {/* Order Details */}
      <Box borderWidth="1px" borderRadius="md" p={6}>
        <Heading size="md" mb={4}>Order Details</Heading>
        <VStack align="start" spacing={3}>
          <HStack justify="space-between" w="100%">
            <Text fontWeight="bold">Customer Name:</Text>
            <Text>{order.userName}</Text>
          </HStack>
          <HStack justify="space-between" w="100%">
            <Text fontWeight="bold">Product:</Text>
            <Text>{order.title}</Text>
          </HStack>
          <HStack justify="space-between" w="100%">
            <Text fontWeight="bold">Quantity:</Text>
            <Text>{order.quantity}</Text>
          </HStack>
          <HStack justify="space-between" w="100%">
            <Text fontWeight="bold">Unit Price:</Text>
            <Text>₹{order.price}</Text>
          </HStack>
          <Divider />
          <HStack justify="space-between" w="100%" fontWeight="bold" fontSize="lg">
            <Text>Total Amount:</Text>
            <Text color="green.600">₹{order.price * order.quantity}</Text>
          </HStack>
        </VStack>
      </Box>

      {/* Support Button */}
      <Center mt={8}>
        <Button
          colorScheme="teal"
          onClick={() => {
            toast({
              title: 'Support team will contact you soon',
              status: 'info',
              duration: 3000,
              isClosable: true,
            });
          }}>
          Contact Support
        </Button>
      </Center>
    </Box>
  );
};

export default OrderTracking;
