import gql from "graphql-tag";

export const PAIRS_VOLUME_QUERY = gql`
  query PairsVolume($limit: Int!, $pairIds: [ID!]!, $blockNumber: Int!) {
    pairVolumes: pairs(first: $limit, where: { id_in: $pairIds }, block: { number: $blockNumber }) {
      id
      volumeToken0
      volumeToken1
    }
  }
`;

export const TOKEN_BY_ADDRESS = gql`
  query Token($id: ID!) {
    token(id: $id) {
      id
      name
      symbol
      derivedETH
    }
  }
`;

export const BUNDLE_BY_ID = gql`
  query Bundle($id: ID!) {
    bundle(id: $id) {
      id
      ethPrice
    }
  }
`;

export const BUNDLES = gql`
  query Bundles {
    bundles {
      id
      ethPrice
    }
  }
`;

export const TOP_PAIRS = gql`
  fragment TokenInfo on Token {
    id
    name
    symbol
    derivedETH
  }

  query TopPairs($limit: Int!, $excludeTokenIds: [String!]!) {
    pairs(
      first: $limit
      orderBy: reserveUSD
      orderDirection: desc
      where: { token0_not_in: $excludeTokenIds, token1_not_in: $excludeTokenIds }
    ) {
      id
      token0 {
        ...TokenInfo
      }
      token1 {
        ...TokenInfo
      }
      reserve0
      reserve1
      volumeToken0
      volumeToken1
      reserveETH
      reserveUSD
    }
  }
`;
