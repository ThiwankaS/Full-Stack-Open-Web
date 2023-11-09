const BlogForm = ({ blogListItem,setBlogListItem,handelSubmit }) => {

    return (
        <div>
            <h4>Blog Form</h4>
            <form onSubmit={handelSubmit}>
                <div>title : <input id="title" value={blogListItem.title} onChange={(event) => {setBlogListItem({...blogListItem, title : event.target.value})}} /></div>
                <div>author : <input id="author" value={blogListItem.author} onChange={(event) => {setBlogListItem({...blogListItem, author : event.target.value})}} /></div>
                <div>url : <input id="url" value={blogListItem.url} onChange={(event) => {setBlogListItem({...blogListItem, url : event.target.value})}} /></div>
                <div>likes : <input id="likes" value={blogListItem.likes} onChange={(event) => {setBlogListItem({...blogListItem, likes : event.target.value})}} /></div>
                <div><button type="submit">Save</button></div>
            </form>
        </div>
    )
}

export default BlogForm