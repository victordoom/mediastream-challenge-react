/**
 * Exercise 01: The Retro Movie Store
 * Implement a shopping cart with the next features for the Movie Store that is selling retro dvds:
 * 1. Add a movie to the cart
 * 2. Increment or decrement the quantity of movie copies. If quantity is equal to 0, the movie must be removed from the cart
 * 3. Calculate and show the total cost of your cart. Ex: Total: $150
 * 4. Apply discount rules. You have an array of offers with discounts depending of the combination of movie you have in your cart.
 * You have to apply all discounts in the rules array (discountRules).
 * Ex: If m: [1, 2, 3], it means the discount will be applied to the total when the cart has all that products in only.
 * 
 * You can modify all the code, this component isn't well designed intentionally. You can redesign it as you need.
 */

import './assets/styles.css'
import { useReducer } from 'react'



const initalState = {
  cartitems: [],
  subtotal: 0,
  total: 0
}


const cartReducer = (state = initalState, action) => {

  const {payload} = action;
  const item = payload ?  state.cartitems.find( movie => movie.name === payload.name) : null;

  switch (action.type) {
    case 'addcart':
      
      if(item){
        return {
          ...state,
          cartitems: state.cartitems.map(item => item.id === payload.id
            ? {
              ...item,
              quantity: item.quantity + 1,
            } : item
            ) ,
          subtotal: state.subtotal + payload.price,
        };

      }else{
        payload.quantity = 1
      }

      console.log('lo agrego')
      console.log(payload)
      return{
        ...state,
        cartitems: [...state.cartitems, payload],
        subtotal: state.subtotal + payload.price,
        
      };
      break;
      case 'removecart':
      
      if(item?.quantity > 1){
        return {
          ...state,
          cartitems: state.cartitems.map(item => item.id === payload.id
            ? {
              ...item,
              quantity: item.quantity - 1,
            } : item
            ) ,
          subtotal: state.subtotal - payload.price,
        };

      } else if(item?.quantity === 1 ){
        return{
          ...state,
          cartitems: state.cartitems.filter(item => item !== payload),
          subtotal: state.subtotal - payload.price
        };
      }

      console.log('lo quito')
      console.log(payload)
      
      break;
      case 'applydest':
        const discountRules = [
          {
            m: [3, 2],
            discount: 0.25
          },
          {
            m: [2, 4, 1],
            discount: 0.5
          },
          {
            m: [4, 2],
            discount: 0.1
          } 
        ]
        console.log('des')
        const listoringin = state.cartitems
        const list =  listoringin.map(item => item.id);
        const isdiscount = discountRules.map(dis => dis.m.every(a => list.includes(a)) === true ? dis.discount : null)
        console.log('descuento')
        const desttotal = isdiscount.reduce((accumulator, value) => {
      return accumulator + value;
    }, 0)
        return{
          ...state,
          total: state.subtotal - desttotal
        }
      break;
  
    default:
      return state;
      break;
  }

  
}

export default function Exercise01 () {
  const movies = [
    {
      id: 1,
      name: 'Star Wars',
      price: 20
    },
    {
      id: 2,
      name: 'Minions',
      price: 25
    },
    {
      id: 3,
      name: 'Fast and Furious',
      price: 10
    },
    {
      id: 4,
      name: 'The Lord of the Rings',
      price: 5
    }
  ]

  

  const [{ cartitems, subtotal, total}, dispatch] = useReducer(cartReducer, initalState)

  const addCart = (item) => {
    console.log(item)
    dispatch({
      type: 'addcart',
      payload: item
    })
    console.log(cartitems)
    dispatch({
      type: 'applydest'
    })
    
  } 

  const removeCart = (item) => {
    dispatch({
      type: 'removecart',
      payload: item
    })
    console.log(cartitems)
    dispatch({
      type: 'applydest'
    })
  }

  return (
    <section className="exercise01">
      <div className="movies__list">
        <ul>
          {movies.map((o, index) => (
            <li className="movies__list-card" key={index}>
              <ul>
                <li>
                  ID: {o.id}
                </li>
                <li>
                  Name: {o.name}
                </li>
                <li>
                  Price: ${o.price}
                </li>
              </ul>
              <button key={index} onClick={() => addCart(o)}>
                Add to cart
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="movies__cart">
        <ul>
          {cartitems.map(x => (
            <li className="movies__cart-card" key={x.id}>
              <ul>
                <li>
                  ID: {x.id}
                </li>
                <li>
                  Name: {x.name}
                </li>
                <li>
                  Price: ${x.price}
                </li>
              </ul>
              <div className="movies__cart-card-quantity">
                <button onClick={() => removeCart(x)}>
                  -
                </button>
                <span>
                  {x.quantity}
                </span>
                <button onClick={() => addCart(x)}>
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="movies__cart-total">
          <p>SubTotal: ${subtotal}</p>
          <p>Total: ${total}</p>
        </div>
      </div>
    </section>
  )
} 