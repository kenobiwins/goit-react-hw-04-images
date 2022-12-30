import styled from 'styled-components';

// display: grid;
//   grid-template-columns: 1fr;
//   grid-gap: 16px;
//   padding-bottom: 24px;

//   img {
//     width: 100%;
//     height: 260px;
//     object-fit: cover;
//     transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);

//     :hover {
//       transform: scale(1.03);
//       cursor: zoom-in;
//     }
//   }

export const SkeletonStyle = styled.div`
  @keyframes skeleton {
    0% {
      background-position: 0 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }

  display: grid;
  max-width: calc(100vw - 48px);
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 16px;
  margin-top: 0;
  margin-bottom: 0;
  padding: 0;
  list-style: none;
  margin-left: auto;
  margin-right: auto;

  min-height: 8px;
  border-radius: 5px;
  background: linear-gradient(90deg, #eee, #a9a7a7, #eee);
  background-size: 400% 400%;
  animation: skeleton 2s ease infinite;
`;
