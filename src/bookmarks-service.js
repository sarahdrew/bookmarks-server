//file to store bookmarksService object and put methods on the object that store our transactions
const BookmarksService = {
    getAllBookmarks(knex) {
        return knex
            .select('*')
            .from('bookmarks')
    },
    insertBookmark(knex, newbookmark) {
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
    deleteBookmark(knex, id) {
        return knex('bookmarks')
            .where({ id })
            .delete()
    },
    updateBookmark(knex, id, newBookmarkFields) {
        return knex('bookmarks')
            .where({ id })
            .update(newBookmarkFields)
    }
}

module.exports = BookmarksService