export function zIndexForPosition(position: number){
    switch(position){
        case 0:
            return 3;
        case 4:
            return 2;
        case 3:
            return 1;
        case 2:
            return 0;
        case 1:
            return 4;
    }
}

export function getPosition(name: string, pages: Page[], active: string) {
    const index = defaultPages.findIndex(elem => elem.name === name);
    let activeIndex = defaultPages.findIndex(elem => elem.name === active);
    return index  - activeIndex;
}

export function vectorToTransformCss(vector: ScreenVector) {
    const [x, y] = vector;
    return `translate3d(${x}vh, ${y}vh, 0)`;
}

export function vectorToScreenSpace(vector: Vector) {
    const [x, y] = vector;
    return [x, y] as ScreenVector;
}

export function degreeToRadians(degrees: number) {
    return degrees * (Math.PI / 180);
}

export function rotate(vector: Vector, degrees: number): Vector {
    const [x1, y1] = vector;
    const radians = degreeToRadians(degrees);
    const x2 = Math.cos(radians) * x1 - Math.sin(radians) * y1;
    const y2 = Math.sin(radians) * x1 + Math.cos(radians) * y1;
    return [x2, y2];
}

export function degreeDistanceToVector(
    degrees: number,
    distance: number
): ScreenVector {
    const defaultPosition: Vector = [0, distance];
    let rotated = rotate(defaultPosition, degrees);
    return vectorToScreenSpace(rotated);
}