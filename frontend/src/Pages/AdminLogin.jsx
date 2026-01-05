import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
    useToast,
  } from '@chakra-ui/react';
  import { useState } from 'react';
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
  import axios from 'axios';
import { useNavigate } from 'react-router-dom';
  
  export default function AdminLogin() {
    const [showPassword, setShowPassword] = useState(false);
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [loading, setLoading] = useState(false);
    const toast=useToast();
    const navigate=useNavigate();

    const handleSubmit = async () => {
      if (!email || !password) {
        toast({ title: 'Please fill in all fields', status: 'warning', duration: 3000, isClosable: true, position: 'top' });
        return;
      }

      const payload = { email, password };
      try {
        setLoading(true);
        console.log('Admin login attempt with:', { email, baseURL: process.env.REACT_APP_BASEURL });
        const res = await axios.post(`${process.env.REACT_APP_BASEURL}/admin/login`, payload);
        console.log('Admin login response:', res.data);
        
        // If backend indicates success, store token and navigate
        if (res.data && res.data.success) {
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('userData', JSON.stringify(res.data.admin || res.data.user || null));
          localStorage.setItem('auth', JSON.stringify(true));
          localStorage.setItem('role', 'admin');
          toast({ title: 'Login successful', status: 'success', duration: 3000, isClosable: true, position: 'top' });
          // Clear inputs after successful login
          setEmail('');
          setPassword('');
          setLoading(false);
          navigate('/admindashboard');
          return;
        }

        // If not successful, show returned message (fallback)
        setLoading(false);
        if (res.data && res.data.message) {
          toast({ title: res.data.message, status: 'error', duration: 4000, isClosable: true, position: 'top' });
        } else {
          toast({ title: 'Login failed', status: 'error', duration: 4000, isClosable: true, position: 'top' });
        }
      } catch (err) {
        setLoading(false);
        console.error('Admin login error details:', {
          message: err?.message,
          code: err?.code,
          response: err?.response?.data,
          status: err?.response?.status,
          baseURL: process.env.REACT_APP_BASEURL
        });
        const msg = err?.response?.data?.message || err?.message || 'Something went wrong. Please try again.';
        toast({ title: msg, status: 'error', duration: 4000, isClosable: true, position: 'top' });
      }
    };
  
    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Admin Sign In
            </Heading>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input value={email} type="email" onChange={(e)=>setEmail(e.target.value)} />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input value={password} type={showPassword ? 'text' : 'password'} onChange={(e)=>setPassword(e.target.value)} />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  onClick={handleSubmit}
                  isLoading={loading}
                  loadingText="Signing in..."
                  size="lg"
                  bg={'#11DAAC'}
                  color={'white'}
                  _hover={{
                    bg: '#11DAAC',
                  }}>
                  Sign In
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  Not registered ? <Link href='/adminsignup' color={'blue.400'}>Admin Signup</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }