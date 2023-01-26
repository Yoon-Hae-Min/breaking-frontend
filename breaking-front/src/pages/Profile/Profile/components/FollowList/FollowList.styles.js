import { ScrollBarY } from 'components/ScrollBar/ScrollBar';
import { FixedSizeList } from 'react-window';
import styled from 'styled-components';

export const CardListLayout = styled(ScrollBarY)`
  margin-top: 20px;
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 40px 20px;
  align-content: start;
  justify-items: center;
`;

export const ReactWindowList = styled(FixedSizeList)`
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 7px;
  }
  &::-webkit-scrollbar-track {
    border-radius: 10px;
    background: ${({ theme }) => theme.gray[700]};
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: ${({ theme }) => theme.gray[300]};
  }
`;
