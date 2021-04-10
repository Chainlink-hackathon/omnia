/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useEffect } from 'react';
import { WaveGroup } from './wavegroup.js';
import Logo from '../../assets/Loading_logo.png';
import { Link } from 'react-router-dom';

export default function Intro(): JSX.Element {
  let canvas: any;
  const ref = useRef(null);
  let ctx: any;
  let waveGroup: WaveGroup;
  let pixelRatio: any;
  let stageWidth: any, stageHeight: any;

  useEffect(() => {
    canvas = ref.current;
    ctx = canvas.getContext('2d');

    pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    waveGroup = new WaveGroup();

    window.addEventListener('resize', resize);
    resize();
    canvas = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(canvas);
  }, []);

  const resize = () => {
    stageWidth = document.body.clientWidth;
    stageHeight = document.body.clientHeight;
    canvas.width = stageWidth * pixelRatio;
    canvas.height = stageHeight * pixelRatio;
    ctx.scale(pixelRatio, pixelRatio);

    waveGroup.resize(stageWidth, stageHeight);
  };

  const animate = () => {
    canvas = requestAnimationFrame(animate);
    ctx.clearRect(0, 0, stageWidth, stageHeight);
    waveGroup.draw(ctx);
  };
  return (
    <>
      <canvas ref={ref} style={{ width: '100vw', height: '100vh' }} />
      <Link to={'/main'}>
        <img
          src={Logo}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: '-326px',
            marginLeft: '-343px',
            width: '686px',
            height: '652px',
          }}
        />
      </Link>
    </>
  );
}
