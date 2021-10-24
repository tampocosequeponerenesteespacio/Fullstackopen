const totalLikes = (blogs) => {
    let likes = 0
    blogs.forEach(blog => {
        likes += blog.likes
        
    })
    return likes
}

const favoriteBlog = (blogs) => {
    let likes = 0
    let favorite = null
    blogs.forEach( blog => {
        if ( blog.likes > likes ) {
            likes = blog.likes
            favorite = blog
        }
    })
    return favorite
}

module.exports = {totalLikes, favoriteBlog}



