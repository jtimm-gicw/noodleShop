const express=require('express');
const {Order,OrderItem}=require('../models');
const requireAuth=require('../middleware/auth');
const events=require('../events/events');
const router=express.Router();
router.use(requireAuth);
// Classroom catalog/prices: validate against server-owned data, never trust client prices.
const catalog={
 '1':['Pad Thai',8.99],'2':['Drunken Noodles (Pad Kee Mao)',9.49],
 '3':['Tom Yum Noodle Soup',10.50],'4':['Khao Soi',11.00],
 '5':['Glass Noodles (Pad Woon Sen)',8.50],'6':['Boat Noodles (Kuay Teow Reua)',7.99],
 '7':['Yen Ta Fo (Pink Noodle Soup)',10.00],
 '8':['Stir-fried Rice Noodles with Beef (Rad Na)',9.25],
 '9':['Thai Curry Noodles (Panang Noodles)',11.50],'10':['Pad Mama',12.00]
};
router.get('/',async(req,res,next)=>{
 try{res.json(await Order.findAll({where:{userId:req.auth.id},include:[{model:OrderItem,as:'items'}],order:[['createdAt','DESC']]}));}catch(e){next(e);}
});
router.post('/',async(req,res,next)=>{
 try{
   const address=String(req.body.deliveryAddress||'').trim();
   const input=req.body.items;
   if(!address || address.length>500 || !Array.isArray(input)||!input.length||input.length>30)
     return res.status(400).json({error:'Valid address and items required'});
   const items=[];
   for(const x of input){
     const entry=catalog[String(x.id)];const qty=Number(x.qty);
     if(!entry || !Number.isInteger(qty)||qty<1||qty>30) return res.status(400).json({error:'Invalid dish or quantity'});
     items.push({dishId:String(x.id),name:entry[0],price:entry[1],qty});
   }
   const total=items.reduce((sum,x)=>sum+Math.round(x.price*100)*x.qty,0)/100;
   const order=await Order.sequelize.transaction(async transaction=>{
     const created=await Order.create({userId:req.auth.id,total,deliveryAddress:address},{transaction});
     await OrderItem.bulkCreate(items.map(x=>({...x,orderId:created.id})),{transaction});
     return created;
   });
   res.status(201).json({id:order.id,status:order.status,total:order.total});
   // Emit after DB commit. Kitchen and driver are independently subscribed.
   events.emit('order-placed',{orderId:order.id,status:'order-placed',timestamp:new Date().toISOString()});
 }catch(e){next(e);}
});
module.exports=router;
