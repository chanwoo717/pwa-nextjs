"use client";

import { getClientToken } from "@/lib/firebaseInit";
import axios from "axios";
import { useEffect } from "react";

export default function Home() {
  
  function clientPermission(){
    Notification.requestPermission().then(permission => {
      if (permission !== 'granted') {alert('푸시 거부됨');}
      else {alert('푸시 승인됨');}
    });
  };

  async function msgTest(){
    const token = await getClientToken();
    console.log(token);

    const message = {
      data: {
        title:'fcm test',
        body:'fcm.......',
        icon:'/G14y51681184466.JPG',
        image: 'https://imgupscaler.com/images/samples/animal-before.webp',
        click_action:'https://mykook.vercel.app/',
      },
      token
    };

    axios({
      method: 'POST',
      url:'/api',
      data: { message },
    });

  }

  useEffect(()=>{
    if('navigator' in window){
      navigator.serviceWorker.register('/firebase-messaging-sw.js',{scope:'/firebase-cloud-messaging-push-scope'})
    }
  },[])

  return (
    <div>
      <h2> FCM TEST </h2>
      <button onClick={clientPermission}> 권한허용 </button>
      <button onClick={msgTest}> 토큰발행 </button>
    </div>
  );
}
