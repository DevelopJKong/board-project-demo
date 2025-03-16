import { Request, Response } from 'express';

import logger from '../common/logger';
import Board from '../models/Board';
import User from '../models/User';

export const home = async (_req: Request, res: Response) => {
  try {
    const boards = await Board.find({}).sort({ createdAt: 'desc' }); // find vs findById
    //* 200 success
    logger.info(`home 랜더 성공 & 데이터 boards 전달 성공`);
    return res.status(200).render('home', { boards });
  } catch (error) {
    // ! 500 extraServer error
    logger.error(`500 error`);
    return res.status(500).json({ status: 'extraServer', message: '잠시 후에 다시 시도해주세요' });
  }
};

export const search = async (req: Request, res: Response) => {
  const { keyword } = req.query;
  let boards = [];
  if (keyword) {
    boards = await Board.find({
      title: {
        $regex: new RegExp(keyword as any, 'i'),
      },
    });
  }
  return res.render('search', { boards });
};

export const getSeeBoard = async (req: Request, res: Response) => {
  const { id } = req.params;
  const board = await Board.findById(id).populate('owner');
  if (!board) {
    return res.render('404', { pageTitle: 'Page Not Found' });
  }
  return res.render('watch', { board, pageTitle: 'Watch' });
};

export const getEditBoard = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const board = await Board.findById(id);
  if (!board) {
    return res.status(404).render('404', { pageTitle: 'Page Not Found' });
  }
  if (String(board.owner) !== String(_id)) {
    return res.status(403).redirect('/');
  }
  return res.render('edit', { board, pageTitle: 'Edit' });
};
export const postEditBoard = async (req: Request, res: Response) => {
  const {
    user: { _id },
  } = req.session;
  const {
    params: { id },
    body: { title, content, boardImg },
    file,
  } = req;

  const isPro = process.env.MODE === 'production';

  const board = await Board.findById(id);
  if (!board) {
    return res.status(404).render('404', { pageTitle: 'Page Not Found' });
  }
  if (String(board.owner) !== String(_id)) {
    return res.status(403).redirect('/');
  }
  await Board.findByIdAndUpdate(id, {
    title,
    content,
    boardImg: file ? (isPro ? (file as any)?.location : file.path) : boardImg,
  });
  return res.redirect(`/board/${id}`);
};

export const getWriteBoard = (req: Request, res: Response) => {
  return res.render('write');
};

export const postWriteBoard = async (req: Request, res: Response) => {
  const {
    user: { _id },
  } = req.session;
  const {
    body: { title, content, boardImg },
    file,
  } = req;

  const isPro = process.env.MODE === 'production';

  try {
    const newBoard = await Board.create({
      title,
      content,
      owner: _id,
      boardImg: file ? (isPro ? (file as any).location : file.path) : boardImg,
    });
    const user = await User.findById(_id);

    if (user) {
      user.boards.push(newBoard._id);
      user.save();
    }
    return res.redirect('/');
  } catch (error) {
    return res.status(400).render('write', {
      errorMessage: error._message,
      pageTitle: 'Write',
    });
  }
};

export const getDeleteBoard = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;

  const board = await Board.findById(id);
  if (!board) {
    return res.status(404).render('404', { pageTitle: 'Page Not Found' });
  }
  if (String(board.owner) !== String(_id)) {
    return res.status(403).redirect('/');
  }

  await Board.findByIdAndDelete(id);

  return res.redirect('/');
};
