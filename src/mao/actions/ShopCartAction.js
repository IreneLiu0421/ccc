
import {productList} from '../ProductList'

export const addValue = value => ({ type: 'ADD_VALUE', value: value })
export const minusValue = value => ({ type: 'MINUS_VALUE', value: value })

// Mao購物車
//跟server要資料
//呼叫購物車
export const sendCart =value=>{
    return {type:'SHOW_CART',value:value}
  }

  //獲取資料庫購物車
  export const getShopCart = item => {
  return async dispatch => {
  const request = new Request(`http://localhost:5500/shopCart/shopCart`, {
    method: 'GET',
    credentials: 'include'
  })
  const res = await fetch(request)
  const data = await res.json()
  let newData=[]
  let hadleData=data.map((v,i)=>{
    newData.push({pId:v.pId,count:v.count})
  })
  dispatch(sendCart(newData))
  dispatch(AddCartNewItem(newData))
  dispatch(CalShopCart(newData))
  }
  }

  // 計算產品總額
  export const CalShopCart=value=>{
    return dispatch=>{
    let total=0
    productList.map((product,i)=>{
      value.map((v,i)=>{
        if(product.pId==v.pId){
          let sCount=product.price*v.count
          total+=sCount
        }
      })
    })
    dispatch(calCart(total))
    }
  }

  //計算功能 傳至Reduecer
  export const calCart=value=>({type:'CAL_TOTAL',value:value})


  // 加入購物車 (暫時用不到)
  export const realCart=value=>({type:'DISPLAY_CART',value:value})

  //刪除
  export const DelCartItem=(i,data)=>{
    return dispatch=>{
      let newData=data.filter(e=>e!==data[i])
      dispatch(DelCart(newData))
      dispatch(CalShopCart(newData))
    }
  }

  // 購物車新增 刪除
  export const AddCart = value => ({ type: 'ADD_CART', value: value })
  export const DelCart = value =>({type:'DEL_CART',value:value})
//數量調整
  export const AddCartItem=(val,pId,data)=>{
    let box=null
    return dispatch=>{  
    data.map((v,i)=>{
      if(v.pId==pId){
        box=i
      }
    })
      if(val){
          data[box].count++
        }else{
          if(data[box].count==1){
            data[box].count=1
          }else{
            data[box].count--
          }
      }
      dispatch(AddCart(data))
    }
  }


  //購物車按鍵
  
  export const AddCartNewItem_sendcal=(data)=>{
    return dispatch=>{  
      dispatch(AddCartNewItem(data))
      dispatch(CalShopCart(data))
    }
  }
  export const AddCartNewItem = value =>({type:'ADD_CART',value:value})
  
//加入最愛
export const Handel_AddMyFavorite=(val,pId,data)=>{
  let newData=[...data]
  let box=data.findIndex(e=>e==pId)
  let delpId=data.filter(e=>e!==pId)
  console.log('delpId',delpId)
  console.log('val',val)
  return dispatch=>{
    if(val=='true'){
      if(box==-1){
        newData.push(pId)
      }
    }else{
      console.log(456)
      newData=[...delpId]
    }
    dispatch(AddMyFavorite(newData))
  }
}


// export const Handel_DelMyFavorite=()
export const AddMyFavorite=value=>({type:'LIKE_PRODUCT',value:value})