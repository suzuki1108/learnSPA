import React, { useContext } from 'react';
import { Component, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {userInfo} from './MyBookShelf';


const useStyles = makeStyles({
  root: {
    position: "fixed",
    bottom: 0,
    width: "100%",
  },
  wrapper:{
    display: 'block',
    width: '100%',
    position: 'fixed',
    left: 0,
    bottom: 0,
    zIndex: 1000,
    textAlign: 'center',
  },
  button: {
    maxWidth: '100%',
  },
});


export default function Footer(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  //画面遷移ハンドラ
  const history = useHistory();

  const handleLink = path => history.push(path);

  const buttonClick = (e) =>{
    if(e === "/"){
        if(window.confirm("本当にログアウトしてもよろしいですか？")){
            handleLink(e);  
        }
    }else{
        handleLink(e);    
    }
  }

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction label="MyBooks" icon={<HomeIcon />} onClick={() => buttonClick("/MyBookShelf")} />
      <BottomNavigationAction label="SearchBook" icon={<SearchIcon />} onClick={() => buttonClick("/Search")}/>
      {/* <BottomNavigationAction label="Setting" icon={<SettingsIcon />} /> */}
      <BottomNavigationAction label="Logout" icon={<ExitToAppIcon />} onClick={() => buttonClick("/")}/>
    </BottomNavigation>
  );
}