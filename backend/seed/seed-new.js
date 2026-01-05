require('dotenv').config();
const connectDB = require('../configs/db');
const { AdminModel } = require('../model/Admin.model');
const CartModel = require('../model/Cart.model');
const { EyeglassesModel } = require('../model/Eyeglasses.model');
const { OrderModel } = require('../model/Orders.model');
const { UserModel } = require('../model/User.model');

const admins = [
  { name: 'Alice Admin', email: 'alice.admin@example.com', password: 'pass123', phone: 9000000001, role: 'admin' },
  { name: 'Bob Admin', email: 'bob.admin@example.com', password: 'pass123', phone: 9000000002, role: 'admin' },
  { name: 'Cathy Admin', email: 'cathy.admin@example.com', password: 'pass123', phone: 9000000003, role: 'admin' },
  { name: 'Dan Admin', email: 'dan.admin@example.com', password: 'pass123', phone: 9000000004, role: 'admin' },
  { name: 'Eve Admin', email: 'eve.admin@example.com', password: 'pass123', phone: 9000000005, role: 'admin' },
  { name: 'Frank Admin', email: 'frank.admin@example.com', password: 'pass123', phone: 9000000006, role: 'admin' },
  { name: 'Grace Admin', email: 'grace.admin@example.com', password: 'pass123', phone: 9000000007, role: 'admin' },
  { name: 'Hank Admin', email: 'hank.admin@example.com', password: 'pass123', phone: 9000000008, role: 'admin' },
  { name: 'Ivy Admin', email: 'ivy.admin@example.com', password: 'pass123', phone: 9000000009, role: 'admin' },
  { name: 'Jake Admin', email: 'jake.admin@example.com', password: 'pass123', phone: 9000000010, role: 'admin' }
];

const users = [
  { name: 'User One', email: 'user1@example.com', password: 'userpass', phone: 9100000001, address: '101 Main St', role: 'user' },
  { name: 'User Two', email: 'user2@example.com', password: 'userpass', phone: 9100000002, address: '102 Main St', role: 'user' },
  { name: 'User Three', email: 'user3@example.com', password: 'userpass', phone: 9100000003, address: '103 Main St', role: 'user' },
  { name: 'User Four', email: 'user4@example.com', password: 'userpass', phone: 9100000004, address: '104 Main St', role: 'user' },
  { name: 'User Five', email: 'user5@example.com', password: 'userpass', phone: 9100000005, address: '105 Main St', role: 'user' },
  { name: 'User Six', email: 'user6@example.com', password: 'userpass', phone: 9100000006, address: '106 Main St', role: 'user' },
  { name: 'User Seven', email: 'user7@example.com', password: 'userpass', phone: 9100000007, address: '107 Main St', role: 'user' },
  { name: 'User Eight', email: 'user8@example.com', password: 'userpass', phone: 9100000008, address: '108 Main St', role: 'user' },
  { name: 'User Nine', email: 'user9@example.com', password: 'userpass', phone: 9100000009, address: '109 Main St', role: 'user' },
  { name: 'User Ten', email: 'user10@example.com', password: 'userpass', phone: 9100000010, address: '110 Main St', role: 'user' }
];

// 100 unique eyeglasses products with different images from Pexels API
const eyeglasses = [
  { title: 'Classic Black Wayfarer', size: 'M', rating: 4.5, price: 1299, shape: 'square', image: 'https://images.pexels.com/photos/3622613/pexels-photo-3622613.jpeg?w=400&h=400&fit=crop', color: 'black' },
  { title: 'Retro Brown Round', size: 'L', rating: 4.2, price: 1499, shape: 'round', image: 'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?w=400&h=400&fit=crop', color: 'brown' },
  { title: 'Gold Aviator Deluxe', size: 'M', rating: 4.6, price: 1999, shape: 'aviator', image: 'https://images.pexels.com/photos/3622612/pexels-photo-3622612.jpeg?w=400&h=400&fit=crop', color: 'gold' },
  { title: 'Tortoise Cat Eye', size: 'S', rating: 4.3, price: 1599, shape: 'cat-eye', image: 'https://images.pexels.com/photos/3622614/pexels-photo-3622614.jpeg?w=400&h=400&fit=crop', color: 'tortoise' },
  { title: 'Silver Oval Minimal', size: 'M', rating: 4.0, price: 999, shape: 'oval', image: 'https://images.pexels.com/photos/3622611/pexels-photo-3622611.jpeg?w=400&h=400&fit=crop', color: 'silver' },
  { title: 'Bold Black Square Pro', size: 'L', rating: 4.7, price: 2199, shape: 'square', image: 'https://images.pexels.com/photos/3622610/pexels-photo-3622610.jpeg?w=400&h=400&fit=crop', color: 'black' },
  { title: 'Thin Silver Metal', size: 'M', rating: 4.1, price: 1199, shape: 'round', image: 'https://images.pexels.com/photos/3622609/pexels-photo-3622609.jpeg?w=400&h=400&fit=crop', color: 'silver' },
  { title: 'Sports Blue Wrap', size: 'XL', rating: 4.4, price: 1799, shape: 'wrap', image: 'https://images.pexels.com/photos/3622608/pexels-photo-3622608.jpeg?w=400&h=400&fit=crop', color: 'blue' },
  { title: 'Vintage Brown Hexagon', size: 'M', rating: 4.2, price: 1399, shape: 'hexagon', image: 'https://images.pexels.com/photos/3622607/pexels-photo-3622607.jpeg?w=400&h=400&fit=crop', color: 'brown' },
  { title: 'Eco Green Frame', size: 'S', rating: 4.0, price: 899, shape: 'round', image: 'https://images.pexels.com/photos/3622606/pexels-photo-3622606.jpeg?w=400&h=400&fit=crop', color: 'green' },
  { title: 'Premium Designer Black', size: 'M', rating: 4.8, price: 2499, shape: 'square', image: 'https://images.pexels.com/photos/3622605/pexels-photo-3622605.jpeg?w=400&h=400&fit=crop', color: 'black' },
  { title: 'Luxury Brown Clubmaster', size: 'L', rating: 4.6, price: 2199, shape: 'square', image: 'https://images.pexels.com/photos/3622604/pexels-photo-3622604.jpeg?w=400&h=400&fit=crop', color: 'brown' },
  { title: 'Trendy Pink Cat Eye', size: 'S', rating: 4.4, price: 1699, shape: 'cat-eye', image: 'https://images.pexels.com/photos/3622603/pexels-photo-3622603.jpeg?w=400&h=400&fit=crop', color: 'pink' },
  { title: 'Urban Silver Pilot', size: 'M', rating: 4.3, price: 1899, shape: 'aviator', image: 'https://images.pexels.com/photos/3622602/pexels-photo-3622602.jpeg?w=400&h=400&fit=crop', color: 'silver' },
  { title: 'Classic Red Wayfarer', size: 'M', rating: 4.5, price: 1499, shape: 'square', image: 'https://images.pexels.com/photos/3622601/pexels-photo-3622601.jpeg?w=400&h=400&fit=crop', color: 'red' },
  { title: 'Metal Gold Round', size: 'L', rating: 4.2, price: 1299, shape: 'round', image: 'https://images.pexels.com/photos/3622600/pexels-photo-3622600.jpeg?w=400&h=400&fit=crop', color: 'gold' },
  { title: 'Oversized Black Oval', size: 'XL', rating: 4.1, price: 1799, shape: 'oval', image: 'https://images.pexels.com/photos/3622599/pexels-photo-3622599.jpeg?w=400&h=400&fit=crop', color: 'black' },
  { title: 'Lightweight Blue Round', size: 'S', rating: 4.7, price: 999, shape: 'round', image: 'https://images.pexels.com/photos/3622598/pexels-photo-3622598.jpeg?w=400&h=400&fit=crop', color: 'blue' },
  { title: 'Sports Performance Frame', size: 'M', rating: 4.5, price: 2099, shape: 'wrap', image: 'https://images.pexels.com/photos/3622597/pexels-photo-3622597.jpeg?w=400&h=400&fit=crop', color: 'black' },
  { title: 'Casual Tortoise Round', size: 'M', rating: 4.3, price: 1299, shape: 'round', image: 'https://images.pexels.com/photos/3622596/pexels-photo-3622596.jpeg?w=400&h=400&fit=crop', color: 'tortoise' },
  { title: 'Fashion Gold Cat Eye', size: 'S', rating: 4.6, price: 1899, shape: 'cat-eye', image: 'https://images.pexels.com/photos/3622595/pexels-photo-3622595.jpeg?w=400&h=400&fit=crop', color: 'gold' },
  { title: 'Minimalist Green Circle', size: 'M', rating: 4.0, price: 899, shape: 'round', image: 'https://images.pexels.com/photos/3622594/pexels-photo-3622594.jpeg?w=400&h=400&fit=crop', color: 'green' },
  { title: 'Bold Black Hexagon', size: 'L', rating: 4.4, price: 1599, shape: 'hexagon', image: 'https://images.pexels.com/photos/3622593/pexels-photo-3622593.jpeg?w=400&h=400&fit=crop', color: 'black' },
  { title: 'Elegant Rose Gold Oval', size: 'M', rating: 4.5, price: 1699, shape: 'oval', image: 'https://images.pexels.com/photos/3622592/pexels-photo-3622592.jpeg?w=400&h=400&fit=crop', color: 'rose gold' },
  { title: 'Vintage Brown Aviator', size: 'L', rating: 4.7, price: 1999, shape: 'aviator', image: 'https://images.pexels.com/photos/3622591/pexels-photo-3622591.jpeg?w=400&h=400&fit=crop', color: 'brown' },
  { title: 'Crystal Clear Wayfarer', size: 'M', rating: 4.2, price: 1399, shape: 'square', image: 'https://images.pexels.com/photos/3622590/pexels-photo-3622590.jpeg?w=400&h=400&fit=crop', color: 'clear' },
  { title: 'Sleek Silver Cat Eye', size: 'S', rating: 4.6, price: 1799, shape: 'cat-eye', image: 'https://images.pexels.com/photos/3622589/pexels-photo-3622589.jpeg?w=400&h=400&fit=crop', color: 'silver' },
  { title: 'Funky Pink Round', size: 'M', rating: 4.1, price: 1199, shape: 'round', image: 'https://images.pexels.com/photos/3622588/pexels-photo-3622588.jpeg?w=400&h=400&fit=crop', color: 'pink' },
  { title: 'Premium Tortoise Square', size: 'L', rating: 4.8, price: 2299, shape: 'square', image: 'https://images.pexels.com/photos/3622587/pexels-photo-3622587.jpeg?w=400&h=400&fit=crop', color: 'tortoise' },
  { title: 'Street Red Oval', size: 'M', rating: 4.3, price: 1499, shape: 'oval', image: 'https://images.pexels.com/photos/3622586/pexels-photo-3622586.jpeg?w=400&h=400&fit=crop', color: 'red' },
  { title: 'Classic Black Pilot', size: 'M', rating: 4.5, price: 1599, shape: 'aviator', image: 'https://images.pexels.com/photos/3622585/pexels-photo-3622585.jpeg?w=400&h=400&fit=crop', color: 'black' },
  { title: 'Retro Gold Square', size: 'S', rating: 4.2, price: 1299, shape: 'square', image: 'https://images.pexels.com/photos/3622584/pexels-photo-3622584.jpeg?w=400&h=400&fit=crop', color: 'gold' },
  { title: 'Modern Silver Hexagon', size: 'M', rating: 4.4, price: 1699, shape: 'hexagon', image: 'https://images.pexels.com/photos/3622583/pexels-photo-3622583.jpeg?w=400&h=400&fit=crop', color: 'silver' },
  { title: 'Comfort Blue Round', size: 'L', rating: 4.6, price: 1399, shape: 'round', image: 'https://images.pexels.com/photos/3622582/pexels-photo-3622582.jpeg?w=400&h=400&fit=crop', color: 'blue' },
  { title: 'Designer Brown Wayfarer', size: 'M', rating: 4.7, price: 2099, shape: 'square', image: 'https://images.pexels.com/photos/3622581/pexels-photo-3622581.jpeg?w=400&h=400&fit=crop', color: 'brown' },
  { title: 'Lightweight Green Round', size: 'S', rating: 4.1, price: 999, shape: 'round', image: 'https://images.pexels.com/photos/3622580/pexels-photo-3622580.jpeg?w=400&h=400&fit=crop', color: 'green' },
  { title: 'Fashion Black Cat Eye', size: 'M', rating: 4.5, price: 1799, shape: 'cat-eye', image: 'https://images.pexels.com/photos/3622579/pexels-photo-3622579.jpeg?w=400&h=400&fit=crop', color: 'black' },
  { title: 'Sports Black Wrap', size: 'XL', rating: 4.3, price: 1899, shape: 'wrap', image: 'https://images.pexels.com/photos/3622578/pexels-photo-3622578.jpeg?w=400&h=400&fit=crop', color: 'black' },
  { title: 'Trendy Gold Oval', size: 'M', rating: 4.2, price: 1499, shape: 'oval', image: 'https://images.pexels.com/photos/3622577/pexels-photo-3622577.jpeg?w=400&h=400&fit=crop', color: 'gold' },
  { title: 'Premium Tortoise Round', size: 'L', rating: 4.6, price: 1699, shape: 'round', image: 'https://images.pexels.com/photos/3622576/pexels-photo-3622576.jpeg?w=400&h=400&fit=crop', color: 'tortoise' },
  { title: 'Clear Vision Square', size: 'M', rating: 4.4, price: 1399, shape: 'square', image: 'https://images.pexels.com/photos/3622575/pexels-photo-3622575.jpeg?w=400&h=400&fit=crop', color: 'clear' },
  { title: 'Bold Gold Aviator', size: 'L', rating: 4.7, price: 1999, shape: 'aviator', image: 'https://images.pexels.com/photos/3622574/pexels-photo-3622574.jpeg?w=400&h=400&fit=crop', color: 'gold' },
  { title: 'Casual Pink Square', size: 'S', rating: 4.1, price: 1199, shape: 'square', image: 'https://images.pexels.com/photos/3622573/pexels-photo-3622573.jpeg?w=400&h=400&fit=crop', color: 'pink' },
  { title: 'Elegant Rose Gold Round', size: 'M', rating: 4.5, price: 1599, shape: 'round', image: 'https://images.pexels.com/photos/3622572/pexels-photo-3622572.jpeg?w=400&h=400&fit=crop', color: 'rose gold' },
  { title: 'Sophisticated Brown Hexagon', size: 'M', rating: 4.3, price: 1699, shape: 'hexagon', image: 'https://images.pexels.com/photos/3622571/pexels-photo-3622571.jpeg?w=400&h=400&fit=crop', color: 'brown' },
  { title: 'Urban Silver Cat Eye', size: 'S', rating: 4.6, price: 1799, shape: 'cat-eye', image: 'https://images.pexels.com/photos/3622570/pexels-photo-3622570.jpeg?w=400&h=400&fit=crop', color: 'silver' },
  { title: 'Professional Black Square', size: 'M', rating: 4.4, price: 1499, shape: 'square', image: 'https://images.pexels.com/photos/3622569/pexels-photo-3622569.jpeg?w=400&h=400&fit=crop', color: 'black' },
  { title: 'Sport Blue Round', size: 'L', rating: 4.2, price: 1399, shape: 'round', image: 'https://images.pexels.com/photos/3622568/pexels-photo-3622568.jpeg?w=400&h=400&fit=crop', color: 'blue' },
  { title: 'Retro Brown Oval', size: 'M', rating: 4.5, price: 1299, shape: 'oval', image: 'https://images.pexels.com/photos/3622567/pexels-photo-3622567.jpeg?w=400&h=400&fit=crop', color: 'brown' },
  { title: 'Luxury Black Aviator', size: 'M', rating: 4.8, price: 2299, shape: 'aviator', image: 'https://images.pexels.com/photos/3622566/pexels-photo-3622566.jpeg?w=400&h=400&fit=crop', color: 'black' },
  { title: 'Budget Silver Round', size: 'S', rating: 3.9, price: 799, shape: 'round', image: 'https://images.pexels.com/photos/3622565/pexels-photo-3622565.jpeg?w=400&h=400&fit=crop', color: 'silver' },
  { title: 'Fashion Red Square', size: 'M', rating: 4.3, price: 1599, shape: 'square', image: 'https://images.pexels.com/photos/3622564/pexels-photo-3622564.jpeg?w=400&h=400&fit=crop', color: 'red' },
  { title: 'Eco Friendly Round', size: 'M', rating: 4.1, price: 999, shape: 'round', image: 'https://images.pexels.com/photos/3622563/pexels-photo-3622563.jpeg?w=400&h=400&fit=crop', color: 'green' },
  { title: 'Designer Gold Cat Eye', size: 'S', rating: 4.7, price: 1999, shape: 'cat-eye', image: 'https://images.pexels.com/photos/3622562/pexels-photo-3622562.jpeg?w=400&h=400&fit=crop', color: 'gold' },
  { title: 'Premium Black Oval', size: 'L', rating: 4.6, price: 1899, shape: 'oval', image: 'https://images.pexels.com/photos/3622561/pexels-photo-3622561.jpeg?w=400&h=400&fit=crop', color: 'black' },
  { title: 'Casual Pink Hexagon', size: 'M', rating: 4.2, price: 1299, shape: 'hexagon', image: 'https://images.pexels.com/photos/3622560/pexels-photo-3622560.jpeg?w=400&h=400&fit=crop', color: 'pink' },
  { title: 'Street Blue Square', size: 'M', rating: 4.4, price: 1499, shape: 'square', image: 'https://images.pexels.com/photos/3622559/pexels-photo-3622559.jpeg?w=400&h=400&fit=crop', color: 'blue' },
  { title: 'Summer Gold Round', size: 'L', rating: 4.5, price: 1599, shape: 'round', image: 'https://images.pexels.com/photos/3622558/pexels-photo-3622558.jpeg?w=400&h=400&fit=crop', color: 'gold' },
  { title: 'Winter White Aviator', size: 'M', rating: 4.3, price: 1799, shape: 'aviator', image: 'https://images.pexels.com/photos/3622557/pexels-photo-3622557.jpeg?w=400&h=400&fit=crop', color: 'white' },
  { title: 'Classic Silver Oval', size: 'M', rating: 4.1, price: 1199, shape: 'oval', image: 'https://images.pexels.com/photos/3622556/pexels-photo-3622556.jpeg?w=400&h=400&fit=crop', color: 'silver' },
  { title: 'Trendy Red Wrap', size: 'XL', rating: 4.6, price: 1899, shape: 'wrap', image: 'https://images.pexels.com/photos/3622555/pexels-photo-3622555.jpeg?w=400&h=400&fit=crop', color: 'red' },
  { title: 'Elite Gold Square', size: 'M', rating: 4.8, price: 2199, shape: 'square', image: 'https://images.pexels.com/photos/3622554/pexels-photo-3622554.jpeg?w=400&h=400&fit=crop', color: 'gold' },
  { title: 'Everyday Brown Round', size: 'L', rating: 4.2, price: 1299, shape: 'round', image: 'https://images.pexels.com/photos/3622553/pexels-photo-3622553.jpeg?w=400&h=400&fit=crop', color: 'brown' },
  { title: 'Stylish Blue Cat Eye', size: 'S', rating: 4.5, price: 1699, shape: 'cat-eye', image: 'https://images.pexels.com/photos/3622552/pexels-photo-3622552.jpeg?w=400&h=400&fit=crop', color: 'blue' },
  { title: 'Bold Silver Aviator', size: 'L', rating: 4.4, price: 1899, shape: 'aviator', image: 'https://images.pexels.com/photos/3622551/pexels-photo-3622551.jpeg?w=400&h=400&fit=crop', color: 'silver' },
  { title: 'Elegant Gold Hexagon', size: 'M', rating: 4.6, price: 1799, shape: 'hexagon', image: 'https://images.pexels.com/photos/3622550/pexels-photo-3622550.jpeg?w=400&h=400&fit=crop', color: 'gold' },
  { title: 'Professional Blue Oval', size: 'M', rating: 4.3, price: 1499, shape: 'oval', image: 'https://images.pexels.com/photos/3622549/pexels-photo-3622549.jpeg?w=400&h=400&fit=crop', color: 'blue' },
  { title: 'Modern Tortoise Square', size: 'M', rating: 4.7, price: 1999, shape: 'square', image: 'https://images.pexels.com/photos/3622548/pexels-photo-3622548.jpeg?w=400&h=400&fit=crop', color: 'tortoise' },
  { title: 'Casual Red Round', size: 'L', rating: 4.1, price: 1199, shape: 'round', image: 'https://images.pexels.com/photos/3622547/pexels-photo-3622547.jpeg?w=400&h=400&fit=crop', color: 'red' },
  { title: 'Luxury Pink Cat Eye', size: 'S', rating: 4.8, price: 2099, shape: 'cat-eye', image: 'https://images.pexels.com/photos/3622546/pexels-photo-3622546.jpeg?w=400&h=400&fit=crop', color: 'pink' },
  { title: 'Sport Blue Aviator', size: 'M', rating: 4.5, price: 1799, shape: 'aviator', image: 'https://images.pexels.com/photos/3622545/pexels-photo-3622545.jpeg?w=400&h=400&fit=crop', color: 'blue' },
  { title: 'Vintage Green Wrap', size: 'XL', rating: 4.2, price: 1699, shape: 'wrap', image: 'https://images.pexels.com/photos/3622544/pexels-photo-3622544.jpeg?w=400&h=400&fit=crop', color: 'green' },
  { title: 'Simple Gold Oval', size: 'M', rating: 4.4, price: 1399, shape: 'oval', image: 'https://images.pexels.com/photos/3622543/pexels-photo-3622543.jpeg?w=400&h=400&fit=crop', color: 'gold' },
  { title: 'Chic White Square', size: 'M', rating: 4.6, price: 1599, shape: 'square', image: 'https://images.pexels.com/photos/3622542/pexels-photo-3622542.jpeg?w=400&h=400&fit=crop', color: 'white' },
  { title: 'Eco Brown Round', size: 'S', rating: 4.0, price: 899, shape: 'round', image: 'https://images.pexels.com/photos/3622541/pexels-photo-3622541.jpeg?w=400&h=400&fit=crop', color: 'brown' },
  { title: 'Premium Pink Hexagon', size: 'M', rating: 4.7, price: 1899, shape: 'hexagon', image: 'https://images.pexels.com/photos/3622540/pexels-photo-3622540.jpeg?w=400&h=400&fit=crop', color: 'pink' },
  { title: 'Urban Black Oval', size: 'L', rating: 4.3, price: 1599, shape: 'oval', image: 'https://images.pexels.com/photos/3622539/pexels-photo-3622539.jpeg?w=400&h=400&fit=crop', color: 'black' },
  { title: 'Designer Gold Round', size: 'M', rating: 4.8, price: 2299, shape: 'round', image: 'https://images.pexels.com/photos/3622538/pexels-photo-3622538.jpeg?w=400&h=400&fit=crop', color: 'gold' },
  { title: 'Budget Blue Cat Eye', size: 'S', rating: 4.0, price: 999, shape: 'cat-eye', image: 'https://images.pexels.com/photos/3622537/pexels-photo-3622537.jpeg?w=400&h=400&fit=crop', color: 'blue' },
  { title: 'Classic Rose Aviator', size: 'M', rating: 4.5, price: 1699, shape: 'aviator', image: 'https://images.pexels.com/photos/3622536/pexels-photo-3622536.jpeg?w=400&h=400&fit=crop', color: 'rose gold' },
  { title: 'Casual Silver Wrap', size: 'XL', rating: 4.4, price: 1799, shape: 'wrap', image: 'https://images.pexels.com/photos/3622535/pexels-photo-3622535.jpeg?w=400&h=400&fit=crop', color: 'silver' },
  { title: 'Fashion Green Square', size: 'M', rating: 4.2, price: 1499, shape: 'square', image: 'https://images.pexels.com/photos/3622534/pexels-photo-3622534.jpeg?w=400&h=400&fit=crop', color: 'green' },
  { title: 'Retro Blue Hexagon', size: 'M', rating: 4.6, price: 1599, shape: 'hexagon', image: 'https://images.pexels.com/photos/3622533/pexels-photo-3622533.jpeg?w=400&h=400&fit=crop', color: 'blue' },
  { title: 'Premium Red Oval', size: 'L', rating: 4.5, price: 1799, shape: 'oval', image: 'https://images.pexels.com/photos/3622532/pexels-photo-3622532.jpeg?w=400&h=400&fit=crop', color: 'red' },
  { title: 'Luxury White Round', size: 'M', rating: 4.7, price: 1999, shape: 'round', image: 'https://images.pexels.com/photos/3622531/pexels-photo-3622531.jpeg?w=400&h=400&fit=crop', color: 'white' },
  { title: 'Trendy Red Cat Eye', size: 'S', rating: 4.3, price: 1599, shape: 'cat-eye', image: 'https://images.pexels.com/photos/3622530/pexels-photo-3622530.jpeg?w=400&h=400&fit=crop', color: 'red' },
  { title: 'Bold Pink Aviator', size: 'M', rating: 4.6, price: 1899, shape: 'aviator', image: 'https://images.pexels.com/photos/3622529/pexels-photo-3622529.jpeg?w=400&h=400&fit=crop', color: 'pink' },
  { title: 'Sport Yellow Wrap', size: 'XL', rating: 4.1, price: 1699, shape: 'wrap', image: 'https://images.pexels.com/photos/3622528/pexels-photo-3622528.jpeg?w=400&h=400&fit=crop', color: 'yellow' },
  { title: 'Stylish Gray Square', size: 'M', rating: 4.4, price: 1399, shape: 'square', image: 'https://images.pexels.com/photos/3622527/pexels-photo-3622527.jpeg?w=400&h=400&fit=crop', color: 'gray' },
  { title: 'Casual Pink Round', size: 'S', rating: 4.2, price: 1199, shape: 'round', image: 'https://images.pexels.com/photos/3622526/pexels-photo-3622526.jpeg?w=400&h=400&fit=crop', color: 'pink' },
  { title: 'Elegant Red Hexagon', size: 'M', rating: 4.5, price: 1699, shape: 'hexagon', image: 'https://images.pexels.com/photos/3622525/pexels-photo-3622525.jpeg?w=400&h=400&fit=crop', color: 'red' },
  { title: 'Professional Gold Oval', size: 'L', rating: 4.7, price: 1899, shape: 'oval', image: 'https://images.pexels.com/photos/3622524/pexels-photo-3622524.jpeg?w=400&h=400&fit=crop', color: 'gold' },
  { title: 'Modern Blue Square', size: 'M', rating: 4.3, price: 1499, shape: 'square', image: 'https://images.pexels.com/photos/3622523/pexels-photo-3622523.jpeg?w=400&h=400&fit=crop', color: 'blue' },
  { title: 'Vintage Gray Round', size: 'L', rating: 4.1, price: 1299, shape: 'round', image: 'https://images.pexels.com/photos/3622522/pexels-photo-3622522.jpeg?w=400&h=400&fit=crop', color: 'gray' },
  { title: 'Luxury Green Cat Eye', size: 'S', rating: 4.8, price: 2199, shape: 'cat-eye', image: 'https://images.pexels.com/photos/3622521/pexels-photo-3622521.jpeg?w=400&h=400&fit=crop', color: 'green' },
  { title: 'Fashion Black Aviator', size: 'M', rating: 4.4, price: 1799, shape: 'aviator', image: 'https://images.pexels.com/photos/3622520/pexels-photo-3622520.jpeg?w=400&h=400&fit=crop', color: 'black' },
  { title: 'Urban Purple Wrap', size: 'XL', rating: 4.6, price: 1999, shape: 'wrap', image: 'https://images.pexels.com/photos/3622519/pexels-photo-3622519.jpeg?w=400&h=400&fit=crop', color: 'purple' },
  { title: 'Vintage Purple Round', size: 'M', rating: 4.2, price: 1399, shape: 'round', image: 'https://images.pexels.com/photos/3622518/pexels-photo-3622518.jpeg?w=400&h=400&fit=crop', color: 'purple' },
  { title: 'Bold Teal Square', size: 'L', rating: 4.5, price: 1699, shape: 'square', image: 'https://images.pexels.com/photos/3622517/pexels-photo-3622517.jpeg?w=400&h=400&fit=crop', color: 'teal' },
  { title: 'Minimalist Beige Oval', size: 'M', rating: 4.0, price: 999, shape: 'oval', image: 'https://images.pexels.com/photos/3622516/pexels-photo-3622516.jpeg?w=400&h=400&fit=crop', color: 'beige' },
  { title: 'Premium Navy Cat Eye', size: 'S', rating: 4.7, price: 1999, shape: 'cat-eye', image: 'https://images.pexels.com/photos/3622515/pexels-photo-3622515.jpeg?w=400&h=400&fit=crop', color: 'navy' }
];

const carts = [
  { title: 'Classic Black Wayfarer', price: 1299, quantity: 1, image: 'https://images.pexels.com/photos/3622613/pexels-photo-3622613.jpeg?w=400&h=400&fit=crop', userID: 'u1', userName: 'User One' },
  { title: 'Retro Brown Round', price: 1499, quantity: 2, image: 'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?w=400&h=400&fit=crop', userID: 'u2', userName: 'User Two' },
  { title: 'Gold Aviator Deluxe', price: 1999, quantity: 1, image: 'https://images.pexels.com/photos/3622612/pexels-photo-3622612.jpeg?w=400&h=400&fit=crop', userID: 'u3', userName: 'User Three' },
  { title: 'Tortoise Cat Eye', price: 1599, quantity: 1, image: 'https://images.pexels.com/photos/3622614/pexels-photo-3622614.jpeg?w=400&h=400&fit=crop', userID: 'u4', userName: 'User Four' },
  { title: 'Silver Oval Minimal', price: 999, quantity: 3, image: 'https://images.pexels.com/photos/3622611/pexels-photo-3622611.jpeg?w=400&h=400&fit=crop', userID: 'u5', userName: 'User Five' },
  { title: 'Bold Black Square Pro', price: 2199, quantity: 1, image: 'https://images.pexels.com/photos/3622610/pexels-photo-3622610.jpeg?w=400&h=400&fit=crop', userID: 'u6', userName: 'User Six' },
  { title: 'Thin Silver Metal', price: 1199, quantity: 2, image: 'https://images.pexels.com/photos/3622609/pexels-photo-3622609.jpeg?w=400&h=400&fit=crop', userID: 'u7', userName: 'User Seven' },
  { title: 'Sports Blue Wrap', price: 1799, quantity: 1, image: 'https://images.pexels.com/photos/3622608/pexels-photo-3622608.jpeg?w=400&h=400&fit=crop', userID: 'u8', userName: 'User Eight' },
  { title: 'Vintage Brown Hexagon', price: 1399, quantity: 1, image: 'https://images.pexels.com/photos/3622607/pexels-photo-3622607.jpeg?w=400&h=400&fit=crop', userID: 'u9', userName: 'User Nine' },
  { title: 'Eco Green Frame', price: 899, quantity: 4, image: 'https://images.pexels.com/photos/3622606/pexels-photo-3622606.jpeg?w=400&h=400&fit=crop', userID: 'u10', userName: 'User Ten' }
];

const orders = [
  { title: 'Classic Black Wayfarer', price: 1299, quantity: 1, image: 'https://images.pexels.com/photos/3622613/pexels-photo-3622613.jpeg?w=400&h=400&fit=crop', userID: 'u1', userName: 'User One', status: 'Placed' },
  { title: 'Retro Brown Round', price: 1499, quantity: 1, image: 'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?w=400&h=400&fit=crop', userID: 'u2', userName: 'User Two', status: 'Shipped' },
  { title: 'Gold Aviator Deluxe', price: 1999, quantity: 1, image: 'https://images.pexels.com/photos/3622612/pexels-photo-3622612.jpeg?w=400&h=400&fit=crop', userID: 'u3', userName: 'User Three', status: 'Delivered' },
  { title: 'Tortoise Cat Eye', price: 1599, quantity: 2, image: 'https://images.pexels.com/photos/3622614/pexels-photo-3622614.jpeg?w=400&h=400&fit=crop', userID: 'u4', userName: 'User Four', status: 'Cancelled' },
  { title: 'Silver Oval Minimal', price: 999, quantity: 1, image: 'https://images.pexels.com/photos/3622611/pexels-photo-3622611.jpeg?w=400&h=400&fit=crop', userID: 'u5', userName: 'User Five', status: 'Placed' },
  { title: 'Bold Black Square Pro', price: 2199, quantity: 1, image: 'https://images.pexels.com/photos/3622610/pexels-photo-3622610.jpeg?w=400&h=400&fit=crop', userID: 'u6', userName: 'User Six', status: 'Placed' },
  { title: 'Thin Silver Metal', price: 1199, quantity: 3, image: 'https://images.pexels.com/photos/3622609/pexels-photo-3622609.jpeg?w=400&h=400&fit=crop', userID: 'u7', userName: 'User Seven', status: 'Shipped' },
  { title: 'Sports Blue Wrap', price: 1799, quantity: 1, image: 'https://images.pexels.com/photos/3622608/pexels-photo-3622608.jpeg?w=400&h=400&fit=crop', userID: 'u8', userName: 'User Eight', status: 'Delivered' },
  { title: 'Vintage Brown Hexagon', price: 1399, quantity: 1, image: 'https://images.pexels.com/photos/3622607/pexels-photo-3622607.jpeg?w=400&h=400&fit=crop', userID: 'u9', userName: 'User Nine', status: 'Placed' },
  { title: 'Eco Green Frame', price: 899, quantity: 2, image: 'https://images.pexels.com/photos/3622606/pexels-photo-3622606.jpeg?w=400&h=400&fit=crop', userID: 'u10', userName: 'User Ten', status: 'Placed' }
];

async function upsertMany(Model, items, filterFn) {
  let upserted = 0;
  for (const item of items) {
    const filter = filterFn(item);
    await Model.updateOne(filter, { $set: item }, { upsert: true });
    upserted++;
  }
  return upserted;
}

async function seed() {
  await connectDB();

  const a = await upsertMany(AdminModel, admins, (d) => ({ email: d.email }));
  console.log(`Admins upserted: ${a}`);

  const u = await upsertMany(UserModel, users, (d) => ({ email: d.email }));
  console.log(`Users upserted: ${u}`);

  const e = await upsertMany(EyeglassesModel, eyeglasses, (d) => ({ title: d.title }));
  console.log(`Eyeglasses upserted: ${e}`);

  const c = await upsertMany(CartModel, carts, (d) => ({ title: d.title, userID: d.userID }));
  console.log(`Carts upserted: ${c}`);

  const o = await upsertMany(OrderModel, orders, (d) => ({ title: d.title, userID: d.userID }));
  console.log(`Orders upserted: ${o}`);

  console.log('Seeding complete.');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seeding error:', err);
  process.exit(1);
});
