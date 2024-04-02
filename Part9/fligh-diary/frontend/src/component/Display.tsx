const Display = ({ error }) => {

    const errorStyle = {
        color : 'red',
        fontWeight : 'bold'
    }

    return (<div>
        <p style={errorStyle}>{error}</p>
    </div>)
}

export default Display;