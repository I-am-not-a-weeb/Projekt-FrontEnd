


function CommentComponent(props)
{
    const comment = props.comment;

    const author = comment.author;

    return (
        <div className="flex flex-col">
            <img src={`data:image/${author.avatar_type};base64,${author.avatar}`}/>
            <p>{comment.body}</p>
            <p>{comment.likes}</p>
        </div>
    );
}

export default CommentComponent;