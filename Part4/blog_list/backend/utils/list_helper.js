const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum,item) => {
        return sum + item.likes
    }
    return blogs.reduce(reducer,0)
}

const favoriteBlog = (blogs) => {
    let favoriteBlog = {}
    let mostLikes = 0
    const reducer = (acc,blog) => {
        if(blog.likes > mostLikes){
            mostLikes = blog.likes
            favoriteBlog = {
                title : blog.title,
                author : blog.author,
                likes : blog.likes
            }
        }
        return acc
    }
    blogs.reduce(reducer,0)
    return favoriteBlog
}

const mostBlogs = (blogs) => {
    if(blogs.length === 0) {
        return {}
    } else {
        
        const listOfAuthors = _.groupBy(blogs,'author')
        const list = _.keys(listOfAuthors)
        console.log('list',list)
        const whoHasTheMostNoOfBlogs = _.maxBy(list,(author) => listOfAuthors[author].length)
        console.log('author',whoHasTheMostNoOfBlogs)
        const noOfBlogs = listOfAuthors[whoHasTheMostNoOfBlogs].length
        return {
                author : whoHasTheMostNoOfBlogs,
                blogs : noOfBlogs
            }
    }
}

module.exports = {
    dummy,totalLikes,favoriteBlog,mostBlogs
}
