const events = require('./events');
const { Order } = require('../models');
async function advance(orderId,status){
  const [count]=await Order.update({status},{where:{id:orderId}});
  if(count){const payload={orderId,status,timestamp:new Date().toISOString()};console.log('🚗 Driver:',payload);events.emit(status,payload);}
}
events.on('ready-for-pickup',({orderId})=>{
  setTimeout(()=>advance(orderId,'out-for-delivery').catch(console.error),2000);
  setTimeout(()=>advance(orderId,'delivered').catch(console.error),6000);
});
