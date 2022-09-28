import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Box,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Link } from "react-router-dom";
import "../firebase";
import { auth } from '../firebase';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import {Parallax, ParallaxLayer} from '@react-spring/parallax';
import Ani1 from "../components/Animation/Ani1.jsx";
import MainAni from "../components/Animation/MainAni.jsx";
import MainTitle from "../components/Animation/MainTitle.jsx";
import { useRef } from 'react';
import { fontFamily, fontSize, fontWeight, height } from "@mui/system";
import "../components/Animation/Scrolldown.css"


function Login() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const ref = useRef();

  const loginUser = useCallback(async (email, password) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(getAuth(), email, password);
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  }, []);

  
  function handleGoogleLogin() {
    const provider = new GoogleAuthProvider(); // provider를 구글로 설정
    signInWithPopup(auth, provider) // popup을 이용한 signup
      .then((data) => {
        setUserData(data.user); // user data 설정
        console.log(data) // console로 들어온 데이터 표시
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const email = data.get("email");
      const password = data.get("password");
      if (!email || !password) {
        setError("모든 항목을 입력해주세요.");
        return;
      }
      loginUser(email, password);
    },
    [loginUser]
  );

  useEffect(() => {
    if (!error) return;
    setTimeout(() => {
      setError("");
    }, 3000);
  }, [error]);

  return (
    <div style= {{ width: '100%' , height:"100%"}}>
            <Parallax pages={5}  ref={ref}>
              {/* Title Animation */}
            <ParallaxLayer offset={0} speed = {0.5} style = {{backgroundColor:"gray"}}> 
                <MainTitle/>
                </ParallaxLayer>
                {/* Under Title Animation */}
                <ParallaxLayer offset={0} speed = {0.5}> 
                <MainAni/>
                </ParallaxLayer>
                {/* Scrolldown */}
                <ParallaxLayer offset={0} speed = {3} style = {{
                    marginTop : "30vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "absolute",
                  }}
                 >
                <div class="scContainer">
                <div class="scchevron"></div>
                <div class="scchevron"></div>
                <div class="scchevron"></div>
                <span class="scText">Scroll down</span>
                </div>
                </ParallaxLayer>
               {/* first video sector */}
               {/* <ParallaxLayer offset={1} speed = {2.4}  style={{height:"40%"}}></ParallaxLayer> */}
              <ParallaxLayer offset={1.9} speed = {1.9}>
              <div style={{
                    float:"right"
                  }}>
                      <video src='/videos/video_AdobeExpress.mp4' 
                      loop={true} autoPlay={true} muted={true}/></div>  
                </ParallaxLayer>
                <ParallaxLayer offset={1.9} speed = {2.5}>
                  <div style = {{
                    marginRight:"400px"
                  }}>
                    <h2 style={{
                      textAlign:"left",
                      fontSize:"8vw"
                    }}>K E E P</h2>
                     <h2 style={{
                      textAlign:"left",
                      lingHeight:"70px"
                    }}>T A L K I N G</h2>
                     <h2 style={{
                      textAlign:"left",
                      lingHeight:"70px"
                    }}>A N Y W H E R E</h2>
              </div>
                </ParallaxLayer>

                {/* second video sector */}
                <ParallaxLayer offset={2.1} speed = {1.9}>
                <div style={{
                    float:"left"
                  }}>
                      <video src='/videos/pexels-cottonbro-7351358_AdobeExpress.mp4' 
                      loop={true} autoPlay={true} muted={true}></video></div>
                </ParallaxLayer>
                <ParallaxLayer offset={2.1}  speed = {2.5}>
                  <div style = {{
                    marginLeft:"400px"
                  }}>
                    <h2 style={{
                      textAlign:"right",
                      fontSize:"8vw",
                      marginTop:"-2vh" 
                    }}>S H A R E</h2>
                     <h2 style={{
                       textAlign:"right"
                    }}>Y O U R &nbsp;&nbsp;&nbsp; L I F E</h2>
                     <h2 style={{
                      textAlign:"right",
                    }}>A N Y W H E R E</h2>
               </div>
                </ParallaxLayer>
                
                {/* third video sector */}
                <ParallaxLayer  offset={2.99} speed ={1.9}>
                  <div style={{
                    float:"right"
                  }}>
                      <video 
                      src='/videos/pexels-tony-schnagl-5527603_AdobeExpress.mp4' 
                      loop={true} autoPlay={true} muted={true}/></div>
                </ParallaxLayer>
                <ParallaxLayer offset={2.99} speed ={2.7}>
                  <div style = {{
                    marginRight:"400px"
                  }}>
                     <h2 style={{
                      textAlign:"left",
                      fontSize:"8vw"
                    }}>K E E P</h2>
                     <h2 style={{
                      textAlign:"left",
                      lingHeight:"70px"
                    }}>M E S S A G I N G</h2>
                     <h2 style={{
                      textAlign:"left",
                      lingHeight:"70px"
                    }}>A N Y W H E R E</h2>
               </div>
                </ParallaxLayer>

                {/* Text Line*/}
                <ParallaxLayer offset={3} speed = {1}>
                    <h2 style ={{
                      fontSize:"60px",
                      marginLeft : "150px",
                    }}>K E E P</h2>
                </ParallaxLayer>
                <ParallaxLayer offset={3.4} speed = {1.5}>
                <div style = {{width:"100%", height:"25%", backgroundColor:"black"}}>
                    <h2 style = {{
                      color:"white",
                      fontSize:"60px",
                      marginLeft : "150px"
                    }}>C O M U N I C A T E .</h2>
                    </div>
                </ParallaxLayer>
                <ParallaxLayer offset={3.8}  speed = {2}>
              
                    <h2 style = {{
                      fontSize:"60px",
                      marginLeft : "150px",
                    }}>W I T H</h2>
                 
                </ParallaxLayer>
            
                <ParallaxLayer offset ={4} speed = {4}
                style = {{zIndex :"4", textAlign: 'center' , webkitTransition : " -webkit-transform 0.3s" ,   transition: "transform 0.3s"}} >
               
    <Container component="main" maxWidth="xs" >
      <Box 
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        {/* <Avatar 
                sx={{ m: 1, bgcolor: "secondary.main" }}>
          <TagIcon />
        </Avatar> */}
        <h2 style={{
          textAlign:"center",
          fontFamily:"sans-serif",
          fontSize:"40px",
          }}>C H A T</h2>
        <Typography component="h1" variant="h5" >
          LOGIN
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            variant="filled"
            margin="normal"
            required
            fullWidth
            label="이메일 주소"
            name="email"
            autoComplete="off"
            fillColor="white"
            // autoFocus 
          />
          <TextField
            variant="filled"
            margin="normal"
            required
            fullWidth
            label="비밀번호"
            name="password"
            type="password"
          />
          {error ? (
            <Alert sx={{ mt: 3 }} severity="error">
              {error}
            </Alert>
          ) : null}
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            loading={loading}
            sx={{ mt: 3, mb: 2 }}
          >
            로그인
          </LoadingButton>  
          <LoadingButton  
            variant="contained"
            color="primary"
            onClick={handleGoogleLogin}>Sign in With Google
      {userData ? userData.displayName : null}  </LoadingButton> 
          <Grid container justifyContent="flex-end">
            <Grid item>
              <span style={{textAlign:"inline", fontFamily:"sans-serif"}}>계정이 없나요?</span>
              <span style ={{marginLeft:"10px" }}><Link
                to="/join"
                style={{ 
                  textDecoration: "none", 
                  color: "blue" ,
                  fontFamily:"sans-serif"
                  }}
              >
                회원가입
              </Link></span>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
    
    </ParallaxLayer>
    <ParallaxLayer
        offset={4}
        speed={0.5}
        factor={6}
        style={{zIndex:"-4"}}
      >
        <Ani1 />
      </ParallaxLayer>
    </Parallax>
    </div>
  );
}

export default Login;
