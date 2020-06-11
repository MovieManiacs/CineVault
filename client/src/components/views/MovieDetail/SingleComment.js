import React, { useState } from 'react'
import { Comment, Avatar } from 'antd';
import { useSelector } from 'react-redux';
import LikeDislikes from './LikeDislikes';

function SingleComment(props) {
    const user = useSelector(state => state.user);
    const [CommentValue, setCommentValue] = useState("")
    const actions = [
        <LikeDislikes comment commentId={props.comment._id} userId={localStorage.getItem('userId')} />,
    ]

    return (
        <div>
            <Comment
                actions={actions}
                author={props.comment.userId.name}
                avatar={
                    <Avatar
                        src={props.comment.userId.image}
                        alt="image"
                    />
                }
                content={
                    <p>
                        {props.comment.content}
                    </p>
                }
            ></Comment>
        </div>
    )
}

export default SingleComment