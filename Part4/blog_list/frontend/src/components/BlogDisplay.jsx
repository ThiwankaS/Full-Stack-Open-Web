const BlogDisplay = ({list}) => {
    return (
        <>
        <div>
            <h3> Blog Display </h3>
            <ul >
            {list.map((record)=><li key={record._id}> title : {record.title} | author : {record.author} | url : {record.url} | likes : {record.likes}</li>)}
            </ul>
            
        </div>
        </>
    )
}

export default BlogDisplay