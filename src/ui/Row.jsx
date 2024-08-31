import styled, { css } from "styled-components";

const Row = styled.div`
  display: flex;

  ${(props) =>
    props.tpye === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
    `}

  ${(props) =>
    props.tpye === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
`;

Row.defaultProps = {
  tpye: "vertical",
};

export default Row;
