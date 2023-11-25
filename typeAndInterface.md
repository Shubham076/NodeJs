
### `type` Examples

#### 1. Union Types

A union type is a powerful way to define a type that can be one of several types.


```
type StringOrNumber = string | number;

function printId(id: StringOrNumber) {
    console.log("Your ID is: " + id);
}
``` 

#### 2. Intersection Types

An intersection type combines multiple types into one. It's useful for mixing multiple types into a single one.


```
type Draggable = {
    drag: () => void;
};

type Resizable = {
    resize: () => void;
};

type UIWidget = Draggable & Resizable;

function createUIWidget(): UIWidget {
    return {
        drag: () => { /* ... */ },
        resize: () => { /* ... */ }
    };
}
``` 

#### 3. Function Types

You can define a type for a function, specifying the argument types and return type.


```
type GreetFunction = (name: string) => string;

const greet: GreetFunction = (name) => {
    return `Hello, ${name}!`;
};
``` 

### `interface` Examples

#### 1. Defining Object Shape

Interfaces are often used to define the shape of objects.


```
interface Point {
    x: number;
    y: number;
}

const p: Point = { x: 10, y: 20 };
``` 

#### 2. Extending Interfaces

You can extend interfaces to create new interfaces based on existing ones.

```
interface Point3D extends Point {
    z: number;
}

const p3d: Point3D = { x: 10, y: 20, z: 30 };
``` 

#### 3. Implementing an Interface in a Class

Interfaces are used to define contracts for classes.


```interface Movable {
    move(): void;
}

class Car implements Movable {
    move() {
        console.log("Car is moving");
    }
}
``` 

#### 4. Function in Interface

You can define functions within an interface. These functions then become a contract for any implementing class.


```
interface MathFunction {
    (x: number, y: number): number;
}

class BasicMath implements MathFunction {
    public operator: string;

    constructor(operator: string) {
        this.operator = operator;
    }

    public call(x: number, y: number): number {
        if (this.operator === '+') {
            return x + y;
        }
        // Other operations...
        return 0;
    }
}
``` 
