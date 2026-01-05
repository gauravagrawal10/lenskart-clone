require('dotenv').config();
const connectDB = require('../configs/db');
const bcrypt = require('bcrypt');
const { AdminModel } = require('../model/Admin.model');
const CartModel = require('../model/Cart.model');
const { EyeglassesModel } = require('../model/Eyeglasses.model');
const { OrderModel } = require('../model/Orders.model');
const { UserModel } = require('../model/User.model');
const WishlistModel = require('../model/Wishlist.model');

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

// Hash admin passwords before seeding to ensure login works with bcrypt.compare
const adminsHashed = admins.map((a) => ({
  ...a,
  password: bcrypt.hashSync(a.password, 10),
}));

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

const eyeglasses = Array.from({ length: 100 }, (_, i) => {
  const id = i + 1;
  const shapes = ['square', 'round', 'aviator', 'cat-eye', 'oval', 'hexagon', 'wrap'];
  const colors = ['black', 'brown', 'gold', 'tortoise', 'silver', 'pink', 'red', 'blue', 'green', 'white', 'gray', 'purple', 'rose gold', 'clear', 'yellow', 'beige', 'navy', 'teal', 'burgundy', 'bronze'];
  const sizes = ['S', 'M', 'L', 'XL'];
  
  return {
    title: `Premium Eyeglasses ${id}`,
    size: sizes[Math.floor(Math.random() * sizes.length)],
    rating: (Math.random() * 0.9 + 3.9).toFixed(1),
    price: Math.floor(Math.random() * 1500 + 799),
    shape: shapes[Math.floor(Math.random() * shapes.length)],
    image: `https://images.pexels.com/photos/371924/pexels-photo-371924.jpeg?w=400&h=400&fit=crop&id=${id}`,
    color: colors[Math.floor(Math.random() * colors.length)]
  };
});


const carts = [
  { title: 'Classic Square Black', price: 1299, quantity: 1, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop', userID: 'u1', userName: 'User One' },
  { title: 'Retro Round Brown', price: 1499, quantity: 2, image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0816?w=400&h=400&fit=crop', userID: 'u2', userName: 'User Two' },
  { title: 'Aviator Slim Gold', price: 1999, quantity: 1, image: 'https://images.unsplash.com/photo-1548681528-6a846cf17f18?w=400&h=400&fit=crop', userID: 'u3', userName: 'User Three' },
  { title: 'Modern Cat Tortoise', price: 1599, quantity: 1, image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop', userID: 'u4', userName: 'User Four' },
  { title: 'Minimal Oval Silver', price: 999, quantity: 3, image: 'https://images.unsplash.com/photo-1567318735868-e71b99932e29?w=400&h=400&fit=crop', userID: 'u5', userName: 'User Five' },
  { title: 'Bold Square Black', price: 2199, quantity: 1, image: 'https://images.unsplash.com/photo-1460289976868-a6b0b0874ef1?w=400&h=400&fit=crop', userID: 'u6', userName: 'User Six' },
  { title: 'Thin Metal Silver', price: 1199, quantity: 2, image: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=400&h=400&fit=crop', userID: 'u7', userName: 'User Seven' },
  { title: 'Sport Wrap Blue', price: 1799, quantity: 1, image: 'https://images.unsplash.com/photo-1559933297-d4c60544cf4f?w=400&h=400&fit=crop', userID: 'u8', userName: 'User Eight' },
  { title: 'Vintage Hex Brown', price: 1399, quantity: 1, image: 'https://images.unsplash.com/photo-1536086201745-9e1b55ba9f27?w=400&h=400&fit=crop', userID: 'u9', userName: 'User Nine' },
  { title: 'Eco Frame Green', price: 899, quantity: 4, image: 'https://images.unsplash.com/photo-1549887534-f3270c88bef5?w=400&h=400&fit=crop', userID: 'u10', userName: 'User Ten' },
];

const orders = [
  { title: 'Classic Square Black', price: 1299, quantity: 1, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop', userID: 'u1', userName: 'User One', status: 'Placed', createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
  { title: 'Retro Round Brown', price: 1499, quantity: 1, image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0816?w=400&h=400&fit=crop', userID: 'u2', userName: 'User Two', status: 'Shipped', createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000) },
  { title: 'Aviator Slim Gold', price: 1999, quantity: 1, image: 'https://images.unsplash.com/photo-1548681528-6a846cf17f18?w=400&h=400&fit=crop', userID: 'u3', userName: 'User Three', status: 'Delivered', createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
  { title: 'Modern Cat Tortoise', price: 1599, quantity: 2, image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop', userID: 'u4', userName: 'User Four', status: 'Placed', createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) },
  { title: 'Minimal Oval Silver', price: 999, quantity: 1, image: 'https://images.unsplash.com/photo-1567318735868-e71b99932e29?w=400&h=400&fit=crop', userID: 'u5', userName: 'User Five', status: 'Out for Delivery', createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) },
  { title: 'Bold Square Black', price: 2199, quantity: 1, image: 'https://images.unsplash.com/photo-1460289976868-a6b0b0874ef1?w=400&h=400&fit=crop', userID: 'u6', userName: 'User Six', status: 'Placed', createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) },
  { title: 'Thin Metal Silver', price: 1199, quantity: 3, image: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=400&h=400&fit=crop', userID: 'u7', userName: 'User Seven', status: 'Shipped', createdAt: new Date(Date.now() - 4.5 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 4.5 * 24 * 60 * 60 * 1000) },
  { title: 'Sport Wrap Blue', price: 1799, quantity: 1, image: 'https://images.unsplash.com/photo-1559933297-d4c60544cf4f?w=400&h=400&fit=crop', userID: 'u8', userName: 'User Eight', status: 'Delivered', createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000) },
  { title: 'Vintage Hex Brown', price: 1399, quantity: 1, image: 'https://images.unsplash.com/photo-1536086201745-9e1b55ba9f27?w=400&h=400&fit=crop', userID: 'u9', userName: 'User Nine', status: 'Placed', createdAt: new Date(Date.now() - 0.5 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 0.5 * 24 * 60 * 60 * 1000) },
  { title: 'Eco Frame Green', price: 899, quantity: 2, image: 'https://images.unsplash.com/photo-1549887534-f3270c88bef5?w=400&h=400&fit=crop', userID: 'u10', userName: 'User Ten', status: 'Out for Delivery', createdAt: new Date(Date.now() - 5.5 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 5.5 * 24 * 60 * 60 * 1000) }
];

const wishlists = [
  {
    userID: 'u1',
    items: [
      { _id: 'p1', title: 'Premium Eyeglasses 1', price: 1299, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop', size: 'M', color: 'black', rating: 4.5 },
      { _id: 'p5', title: 'Premium Eyeglasses 5', price: 1199, image: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=400&h=400&fit=crop', size: 'L', color: 'gold', rating: 4.2 }
    ]
  },
  {
    userID: 'u2',
    items: [
      { _id: 'p3', title: 'Premium Eyeglasses 3', price: 1599, image: 'https://images.unsplash.com/photo-1559933297-d4c60544cf4f?w=400&h=400&fit=crop', size: 'S', color: 'brown', rating: 4.8 },
      { _id: 'p7', title: 'Premium Eyeglasses 7', price: 1399, image: 'https://images.unsplash.com/photo-1536086201745-9e1b55ba9f27?w=400&h=400&fit=crop', size: 'M', color: 'silver', rating: 4.3 },
      { _id: 'p10', title: 'Premium Eyeglasses 10', price: 1299, image: 'https://images.unsplash.com/photo-1549887534-f3270c88bef5?w=400&h=400&fit=crop', size: 'L', color: 'tortoise', rating: 4.6 }
    ]
  },
  {
    userID: 'u3',
    items: [
      { _id: 'p2', title: 'Premium Eyeglasses 2', price: 1399, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop', size: 'M', color: 'gold', rating: 4.4 }
    ]
  },
  {
    userID: 'u5',
    items: [
      { _id: 'p8', title: 'Premium Eyeglasses 8', price: 1299, image: 'https://images.unsplash.com/photo-1536086201745-9e1b55ba9f27?w=400&h=400&fit=crop', size: 'S', color: 'black', rating: 4.7 },
      { _id: 'p12', title: 'Premium Eyeglasses 12', price: 1599, image: 'https://images.unsplash.com/photo-1559933297-d4c60544cf4f?w=400&h=400&fit=crop', size: 'L', color: 'pink', rating: 4.1 }
    ]
  }
];

async function upsertMany(Model, items, filterFn) {
  let upserted = 0;
  for (const item of items) {
    const filter = filterFn(item);
    const existingDoc = await Model.findOne(filter);
    
    // If document exists, preserve createdAt (for orders)
    if (existingDoc && item.createdAt) {
      item.createdAt = existingDoc.createdAt;
    }
    
    await Model.updateOne(filter, { $set: item }, { upsert: true });
    upserted++;
  }
  return upserted;
}

async function seed() {
  await connectDB();

  const a = await upsertMany(AdminModel, adminsHashed, (d) => ({ email: d.email }));
  console.log(`Admins upserted: ${a}`);

  const u = await upsertMany(UserModel, users, (d) => ({ email: d.email }));
  console.log(`Users upserted: ${u}`);

  const e = await upsertMany(EyeglassesModel, eyeglasses, (d) => ({ title: d.title }));
  console.log(`Eyeglasses upserted: ${e}`);

  const c = await upsertMany(CartModel, carts, (d) => ({ title: d.title, userID: d.userID }));
  console.log(`Carts upserted: ${c}`);

  const o = await upsertMany(OrderModel, orders, (d) => ({ title: d.title, userID: d.userID }));
  console.log(`Orders upserted: ${o}`);

  const w = await upsertMany(WishlistModel, wishlists, (d) => ({ userID: d.userID }));
  console.log(`Wishlists upserted: ${w}`);

  console.log('Seeding complete.');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
