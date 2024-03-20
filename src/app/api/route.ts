import { NextRequest, NextResponse } from "next/server";
import admin, { ServiceAccount } from 'firebase-admin';

interface NotificationData {
    data: {
        title: string;
        body: string;
        image: string;
        icon:string;
        click_action: string;
    },
    token: string
}

const sendFCMNotification = async (data: NotificationData) => {
    const serviceAccount: ServiceAccount = {
        projectId: 'test3-def04',
        privateKey: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDCq8WTKcwmw37Q\nCR12FXx2O22OfnIbKu8PJMZoE3Zs/jrpAvCGRyLURk3pi5r16HE5rK9djR+AsIRN\n1I637gKaucXqcmY2wK16vunhXbzErQBEGQxMK0KzWUYWr+qqgdQjz+DGbVaSXn1v\npvGnIY231abQysf47iH5feLtD8EMHZxKoGAmEXm0N8hPLjqQLI/70tocgrDqVKbG\nT9DN808cyOtWblT9b7I8NBIk3+yqk3stwQRTG28QOhsk0u/9cMwY+PBvJ8ikWjwB\njmQeYSyIJ2SyTVhvgb0UAhGDsB538e7ZgiHfw3G5VznpDJJpRxv4FuKmcmtJVqN4\nhfPMvEd9AgMBAAECggEAD/sR6RbRT41U57cX2A3DfeE7CSuQKnLH1TJrpzeRzTjB\nlUdMf3lvfoWW98kiG3XNdbKbYs6m+2WCNvFwFeFQDWuat7hUc8I1e5IYmQuc53hc\nQTrdK5ORki+N9WbTmNO3mokCJsfrB3ECUxwdUl8Kx0CexR0gdWr3FwgijNtyOZBA\nDdlA2MbI7IQHTtQUkJYp8WhTkwmU0Dkow2lfz+p8kTPMa9rP64KEXH4B3+4QTgC5\n/JejXt2Ip0NjOLPfCxvysTQvXzIRRIhvErDcgF0JIprVqxdH9OSJ7ClZEdZAZcrz\n0TwyFLKMZLCmvRKDreF+mG5Z9C+ou2gM7MEcQlEXcQKBgQDlXbM5dXAJ2bImXTmb\nRUEv1kOjELm3MQH8H8zzvr/Rj4agDmIcoPEWr7gfaAbD75DIgsFmeFBMvCrZWhbq\nsmxbFZA7mPx2gL8lvX01gAGWRYL92SM+As21XMLIaNTVuXBhENLWGystaaBL9nog\nHj2DtetKjaPRrl4jH3RN3P2u1wKBgQDZRrO7b10GocHJZha4k06cH1xZViagj7xy\nGAoJugMfWdnp2L0NPDZJXxJj5QMFg/RsXysDwT7hYudb3Qy8EA/Gm+uhEj8X9psb\nEN7IKQ3cs4MUiDoi+z2CEU9nyZ2zI5rKrpu5W7DEohRpM8wVAqeMvyzQH/aGzoOe\nw15+wT0VywKBgQCaFd+AO0fAJlJK+ZfompbXRy77DhJlYfP+Z3KtULjWVIBRaDg7\nGVe9MOEVoDHjUT5Hpae9ahgv5L04dRAuLR0j95GEqBr6lTVUaj8CQPNP+3SrikLl\ntsZxD1b/gYVx6vj3DHFHSssv3+TDA1s51nbm08C0vgCOrYAqQkhEwrBd0wKBgGS1\noc9qQfs19OXOHQ/2r4QsARkjlonrtdRIkjaJ8rKQajI7FP3Sf/MoTxTgbLMcw6mL\nvxthciz0M/rfjeyJoVZUpTYmh/oqgyBbhHfQl61Jw6M7tX7LZ2onbd/UkvUatr/l\niSa0ek3aNo3AxYKjlVfmsPXTKui3RkjLk7w7A35bAoGAOR+qd6nhTamIlYOTotXd\n+G9n1TPK1YeUMRfWW8FTqsPwhLKmCFNYSDb9D3vkwLkPZhjgs7NEHcVfw9DTo/XA\nRblre7dPDQP4wlzWbGco4dLKUa4MEbFdq9EscdqC6ZzHMEHbWXk/xOWOI0VGTwlZ\nz9mZIoPkN+8xx9wxyp+kGm4=\n-----END PRIVATE KEY-----\n',
        clientEmail: 'firebase-adminsdk-da4l8@test3-def04.iam.gserviceaccount.com',
    };

    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });
    }

    const res = await admin.messaging().send(data);
    return res;
};

export async function POST(req: NextRequest) {  
    const { message } = await req.json();
    const fcmNoti = await sendFCMNotification(message);
    return NextResponse.json([]);
};
