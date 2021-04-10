import React from 'react';
import styled from 'styled-components';
import Bg from '../../assets/Insurance_List.png';

export default function Main() {
  return (
    <img
      src={Bg}
      style={{
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100vw',
        height: '257.4vw',
      }}
    />
  );
}
