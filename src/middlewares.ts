import { S3Client, S3ClientConfig } from '@aws-sdk/client-s3';
import multer from 'multer';
import multerS3 from 'multer-s3';

const S3 = new S3Client({
  region: 'ap-northeast-2',
  credentials: {
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
  },
} as S3ClientConfig);

const isPro = process.env.MODE === 'production';

const avatarUploader = multerS3({
  s3: S3,
  bucket: `${process.env.AWS_BUCKET_NAME}/avatar-board`,
  contentType: multerS3.AUTO_CONTENT_TYPE,
  acl: 'public-read',
});

const boardImgUploader = multerS3({
  s3: S3,
  bucket: `${process.env.AWS_BUCKET_NAME}/info-board`,
  contentType: multerS3.AUTO_CONTENT_TYPE,
  acl: 'public-read',
});

export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.loggedInUser = req.session.user || {};
  res.locals.isAdmin = req.session.isAdmin || false;
  res.locals.isPro = isPro;
  res.locals.shopPidCode = process.env.SHOP_PID_CODE;
  res.locals.devDomain = process.env.DEV_DOMAIN;
  res.locals.proDomain = process.env.PRO_DOMAIN;
  next();
};

export const protectorMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    return res.redirect('/login');
  }
};

export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    return res.redirect('/');
  }
};

export const adminOnlyMiddleware = (req, res, next) => {
  if (req.session.isAdmin) {
    return next();
  } else {
    return res.redirect('/');
  }
};

export const avatarFiles = multer({
  dest: 'uploads/avatar',
  limits: {
    fileSize: 10_000_000,
  },
  storage: isPro ? avatarUploader : undefined,
});
export const boardImgFiles = multer({
  dest: 'uploads/board',
  limits: {
    fileSize: 10_000_000,
  },
  storage: isPro ? boardImgUploader : undefined,
});

export const itemFiles = multer({
  dest: 'uploads/item',
  limits: {
    fileSize: 10_000_000,
  },
});
