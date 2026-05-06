import {
   getDocs,
   getFirestore,
   setDoc,
   Doc,
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";
import { GetCurrentUser } from "./auth.js";
import { app } from "./base-config.js";

const db = getFirestore(app);

export async function addtocart(productid) {
    //lấy user hiện tại
    const user = GetCurrentUser();
    //check if user is logged in
    if (!user) {
        alert("Please log in to add items to your cart.");
        window.location.href = "login.html";
        return;
    }
    const uid = user.uid;
    const cartRef = Doc(db, "carts", uid);

    try {
        const Docsnap = await getDocs(cartRef);
        if (!Docsnap.exists()) {
            const newcart = {
                items: [
                    {
                        productId: productid,
                        quantity: 1,
                    },
                ],
            };
            await setDoc(cartRef, newcart);
            alert("Item added to cart!");
        }

        let items = Docsnap.data().items || [];
        const index = items.findIndex((item) => item.productId === productid);
        if (index !== -1) {
            items[index].quantity += 1;
        
        } else {
            items.push({
                productId: productid,
                quantity: 1,
            });
        }
        await setDoc(cartRef, { items });
        alert("Item added to cart!");
        
    } catch (error) {
        console.error("lỗi thêm giỏ hàng:", error);
        alert("Please try again.");
    }
}
