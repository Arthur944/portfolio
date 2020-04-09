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
    config: { friction: 90 },
    from: (item, index) => ({
      degree: 0,
      distance: 0,
      zIndex: 5 - index,
    }),
    enter: (item, index) => ({
      degree: getDegree(item.name, pages, active),
      distance: 35,
      zIndex: 5 - index
    }),
    update: (item, index) =>
      active === item.name
        ? [
            {
              distance: item.hovering ? 30 : 35,
              config: { friction: 26 },
              degree: getDegree(item.name, pages, active),
              zIndex: 6,
            },
          ]
        : {
            distance: item.hovering ? 30 : 35,
            config: { friction: 26 },
            degree: getDegree(item.name, pages, active),
            zIndex: 5 - index,
          }
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
            <Item style={{ background: item.color }} />
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

function getDegree(name: string, pages: Page[], active: string) {
  const index = defaultPages.findIndex(elem => elem.name === name);
  let activeIndex = defaultPages.findIndex(elem => elem.name === active);
  return index * 72 - activeIndex * 72;
}

function vectorToTransformCss(vector: ScreenVector) {
  const [x, y] = vector;
  return `translate3d(${x}vh, ${y}vh, 0)`;
}

function vectorToScreenSpace(vector: Vector) {
  const [x, y] = vector;
  return [x, y] as ScreenVector;
}

function degreeToRadians(degrees: number) {
  return degrees * (Math.PI / 180);
}

function rotate(vector: Vector, degrees: number): Vector {
  const [x1, y1] = vector;
  const radians = degreeToRadians(degrees);
  const x2 = Math.cos(radians) * x1 - Math.sin(radians) * y1;
  const y2 = Math.sin(radians) * x1 + Math.cos(radians) * y1;
  return [x2, y2];
}

function degreeDistanceToVector(
  degrees: number,
  distance: number
): ScreenVector {
  const defaultPosition: Vector = [0, distance];
  let rotated = rotate(defaultPosition, degrees);
  return vectorToScreenSpace(rotated);
}

const colors = ["#170A1C", "#0B7189", "#228CDB", "#9C95DC", "#C19AB7"];

const Item = styled.div`
  min-width: 150vw;
  min-height: 150vh;
  background: blue;
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
