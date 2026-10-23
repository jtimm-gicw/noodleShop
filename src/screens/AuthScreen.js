import React,{useContext,useState} from 'react';
import {View,Text,TextInput,TouchableOpacity,StyleSheet,ActivityIndicator} from 'react-native';
import {AuthContext} from '../context/AuthContext';
export default function AuthScreen(){
 const {login,register}=useContext(AuthContext);
 const [create,setCreate]=useState(false),[name,setName]=useState(''),[email,setEmail]=useState(''),[password,setPassword]=useState(''),[error,setError]=useState(''),[busy,setBusy]=useState(false);
 const submit=async()=>{setBusy(true);setError('');try{if(create)await register(name,email,password);else await login(email,password);}catch(e){setError(e.message);}finally{setBusy(false)}};
 return <View style={s.page}>
  <Text style={s.title}>🍜 TukTuk My Noodles</Text>
  <Text style={s.heading}>{create?'Create account':'Sign in'}</Text>
  {create&&<TextInput style={s.field} placeholder="Name" placeholderTextColor="#AAA" value={name} onChangeText={setName} autoCapitalize="words" accessibilityLabel="Full name"/>}
  <TextInput style={s.field} placeholder="Email" placeholderTextColor="#AAA" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" autoComplete="email" accessibilityLabel="Email address"/>
  <TextInput style={s.field} placeholder="Password (10+ characters to register)" placeholderTextColor="#AAA" value={password} onChangeText={setPassword} secureTextEntry autoComplete={create?'new-password':'current-password'} accessibilityLabel="Password"/>
  {!!error&&<Text style={s.error} accessibilityRole="alert">{error}</Text>}
  <TouchableOpacity style={s.button} disabled={busy} onPress={submit} accessibilityRole="button"><Text style={s.buttonText}>{busy?'Working...':create?'Create account':'Sign in'}</Text></TouchableOpacity>
  {busy&&<ActivityIndicator/>}
  <TouchableOpacity onPress={()=>{setError('');setCreate(!create)}} accessibilityRole="button"><Text style={s.link}>{create?'Already have an account? Sign in':'New here? Create an account'}</Text></TouchableOpacity>
 </View>
}
const s=StyleSheet.create({page:{flex:1,backgroundColor:'#1A1A1A',padding:24,justifyContent:'center'},title:{fontSize:28,fontWeight:'bold',color:'#FFD700',marginBottom:25},heading:{fontSize:24,color:'#FFF',marginBottom:20},field:{borderWidth:1,borderColor:'#DDD',color:'#FFF',borderRadius:10,fontSize:18,padding:14,marginBottom:16,minHeight:52},button:{backgroundColor:'#39FF14',borderRadius:10,padding:16,alignItems:'center',minHeight:54},buttonText:{fontSize:18,fontWeight:'bold',color:'#000'},link:{fontSize:17,color:'#00CCFF',marginTop:22,textAlign:'center'},error:{color:'#FF9090',fontSize:16,marginBottom:14}});
