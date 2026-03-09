/// <reference types="vite/client" />

declare module "*&as=picture" {
  const value: {
    sources: Record<string, {
      srcset: string;
      type: string;
    }>;
    img: {
      src: string;
      srcSet: string;
      width: number;
      height: number;
    };
    placeholder?: string;
  };
  export default value;
}

declare module "*&as=picture&placeholder" {
  const value: {
    sources: Record<string, {
      srcset: string;
      type: string;
    }>;
    img: {
      src: string;
      srcSet: string;
      width: number;
      height: number;
    };
    placeholder?: string;
  };
  export default value;
}

declare module "*?as=picture" {
  const value: {
    sources: Record<string, {
      srcset: string;
      type: string;
    }>;
    img: {
      src: string;
      srcSet: string;
      width: number;
      height: number;
    };
    placeholder?: string;
  };
  export default value;
}

declare module "*?as=picture&placeholder" {
  const value: {
    sources: Record<string, {
      srcset: string;
      type: string;
    }>;
    img: {
      src: string;
      srcSet: string;
      width: number;
      height: number;
    };
    placeholder?: string;
  };
  export default value;
}
