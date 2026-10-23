import React,{createContext,useEffect,useState} from 'react';
import {Platform} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import {api} from '../api/client';
export const AuthContext=createContext(null);
const KEY='TUKTUK_SESSION_TOKEN';
// Web sessionStorage is demo-only; native uses encrypted SecureStore.
const tokenStore={
 get:()=>Platform.OS==='web'?Promise.resolve(sessionStorage.getItem(KEY)):SecureStore.getItemAsync(KEY),
 set:t=>Platform.OS==='web'?Promise.resolve(sessionStorage.setItem(KEY,t)):SecureStore.setItemAsync(KEY,t),
 remove:()=>Platform.OS==='web'?Promise.resolve(sessionStorage.removeItem(KEY)):SecureStore.deleteItemAsync(KEY)
};
export function AuthProvider({children}){
 const [token,setToken]=useState(null);
 const [user,setUser]=useState(null);
 const [loading,setLoading]=useState(true);
 useEffect(()=>{(async()=>{try{
  const saved=await tokenStore.get();
  if(saved){const current=await api('/auth/me',{token:saved});setToken(saved);setUser(current);}
 }catch(e){await tokenStore.remove().catch(()=>{});}finally{setLoading(false);}})()},[]);
 const accept=async result=>{await tokenStore.set(result.token);setToken(result.token);setUser(result.user);};
 const login=async(email,password)=>accept(await api('/auth/login',{method:'POST',body:{email,password}}));
 const register=async(name,email,password)=>accept(await api('/auth/register',{method:'POST',body:{name,email,password}}));
 const logout=async()=>{await tokenStore.remove();setToken(null);setUser(null);};
 return <AuthContext.Provider value={{token,user,loading,login,register,logout}}>{children}</AuthContext.Provider>;
}
