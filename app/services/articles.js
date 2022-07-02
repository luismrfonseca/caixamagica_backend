const R = require('ramda');
const ArticleModel = require('../models/article');

const getAllArticles = () => {
  return ArticleModel.getAllArticles()
    .then(R.map(article => {
      article.dates = JSON.parse(article.dates);
      return article;
    }));
};

const getAllArticlesWithLimit = (limit, skip) => {
  return ArticleModel.getAllArticlesWithLimit(limit, skip)
    .then(R.map(article => {
      article.dates = JSON.parse(article.dates);
      return article;
    }));
};

const getCountArticles = () => {
  return ArticleModel.getCountArticles()
    .then(R.compose(R.prop('count'), R.head));
};

const getArticlesById = (articleId) => {
  return ArticleModel.getArticlesById(articleId)
    .then(R.map(article => {
      article.dates = JSON.parse(article.dates);
      return article;
    }));
};

const getAllArticlesByAuthorId = (authorId) => {
  return ArticleModel.getAllArticlesByAuthorId(authorId)
    .then(R.map(article => {
      article.dates = JSON.parse(article.dates);
      return article;
    }));
};


const getAllArticlesBetweenDates = (dateBegin, dateEnd) => {
  return ArticleModel.getAllArticlesBetweenDates(dateBegin, dateEnd)
    .then(R.map(article => {
      article.dates = JSON.parse(article.dates);
      return article;
    }));
};

const getAllArticlesByTitle = (searchTitle) => {
  return ArticleModel.getAllArticlesByTitle(searchTitle)
    .then(R.map(article => {
      article.dates = JSON.parse(article.dates);
      return article;
    }));
};

const createArticle = (newArticle) => {
  return ArticleModel.createArticle(newArticle.title, newArticle.intro, newArticle.content, newArticle.author_id)
    .then((articleId) => getArticlesById(articleId));
};

const updateArticle = (articleId, updateArticle) => {
  return ArticleModel.updateArticle(articleId, updateArticle.title, updateArticle.intro)
    .then(() => getArticlesById(articleId));
};

module.exports = {
  getAllArticles,
  getAllArticlesWithLimit,
  getCountArticles,
  getArticlesById,
  getAllArticlesByAuthorId,
  getAllArticlesBetweenDates,
  getAllArticlesByTitle,
  createArticle,
  updateArticle,
};
