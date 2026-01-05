import {
    Flex,
    Circle,
    Box,
    Image,
    Badge,
    useColorModeValue,
    Icon,
    chakra,
    Tooltip,
    Text,
} from '@chakra-ui/react';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import { FiShoppingCart } from "react-icons/fi";
import { useState, useEffect } from 'react';
import { AiFillStar,AiOutlineHeart } from "react-icons/ai";

import { BsHeartFill,BsHeart } from "react-icons/bs"
import { NavLink } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';

function ProductCard({ _id, title, size, rating, price, color, image }) {
    const [liked, setLiked] = useState(false);
    const toast = useToast();
    const token = localStorage.getItem('token');
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');

    // Check if item is in wishlist on mount
    useEffect(() => {
        if (token && userData._id) {
            checkWishlistStatus();
        }
    }, [token, userData._id]);

    const checkWishlistStatus = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BASEURL}/wishlist`, {
                headers: { Authorization: `${token}` }
            });
            const items = res.data || [];
            const isLiked = items.some(item => item._id === _id);
            setLiked(isLiked);
        } catch (err) {
            console.error('Error checking wishlist:', err);
        }
    };

    const handleWishlistClick = () => {
        if (!token || !userData._id) {
            toast({
                title: 'Please login first',
                status: 'warning',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        if (liked) {
            // Remove from wishlist via API
            axios.delete(`${process.env.REACT_APP_BASEURL}/wishlist/remove/${_id}`, {
                headers: { Authorization: `${token}` }
            })
            .then((res) => {
                setLiked(false);
                // Also update localStorage as fallback
                const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
                const updated = wishlist.filter(item => item._id !== _id);
                localStorage.setItem('wishlist', JSON.stringify(updated));
                toast({
                    title: 'Removed from Wishlist',
                    status: 'info',
                    duration: 2000,
                    isClosable: true,
                });
            })
            .catch((err) => {
                console.error('Error removing from wishlist:', err);
                toast({
                    title: 'Failed to remove from wishlist',
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                });
            });
        } else {
            // Add to wishlist via API
            const item = { _id, title, price, image, size, color, rating };
            axios.post(`${process.env.REACT_APP_BASEURL}/wishlist/add`, 
                { userID: userData._id, item },
                { headers: { Authorization: `${token}` } }
            )
            .then((res) => {
                setLiked(true);
                // Also update localStorage as fallback
                const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
                wishlist.push(item);
                localStorage.setItem('wishlist', JSON.stringify(wishlist));
                toast({
                    title: 'Added to Wishlist',
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                });
            })
            .catch((err) => {
                console.error('Error adding to wishlist:', err);
                toast({
                    title: 'Failed to add to wishlist',
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                });
            });
        }
    };
    return (
        <Flex cursor={"pointer"} gap={10} w="full" alignItems="center" justifyContent="center">
           
            <Box
                bg={useColorModeValue('white', 'gray.800')}
                maxW="sm"
                borderWidth="1px"
                rounded="lg"
                position="relative">
             <NavLink to={`/eyeglasses/${_id}`} >
                <Image
                    src={image}
                    alt={`Picture of ${title}`}
                    roundedTop="lg"
                />
            </NavLink>
                <Box p="6">
                    <Box pos={"relative"} right={"8vw"} >
                        <Badge p={"6px"} textAlign={"center"} rounded="full" px="2" h={"4vh"} w={"5vw"}  fontSize="12px" fontWeight={"700"} bgColor={"#eeeef5"}>
                            {rating}
                            <Icon as={AiFillStar} h={3} w={3} color={"#329c92"} alignSelf={'center'}/>
                            <span style={{color:"#66668e",fontWeight:"lighter"}}>245</span>
                        </Badge>
                    </Box>
                    <Flex mt="1" justifyContent="space-between" alignContent="center">
                        <Box
                            fontSize="md"
                            fontWeight="semibold"
                            as="h4"
                            lineHeight="tight"
                            isTruncated>
                            {title}
                        </Box>
                        <Tooltip
                            label="Wishlist"
                            bg="white"
                            placement={'top'}
                            color={'gray.800'}
                            fontSize={'1.2em'}>
                            <Box display={'flex'} onClick={handleWishlistClick} cursor="pointer">
                                {
                                    liked ? 
                                    <Icon as={BsHeartFill} fill={"red"} h={7} w={7} alignSelf={'center'}   />
                                    :
                                    <Icon as={BsHeart} h={7} w={7} alignSelf={'center'}   />
                                }
                                
                            </Box>
                        </Tooltip>
                    </Flex>

                    <Flex direction={"column"} align={"start"}>
                        <Box fontSize="sm" color={useColorModeValue('gray.800', 'white')}>
                            <Box as="span" color={'gray.600'} fontSize="sm">
                               Size:
                            </Box>
                            {size}
                        </Box>
                        <Box fontSize="sm" color={useColorModeValue('gray.800', 'white')}>
                            <Box as="span" color={'gray.600'} fontSize="sm">
                               Color:
                            </Box>
                            {color}
                        </Box>
                        <Box fontSize="md" fontWeight={"semibold"} color={useColorModeValue('gray.800', 'white')}>
                            <Box as="span" fontWeight={"semibold"} color={'gray.600'} fontSize="md">
                                ₹
                            </Box>
                            {price}
                        </Box>
                        {/* <Box fontSize="sm" color={useColorModeValue('gray.800', 'white')}>
                            <Box as="span" color={'gray.600'} fontSize="sm">
                               color:
                            </Box>
                            {color}
                        </Box> */}
                    </Flex>
                </Box>
            </Box>
            
        </Flex>
    );
}

export default ProductCard;