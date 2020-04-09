import React from 'react';
import styled from 'styled-components';
// @ts-ignore
import { useTransition, animated } from 'react-spring';

export function HomePage(){
    const transition = useTransition([0,1,2], {
        from: { transform: "rotate(90deg)" },
        enter: (item) => ({ transform: `rotate(${degrees[item]}deg)`})
    });

    return(
        <>
            <Hero>
                { transition((props, item) => (
                    <Item style={{...props, zIndex: 4 - item, background: `rgb(${(255/4)*item}, ${(255/4)*item}, ${(255/4)*item})`}}/>
                )) }
                <HeroMessage>
                    <h1>Hi!</h1>
                    <h2>I'm Artur. I make websites and mobile apps.</h2>
                </HeroMessage>
            </Hero>
            <p>Hello</p>
        </>
    );
}

const Item = styled(animated.div)`
  position: fixed;
  right: 0;
  bottom: calc(100vh/2.618);
  height: 120vh;
  width: 100vw;
  background: blue;
  border: 1px solid gray;
  transform-origin: bottom right;
`;

const degrees = {
    0: 81.61,
    1: 67.54,
    2: 51.83,
}

const Fifth = styled.div`
  position: absolute;
  width: 120vw;
  right: 0;
  height: 100vh;
  transform-origin: bottom right;
  transform: rotate(calc(90deg - 88.78deg));
  background: black;
  z-index: 0;
`;

const Fourth = styled.div`
  position: absolute;
  width: 120vw;
  height: calc(100vh/2.618);
  right: 0;
  transform-origin: bottom right;
  transform: rotate(calc(90deg - 81.61deg));
  background: gray;
  z-index: 1;
`;

const Third = styled.div`
  position: absolute;
  width: 100%;
  height: calc(100vh/2.618);
  transform-origin: bottom right;
  transform: rotate(calc(90deg - 67.54deg));
  background: blue;
  z-index: 2;
`;

const Second = styled.div`
  position: absolute;
  width: 100%;
  height: calc(100vh/2.618);
  transform-origin: bottom right;
  transform: rotate(calc(90deg - 51.83deg));
  background: yellow;
  z-index: 3;
`;

const First = styled.div`
  position: absolute;
  width: 100%;
  height: calc(100vh/2.618);
  background: #4e0250;
`;

const HeroMessage = styled.div`
  margin-top: 38vh;
`;

const Hero = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    align-items: center;
`;