import React, { memo, useEffect } from "react";
import { Table } from 'react-bootstrap';
import { connect, useDispatch, useSelector } from "react-redux";
import "./Detail.scss";
function Cart(props) {
  let state = useSelector((state) => state)
  console.log(state.reducer)
  let dispatch = useDispatch();


  return (
    <div>
      <Table responsive>
        <tr>
          <th>#</th>
          <th>상품명</th>
          <th>수량</th>
          <th>변경</th>
        </tr>
        {
         state.reducer.map((a,i)=>{
             return (
         <tr>
          <td>{ a.id } </td>
          <td>{ a.name }</td>
          <td>{ a.quan }</td>
          <td><button onClick={()=>{ dispatch({ type : '수량증가',  번호: a.id}   ) }}>+</button>
          <button onClick={()=>{ dispatch({ type : '수량감소', 번호 : a.id}   ) }}>-</button></td>
        </tr>
             )
         })
        }
      </Table>
      {
      state.reducer2 === true
      ? 
      <div className="my-alert2">
        <p>지금 구매하시면 신규할인 20%</p>
        <button onClick={()=>{ dispatch({type:'alert닫기'})}}>닫기</button>
      </div>
      : null
    }
    <Parent 이름="존박" 나이="20"/>
    </div>
  );
}

// function 성능관련() {
//   //함수나 오브젝트는 선언해주세요!!
//   //메모리 할당이 필요없어짐
//   //애니메이션 막 주지 말고 되도록 transform ㄱㄱ
//   //App.js 방문시 import 모두 다 로딩 lazy loading
// }
function Parent(props){
  return (
    <div>
      <Child1 이름={props.존박}/>
      <Child2 나이={props.나이}/>
    </div>
  )
}
function Child1(){
  useEffect( ()=>{ console.log('렌더링됨1') } );
  return <div>1111</div>
}
let Child2 = memo(function(){
  useEffect( ()=>{ console.log('렌더링됨2') } );
  return <div>2222</div>
})

// function state를props화(state) {
//   console.log(state);
//     return {
//         state : state.reducer,
//         alert열렸니 : state.reducer2
//     }
// }

// export default connect(state를props화)(Cart)
export default Cart;
