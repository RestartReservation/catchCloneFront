import React ,{useState,useEffect} from "react"
import {useParams} from "react-router-dom";
import axios from 'axios';
import { URL_VARIABLE } from "./ExportUrl"; 

const Comments = ({commentData}) => {
    return(
        <tr>
        <td>{commentData.commentId} 작성자 : {commentData.nickName} 댓글내용 : {commentData.commentContent} 작성일자 : {commentData.createdAt} <br/> </td>
    </tr>
    )
}


const Review = () =>{
    
    const { id } = useParams(); 
    const [reviewContents,setReviewContents] = useState();
    const [comments,setComment] = useState([]);
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
            const response = await axios.post(URL_VARIABLE + "comments/" + id, 
            requestData,
            {
                headers: {
                Authorization: `${jwtToken}`
                }
            });
            console.log(response);

            

            setReviewContents(response.data);
        } catch (error) {
            console.error(error);
        }
    };



    const handleWriteComment = (event) => {
        setWriteComment(event.target.value);
      };

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(URL_VARIABLE + "comments/reviews/" + id);
                console.log(response);
                setComment(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchComments();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])


    return(
        <table>

        <tbody>
        {reviewContents && (
                <tr>
                    <td>제목 : {reviewContents.reviewTitle} 작성자 : {reviewContents.nickName} 작성일자 : {reviewContents.createdAt} <br/>  <br/>{reviewContents.reviewContent} </td>
                </tr>
            )}
             <br/>
            {comments.map(comments => <Comments commentData={comments} />)}
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