//feature 1
import React from "react";
import data from "./data.json"
import "./App.css"
import Products from "./components/Products";
import Filter from "./components/Filter";

class App extends React.Component {
  constructor(){
    super();
    this.state ={
      products: data.products,
      size: "",
      sort: "", 
    };
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
               <Products products={this.state.products}/>
    
           </div>
         <div className="sidebar"> Cart Item</div>
         </div>
         
       </main>
         <footer>
           All rigth is reserved
         </footer>
    </div>
  );
}
}

export default App;
