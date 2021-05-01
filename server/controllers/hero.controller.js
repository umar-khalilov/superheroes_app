const { Superhero, Superpower, Image } = require('../db/models');
const createHttpError = require('http-errors');

module.exports.createHero = async (req, res, next) => {
  try {
    const { body, files } = req;
    const hero = await Superhero.create(body);
    if (!hero) {
      return next(createHttpError(400));
    }
    if (files?.length) {
      const images = files.map(file => ({
        path: file.filename,
        heroId: hero.id,
      }));
      await Image.bulkCreate(images, {
        returning: true,
      });
    }
    if (body?.superpowers?.length) {
      const powers = body.superpowers.map(power => ({
        description: power,
        heroId: hero.id,
      }));
      await Superpower.bulkCreate(powers, {
        returning: true,
      });
    }
    const heroWithData = await Superhero.findAll({
      where: {
        id: hero.id,
      },
      include: [
        {
          model: Superpower,
          attributes: ['id', 'description'],
          as: superpowers,
        },
        {
          model: Image,
          attributes: ['id', 'path'],
          as: 'images',
        },
      ],
    });
    res.status(201).send({ data: heroWithData });
  } catch (error) {
    next(error);
  }
};

module.exports.getHeroes = async (req, res, next) => {
  try {
    const { pagination } = req;
    const heroes = await Superhero.findAll({
      include: [
        {
          model: Superpower,
          attributes: ['id', 'description'],
          as: 'superpowers',
        },
        {
          model: Image,
          attributes: ['id', 'path'],
          as: 'images',
        },
      ],
      order: [['updated_at', 'DESC']],
      ...pagination,
    });
    if (!heroes.length) {
      return next(createHttpError(404));
    }
    res.status(200).send({ data: heroes });
  } catch (error) {
    next(error);
  }
};

module.exports.getHero = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;

    const hero = await Superhero.findByPk(id, {
      include: [
        {
          model: Superpower,
          attributes: ['id', 'description'],
          as: 'superpowers',
        },
        {
          model: Image,
          attributes: ['id', 'path'],
          as: 'images',
        },
      ],
    });
    if (!hero) {
      return next(createHttpError(404));
    }
    res.status(200).send({ data: hero });
  } catch (error) {
    next(error);
  }
};
