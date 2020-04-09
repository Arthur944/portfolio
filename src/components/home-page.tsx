import React from 'react';
import styled from 'styled-components';
// @ts-ignore
import { useTransition, animated } from 'react-spring';

export function HomePage(){
    const transition = useTransition(coords, {
        from: (item, index) => ({
            top: "50vh",
            left: "calc(50vw + 0vh)",
            transform: `rotate(${index*72}deg)`,
            zIndex: 5-index
        }),
        enter: (item, index) => ({
            top: item[1] + "vh",
            left: `calc(25vw + ${item[0]}vh)`,
            transform: `rotate(${index*72}deg)`
        }),
    });

    return(
        <>
            <Hero>
                {transition((props, item, index1, index2 ) => (
                    <Container style={props}>
                        <Item style={{background: colors[index2]}}/>
                    </Container>
                ))}
                <HeroMessage>
                    <h1>Hi!</h1>
                    <h2>I'm Artur. I make websites and mobile apps.</h2>
                </HeroMessage>
            </Hero>
            <p>Hello</p>
        </>
    );
}

const colors = [
    "#170A1C",
    "#0B7189",
    "#228CDB",
    "#9C95DC",
    "#C19AB7"
];

const coords = [
    [0, 35, 0],
    [-33.29, 10.81, 1],
    [-20.57, -28.32, 2],
    [20.57, -28.32, 3],
    [33.29, 10.81, 4]
].map(elem => [elem[0] + 50, elem[1] + 50]);

const Item = styled.div`
  min-width: 150vw;
  min-height: 150vh;
  background: blue;
`;

const degrees = {
    0: 81.61,
    1: 67.54,
    2: 51.83,
};

const Container = styled(animated.div)`
  position: absolute;
  width: 1px;
  height: 1px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: white;
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