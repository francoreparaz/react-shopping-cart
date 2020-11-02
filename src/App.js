//feature 1
import React from "react";
import data from "./data.json"
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
      products: data.products,
      CartItems:localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")):[],
      size: "",
      sort: "", 
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
  
  sortProducts =(e)=>{
    this.setState((state)=>({
      sort: e.target.value,
      products: this.state.products
      .slice()
      .sort((a,b)=>
        e.target.value === "Lowest" ?
        a.price > b.price
        ? 1
        : -1
        :e.target.value === "Highest" 
        ? a.price < b.price
         ? 1
         : -1
        :a._id < b._id
        ? 1
        :-1
      ),
    }))

  }
  filterProducts=(e)=>{
    //console.log(event.target.value)
    if(e.target.value === ""){
      this.setState({
        size:e.target.value,
        products: data.products
      })
      
    }else{
      this.setState({
        size:e.target.value,
        products: data.products.filter(product=> product.availableSizes.indexOf(e.target.value)>=0)
      })

    }
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
      
               <Filter 
                count={this.state.products.length} 
                size={this.state.size}
                sort={this.state.sort}
                filterProducts={this.filterProducts}
                sortProducts={this.sortProducts}
               />
               <Products 
               products={this.state.products} 
               addToCart={this.addToCart}/>
    
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
