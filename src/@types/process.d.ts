/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
    AWS_ID: string;
    AWS_SECRET: string;
    COOKIE_SECRET: string;
    DB_URL: string;
    DEBUG_MODE: string;
    GOOGLE_MAIL: string;
    GOOGLE_PASSWORD: string;
    MODE: string;
    MY_CALLBACK_URL: string;
    NAVER_CLIENT_ID: string;
    NAVER_CLIENT_SECRET: string;
    RANDOM_STATE: string;
    SHOP_API_KEY: string;
    SHOP_API_SECRET: string;
    SHOP_PID_CODE: string;
    AWS_BUCKET_NAME: string;
    DEV_DOMAIN: string;
    PRO_DOMAIN: string;
  }
}
