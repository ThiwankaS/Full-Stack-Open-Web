import useValue from '../hooks/customeHooks'
import { Button,Input,Lable,Table,TBody,TR,TD  } from '../assets/styledComponents'
import { cellStyleLable,cellStyleInput } from '../assets/styleClasses'

const BlogForm = ({ createNew }) => {

  const { reset : titleReset,...title } = useValue('text')
  const { reset : authorReset,...author } = useValue('text')
  const { reset : urlReset,...url } = useValue('text')

  const handleCreateNew = (event) => {
    event.preventDefault()
    const newObject = {
      title : title.value,
      author : author.value,
      url : url.value
    }
    createNew(newObject)
    titleReset()
    authorReset()
    urlReset()
  }

  return (
    <div>
      <form onSubmit={handleCreateNew}>
        <Table>
          <TBody>
            <TR>
              <TD style={cellStyleLable}><Lable>Title :</Lable></TD>
              <TD style={cellStyleInput}><Input id='title' placeholder='Title' value={title} {...title}/></TD>
            </TR>
            <TR>
              <TD style={cellStyleLable}><Lable>Author :</Lable></TD>
              <TD style={cellStyleInput}><Input id='author' placeholder='Author' value={author} {...author}/></TD>
            </TR>
            <TR>
              <TD style={cellStyleLable}><Lable>Url :</Lable></TD>
              <TD style={cellStyleInput}><Input id='url' placeholder='Url' value={url} {...url}/></TD>
            </TR>
          </TBody>
        </Table>
        <Button id='create-button' type='submit'>Create</Button>
      </form>
    </div>
  )
}

export default BlogForm