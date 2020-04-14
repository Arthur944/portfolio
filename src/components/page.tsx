import React from 'react';
import {animated, to, AnimatedComponent} from "react-spring";

interface PageProps extends AnimatedComponent<HTMLDivElement> {

}

export function Page(props: PageProps){
    return(
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
    );
}