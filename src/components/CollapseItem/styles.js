import styled from "styled-components";

export const Heading = styled.h2`
  border: 1px solid #ddd;
  background: #6bc23b;
  color: white;
  padding: 15px;
  margin-bottom: 0;
`;

export const Content = styled.div`
  border: 1px solid #6bc23b;
  border-top: none;
  opacity: ${props => (props.open ? "1" : "0")};
  max-height: ${props => (props.open ? "100%" : "0")};
  overflow: hidden;
  padding: ${props => (props.open ? "15px" : "0 15px")};
  transition: all 0.5s;

  p {
    margin: 0;
  }
`;
