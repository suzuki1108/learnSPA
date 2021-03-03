import React, { useEffect } from 'react';
import { Component, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

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
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage:`url(/favicon.ico)`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide() {
  const classes = useStyles();
  const history = useHistory();

  //userID形式チェック正規表現
  const userIdReg = /^[a-z\d]{8,15}$/i;
  //password形式チェック正規表現（英数字8〜15文字）
  const passwordReg = /^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,15}$/i;

  //API通信メッセージ
  const[apiMsg, setApiMsg] = useState("");

  //UserID関連のステート
  const[userId, setUserId] = useState("");
  const[userIdMsg, setUserIdMsg] = useState("UserID");
  const[userIdCheckFlg, setUserIdCheckFlg] = useState(false);

  //password関連のステート
  const[password, setPassword] = useState("");
  const[passwordMsg, setPasswordMsg] = useState("Password");
  const[passwordCheckFlg, setPasswordCheckFlg] = useState(false);

  //userName(hidden)ステート
  const[userName, setUserName] = useState("");

  //SubmitButton非活性処理
  const[disabledFlg, setDisabledFlg] = useState(false);
  useEffect(()=>{
    passwordCheckFlg && userIdCheckFlg ? setDisabledFlg(false) : setDisabledFlg(true);
  });

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
        "loginId":userId
    };
    const method = "POST";
    const body = JSON.stringify(userInput);
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    fetch("https://suzuki-portfolio.herokuapp.com/loginAPI", {method, headers, body})
      .then(res => res.json())
      .then(data => {
        setApiMsg(data.message);
        if(data.result){
			      history.push(
              {pathname: "/MyBookShelf", state: {"userId":data.userId,"userName":data.userName}}
            );
        }
      })
      .catch(console.error);
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            MyBookShelf
          </Typography>
          <Typography component="h2" variant="h5">
            Sign in
          </Typography>
          <Typography variant="body2" color="error" align="center">
              {apiMsg}
          </Typography>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="userId"
                label={userIdMsg}
                name="userId"
                autoComplete="userId"
                inputProps={{ maxLength: 15 }}
                onChange={e => userIdOnChange(e)}
              />
              <TextField
                variant="outlined"
                margin="normal"
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
            <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={disabledFlg}
            onClick = {() => check()}
            >
            Sign In
          </Button>
            <Grid container>
              <Grid item>
                <Link href="/SignUp" variant="body2">
                  {"アカウントをお持ちでない場合： アカウント作成"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
        </div>
      </Grid>
    </Grid>
  );
}