//file to store ArticlesService object and put methods on the object that store our transactions
const BookmarksService = {
    getAllArticles(knex) {
        return knex
            .select('*')
            .from('bookmarks')
    },
    insertArticle(knex, newbookmark) {
        return knex
            .insert(newbookmark)
            .into('bookmarks')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    getById(knex, id) {
        return knex.from('bookmarks').select('*').where('id', id).first()
    },
    deleteArticle(knex, id) {
        return knex('bookmarks')
            .where({ id })
            .delete()
    },
    updateArticle(knex, id, newBookmarkFields) {
        return knex('bookmarks')
            .where({ id })
            .update(newBookmarkFields)
    }
}

module.exports = BookmarksService