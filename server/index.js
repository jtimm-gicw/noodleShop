require('dotenv').config();
const express=require('express');
const cors=require('cors');
const {sequelize}=require('./models');
if(!process.env.DATABASE_URL || !process.env.JWT_SECRET) throw new Error('Set DATABASE_URL and JWT_SECRET in server/.env');
const app=express();
app.use(cors()); // Educational local API; restrict origins for production.
app.use(express.json({limit:'64kb'}));
app.get('/health',(_req,res)=>res.json({ok:true}));
app.use('/auth',require('./routes/auth'));
app.use('/orders',require('./routes/orders'));
require('./events/kitchen');
require('./events/driver');
app.use((err,_req,res,_next)=>{console.error(err);res.status(500).json({error:'Server error'});});
sequelize.authenticate()
 .then(()=>sequelize.sync()) // DEV ONLY: use migrations before deploying.
 .then(()=>app.listen(Number(process.env.PORT||3001),'0.0.0.0',()=>console.log('🍜 API on port',process.env.PORT||3001)))
 .catch(e=>{console.error('Database startup failed',e);process.exit(1)});
