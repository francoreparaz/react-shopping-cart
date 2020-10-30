import React, { Component } from "react";
import  "./Cart.css";

export default class Cart extends Component{
    render(){
        const {cartItems} = this.props
        
        return(
            <div>
               {cartItems.length === 0 ? 
               <div className="cart cart-header">Cart is empty</div>
               : <div className="cart cart-header">You have {cartItems.length} in the cart</div>
               }
               <div className="cart">
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
               </div>
               {cartItems.length !==0 && (
                   <div className="cart">
                   <div className="total">
                       <div>
                           Total: {" "}
                           U$D {Math.round(cartItems.reduce((a,c) => a + c.price * c.count, 0 ))}
                       </div>
                       <button className="button primary">Proceed</button>
                   </div>
               </div>
               )}
             

            </div>
        )
    }
}