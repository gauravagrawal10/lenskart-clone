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

const eyeglasses = [
  { title: 'Classic Square', size: 'M', rating: 4.5, price: 1299, shape: 'square', image: '/images/eye1.jpg', color: 'black' },
  { title: 'Retro Round', size: 'L', rating: 4.2, price: 1499, shape: 'round', image: '/images/eye2.jpg', color: 'brown' },
  { title: 'Aviator Slim', size: 'M', rating: 4.6, price: 1999, shape: 'aviator', image: '/images/eye3.jpg', color: 'gold' },
  { title: 'Modern Cat', size: 'S', rating: 4.3, price: 1599, shape: 'cat-eye', image: '/images/eye4.jpg', color: 'tortoise' },
  { title: 'Minimal Oval', size: 'M', rating: 4.0, price: 999, shape: 'oval', image: '/images/eye5.jpg', color: 'silver' },
  { title: 'Bold Square', size: 'L', rating: 4.7, price: 2199, shape: 'square', image: '/images/eye6.jpg', color: 'black' },
  { title: 'Thin Metal', size: 'M', rating: 4.1, price: 1199, shape: 'round', image: '/images/eye7.jpg', color: 'silver' },
  { title: 'Sport Wrap', size: 'XL', rating: 4.4, price: 1799, shape: 'wrap', image: '/images/eye8.jpg', color: 'blue' },
  { title: 'Vintage Hex', size: 'M', rating: 4.2, price: 1399, shape: 'hexagon', image: '/images/eye9.jpg', color: 'brown' },
  { title: 'Eco Frame', size: 'S', rating: 4.0, price: 899, shape: 'round', image: '/images/eye10.jpg', color: 'green' }
];

const carts = [
  { title: 'Classic Square', price: 1299, quantity: 1, image: '/images/eye1.jpg', userID: 'u1', userName: 'User One' },
  { title: 'Retro Round', price: 1499, quantity: 2, image: '/images/eye2.jpg', userID: 'u2', userName: 'User Two' },
  { title: 'Aviator Slim', price: 1999, quantity: 1, image: '/images/eye3.jpg', userID: 'u3', userName: 'User Three' },
  { title: 'Modern Cat', price: 1599, quantity: 1, image: '/images/eye4.jpg', userID: 'u4', userName: 'User Four' },
  { title: 'Minimal Oval', price: 999, quantity: 3, image: '/images/eye5.jpg', userID: 'u5', userName: 'User Five' },
  { title: 'Bold Square', price: 2199, quantity: 1, image: '/images/eye6.jpg', userID: 'u6', userName: 'User Six' },
  { title: 'Thin Metal', price: 1199, quantity: 2, image: '/images/eye7.jpg', userID: 'u7', userName: 'User Seven' },
  { title: 'Sport Wrap', price: 1799, quantity: 1, image: '/images/eye8.jpg', userID: 'u8', userName: 'User Eight' },
  { title: 'Vintage Hex', price: 1399, quantity: 1, image: '/images/eye9.jpg', userID: 'u9', userName: 'User Nine' },
  { title: 'Eco Frame', price: 899, quantity: 4, image: '/images/eye10.jpg', userID: 'u10', userName: 'User Ten' }
];

const orders = [
  { title: 'Classic Square', price: 1299, quantity: 1, image: '/images/eye1.jpg', userID: 'u1', userName: 'User One', status: 'Placed' },
  { title: 'Retro Round', price: 1499, quantity: 1, image: '/images/eye2.jpg', userID: 'u2', userName: 'User Two', status: 'Shipped' },
  { title: 'Aviator Slim', price: 1999, quantity: 1, image: '/images/eye3.jpg', userID: 'u3', userName: 'User Three', status: 'Delivered' },
  { title: 'Modern Cat', price: 1599, quantity: 2, image: '/images/eye4.jpg', userID: 'u4', userName: 'User Four', status: 'Cancelled' },
  { title: 'Minimal Oval', price: 999, quantity: 1, image: '/images/eye5.jpg', userID: 'u5', userName: 'User Five', status: 'Placed' },
  { title: 'Bold Square', price: 2199, quantity: 1, image: '/images/eye6.jpg', userID: 'u6', userName: 'User Six', status: 'Placed' },
  { title: 'Thin Metal', price: 1199, quantity: 3, image: '/images/eye7.jpg', userID: 'u7', userName: 'User Seven', status: 'Shipped' },
  { title: 'Sport Wrap', price: 1799, quantity: 1, image: '/images/eye8.jpg', userID: 'u8', userName: 'User Eight', status: 'Delivered' },
  { title: 'Vintage Hex', price: 1399, quantity: 1, image: '/images/eye9.jpg', userID: 'u9', userName: 'User Nine', status: 'Placed' },
  { title: 'Eco Frame', price: 899, quantity: 2, image: '/images/eye10.jpg', userID: 'u10', userName: 'User Ten', status: 'Placed' }
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
  console.error('Seeding failed:', err);
  process.exit(1);
});
