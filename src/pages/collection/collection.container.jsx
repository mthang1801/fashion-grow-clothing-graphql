import React from "react";
import {Query} from "react-apollo";
import {gql} from "apollo-boost";
import Collection from "./collection.component";
import Spinner from "../../components/spinner/spinner.component"
const GET_COLLECTION_BY_TITLE = gql`
  query getCollectionsByTitle($title : String!){
    getCollectionsByTitle(title : $title ) {
      title,
      id ,
      items{
        name,
        id,
        price,
        imageUrl
      }
    }
  }
`

const CollectionContainer = ({match}) => (
  <Query query={GET_COLLECTION_BY_TITLE} variables={{title : match.params.collectionId}}>
    {
      ({loading , data }) => {         
        if(loading) return <Spinner/>
        return <Collection collection={data.getCollectionsByTitle}/>
      }
    }
  </Query>
)

export default CollectionContainer;