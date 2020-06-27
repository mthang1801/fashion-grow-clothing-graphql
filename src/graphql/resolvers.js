import { gql } from "apollo-boost";
import {
  getCartItemCount,
  getCartItemTotalPrice,
  clearItemFromCart,
  addItemToCart,
  removeItemFromCart,
} from "./cart.utils";
export const typeDefs = gql`
  extend type Item {
    id: ID!
    name: String!
    price: Number!
    imageUrl: String!
  }

  extend type User {
    id: ID!
    displayName: String!
    email: String!
    createdAt: String!
  }

  extend type Mutation {
    ToggleCartHidden: Boolean!
    AddItemToCart(item: Item!): [Item]!
    RemoveItemFromCart(item: Item!): [Item]!
    ClearItemFromCart(item: Item!): [Item]!
    SetCurrentUser(user: User!): User!
  }
`;

const GET_CART_HIDDEN = gql`
  {
    cartHidden @client
  }
`;

const GET_ITEM_COUNT = gql`
  {
    itemCount @client
  }
`;

const GET_TOTAL_PRICE = gql`
  {
    totalPrice @client
  }
`;

const GET_CART_ITEMS = gql`
  {
    cartItems @client
  }
`;

const GET_CURRENT_USER = gql`
  {
    currentUser @client
  }
`;

const updateCartItemsRelatedQueries = (cache, cartItems) => {
  cache.writeQuery({
    query: GET_ITEM_COUNT,
    data: { itemCount: getCartItemCount(cartItems) },
  });

  cache.writeQuery({
    query: GET_TOTAL_PRICE,
    data: { totalPrice: getCartItemTotalPrice(cartItems) },
  });
  cache.writeQuery({
    query: GET_CART_ITEMS,
    data: { cartItems },
  });
};

export const resolvers = {
  Mutation: {
    toggleCartHidden: (_root, _args, { cache }) => {
      const { cartHidden } = cache.readQuery({
        query: GET_CART_HIDDEN,
      });
      cache.writeQuery({
        query: GET_CART_HIDDEN,
        data: { cartHidden: !cartHidden },
      });
      return !cartHidden;
    },

    addItemToCart: (_root, { item }, { cache }) => {
      const { cartItems } = cache.readQuery({
        query: GET_CART_ITEMS,
      });
      const newCartItems = addItemToCart(cartItems, item);
      updateCartItemsRelatedQueries(cache, newCartItems);
      return newCartItems;
    },

    removeItemFromCart: (_root, { item }, { cache }) => {
      const { cartItems } = cache.readQuery({
        query: GET_CART_ITEMS,
      });
      const newCartItems = removeItemFromCart(cartItems, item);
      updateCartItemsRelatedQueries(cache, newCartItems);
      return newCartItems;
    },
    clearItemFromCart: (_root, { item }, { cache }) => {
      const { cartItems } = cache.readQuery({
        query: GET_CART_ITEMS,
      });
      const newCartItems = clearItemFromCart(cartItems, item);
      updateCartItemsRelatedQueries(cache, newCartItems);
      return newCartItems;
    },
    setCurrentUser: (_root, { user }, { cache }) => {
      cache.writeQuery({
        query: GET_CURRENT_USER,
        data: { currentUser: user },
      });
      return user;
    },
  },
};
