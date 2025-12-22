import { getToken } from "firebase/messaging";
import { messaging } from "./firebaseInit";


export const requestPermission = async (): Promise<string | undefined> => {
  try {
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: "BGjyOUFsyfgTXuGvnWdm0mk-KbWn4_rrq6OtUJBWAm6BlQdCYggA4C6yL-xFR-2fFpHZN6T3wnYKx8EXAs8eFOE",
      });

      console.log("FCM Token:", token);
      return token;
    } else {
      console.log("Notification permission denied");
    }
  } catch (error) {
    console.error("FCM Error:", error);
  }
};
