import React from "react";
import {Query} from "react-apollo";
import {gql} from "apollo-boost";
import Spinner from "../spinner/spinner.component";
import ColletionsOverview from "./collections-overview.component";

const GET_COLLECTIONS = gql`
  {
    collections{
      id,
      title,
      items{
        name,
        id,
        price,
        imageUrl
      }
    }
  }
`

const CollectionsOverviewContainer = () => (
  <Query query={GET_COLLECTIONS}>
    {
      ({loading, error, data}) => {
        if(loading) return <Spinner /> ;
        return <ColletionsOverview collections={data.collections} />
      }
    }
  </Query>
)

export default CollectionsOverviewContainer;