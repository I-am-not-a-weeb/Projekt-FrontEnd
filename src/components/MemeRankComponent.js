


function MemeRankComponent(props) {
    const meme = props.meme;


    return (
        <div className="flex flex-col">
            <img src={`data:image/${meme.payload_type};base64,${meme.payload}`}/>
            <p>{meme.title}</p>
            <p>{meme.likes}</p>
        </div>
    )
}

export default MemeRankComponent;