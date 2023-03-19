declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET: string;
      NODE_ENV: 'development' | 'production';
    }
  }
}

declare module '*.svg' {
  const component: React.FC<React.SVGProps<SVGSVGElement>>;
  export default component;
}

export {};
