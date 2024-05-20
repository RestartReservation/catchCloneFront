import React ,{useState,useEffect} from "react"
import {useParams} from "react-router-dom";
import axios from 'axios';
import { URL_VARIABLE } from "./ExportUrl"; 

const Comment = ({ comment }) => {
    const { commentId, nickName, commentContent, createdAt, layer } = comment;
  
    // 들여쓰기를 위한 스타일 적용
    const indentationStyle = {
      marginLeft: `${layer * 20}px`, // 20px 단위로 들여쓰기
    };
  
    return (
      <tr style={indentationStyle}>
        <td>
          {commentId} 작성자: {nickName} 댓글내용: {commentContent} 작성일자: {createdAt} <br />
        </td>
      </tr>
    );
  };
  


const Review = () =>{
    
    const { id } = useParams(); 
    const [reviewContents,setReviewContents] = useState();
    const [comments,setComments] = useState([]);
    const [writeComment,setWriteComment] = useState();
    
    useEffect(() => {
        const fetchReview = async () => {
            try {
                const response = await axios.get(URL_VARIABLE + "reviews/" + id);
                console.log(response);
                setReviewContents(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchReview();
    },[id])


    const requestWriteComment = async () => {
        try {
            const jwtToken = localStorage.getItem('jwtToken');
            const requestData = {
                commentContents: writeComment,
                isChild : false, //임시
                parentId: null //임시
              };
              console.log(jwtToken);
            const response = await axios.post(
             URL_VARIABLE + "comments/" + id, 
            requestData,
            {
                headers: {
                  Authorization: `${jwtToken}`
                },
              }
            );
            console.log(response);
            fetchComments(); // 댓글 작성 후 다시 댓글 목록을 가져옴
            setWriteComment(""); 
            // setReviewContents(response.data);
        } catch (error) {
            console.error(error);
        }
    };



    const handleWriteComment = (event) => {
        setWriteComment(event.target.value);
      };

      const fetchComments = async () => {
        try {
          const response = await axios.get(URL_VARIABLE + "comments/reviews/" + id);
          setComments(response.data);
        } catch (error) {
          console.error(error);
        }
      };
    
      useEffect(() => {
        fetchComments();
      }, [id]);

const CommentList = ({ comments }) => {
  const buildCommentTree = (comments) => {
    const map = {};
    const roots = [];

    comments.forEach((comment) => {
      map[comment.commentId] = { ...comment, children: [] };
    });

    comments.forEach((comment) => {
      if (comment.parentId !== null) {
        map[comment.parentId].children.push(map[comment.commentId]);
      } else {
        roots.push(map[comment.commentId]);
      }
    });

    return roots;
  };

  const renderComments = (comments, layer = 0) => {
    return comments.map((comment) => (
      <React.Fragment key={comment.commentId}>
        <Comment comment={comment} layer={layer} />
        {renderComments(comment.children, layer + 1)}
      </React.Fragment>
    ));
  };

  const commentTree = buildCommentTree(comments);
}

    // useEffect(() => {
    //     const fetchComments = async () => {
    //         try {
    //             const response = await axios.get(URL_VARIABLE + "comments/reviews/" + id);
    //             console.log(response);
    //             setComment(response.data);
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     };
    //     fetchComments();
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [id])


    return(
        <table>

        <tbody>
        {reviewContents && (
                <tr>
                    <td>제목 : {reviewContents.reviewTitle} 작성자 : {reviewContents.nickName} 작성일자 : {reviewContents.createdAt} <br/>  <br/>{reviewContents.reviewContent} </td>
                </tr>
            )}
             <br/>

               {comments.map(comment => (
            <Comment key={comment.commentId} comment={comment} />
          ))}
        </tbody>
       
        <div>

        <br></br>
        <input
        className="form-control"
        type="text"
        value={writeComment}
        onChange={handleWriteComment}
      />

        <button onClick={requestWriteComment}>댓글작성</button>
        
        </div>
        </table>
        
    );

}
export default Review; 