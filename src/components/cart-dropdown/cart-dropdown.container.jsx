import React from "react";
import {Mutation, Query} from "react-apollo";
import {gql} from "apollo-boost";
import CartDropdown from "./cart-dropdown.component";
import { toggleCartHidden } from "../../redux/cart/cart.actions";

const GET_CART_ITEMS = gql`
  {
    cartItems @client
  }
`;

const TOGGLE_CART_HIDDEN = gql`
  mutation ToggleCartHidden{
    toggleCartHidden @client 
  }
`



const CartDropdownContainer = () => (
  <Query query={GET_CART_ITEMS}>
    {
      ({data : {cartItems}}) => (
        <Mutation mutation={TOGGLE_CART_HIDDEN}>
          {
            toggleCartHidden => <CartDropdown cartItems={cartItems} toggleCartHidden={toggleCartHidden}/>
          }
        </Mutation>
      )
    }
  </Query>
)

export default CartDropdownContainer