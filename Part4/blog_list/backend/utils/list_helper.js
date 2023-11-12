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

module.exports = {
    dummy,totalLikes,favoriteBlog
}