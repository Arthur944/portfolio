import React, { useState } from "react";
import styled from "styled-components";
// @ts-ignore
import { useTransition, animated, to } from "react-spring";
import "../styles/styles.css";

export function HomePage() {
  const [pages, setPages] = useState<Page[]>(() => defaultPages);
  const [active, setActive] = useState(defaultPages[0].name);

  const transition = useTransition(pages, {
    key: item => item.name,
    config: {friction: 90},
    from: (item, index) => ({
      degree: 0,
      distance: 0,
      zIndex: 5 - index,
      gridColumn: 0,
    }),
    enter: (item, index) => ({
      degree: getPosition(item.name, pages, active) * 72,
      distance: 40,
      zIndex: Math.abs(getPosition(item.name, pages, active)),
      gridColumn: getPosition(item.name, pages, active)
    }),
    update: (item, index) => ({
      distance: item.hovering ? 35 : 40,
      config: {friction: 26},
      degree: getPosition(item.name, pages, active) == 1 ? (pages.find(elem => elem.name === active).hovering ? 90 : 72) : getPosition(item.name, pages, active) * 72 ,
      zIndex: zIndexForPosition(getPosition(item.name, pages, active)),
    })
  });

  return (
    <>
      <Hero>
        {transition((props, item, index1, index2) => (
          <animated.div
            className={"page"}
            style={{
                ...props,
              transform: to(
                [props.degree, props.distance],
                (degree, distance) => {
                  const translate = vectorToTransformCss(
                    degreeDistanceToVector(
                      degree,
                      distance
                    ),
                  );
                  return translate + ` rotate(${(degree as any) % 360}deg)`;
                }
              ),
              zIndex: props.zIndex
            }}
            onClick={() => setActive(item.name)}
            onMouseEnter={() => {
              setPages(prev => {
                let next = [...prev];
                next[next.findIndex(elem => elem.name === item.name)] = {
                  ...next.find(elem => elem.name === item.name),
                  hovering: true
                };
                return next;
              });
            }}
            onMouseLeave={() => {
              setPages(prev => {
                let next = [...prev];
                next[next.findIndex(elem => elem.name === item.name)] = {
                  ...next.find(elem => elem.name === item.name),
                  hovering: false
                };
                return next;
              });
            }}
          >
            <Item style={{ background: item.color }}><HeaderText>Text</HeaderText></Item>
          </animated.div>
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

interface Page {
  name: string;
  hovering: boolean;
  color: string;
}

const defaultPages: Page[] = [
  { color: "#170A1C", hovering: false, name: "first" },
  { color: "#0B7189", hovering: false, name: "second" },
  { color: "#228CDB", hovering: false, name: "third" },
  { color: "#9C95DC", hovering: false, name: "fourth" },
  { color: "#C19AB7", hovering: false, name: "fifth" }
];

type Vector = [number, number];
type ScreenVector = [number, number];



const colors = ["#170A1C", "#0B7189", "#228CDB", "#9C95DC", "#C19AB7"];

const HeaderText = styled.span`
  transform: rotate(180deg);
`;

const Item = styled.div`
  min-width: 150vw;
  min-height: 150vh;
  background: blue;
  display: flex;
  justify-content: center;
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
