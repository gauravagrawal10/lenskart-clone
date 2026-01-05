import React, { useState, useEffect } from 'react';
import { Box, SimpleGrid, Image, Text, Button, VStack, HStack, Heading, useToast, Center, Icon } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { BsHeartFill } from 'react-icons/bs';
import axios from 'axios';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  // Fetch wishlist from API on mount
  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    
    fetchWishlist();
  }, [token]);

  const fetchWishlist = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASEURL}/wishlist`, {
        headers: { Authorization: `${token}` }
      });
      setWishlistItems(res.data || []);
    } catch (err) {
      console.error('Error loading wishlist:', err);
      // Fallback to localStorage if API fails
      try {
        const saved = localStorage.getItem('wishlist');
        if (saved) {
          setWishlistItems(JSON.parse(saved));
        }
      } catch (e) {
        console.error('Error loading from localStorage:', e);
      }
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (productId) => {
    if (!token) {
      return;
    }

    try {
      await axios.delete(`${process.env.REACT_APP_BASEURL}/wishlist/remove/${productId}`, {
        headers: { Authorization: `${token}` }
      });

      const updated = wishlistItems.filter(item => item._id !== productId);
      setWishlistItems(updated);
      // Also update localStorage as fallback
      localStorage.setItem('wishlist', JSON.stringify(updated));
      
      toast({
        title: 'Removed from Wishlist',
        status: 'info',
        duration: 2000,
        isClosable: true,
      });
    } catch (err) {
      console.error('Error removing from wishlist:', err);
      toast({
        title: 'Failed to remove from wishlist',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const addToCart = async (item) => {
    if (!token) {
      toast({
        title: 'Login First!',
        description: 'Please login to add items to cart',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const obj = {
        image: item.image,
        title: item.title,
        price: item.price,
        quantity: 1,
      };

      const res = await axios.post(
        `${process.env.REACT_APP_BASEURL}/cart/addtocart`,
        obj,
        { headers: { Authorization: `${token}` } }
      );

      if (res.data.msg !== 'Please Login First!!') {
        // Remove from wishlist after adding to cart
        await axios.delete(`${process.env.REACT_APP_BASEURL}/wishlist/remove/${item._id}`, {
          headers: { Authorization: `${token}` }
        });

        // Update local state
        const updated = wishlistItems.filter(i => i._id !== item._id);
        setWishlistItems(updated);
        localStorage.setItem('wishlist', JSON.stringify(updated));

        toast({
          title: 'Moved to Cart',
          description: 'Item removed from wishlist',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.error(err);
      toast({
        title: 'Failed to add to cart',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  if (loading) return <Center mt={10}><Text>Loading...</Text></Center>;
  if (!wishlistItems.length) {
    return (
      <Center mt={10} minH="50vh" flexDirection="column">
        <Heading mb={4}>Your Wishlist is Empty</Heading>
        <Button colorScheme="teal" onClick={() => navigate('/eyeglasses')}>
          Continue Shopping
        </Button>
      </Center>
    );
  }

  return (
    <Box w="90%" maxW="1200px" m="20px auto">
      <Heading mb={6}>My Wishlist ({wishlistItems.length})</Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {wishlistItems.map((item) => (
          <Box key={item._id} borderWidth="1px" borderRadius="md" overflow="hidden" boxShadow="sm" _hover={{ boxShadow: 'lg' }}>
            <Box position="relative" onClick={() => navigate(`/eyeglasses/${item._id}`)}>
              <Image
                src={item.image}
                alt={item.title}
                w="100%"
                h="200px"
                objectFit="cover"
                cursor="pointer"
              />
              <Box
                position="absolute"
                top={2}
                right={2}
                p={2}
                bg="white"
                borderRadius="full"
                cursor="pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromWishlist(item._id);
                }}
                _hover={{ transform: 'scale(1.1)' }}
              >
                <Icon as={BsHeartFill} fill="red" h={5} w={5} />
              </Box>
            </Box>

            <VStack align="start" p={4} spacing={3}>
              <Box>
                <Text fontWeight="bold" fontSize="md" isTruncated>{item.title}</Text>
              </Box>

              <HStack justify="space-between" w="100%">
                <Text fontWeight="bold" fontSize="lg" color="green.600">
                  ₹{item.price}
                </Text>
              </HStack>

              <HStack spacing={2} w="100%">
                <Button
                  flex={1}
                  colorScheme="teal"
                  size="sm"
                  onClick={() => addToCart(item)}
                >
                  Add to Cart
                </Button>
                <Button
                  flex={1}
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/eyeglasses/${item._id}`)}
                >
                  View
                </Button>
              </HStack>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Wishlist;
