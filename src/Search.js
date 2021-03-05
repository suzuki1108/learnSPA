import React from 'react';
import { Component, useState,useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import BookIcon from '@material-ui/icons/ImportContacts';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Footer from './footer';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {userInfo} from './MyBookShelf';
import { UserInfoContext } from '.';

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
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '140%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 'auto',
    width: '40%'
    ,
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  modal: {
    maxHeight: 'inherit',
    maxWidth:'inherit',
    marginRight:'15px',
    marginLeft:'15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflowY:'auto',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function Search(props) {
  const classes = useStyles();

  const {state} = useContext(UserInfoContext);

  //検索ワードステート
  const[searchWord,setSearchWord] = useState("");

  //検索結果JSONステート
  const [data ,setData] = useState([]);

  //modalステート
  const [modalFlg ,setModalFlg] = useState("");

  let searchWordChange = (e) =>{
    let word = e.target.value;
    setSearchWord(word);
  };

  const doSearch = (e) => {
    let uri = `https://app.rakuten.co.jp/services/api/BooksBook/Search/20170404?format=json&title=${searchWord}&applicationId=1043481609307048393`
    const method = "GET";
    fetch(uri, {method})
      .then(res => res.json())
      .then(data => {
          setData(data.Items);
      })
      .catch(console.error);
      e.preventDefault();
  };

  const saveBook = (bookData) => {
  const userInput = {
      "bookTitle" :bookData.title,
      "bookTitleKana":bookData.titleKana,
      "author":bookData.author,
      "salesDate":bookData.salesDate,
      "imgPath":bookData.largeImageUrl,
      "description":bookData.itemCaption,
      "userId": state.userId
  };
  const method = "POST";
  const body = JSON.stringify(userInput);
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
  fetch("https://suzuki-portfolio.herokuapp.com/saveBookDataAPI", {method, headers, body})
    .catch(console.error);
    closeModal();
    alert("MyBooksに追加しました");
  }

  const openModal = (e) =>{
    setModalFlg(e);
  }

  const closeModal = () =>{
    setModalFlg("");
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <BookIcon className={classes.icon} />
          <Typography variant="h7" color="inherit" noWrap>
            MyBookShelf
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <form onSubmit={e=>doSearch(e)}>
            <InputBase
              placeholder="本を検索"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={e=>searchWordChange(e)}
              id={"search"}
            />
            </form>
          </div>
        </Toolbar>
      </AppBar>
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {data.map((card) => (
              <Grid item key={card} xs={6} sm={3}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={card.Item.largeImageUrl}
                    title="Image title"
                    onClick={()=>openModal(card.Item.title)}
                  />
                </Card>
                {modalFlg === card.Item.title? 
                <div>
                  <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={true}
                    onClose={closeModal}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                    timeout: 500,
                    }}
                  >
                    <Fade in={true}>
                    <div className={classes.paper}>
                        <img src={card.Item.largeImageUrl}></img>
                        <h2 id="transition-modal-title">{card.Item.title}</h2>
                        <h3>{card.Item.titleKana}</h3>
                        <h3>著者：{card.Item.author}</h3>
                        <h3>価格：{card.Item.itemPrice}円</h3>
                        <p id="transition-modal-description">{card.Item.itemCaption}</p>
                          <Button variant="contained" color="primary" onClick={()=>saveBook(card.Item)}>追加</Button>
                          <Button variant="contained" onClick={closeModal}>戻る</Button>
                    </div>
                    </Fade>
                  </Modal>
                </div>
                :null}
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      <Footer/>
    </React.Fragment>
  );
}