import React from 'react';
import './Styles/TimingAndDelivery.css';

interface IStepsOfDelivary{
    id: number,
    tittle: string,
    description: string
}
const stepsOfDeliver: IStepsOfDelivary[] = [
    {
        id: 0,
        tittle: 'Отправьте заявку',
        description: 'Мы свяжемся с вами и выясним все детали!'
    },
    {
        id:1,
        tittle: 'Оплата',
        description: 'Мы работаем по 100% предоплате. Оплата осуществляется переводом на карту BelarusBank, чек естественно предоставляется. ',
    },
    {
        id:2,
        tittle: 'Выполняем работу',
        description: 'Сроки изготовления изделия от 1 до 10-ти дней (в зависимости от сложности заказа, загруженности мастера и наличии нужных материалов). В момент оформления заказа мы сообщим вам точну дату готовности.',
    },
    {
        id:3,
        tittle: 'Упаковка и достака',
        description: 'Бережно упаковываем ваш заказ в прочные коробки с противоударным наполнителем. отправляем посылку транспортной компанией БелПочта. Для города Минск самовывод с адреса, который мы вам продиктуем. ',
    }
]

const TimingAndDelivery: React.FC = () => {
    
  return (
    <div className='containerForTimingAndDelivery' id='timingAndDelivery'>
        <h1>Время и Доставка</h1>
        <div className='steps'>
            <div className='containerForGraphicRath'>
                <div className='graphicPath'>
                    <div className='circle'>1</div>
                    <div className='circle'>2</div>
                    <div className='circle'>3</div>
                    <div className='circle'>4</div>
                </div>
            </div>
            <div className='textPath'>
                {
                    stepsOfDeliver.map(part=>(
                        <div className='partOfPath' key={part.id}>
                            <h3>{part.tittle}</h3>
                            <p>{part.description}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default TimingAndDelivery;
