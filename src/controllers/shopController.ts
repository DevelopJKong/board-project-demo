import { Request, Response } from 'express';

import Item from '../models/Item';

export const getShopList = (req: Request, res: Response) => {
  return res.render('shop/shop-list');
};

export const postShopList = async (req: Request, res: Response) => {
  const {
    body: { name, content, amount },
    file,
  } = req;
  try {
    await Item.create({
      name,
      itemImg: file ? file.path : '',
      content,
      amount,
    });

    return res.redirect('/');
  } catch (error) {
    return res.status(400).render('shop-list', {
      errorMessage: error._message ?? '',
    });
  }
};

export const getShopItem = async (_req: Request, res: Response) => {
  const items = await Item.find({}).sort({ createdAt: 'desc' }); // find vs findById
  return res.render('./shop/item-list', { items });
};

export const getShopSuccess = (_req: Request, res: Response) => {
  return res.render('./shop/shop-success');
};

export const getShop = async (req: Request, res: Response) => {
  const { id } = req.params;
  const item = await Item.findById(id);
  if (!item) {
    return res.render('404');
  }
  return res.render('./shop/shop', { item });
};

export const postShop = async (_req: Request, _res: Response) => {
  // TODO 결제 기능 구현예정
};
