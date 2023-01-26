import SearchFilter from 'components/SearchFilter/SearchFilter';
import styled from 'styled-components';

export const FeedWrapper = styled.div`
  display: flex;
  margin-top: 30px;
  justify-content: center;
`;

export const PostResultList = styled.div`
  display: grid;
  margin: 40px 0;
  grid-template-columns: 400px 400px;
  row-gap: 60px;
  justify-content: space-between;
`;

export const NoDataContainer = styled.div`
  position: relative;
  height: 50vh;
`;

export const PostFilter = styled(SearchFilter)`
  margin-top: 30px;
`;
