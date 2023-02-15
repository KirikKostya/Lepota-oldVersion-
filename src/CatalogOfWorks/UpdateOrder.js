import React, {useState} from 'react'
import axios from 'axios'
import './Style/UpdataOrder.css'

export default function UpdateOrder({ selectedOrder, setModalView }) {
  
    const [amount, setAmount] = useState(Number);
    const [variantsOfMixOrder, setVariantsOfMixOrder] = useState(Array);

    const updateOrder = (ID) => {
        axios.post('https://api.native-flora.tk/Cart/Update', {
            id: ID, 
            amount: amount
        }, {
            headers:{'x-access-token': localStorage.getItem('accessToken')}
        })
        .then(res=>setModalView(false))
        .catch(err=>console.log(err))
    } 
    return (
    <>
        {
            selectedOrder.map(item=>(
                <div key={item.item.id} className='updataOrderContainer'>
                    <h2>{item.item.name}</h2>
                    <div className='metrics'>
                        <div className='mixItems'>
                        <p>First <input type='checkbox' onClick={(e) => console.log(e.target.value)} value={1}/></p>
                        <p>Second <input type='checkbox' onClick={(e) => console.log(e.target.value)} value={2}/></p>
                        <p>Third <input type='checkbox' onClick={(e) => console.log(e.target.value)} value={3}/></p>
                        </div>
                        <div className='amount'>
                            <h5>Количество</h5>
                            <input className='amountInput' 
                                   onChange={(e)=>setAmount(e.target.value)} 
                                   type='number' 
                                   min={1} 
                                   defaultValue={item.amount}/>
                        </div>
                    </div>
                    <button onClick={()=>updateOrder(item.item.id)}>Изменить</button>
                </div>
            ))
        }
    </>
  )
}
