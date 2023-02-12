// import { useState, createContext } from "react";

// export const CartContext = createContext();

// const CartProvider = (props) => {
//   const url = "https://crudcrud.com/api/d07976f0991c453eb114c698bdb5a890";

//   const [cartItems, setcartItems] = useState([]);
//   const [quantity, setQuantity] = useState(0);
//   const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

//   const userEmail = user?.email?.replace(/\.|@/g, "");

//   const loginHandler = (user) => {
//     setUser(user);
//     localStorage.setItem("user", JSON.stringify(user));
//   };

//   const getItems = async () => {
//     if (user && userEmail) {
//       const res = await fetch(url + userEmail);
//       const data = await res.json();
//       setcartItems(data);
//       let quantity = 0;
//       data.forEach((item) => {
//         quantity = quantity + item.quantity;
//       });
//       setQuantity(quantity);
//     }
//   };

//   const addItemToCartHandler = async (product, quantity) => {
//     try {
//       const res = await fetch(url + userEmail, {
//         method: "POST",
//         body: JSON.stringify(product),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       const data = await res.json();
//     } catch (error) {
//       console.error(error);
//     }
//     getItems();
   
//   };

//   const cartContext = {
//     user,
//     cartItems,
//     totalQty: quantity,
//     addItem: addItemToCartHandler,
//     login: loginHandler,
//     getItems,
//   };

//   return (
//     <CartContext.Provider value={cartContext}>
//       {props.children}
//     </CartContext.Provider>
//   );
// };

// export default CartProvider;
