import {
  Alert,
  Box,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

import React, { useCallback, useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Link } from "react-router-dom";
import "../firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import md5 from "md5";
import { getDatabase, ref, set } from "firebase/database";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userReducer";

//password 6글자인지, 두 입력란이 일치하는지 검증
const IsPasswordValid = (password, confirmPassword) => {
  if (password.length < 6 || confirmPassword.length < 6) {
    return false;
  } else if (password !== confirmPassword) {
    return false;
  } else {
    return true;
  }
};

// email 형식이 맞는지 검증
const IsEmailValid = (email) => {
if (email.indexOf('@') == -1 || email.indexOf('.com') == -1) {
  return false;
} else {
  return true;
}
}

function Join() {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const postUserData = useCallback(
    async (name, email, password) => {
      setLoading(true);
      try {
        const { user } = await createUserWithEmailAndPassword(
          getAuth(),
          email,
          password
        );
        await updateProfile(user, {
          displayName: name,
          photoURL: `https://www.gravatar.com/avatar/${md5(email)}?d=retro`,
        });
        await set(ref(getDatabase(), "users/" + user.uid), {
          name: user.displayName,
          avatar: user.photoURL,
        });
        dispatch(setUser(user));
      } catch (e) {
        setError(e.message);
        setLoading(false);
      }
    },
    [dispatch]
  );
  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const name = data.get("name");
      const email = data.get("email");
      const password = data.get("password");
      const confirmPassword = data.get("confirmPassword");
      if (!email) {
        setError("email 항목을 입력해주세요.");
        return;
      }

      if (!name || !email || !password || !confirmPassword) {
        setError("모든 항목을 입력해주세요.");
        return;
      }

      if (!IsPasswordValid(password, confirmPassword)) {
        setError("비밀번호가 6글자 미만이거나 일치하지 않습니다. 비밀번호를 확인하세요.");
        return;
      }

      if (!IsEmailValid(email)) {
        setError("Email 형식이 올바르지 않습니다. 이메일을 확인해주세요")
        return;
      }
      postUserData(name, email, password);
    },
    [postUserData]
  );

  useEffect(() => {
    if (!error) return;
    setTimeout(() => {
      setError("");
    }, 4000);
  }, [error]);
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        {/* <Avatar sx={{ m: 1, bgcolor: "success.main", src:'https://www.fillmurray.com/300/300'}}>
          <TagIcon sx = {{color:"primary"}}/>
        </Avatar> */}
        <Typography component="h1" variant="h5">
          회원가입
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="name"
                required
                fullWidth
                label="닉네임"
                autoFocus
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                required
                fullWidth
                label="이메일 주소"
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                required
                fullWidth
                label="비밀번호 (6글자 이상)"
                type="password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="confirmPassword"
                required
                fullWidth
                label="비밀번호 확인"
                type="password"
              />
            </Grid>
          </Grid>
          {error ? (
            <Alert sx={{marginTop: 3}} severity="error">
              {error}
            </Alert>
          ) : null}
          {/*  로딩 상황을 보여주는 버튼 api*/}
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            color="success"
            loading={loading}
            sx={{ mt: 3, mb: 2 }}
          >
            회원가입
          </LoadingButton>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "blue" }}
              >
              이미 계정이 있다면? 로그인으로 이동
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default Join;
