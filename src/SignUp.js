import React, { useEffect } from 'react';
import { Component, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        MyBookShelf
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();

  //userName形式チェック正規表現
  const userNameReg = /^[a-z\d]{5,15}$/i;
  //userID形式チェック正規表現
  const userIdReg = /^[a-z\d]{8,15}$/i;
  //password形式チェック正規表現（英数字8〜15文字）
  const passwordReg = /^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,15}$/i;

  //API通信メッセージ
  const[apiMsg, setApiMsg] = useState("");

  const [open, setOpen] = useState(false);

  //UserName関連のステート
  const[userName, setUserName] = useState("");
  const[userNameMsg, setUserNameMsg] = useState("UserName");
  const[userNameCheckFlg, setUserNameCheckFlg] = useState(false);

  //UserID関連のステート
  const[userId, setUserId] = useState("");
  const[userIdMsg, setUserIdMsg] = useState("UserID");
  const[userIdCheckFlg, setUserIdCheckFlg] = useState(false);

  //password関連のステート
  const[password, setPassword] = useState("");
  const[passwordMsg, setPasswordMsg] = useState("Password");
  const[passwordCheckFlg, setPasswordCheckFlg] = useState(false);

  //SubmitButton非活性処理
  const[disabledFlg, setDisabledFlg] = useState(false);
  useEffect(()=>{
    passwordCheckFlg && userIdCheckFlg && userNameCheckFlg ? setDisabledFlg(false) : setDisabledFlg(true);
  });

  //画面遷移ハンドラ
  const history = useHistory();
  const handleLink = path => history.push(path);

  let userIdOnChange = (e) =>{
    let userId = e.target.value;
    //空文字・null・15文字以内・email形式のバリデーションチェック
    if(userId === "" || userId === null){
        setUserIdMsg("UserID");
        setUserIdCheckFlg(false);
    }else if(userId.length <= 15 && userIdReg.test(userId)){
        setUserIdMsg("UserID");
        setUserId(userId);
        setUserIdCheckFlg(true);
    }else{
        setUserIdMsg("半角英数字8〜15文字で入力してください");
        setUserIdCheckFlg(false);
    }
  }

  let userNameOnChange = (e) =>{
    let userName = e.target.value;
    //空文字・null・15文字以内・email形式のバリデーションチェック
    if(userName === "" || userName === null){
        setUserNameMsg("UserName");
        setUserNameCheckFlg(false);
    }else if(userName.length <= 15 && userNameReg.test(userName)){
        setUserNameMsg("UserName");
        setUserName(userName);
        setUserNameCheckFlg(true);
    }else{
        setUserNameMsg("半角英数字5〜15文字で入力してください");
        setUserNameCheckFlg(false);
    }
  }

  let passwordOnChange = (e) =>{
    let password = e.target.value;
    //空文字・null・15文字以内・password形式のバリデーションチェック
    if(password === "" || password === null){
        setPasswordMsg("Password");
        setPasswordCheckFlg(false);
    }else if(password.length <= 15 && passwordReg.test(password)){
        setPasswordMsg("Password");
        setPassword(password);
        setPasswordCheckFlg(true);
    }else{
        setPasswordMsg("半角英数字8〜15文字で入力してください");
        setPasswordCheckFlg(false);
    }
  }

  //API呼び出し→アカウント作成→画面遷移
  let check = () =>{
    const userInput = {
        "passWord" :password,
        "loginId":userId,
        "userName":userName
    };
    const method = "POST";
    const body = JSON.stringify(userInput);
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    setOpen(true);
    fetch("https://suzuki-portfolio.herokuapp.com/accountRegisterAPI", {method, headers, body})
      .then(res => res.json())
      .then(data => {
        setApiMsg(data.message);
        if(data.result){
          alert("登録が完了しました。ログイン画面に遷移します。");
			    handleLink('/');
        }
      })
      .catch(console.error);
    setOpen(false);
  }

  return (
    <Container component="main" maxWidth="xs">
        <Backdrop className={classes.backdrop} open={open}>
          <CircularProgress color="inherit" />
        </Backdrop>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          アカウント作成
        </Typography>
          <Grid container spacing={2}>
            <Typography variant="body2" color="error" align="center">
              {apiMsg}
            </Typography>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="userName"
                label={userNameMsg}
                name="userName"
                autoComplete="userName"
                inputProps={{ maxLength: 15 }}
                onChange={e => userNameOnChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="userId"
                label={userIdMsg}
                name="userId"
                autoComplete="userId"
                inputProps={{ maxLength: 15 }}
                onChange={e => userIdOnChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label={passwordMsg}
                type="text"
                id="password"
                autoComplete="current-password"
                inputProps={{ maxLength: 20 }}
                onChange={e => passwordOnChange(e)}
              />
            </Grid>
          </Grid>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={disabledFlg}
            onClick = {() => check()}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                アカウントをすでにお持ちの場合：ログイン
              </Link>
            </Grid>
          </Grid>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}