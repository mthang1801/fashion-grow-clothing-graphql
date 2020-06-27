import React  from "react" ;
import {Query} from "react-apollo";
import {gql} from "apollo-boost";
import Checkout from "./checkout.component";

const GET_CART_ITEMS_AND_TOTAL_PRICE = gql`
  {
    cartItems @client 
    totalPrice @client
  }
`
const CheckoutContainer = () => (
  <Query query={GET_CART_ITEMS_AND_TOTAL_PRICE}>
    {
      ({data : {cartItems , totalPrice}}) => <Checkout cartItems={cartItems} total={totalPrice}/>
    }
  </Query>
)

export default CheckoutContainer;