/* eslint-disable react/prop-types */
const BlogDisplay = ({list}) => {
    return (
        <>
        <div className="pl-5 max-w-max h-auto">
            <div className="px-4 sm:px-0">
                <h3 className="text-base font-semibold leading-7 text-gray-900">Saved blog list</h3>
            </div>
            {list.map((record) => 
            <div key={record._id} className="mt-2 border-t border-black-100">
                <dl className="divide-y divide-gray-100">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Title</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{record.title}</dd>
                        <dt className="text-sm font-medium leading-6 text-gray-900">Author</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{record.author}</dd>
                        <dt className="text-sm font-medium leading-6 text-gray-900">URL</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{record.url}</dd>
                        <dt className="text-sm font-medium leading-6 text-gray-900">Likes</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{record.likes}</dd>
                    </div>
                </dl>
            </div>)
            }
            
        </div>
        </>
    )
}

export default BlogDisplay