import { Product } from '../models/index.model.js';
import { NotFoundError } from '../lib/errors.js';
import { Op } from 'sequelize';

export async function getProducts(_, res) {
  const products = await Product.findAll({ include: ['category', 'tag'] });
  res.json(products);
}

export async function getProduct(req, res) {
  const slugOrId = req.params.slugOrId;
  let product;

  if (!isNaN(slugOrId)) {
    product = await Product.findOne({
      where: { id: slugOrId },
      include: ['category', 'tag'],
    });
  } else {
    product = await Product.findOne({
      where: { slug: slugOrId },
      include: ['category', 'tag'],
    });
  }

  if (!product) {
    throw new NotFoundError('Product not found');
  }

  res.json(product);
}
