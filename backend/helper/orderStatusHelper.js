// Helper function to calculate order status based on days elapsed since creation
const getOrderStatus = (createdAt) => {
  const now = new Date();
  const daysElapsed = Math.floor((now - new Date(createdAt)) / (1000 * 60 * 60 * 24));

  if (daysElapsed < 4) {
    return "Placed";
  } else if (daysElapsed < 5) {
    return "Shipped";
  } else if (daysElapsed < 6) {
    return "Out for Delivery";
  } else {
    return "Delivered";
  }
};

// Helper function to get days elapsed
const getDaysElapsed = (createdAt) => {
  const now = new Date();
  return Math.floor((now - new Date(createdAt)) / (1000 * 60 * 60 * 24));
};

// Helper function to get next status update time
const getNextStatusUpdate = (createdAt) => {
  const daysElapsed = getDaysElapsed(createdAt);
  const createdDate = new Date(createdAt);
  
  if (daysElapsed < 4) {
    const shippedDate = new Date(createdDate);
    shippedDate.setDate(shippedDate.getDate() + 4);
    return shippedDate;
  } else if (daysElapsed < 5) {
    const outForDeliveryDate = new Date(createdDate);
    outForDeliveryDate.setDate(outForDeliveryDate.getDate() + 5);
    return outForDeliveryDate;
  } else if (daysElapsed < 6) {
    const deliveredDate = new Date(createdDate);
    deliveredDate.setDate(deliveredDate.getDate() + 6);
    return deliveredDate;
  }
  return null;
};

module.exports = {
  getOrderStatus,
  getDaysElapsed,
  getNextStatusUpdate,
};
