/* eslint-disable promise/no-callback-in-promise */
const R = require('ramda');
const loggerManager = require('../managers/logger.manager');
const router = require('express').Router();
const ArticlesService = require('../services/articles');
const NotFoundError = require('../errors/notFoundError');
const pagination = require('../../middleware/pagination');
const moment = require('moment');

router.get('/', (req, res, next) => {
  return ArticlesService.getAllArticles()
    .then((data) => res.json(data))
    .catch(error => {
      loggerManager.getLogger().error(`[Articles][GetAll] ${error.message || error}`);

      if (error.status === 404) {
        return next(new NotFoundError('Don\'t exists articles', 'ArticlesGetAll'));
      } else {
        return next(new Error(error.message, 'ArticlesGetAll'));
      }
    });
});

router.get('/pagination', pagination, (req, res, next) => {
  const limit = R.path([ 'query', 'limit' ])(req);
  const skip = R.prop('skip', req);
  const nextPage = res.locals.paginate.href();
  const page = R.pathOr(1, [ 'query', 'page' ])(req);

  if (R.is(Number, limit)) {
    return Promise.all([
      ArticlesService.getAllArticlesWithLimit(limit, skip),
      ArticlesService.getCountArticles(),
    ])
    .then(([ response, count ]) => {
      const missingItems = count - (page * limit);
      if (missingItems + limit < 0) {
        throw new NoContentError();
      }

      return res.json({
        articles: response,
        next: limit > 0 && missingItems > 0 ? nextPage : undefined,
        count,
      });
    })
    .catch(error => {
      loggerManager.getLogger().error(`[Articles][GetAll] ${error.message || error}`);

      if (error.status === 404) {
        return next(new NotFoundError('Don\'t exists articles', 'ArticlesGetAll'));
      } else {
        return next(new Error(error.message, 'ArticlesGetAll'));
      }
    });
  }

  return ArticlesService.getAllArticles()
    .then((data) => res.json(data))
    .catch(error => {
      loggerManager.getLogger().error(`[Articles][GetAll] ${error.message || error}`);

      if (error.status === 404) {
        return next(new NotFoundError('Don\'t exists articles', 'ArticlesGetAll'));
      } else {
        return next(new Error(error.message, 'ArticlesGetAll'));
      }
    });
});

router.get('/:articleId', (req, res, next) => {
  const articleId = req.params.articleId;

  return ArticlesService.getArticlesById(articleId)
    .then(([ data ]) => {
      if (R.isNil(data)) throw new NotFoundError('Article dont exists.', 'article');

      return res.json(data);
    })
    .catch(error => {
      loggerManager.getLogger().error(`[Articles][GetById] ${error.message || error}`);

      if (error.status === 404) {
        return next(new NotFoundError('This article don\'t exists', 'ArticlesGetById'));
      } else {
        return next(new Error(error.message, 'ArticlesGetById'));
      }
    });
});

router.get('/dates/:dateBegin/:dateEnd', (req, res, next) => {
  let dateBegin = req.params.dateBegin;
  let dateEnd = req.params.dateEnd;

  if (R.length(dateBegin)>10) {
    dateBegin = moment(dateBegin).format('YYYY-MM-DD HH:mm:ss.SSSS');
  } else {
    dateBegin = moment(dateBegin).format('YYYY-MM-DD 00:00:00.0000');
  }
  if (R.length(dateEnd)>10) {
    dateEnd = moment(dateEnd).format('YYYY-MM-DD HH:mm:ss.SSSS');
  } else {
    dateEnd = moment(dateEnd).format('YYYY-MM-DD 23:59:59.9999');
  }
  
  return ArticlesService.getAllArticlesBetweenDates(dateBegin, dateEnd)
    .then((data) => {
      return res.json(data);
    })
    .catch(error => {
      loggerManager.getLogger().error(`[Articles][GetAllBetweenDates] ${error.message || error}`);

      if (error.status === 404) {
        return next(new NotFoundError('Don\'t exist articles.', 'ArticlesGetAllBetweenDates'));
      } else {
        return next(new Error(error.message, 'ArticlesGetAllBetweenDates'));
      }
    });
});

router.get('/title/:searchTitle', (req, res, next) => {
  const searchTitle = req.params.searchTitle;

  return ArticlesService.getAllArticlesByTitle(searchTitle)
    .then((data) => {
      return res.json(data);
    })
    .catch(error => {
      loggerManager.getLogger().error(`[Articles][GetAllByTitle] ${error.message || error}`);

      if (error.status === 404) {
        return next(new NotFoundError('Don\'t exist articles.', 'ArticlesGetAllByTitle'));
      } else {
        return next(new Error(error.message, 'ArticlesGetAllByTitle'));
      }
    });
});

router.get('/author/:authorId', (req, res, next) => {
  const authorId = req.params.authorId;

  return ArticlesService.getAllArticlesByAuthorId(authorId)
    .then((data) => {
      if (R.isNil(data) || R.isEmpty(data)) throw new NotFoundError('Don\'t exist articles.', 'articles');

      return res.json(data);
    })
    .catch(error => {
      loggerManager.getLogger().error(`[Articles][GetAllByAuthorId] ${error.message || error}`);

      if (error.status === 404) {
        return next(new NotFoundError('Don\'t exist articles.', 'ArticlesGetAllByAuthorId'));
      } else {
        return next(new Error(error.message, 'ArticlesGetAllByAuthorId'));
      }
    });
});

router.post('/', (req, res, next) => {
  if (R.isEmpty(req.body)) {
    return res.status(500).json({ status: 500, message: 'Invalid body payload' });
  }

  const newArticle = req.body;

  return ArticlesService.createArticle(newArticle)
    .then((data) => res.json(data))
    .catch(error => {
      loggerManager.getLogger().error(`[Articles][Create] ${error.message || error}`);

      if (error.status === 404) {
        return next(new NotFoundError('Don\'t exist articles.', 'ArticlesCreate'));
      } else {
        return next(new Error(error.message, 'ArticlesCreate'));
      }
    });
});

router.put('/:articleId', (req, res, next) => {
  if (R.isEmpty(req.body)) {
    return res.status(500).json({ status: 500, message: 'Invalid body payload' });
  }

  const articleId = req.params.articleId;
  const updateArticle = req.body;

  return ArticlesService.getArticlesById(articleId)
    .then(([ article ]) => {
      if (R.isNil(article)) throw new NotFoundError('Article dont exists.', 'article');

      return ArticlesService.updateArticle(article.id, updateArticle);
    })
    .then((data) => res.json(data))
    .catch(error => {
      loggerManager.getLogger().error(`[Articles][Update] ${error.message || error}`);

      if (error.status === 404) {
        return next(new NotFoundError('Don\'t exist articles.', 'ArticlesUpdate'));
      } else {
        return next(new Error(error.message, 'ArticlesUpdate'));
      }
    });
});

module.exports = router;
