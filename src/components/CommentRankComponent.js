import { useNavigate } from "react-router-dom";


function CommentComponent(props)
{
    const comment = props.comment;
    const navigate = useNavigate();
    const author = comment.author;

    return (
        <div className="flex flex-col p-4">
            <p>{comment.author}</p>
            <p>{comment.body}</p>
            <p>{comment.who_liked.length}</p>
        </div>
    );
}

export default CommentComponent;