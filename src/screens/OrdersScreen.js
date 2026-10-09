import React,{useContext,useEffect,useState,useCallback} from 'react';
import {View,Text,FlatList,StyleSheet,RefreshControl} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {AuthContext} from '../context/AuthContext';
import {api} from '../api/client';
const names={'order-placed':'Order placed','confirmed':'Confirmed','preparing':'Preparing noodles','ready-for-pickup':'Ready for pickup','out-for-delivery':'Out for delivery','delivered':'Delivered'};
export default function OrdersScreen(){
 const {token}=useContext(AuthContext),[orders,setOrders]=useState([]),[error,setError]=useState(''),[busy,setBusy]=useState(false);
 const refresh=useCallback(async()=>{try{const data=await api('/orders',{token});setOrders(data);setError('')}catch(e){setError(e.message)}},[token]);
 useFocusEffect(useCallback(()=>{if(!token)return;refresh();const id=setInterval(refresh,2000);return()=>clearInterval(id)},[token,refresh]));
 return <View style={s.page}><Text style={s.heading}>Your Orders (Simulated)</Text>
  {!!error&&<Text style={s.error}>{error}</Text>}
  <FlatList data={orders} keyExtractor={x=>String(x.id)} refreshControl={<RefreshControl refreshing={busy} onRefresh={async()=>{setBusy(true);await refresh();setBusy(false)}}/>}
   ListEmptyComponent={<Text style={s.body}>No orders yet. Add noodles to your cart and check out!</Text>}
   renderItem={({item})=><View style={s.card}>
    <Text style={s.title}>Order #{item.id} · ${Number(item.total).toFixed(2)}</Text>
    <Text style={s.status} accessibilityLiveRegion="polite">{names[item.status]||item.status}</Text>
    <Text style={s.body}>{new Date(item.createdAt).toLocaleString()}</Text>
    {item.items?.map(x=><Text style={s.body} key={x.id}>{x.qty} × {x.name}</Text>)}
   </View>}/>
 </View>
}
const s=StyleSheet.create({page:{flex:1,backgroundColor:'#1A1A1A',padding:16},heading:{fontSize:25,fontWeight:'bold',color:'#FFF',marginBottom:16},card:{backgroundColor:'#333',borderRadius:12,padding:16,marginBottom:14},title:{fontSize:19,color:'#FFF',fontWeight:'bold',marginBottom:6},status:{fontSize:18,color:'#39FF14',fontWeight:'bold',marginBottom:6},body:{fontSize:16,color:'#FFF',lineHeight:25},error:{color:'#FF9090',fontSize:17}});
