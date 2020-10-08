import React from 'react';
import styled from 'styled-components';

const Arrow = styled.svg`
  position: absolute;
  top: 30px;
  left: 94%;
`;

export default function SelectArrow() {
  return (
    <Arrow width="17px" height="11px" viewBox="0 0 17 11" version="1.1">
      <g
        id="Styleguide"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
        strokeLinecap="square"
      >
        <g
          id="UI-guidelines"
          transform="translate(-658.000000, -6051.000000)"
          stroke="#E57CD8"
          strokeWidth="3"
        >
          <g id="Group-11" transform="translate(107.000000, 5995.000000)">
            <path
              d="M557,56 L562.656854,61.6568542 M557,67.6568542 L562.656854,62"
              id="Combined-Shape"
              transform="translate(559.828427, 61.828427) rotate(90.000000) translate(-559.828427, -61.828427) "
            ></path>
          </g>
        </g>
      </g>
    </Arrow>
  );
}
