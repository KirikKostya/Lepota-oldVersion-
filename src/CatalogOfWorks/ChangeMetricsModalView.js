import React from 'react'
import ReactModal from 'react-modal'
import LoadingComp from './LoadingComp';
import UpdateOrder from './UpdateOrder';
import './Style/WarningModalView.css'

export default function ChangeMetricsModalView(
  { 
    modalView, 
    setModalView, 
    modalViewStep, 
    setModalViewStep, 
    selectedOrder }) {
  
    return (
    <ReactModal 
      isOpen={modalView}
      ariaHideApp={false}
      contentLabel="Selected Option"
    >
        {
          modalViewStep === 1
            ? <div className='modalViewContainer'>
                <h2 className='modal-header'>Такой товар уже есть в корзине!</h2>
                <h5 className='changeParametrsOfOrder' 
                    onClick={()=> setModalViewStep(modalViewStep+1)}>
                 Хотите изменить количество товара или его составляющие?
                </h5>
                <button 
                  className='modal-closeBTN' 
                  onClick={()=>setModalView(!modalView)}>Закрыть</button>  
              </div>
                :<div className='modalViewContainer'>
                   {
                    selectedOrder.length === 0
                     ?<>
                        <h2>Ваш товар</h2>
                        <LoadingComp /> 
                        <button 
                          className='modal-closeBTN' 
                          onClick={()=>setModalView(!modalView)}>Закрыть</button>
                      </>
                      :<UpdateOrder selectedOrder={selectedOrder} 
                                    setModalView={setModalView}/>
                   }
                </div>
        }
    </ReactModal>
  )
}
