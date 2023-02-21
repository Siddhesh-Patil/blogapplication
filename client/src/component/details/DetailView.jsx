import { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Box, Typography, styled } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { API } from '../../services/api';
import { DataContext } from '../../context/DataProvider';
import  Comments from './comments/Comments';


const Container = styled(Box)(({theme}) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin:0
    }
}));
   



const Image = styled('img')({
    width:'100%',
    height: '85vh',
    objectFit:'cover'
});

const Heading = styled(Typography)`
    font-size: 38px;
    font-wight:600;
    text-align: center;
    margin: 50px 0 10px 0 ;
    word-break: break-word;
`

const EditIcon = styled(Edit)`
    margin:5px;
    padding: 5px;
    border : 1px solid #878787;
    border-radius: 10px;

`
const DeleteIcon = styled(Delete)`
    margin:5px;
    padding: 5px;
    border : 1px solid #878787;
    border-radius: 10px;
    cursor:pointer;

`

const Author = styled(Box)`
    color: #878787;
    margin: 20px 0;
    display: flex;
`

const Description = styled(Typography)`
    word-break: break-word;

`
const  DetailView = () => {
    const [post, setPost] = useState({});
    const { id } = useParams();
    const { account } = useContext(DataContext); 
    const navigate = useNavigate();
    const url = post.picture ? post.picture : 'https://cdn.pixabay.com/photo/2016/11/19/18/57/godafoss-1840758_960_720.jpg';
     
    useEffect(()=> {
        const fetchData =  async () => {
            let response = await API.getPostById(id);
            if(response.isSuccess){
                setPost(response.data);
            }
        }
        fetchData();
    })

    const deleteBlog = async () => {
        let response  = await API.deletePost(post._id);
        if(response.isSuccess){
            navigate('/')
        } 
    }
    return (
        <Container>
            <Image src={url} alt="blog" />
            <Box style={{ float: 'right'}}>
                {
                    account.username === post.username &&
                    <>
                        <Link to={`/update/${post._id}`}>
                              <EditIcon color="primary"/>
                        </Link>
                        <DeleteIcon onClick={() => deleteBlog()}color="error"/>
                    </> 
                }
                
            </Box>
            <Heading>{post.title}</Heading>

            <Author>
                <Typography>Author: <Box component="span" style={{fontWeight:600}}>{post.username}</Box></Typography>
                <Typography style={{marginLeft:'auto'}}>{new Date(post.createdDate).toDateString()}</Typography>
            </Author>
            <Description>{post.description}</Description>
            <Comments post={post}/>
        </Container>
    )
}

export default DetailView;