import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "user_token";

export type UserProfile = {
    firstName?: string;
    lastName?: string;
    email: string;
    phoneNumber: string;

}
