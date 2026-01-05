// Helper to calculate order status based on days elapsed
export const getOrderStatusFromDate = (createdAt) => {
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

// Helper to get days elapsed
export const getDaysElapsed = (createdAt) => {
  const now = new Date();
  return Math.floor((now - new Date(createdAt)) / (1000 * 60 * 60 * 24));
};

// Helper to get next status update time
export const getNextStatusUpdate = (createdAt) => {
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

// Helper to format date
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};
