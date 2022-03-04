const e = require("express");

function getOffset(currentPage = 1, listPerPage) {
    return (currentPage - 1) * [listPerPage];
  }
  
function emptyOrRows(rows) {
    if (!rows) {
      return [];
    }
    return rows;
}

function emptyOrRow(rows) {
    if (!rows) {
      return {
        message : "The Record is not exist from your list"
      } 
    } else {
      if(rows.length > 0) {
        return rows[0];
      } else {
        return {
          message : "The Record is not exist from your list"
        } 
      }
    }
}
  
module.exports = {
    getOffset,
    emptyOrRows,
    emptyOrRow
}