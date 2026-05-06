import {
    getAuth,
    onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { app } from "./base-config.js";

const auth = getAuth(app);

export function GetCurrentUser() {
    return auth.currentUser
}