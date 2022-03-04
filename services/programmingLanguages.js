const db = require('./db');
const helper = require('../helper');
class BaseApi {
  constructor() {
  }
  async getMultiple(filters) {
    var page = filters['page'] || 1;
    var size = filters['size'] || 10000;
    var languageName = filters['name'];
    const offset = helper.getOffset(page, size);

    const rows = await db.query(
      `SELECT id, name, released_year, githut_rank, pypl_rank, tiobe_rank 
    FROM languages
    LIMIT ?,?`,
      [offset, size]
    );
    const totalRecords = await db.query(
      `SELECT count(*) as total FROM languages`,
      [offset, size]
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page: filters['page'], size: filters['size'], total: totalRecords[0].total };

    return {
      data,
      meta
    };
  }

  async get(id) {
    const rows = await db.query(
      `SELECT * 
      FROM languages WHERE id=?`,
      [id]
    );
    var data = helper.emptyOrRow(rows);
    return data;
  }

  async create(programmingLanguage) {
    const result = await db.query(
      `INSERT INTO languages 
      (name, released_year, githut_rank, pypl_rank, tiobe_rank) 
      VALUES (?, ?, ?, ?, ?)`,
      [
        programmingLanguage.name, programmingLanguage.released_year,
        programmingLanguage.githut_rank, programmingLanguage.pypl_rank,
        programmingLanguage.tiobe_rank
      ]
    );

    var data;

    if (result.affectedRows && result.insertId) {
      data = { languageId: result.insertId };
    } else {
      data = { error: 'Error while creating programming language' };
    }

    return data;
  }

  async update(id, programmingLanguage) {
    const result = await db.query(
      `UPDATE languages 
      SET name=?, released_year=?, githut_rank=?, 
      pypl_rank=?, tiobe_rank=? 
      WHERE id=?`,
      [
        programmingLanguage.name, programmingLanguage.released_year,
        programmingLanguage.githut_rank, programmingLanguage.pypl_rank,
        programmingLanguage.tiobe_rank, id
      ]
    );

    var res = { "error": 'the record is not exist which you are trying to update.' };
    if (result.affectedRows) {
      var data = await this.get(id);
      res = { ...data };
    }
    return res;
  }

  async remove(id) {
    const result = await db.query(
      `DELETE FROM languages WHERE id=?`,
      [id]
    );

    let message = 'the record is not exist which you are trying to delete.';

    if (result.affectedRows) {
      message = 'Programming language deleted successfully';
    }

    return { message };
  }

}

module.exports = BaseApi;
