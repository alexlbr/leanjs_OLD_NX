import React from 'react';
import styled from 'styled-components';

const ToggleButton = ({ toggleMenu, className, isOpen }) => (
  <div className={className}>
    <input
      type="checkbox"
      name="main-menu-button"
      id="main-menu-button"
      defaultChecked={isOpen}
      onClick={toggleMenu}
      role="button"
      aria-pressed={isOpen.toString()}
      aria-labelledby="main-menu-button-label"
    />
    <span />
    <span />
    <span />
    <label id="main-menu-button-label" htmlFor="main-menu-button">
      Menu
    </label>
  </div>
);

const StyledToggleButton = styled(ToggleButton)`
  position: fixed;
  width: 36px;
  height: 30px;
  right: 30px;
  top: 20px;
  z-index: 9991;
  label {
    font-size: 12px;
  }

  input {
    display: block;
    width: 40px;
    height: 60px;
    position: absolute;
    top: -7px;
    left: -5px;

    cursor: pointer;

    opacity: 0; /* hide this */
    z-index: 2; /* and place it over the hamburger */

    -webkit-touch-callout: none;
  }

  span {
    display: block;
    width: 33px;
    height: 4px;
    margin-bottom: 5px;
    position: relative;
    background: #27487D;
    border-radius: 3px;

    z-index: 1;

    transform-origin: 4px 0px;

    transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
      background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1), opacity 0.55s ease;
  }

  span:first-child {
    transform-origin: 0% 0%;
  }
  span:nth-last-child(2) {
    transform-origin: 0% 100%;
  }
  input:defaultchecked ~ span {
    opacity: 1;
    transform: rotate(45deg) translate(3px, -4px);
  }
  input:defaultchecked ~ span:nth-last-child(3) {
    opacity: 0;
    transform: rotate(0deg) scale(0.2, 0.2);
  }
  input:defaultchecked ~ span:nth-last-child(2) {
    transform: rotate(-45deg) translate(3px, 4px);
  }
`;

export default StyledToggleButton;
