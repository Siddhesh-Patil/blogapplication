import { useState, useEffect, useContext } from 'react';
import { Box, styled, FormControl, InputBase, Button, TextareaAutosize} from '@mui/material';
import { AddCircle as Add} from '@mui/icons-material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { DataContext } from '../../context/DataProvider';
import { API } from '../../services/api';



const Container = styled(Box)(({theme}) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin:0
    }
}));
const Image = styled('img')({
    width:'100%',
    height:'50vh',
    objectFit:'cover'
})

const StyledFormControl = styled(FormControl)`
    margin-top:10px;
    display:flex;
    flex-direction:row;

`
const InputTextFeild = styled(InputBase)`
    flex:1;
    margin: 0 30px;
    font-size:25px;

`
const Textarea = styled(TextareaAutosize)`
    width:100%;
    margin-top:50px;
    font-size:18px;
    border: none;
    &:focus-visible {
        outline: none;
    }
`

const initalBlog = {
    title: '',
    description:'',
    picture:'',
    username:'',
    categories:'',
    createdDate: new Date()
}
const Update = () => {
   

    const [blog, setBlog] = useState(initalBlog);
    const [file, setFile] = useState('');

    const { account } = useContext(DataContext);

    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();

    const URL = blog.picture ? blog.picture : 'https://cdn.pixabay.com/photo/2017/02/21/17/04/rainbow-bridge-2086645__340.jpg';

    useEffect(() => {
        const fetchData = async () => {
            let response = await API.getPostById(id);
            if(response.isSuccess) {
                setBlog(response.data);
            }
        }
        fetchData();
    },[])
    useEffect(() => {
        const getImage = async () => {
            if (file) {
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file);

                const response = await API.uploadFile(data);
                blog.picture = response.data;
            }
         }
         getImage();
        blog.categories = location.search?.split('=')[1] || 'all';
        blog.username = account.username;
    },[file])
    const handleChange = (e) => {
        setBlog({ ...blog, [e.target.name]: e.target.value })
    }

    const updateBlogPost = async () => {
        let response = await API.updatePost(blog);
        if (response.isSuccess) {
            navigate(`/details/${id}`);
        }
    }
    return(
        <Container>
            <Image src={URL} alt="createImage" />
            <StyledFormControl>
                <label htmlFor='fileInput'>
                    <Add fontSize='large' color='action'/>
                </label>
                <input 
                    type="file" 
                    id="fileInput"
                    style={{display:'none'}}
                    onChange={(e) => setFile(e.target.files[0])}
                />

                <InputTextFeild placeholder='Title' value={blog.title} onChange={(e) => handleChange(e)} name="title"/>
                <Button variant="contained" onClick={() => updateBlogPost()}>Update</Button>
            </StyledFormControl>
            <Textarea
                minRows={5}
                placeholder="Write your blog..... "
                onChange={(e) => handleChange(e)}
                name="description"
                value={blog.description}
            />
        </Container>
    )
}

export default Update;