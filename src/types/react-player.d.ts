declare module "react-player" {
    import * as React from "react";
 
    export interface ReactPlayerProps {
        url?: string | string[];
        playing?: boolean;
        controls?: boolean;
        muted?: boolean;
        width?: string | number;
        height?: string | number;
        loop?: boolean;
        onPlay?: () => void;
        onPause?: () => void;
        onEnded?: () => void;
        onError?: () => void;
    }
     export default class ReactPlayer extends React.Component<ReactPlayerProps> {}
}
 