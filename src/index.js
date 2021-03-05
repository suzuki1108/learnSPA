import React, { useReducer } from 'react';
import ReactDOM from 'react-dom';
import SignUp from './SignUp';
import SignInSide from './SignInSide';
import Search from './Search';
import MyBookShelf from './MyBookShelf';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

const initialState = {
  userId : 0
}

function reducer(state, action){
  switch(action.type){
    case 'CHANGE':
      return{
        ...state,
        userId: action.userId
      };
    default:
      return state
  }
}
//Contextを定義
export const UserInfoContext = React.createContext();
//useReducerで更新可能なグローバルステートを生成
const SiteProvider = ({children}) =>{
  const [state, dispatch] = useReducer(reducer, initialState);
  return <UserInfoContext.Provider value={{state,dispatch}}>
    {children}
    </UserInfoContext.Provider>
}

ReactDOM.render(
  <React.StrictMode>
    <SiteProvider>
      <Router>
        <Route exact path="/" component={SignInSide}></Route>
        <Route path="/SignUp" component={SignUp}></Route>
        <Route path="/Search" component={Search}></Route>
        <Route path="/MyBookShelf" component={MyBookShelf}></Route>
      </Router>
    </SiteProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
