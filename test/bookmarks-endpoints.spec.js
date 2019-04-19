const { expect } = require('chai')
const knex = require('knex')
const app = require('../src/app')

describe.only('Bookmarks Endpoints', function () {
  let db

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    })
    app.set('db', db)
  })

  after('disconnect from db', () => db.destroy())

  before('clean the table', () => db('bookmarks').truncate())

  afterEach('cleanup', () => db('bookmarks').truncate())

  context('Given there are bookmarks in the database', () => {
    const testBookmarks = [
      {
        id: 1,
        title: 'First test bookmark!',
        url: 'http://www.google.com',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
        rating: 2
      },
      {
        id: 2,
        title: 'Second test bookmark',
        url: 'http://www.google.com',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
        rating: 2
      },
      {
        id: 3,
        title: 'third test!',
        url: 'http://www.google.com',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
        rating: 2
      },
      {
        id: 4,
        title: 'fourth test!',
        url: 'http://www.google.com',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
        rating: 2
      },
    ];

    beforeEach('insert bookmarks', () => {
      return db
        .into('bookmarks')
        .insert(testBookmarks)
    })
    it('GET /bookmarks responds with 200 and all of the bookmarks', () => {
      return supertest(app)
        .get('/bookmarks')
        .expect(200, testBookmarks)

    })
    it('GET /bookmark/:bookmark_id responds with 200 and the specified bookmark', () => {
      const bookmarkId = 2
      const expectedBookmarks = testBookmarks[bookmarkId - 1]
      return supertest(app)
        .get(`/bookmarks/${bookmarkId}`)
        .expect(200, expectedBookmarks)
    })
  })
})