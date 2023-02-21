import { Box, Typography, styled } from "@mui/material";


const Image = styled(Box)`
    background-image: url("https://images.unsplash.com/photo-1471922694854-ff1b63b20054?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80https://wallpaperaccess.com/full/1131217.jpg");
    background-size: cover;
    background-position: center center;
    height: 60vh;
    font-size:50px;
    background-repeat:no-repeat; 
    }
`

const Heading = styled(Typography)`
    font-size:70px;
    line-height: 100px;
    
    font-weight:bold;
    text-shadow: 0 0 5px #ffa500, 0 0 15px #ffa500, 0 0 20px #ffa500, 0 0 40px #ffa500, 0 0 60px #ff0000, 0 0 10px #ff8d00, 0 0 98px #ff0000;
    color: #fff6a9;
    font-family: "Sacramento", cursive;
    text-align: center;
    padding-top: 80px;
    animation: blink 9s infinite;
    -webkit-animation: blink 2s infinite;

    @-webkit-keyframes blink {
        20%,
        24%,
        55% {
          color: #111;
          text-shadow: none;
        }
      
        0%,
        19%,
        21%,
        23%,
        25%,
        54%,
        56%,
        100% {
        text-shadow: 0 0 5px #ffa500, 0 0 15px #ffa500, 0 0 20px #ffa500, 0 0 40px #ffa500, 0 0 60px #ff0000, 0 0 10px #ff8d00, 0 0 98px #ff0000;
          color: #fff6a9;
        }
      }
      
      @keyframes blink {
        20%,
        24%,
        55% {
          color: #111;
          text-shadow: none;
        }
      
        0%,
        19%,
        21%,
        23%,
        25%,
        54%,
        56%,
        100% {
      
        text-shadow: 0 0 5px #ffa500, 0 0 15px #ffa500, 0 0 20px #ffa500, 0 0 40px #ffa500, 0 0 60px #ff0000, 0 0 10px #ff8d00, 0 0 98px #ff0000;
          color: #fff6a9;
        }
      }
`
const Subheading = styled(Typography)`
color:white;
text-shadow: 0 0 10px #03bcf4,
    0 0 20px #03bcf4,
    0 0 40px #03bcf4,
    0 0 80px #03bcf4,
    0 0 160px #03bcf4;
font-size: 30px;
text-align: center;

}

}
`
const Banner = () => {
    return (
        <Image>
            <Heading>BLOG</Heading>
            <Subheading>There is power in words what you say is what you get</Subheading>
        </Image>
    )
}

export default Banner;