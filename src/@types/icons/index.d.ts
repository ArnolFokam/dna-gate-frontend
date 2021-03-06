declare module '*.svg' {
    import React from "react";
    const ReactComponent: React.FC<React.SVGProps<SVGElement>>;
    export default ReactComponent;
//     const content: (props: React.SVGProps<SVGElement>) => React.ReactElement;
//     export default content;
}

interface IIcon{
    icon: string
    [key: string]: string | undefined
}

export type {
    IIcon
};