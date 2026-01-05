const mongoose=require('mongoose');

const ordersSchema=mongoose.Schema({
    title:{type:String,required:true},
    price:{type:Number,required:true},
    quantity:{type:Number,required:true},
    image:{type:String,required:true},
    userID:{type:String,required:true},
    userName:{type:String,required:true},
    status: {
    type: String,
    enum: ["Placed", "Shipped", "Out for Delivery", "Delivered"],
    default: "Placed"
    },
    createdAt: {
    type: Date,
    default: Date.now
    },
    updatedAt: {
    type: Date,
    default: Date.now
    }
},{
    versionKey:false
});

const OrderModel=mongoose.model('order',ordersSchema);

module.exports={OrderModel};