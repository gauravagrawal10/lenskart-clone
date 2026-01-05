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
import { getOrderStatusFromDate, getDaysElapsed, getNextStatusUpdate, formatDate } from '../../utils/orderStatusHelper';

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

  const statusSteps = ['Placed', 'Shipped', 'Out for Delivery', 'Delivered'];
  const getStepIndex = (status) => {
    const index = statusSteps.indexOf(status);
    return index >= 0 ? index : 0;
  };

  const statusColors = {
    Placed: 'blue',
    Shipped: 'orange',
    'Out for Delivery': 'purple',
    Delivered: 'green',
    Cancelled: 'red',
  };

  if (loading) return <Center mt={10}><Text>Loading...</Text></Center>;
  if (!order) return <Center mt={10}><Text>Order not found.</Text></Center>;

  const calculatedStatus = getOrderStatusFromDate(order.createdAt);
  const currentStep = getStepIndex(calculatedStatus);
  const daysElapsed = getDaysElapsed(order.createdAt);
  const nextUpdate = getNextStatusUpdate(order.createdAt);

  return (
    <Box w="90%" maxW="900px" m="20px auto">
      <Button mb={4} onClick={() => navigate('/myorders')}>← Back to Orders</Button>

      {/* Order Header */}
      <Box borderWidth="1px" borderRadius="md" p={6} mb={6} bg="gray.50">
        <HStack justify="space-between" mb={4}>
          <VStack align="start">
            <Heading size="lg">{order.title}</Heading>
            <Text fontSize="sm" color="gray.600">Order ID: {order._id}</Text>
            <Text fontSize="xs" color="gray.500">Ordered on: {formatDate(order.createdAt)}</Text>
          </VStack>
          <Badge colorScheme={statusColors[calculatedStatus]} fontSize="lg" p={2}>
            {calculatedStatus}
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
          <VStack align="start">
            <Text fontWeight="bold">Days Elapsed</Text>
            <Text>{daysElapsed} days</Text>
          </VStack>
        </HStack>
      </Box>

      {/* Product Image */}
      <Box textAlign="center" mb={6}>
        <Image src={order.image} maxH="300px" mx="auto" objectFit="cover" borderRadius="md" />
      </Box>

      {/* Tracking Timeline */}
      <Box borderWidth="1px" borderRadius="md" p={6} mb={6} bg="white">
        <Heading size="md" mb={6}>Order Status Timeline</Heading>
        <VStack align="start" spacing={4}>
          <Text fontSize="sm" color="gray.600">
            Order was placed {daysElapsed} days ago. Status updates automatically over 6 days.
          </Text>
          <Stepper index={currentStep} orientation="vertical" gap="0">
            {statusSteps.map((status, index) => {
              const isComplete = index < currentStep;
              const isActive = index === currentStep;
              const daysForStatus = 
                status === 'Placed' ? 0 :
                status === 'Shipped' ? 4 :
                status === 'Out for Delivery' ? 5 : 6;
              
              return (
                <Step key={status}>
                  <StepIndicator>
                    <StepStatus
                      complete={<StepIcon />}
                      incomplete={<StepNumber />}
                      active={<StepNumber />}
                    />
                  </StepIndicator>
                  <Box flex="1" pb={index < statusSteps.length - 1 ? 6 : 0}>
                    <StepTitle fontWeight="bold">{status}</StepTitle>
                    <StepDescription>
                      {isComplete && (
                        <Text color="green.500" fontSize="sm" fontWeight="500">
                          ✓ Completed
                        </Text>
                      )}
                      {isActive && (
                        <VStack align="start" spacing={1}>
                          <Text color="blue.600" fontSize="sm" fontWeight="500">
                            ● Currently in progress
                          </Text>
                          {nextUpdate && (
                            <Text color="gray.600" fontSize="xs">
                              Updates by: {formatDate(nextUpdate)}
                            </Text>
                          )}
                        </VStack>
                      )}
                      {!isComplete && !isActive && (
                        <Text color="gray.500" fontSize="sm">
                          Expected on day {daysForStatus}
                        </Text>
                      )}
                    </StepDescription>
                  </Box>
                  {index < statusSteps.length - 1 && <StepSeparator />}
                </Step>
              );
            })}
          </Stepper>
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
