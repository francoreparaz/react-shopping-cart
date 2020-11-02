//feature 1
import React from "react";

import "./App.css"
import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";
import store from "./store"
import { Provider } from "react-redux";



class App extends React.Component {
  constructor(){
    super();
    this.state ={
     
      CartItems:localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")):[],
       
    };
  }
  createOrder=(order)=>{
    alert("hola" + order.name)
  }
  removeFromCart= (product)=>{
    const cartItems= this.state.CartItems.slice();
    this.setState({
      CartItems:cartItems.filter(x=> x._id !== product._id)
    })
    localStorage.setItem("cartItems",JSON.stringify(cartItems.filter(x=> x._id !== product._id)));
    
    
  }
  
  addToCart=(product)=>{
    const cartItems= this.state.CartItems.slice();
    let alreadyInCart= false
    cartItems.forEach((item)=>{
      if (item._id === product._id){
        item.count++
        alreadyInCart = true
      }
    })
    if (!alreadyInCart){
      cartItems.push({...product, count:1})
    }
    this.setState({CartItems:cartItems})
    localStorage.setItem("cartItems",JSON.stringify(cartItems));
  }
  

      
   
  render(){
  return (
     <Provider store={store}>
    <div className="grid-container">
       <header>
         <a href="/">React Shopping Cart</a>
       </header>
       <main>
         <div className="content">
           <div className="main">
      
               <Filter/>
               <Products addToCart={this.addToCart}/>
    
           </div>
         <div className="sidebar"> 
         <Cart
          cartItems={this.state.CartItems}
           removeFromCart={this.removeFromCart}
           createOrder={this.createOrder}
           />
         </div>
         </div>
         
       </main>
         <footer>
           All rigth is reserved
         </footer>
    </div>
</Provider>
  );
}
}

export default App;
