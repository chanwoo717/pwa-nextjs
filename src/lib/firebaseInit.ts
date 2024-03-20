import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyCqkLMADw0HxtcCa7IAsA3hfryY96SD9xw",
    authDomain: "test3-def04.firebaseapp.com",
    projectId: "test3-def04",
    storageBucket: "test3-def04.appspot.com",
    messagingSenderId: "952217539722",
    appId: "1:952217539722:web:3576728ed2fc2686830973",
    measurementId: "G-E8XLS0SHZ5"
};

const app = initializeApp(firebaseConfig);

let messaging:any;
if (typeof window !== "undefined" && typeof window.navigator !== "undefined") {
    messaging = getMessaging();
}

export const getClientToken = async () => {
    let currentToken = await   getToken(messaging,{vapidKey:'BEMygBBjxgqPpyy2iBBv170n3XdfuldK5qaOraacn0UhjMq6MFY79LI-7sMS1VREkme28wpafHhTaFiG2MJ0o90'});
    return currentToken;
}
