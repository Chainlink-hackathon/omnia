import React from 'react';
import styled from 'styled-components';
import MainBackground from '../../assets/Main_Background.png';

export default function Main() {
  return (
    <img
      src={MainBackground}
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
