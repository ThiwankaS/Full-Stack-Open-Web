const listHelper = require('../utils/list_helper').dummy

describe('helper function',() => {
    test('dummy returns one',() => {
        const blogs = []
        const result = listHelper(blogs)
        expect(result).toBe(1)
    })
})