/* eslint-disable */
import React, { useContext, useState, lazy, Suspense } from 'react';
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Jumbotron,
  Button,
} from 'react-bootstrap';
import './App.css';
import Data from './data.js';
import { Link, Route, Switch } from 'react-router-dom';
let Detail = lazy(()=> { return import('./Detail.js')});
// import Detail from './Detail.js';
import axios from 'axios';

import Cart from './Cart.js';



export let 재고context = React.createContext();

function App() {

  let [shoes, shoes변경] = useState(Data);
  let [재고, 재고변경] = useState([10, 11, 12]);

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">ShoeShop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home </Nav.Link>
              <Nav.Link as={Link} to="/detail">Detail </Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* exact 똑같을때만 */}
      <Switch>

      <Route exact path="/">
        <Jumbotron className="background">
          <h1>20% Season Off</h1>
          <p>
            This is a simple hero unit, a simple jumbotron-style component for
            calling extra attention to featured content or information.
          </p>
          <p>
            <Button variant="primary">Learn more</Button>
          </p>
        </Jumbotron>

        <div className="container">
          
          <재고context.Provider value={재고}>

          <div className="row">
            {shoes.map((a, i) => {
              return <Card shoes={a} i={i} key={i} />;
            })}
          </div>

          </재고context.Provider>

          <button className="btn btn-primary" onClick={()=>{
            //fetch도 가능 but 따음표 삭제 못 함
            axios.post('서버URL', {id : 'condingapple', pw : 1234}).then();
            axios.get('https://codingapple1.github.io/shop/data2.json')
            .then((reuslt)=>{
            shoes변경([...shoes, ...reuslt.data]);
            })
            .catch(()=>{
            console.log('실패했어요')
            })
          }}>더보기</button>
        </div>
      </Route>



      <Route path="/detail/:id">
        <재고context.Provider value={재고}>
          <Suspense fallback={<div>로딩중이에요</div>}>
            <Detail shoes={shoes} 재고={재고} 재고변경={재고변경}/>
          </Suspense>
        </재고context.Provider>
      </Route>
      

      <Route path="/cart">
        <Cart></Cart>
      </Route>

      {/* <Route path="/detail">
        <Detail shoes={shoes} />
      </Route> */}
      {/* <Route path="/어쩌구" component={Modal}></Route> */}
      <Route path="/:id">
        <div>아무거나적었을때 이거 보여주셈</div>
      </Route>

      </Switch>
      
    </div>
  );
}


function Card(props) {

  let 재고 = useContext(재고context);

  return (
    <div className="col-md-4">
      <img src={ 'https://codingapple1.github.io/shop/shoes' + (props.i + 1) + '.jpg' } width="100%"/>
      <h4> {props.shoes.title}</h4>
      <p> {props.shoes.content} & {props.shoes.price}</p>
      <Test></Test>
    </div>
  );
}


function Test() {
  let 재고 = useContext(재고context);
  return <p>{재고[0]}</p>
}
export default App;
