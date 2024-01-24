

function MemeComponent(props) {

    const meme = props.meme;
    const {title,payload_type,tags,id} = meme;

    function handleLike()
    {
        fetch(`http://localhost:7475/meme/${id}/givelike`,
        {
            method: 'POST',
            credentials: 'include',
        })
        .then(response => response.json())
    }

    return (
        <div className="">
            <p>{title}</p>
            <div>
                {
                    tags.map((tag) => 
                    {
                        return <span>{tag}</span>
                    })  
                }        
            </div>
            <div>
                {(payload_type === 'png' || payload_type === 'jpg' || payload_type === 'jpeg' )&& (
                    <img src={`C:/Users/I_am_not_a_weeb/Desktop/Studia/Semestr3/BazyDanychII/Projekt/Projekt/${id}`} alt="Meme" />
                )}
                {payload_type === 'mp4' && (
                    <video src={`C:/Users/I_am_not_a_weeb/Desktop/Studia/Semestr3/BazyDanychII/Projekt/Projekt/${id}`} controls />
                )}
            </div>
            <button onClick={handleLike}>
                Like
            </button>
        </div>
    )
}

export default MemeComponent