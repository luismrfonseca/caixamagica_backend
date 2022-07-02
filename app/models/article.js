
const db = require('../managers/db.manager');

const getAllArticles = () => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT a.id, a.title, a.intro, a.content, a.author_id, JSON_OBJECT('created', created_at, 'updated', updated_at) AS dates 
    FROM articles a`;

    db.query(sql, (error, rows, fields) => {
      if (error) { return reject(error); }

      return resolve(rows);
    });
  });
};

const getAllArticlesWithLimit = (limit, skip) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT a.id, a.title, a.intro, a.content, a.author_id, JSON_OBJECT('created', created_at, 'updated', updated_at) AS dates 
    FROM articles a`;

    if (limit !== undefined && skip !== undefined) {
      sql += `\n Limit ${+skip}, ${+limit}`;
    }

    db.query(sql, (error, rows, fields) => {
      if (error) { return reject(error); }

      return resolve(rows);
    });
  });
};

const getCountArticles = () => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT count(*) AS count
    FROM articles a`;

    db.query(sql, (error, rows, fields) => {
      if (error) { return reject(error); }

      return resolve(rows);
    });
  });
};

const getArticlesById = (articleId) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT a.id, a.title, a.intro, a.content, a.author_id, JSON_OBJECT('created', created_at, 'updated', updated_at) AS dates 
    FROM articles a
    WHERE a.id=?`;

    db.query(sql, [ articleId ], (error, rows, fields) => {
      if (error) { return reject(error); }

      return resolve(rows);
    });
  });
};

const getAllArticlesByAuthorId = (authorId) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT a.id, a.title, a.intro, a.content, a.author_id, JSON_OBJECT('created', created_at, 'updated', updated_at) AS dates 
    FROM articles a
    WHERE a.author_id=?`;

    db.query(sql, [ authorId ], (error, rows, fields) => {
      if (error) { return reject(error); }

      return resolve(rows);
    });
  });
};

const getAllArticlesBetweenDates = (dateBegin, dateEnd) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT a.id, a.title, a.intro, a.content, a.author_id, JSON_OBJECT('created', created_at, 'updated', updated_at) AS dates 
    FROM articles a
    WHERE a.created_at BETWEEN ? AND ?;`;

    db.query(sql, [ dateBegin, dateEnd ], (error, rows, fields) => {
      if (error) { return reject(error); }

      return resolve(rows);
    });
  });
};

const getAllArticlesByTitle = (searchTitle) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT a.id, a.title, a.intro, a.content, a.author_id, JSON_OBJECT('created', created_at, 'updated', updated_at) AS dates 
    FROM articles a
    WHERE a.title LIKE ?`;

    db.query(sql, [ '%' + searchTitle + '%' ], (error, rows, fields) => {
      if (error) { return reject(error); }

      return resolve(rows);
    });
  });
};

const createArticle = (title, intro, content, authorId) => {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO  articles (title, intro, content, author_id, created_at, updated_at)
    VALUES (?,?,?,?,now(),now())`;

    db.query(sql, [ title, intro, content, authorId ], (error, rows, fields) => {
      if (error) { return reject(error); }

      return resolve(rows.insertId);
    });
  });
};

const updateArticle = (articleId, title, intro) => {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE articles SET title=?, intro=?, updated_at=now()
    WHERE id=?`;

    db.query(sql, [ title, intro, articleId ], (error, rows, fields) => {
      if (error) { return reject(error); }

      return resolve();
    });
  });
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
