import mod from './Button.module.css'
const Buttons=()=>
{
    return <div className={mod.Buttons_Filters}>
        <button>Музеи</button>
        <button>Парки</button>
        <button>Рестораны</button>
        <button>Кинотеатры</button>
    </div>
}

export {Buttons}
