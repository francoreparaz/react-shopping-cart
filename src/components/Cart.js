import React, { Component } from "react";
import Fade from "react-reveal/Fade";
import  "./Cart.css";

export default class Cart extends Component{
    constructor(props){
        super(props);
        this.state={
            name: "",
            email: "",
            adress:"",
            showCheckout:false
        }
    }
    handleInput =(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    createOrder=(e)=>{
        e.preventDefault();
        const order ={
            name:this.state.name,
            email:this.state.email,
            adress:this.state.adress,
            CartItems:this.props.cartItems,
        }
        this.props.createOrder(order)
    }
    render(){
        const {cartItems} = this.props
        
        return(
            <div>
               {cartItems.length === 0 ? 
               <div className="cart cart-header">Cart is empty</div>
               : <div className="cart cart-header">You have {cartItems.length} in the cart</div>
               }
               <div className="cart">
                   <Fade left cascade>
                   <ul className="cart-items">
                       {cartItems.map(item=>(
                           <li key={item._id}>
                               <div>
                                   <img src ={item.image} alt={item.title}></img>
                               </div>
                              <div> 
                                {item.title}
                                <div className="right">
                                    {item.price} x {item.count} {" "}
                                <button onClick={()=>this.props.removeFromCart(item)}>
                                    Remove
                                </button>
                                </div>
                              </div>
                           </li>
                       ))}
                   </ul>
                   </Fade>
               </div>
               {cartItems.length !==0 && (
                   <div>
                   <div className="cart">
                   <div className="total">
                       <div>
                           Total: {" "}
                           U$D {Math.round(cartItems.reduce((a,c) => a + c.price * c.count, 0 ))}
                       </div>
                       <button onClick={()=>{this.setState({showCheckout:true})}}
                       className="button primary">Proceed</button>
                   </div>
               </div>
               {this.state.showCheckout &&(
                       <Fade bottom cascade>
                   <div className="form">
                       <form onSubmit={this.createOrder}>
                           <ul className="form-container">
                           <li>
                                   <label>Email</label>
                                   <input 
                                   name="email"
                                   type="email" 
                                   required onChange={this.handleInput}
                                   />
                               </li>
                               <li>
                                   <label>Name</label>
                                   <input 
                                   name="name"
                                   type="text" 
                                   required onChange={this.handleInput}
                                   />
                               </li>
                               <li>
                                   <label>adress</label>
                                   <input 
                                   name="adress"
                                   type="text" 
                                   required onChange={this.handleInput}
                                   />
                               </li>
                               <li>
                                   <button type="submit" className="button primary">Checkout</button>
                               </li>
                           </ul>
                       </form>
                   </div>
                       </Fade>
               )}
               </div>
               )}

            </div>
        )
    }
}