const events = require('./events');
const { Order } = require('../models');
const timers = new Set();
async function advance(orderId,status){
  const [count] = await Order.update({status},{where:{id:orderId}});
  if(count) {const payload={orderId,status,timestamp:new Date().toISOString()};console.log('👨‍🍳 Kitchen:',payload);events.emit(status,payload);}
}
events.on('order-placed', ({orderId})=>{
  // Teaching simulator only; do not use timers as a production job queue.
  const a=setTimeout(()=>{timers.delete(a);advance(orderId,'confirmed').catch(console.error)},2000);timers.add(a);
  const b=setTimeout(()=>{timers.delete(b);advance(orderId,'preparing').catch(console.error)},4000);timers.add(b);
  const c=setTimeout(()=>{timers.delete(c);advance(orderId,'ready-for-pickup').catch(console.error)},7000);timers.add(c);
});
