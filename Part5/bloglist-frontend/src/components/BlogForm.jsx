const BlogForm = ({ handleCreateNew,title,author,url,handleTitleChange,handleAuthorChange,handleUrlChange}) => {
    return (
        <div>
            <form onSubmit={handleCreateNew}>
                    <div>
                        title : 
                        <input type='text' value={title} name='Title' onChange={handleTitleChange}/>
                    </div>
                    <div>
                        author : 
                        <input type='text' value={author} name='Author' onChange={handleAuthorChange}/>
                    </div>
                    <div>
                            url : 
                            <input type='text' value={url} name='Url' onChange={handleUrlChange}/>
                    </div>
                    <button type='submit'>Create</button>
            </form>
        </div>
    )
}

export default BlogForm