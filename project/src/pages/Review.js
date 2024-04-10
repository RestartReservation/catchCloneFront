import React ,{useState,useEffect} from "react"
import {Routes,Route,useParams} from "react-router-dom";
import WriteReview from "./WriteReview";
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


    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(URL_VARIABLE + "comments/review/" + id);
                console.log(response);
                setComment(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchComments();
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
        <input type="text"></input>
        {/* <Link to = "/writeReview"><button onClick={writeComment}>댓글작성</button></Link > */}
        </div>
        <Routes>
            <Route path="/writeReview" element={<WriteReview />} />
        </Routes>
        </table>
        
    );

}
export default Review; 