import React from 'react'
import ReactModal from 'react-modal'
import LoadingComp from './LoadingComp';
import UpdateOrder from './UpdateOrder';

export default function ChangeMetricsModalView(
  { 
    modalView, 
    setModalView, 
    modalViewStep, 
    setModalViewStep, 
    selectedOrder }) {
  
    const customStylesForModal = {
        content: {
          width: '40%',
          height: '50%',
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          color: 'black',
          display: 'flex',
          alignItems: 'center',
          display: "flex",
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderRadius: '20px', 
        },
    }
  
    return (
    <ReactModal 
      isOpen={modalView}
      ariaHideApp={false}
      contentLabel="Selected Option"
      style={customStylesForModal}
    >
        {
          modalViewStep === 1
            ? <div className='modalViewContainer'>
                <h2>Такой товар уже есть в корзине!</h2>
                <h5 className='changeParametrsOfOrder' 
                    onClick={()=> setModalViewStep(modalViewStep+1)}>
                 Хотите изменить количество товара или его составляющие?
                </h5>
                <button onClick={()=>setModalView(!modalView)}>Закрыть</button>  
              </div>
                :<div className='modalViewContainer'>
                   {
                    selectedOrder.length === 0
                     ?<>
                        <h2>Ваш товар</h2>
                        <LoadingComp /> 
                        <button onClick={()=>setModalView(!modalView)}>Закрыть</button>
                      </>
                      :<UpdateOrder selectedOrder={selectedOrder} 
                                    setModalView={setModalView}/>
                   }
                </div>
        }
    </ReactModal>
  )
}
