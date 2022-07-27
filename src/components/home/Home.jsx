import {useMemo} from 'react'
import Slider from "../slider/Slider";
import ItemSlide from "../itemsSlide/ItemSlide";
import PopUp from "../popup/PopUp";
import {msknat, otoar, alryadyaa} from '../../appData';

const Home = () => {

    const mskn = useMemo(() => {
        return msknat
    },[])
    const atr = useMemo(() => {
        return otoar
    },[])
    const ryadaa = useMemo(() => {
        return alryadyaa
    },[])
    
    return (
        <div className="home">
            <Slider />
            <ItemSlide medicens = {mskn}/>
            <ItemSlide medicens = {atr}/>
            <ItemSlide medicens = {ryadaa}/>
            <PopUp />
        </div>
    )
}

export default Home;
