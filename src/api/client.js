// EDIT THIS ADDRESS to match your testing device (see GUIDE.md).
import { Platform } from 'react-native';

const HOST = '172.18.109.8'; 

// Web connects using localhost.
// Android connects using your computer's Wi-Fi IP address.
export const API_URL =
  Platform.OS === 'web'
    ? 'http://localhost:3001'
    : `http://${HOST}:3001`;
  
export async function api(path,{method='GET',body,token}={}){
 const response=await fetch(`${API_URL}${path}`,{
  method,
  headers:{'Content-Type':'application/json',...(token?{Authorization:`Bearer ${token}`}:{})},
  ...(body!==undefined?{body:JSON.stringify(body)}:{})
 });
 
 const json=await response.json().catch(()=>({}));
 if(!response.ok)throw new Error(json.error||`Request failed (${response.status})`);
 return json;
}
