import Slider from "../slider/Slider";
import ItemSlide from "../itemsSlide/ItemSlide";
import PopUp from "../popup/PopUp";
import {msknat, otoar, alryadyaa} from '../../appData';

const Home = () => {

    
    return (
        <div className="home">
            <Slider />
            <ItemSlide medicens = {msknat}/>
            <ItemSlide medicens = {otoar}/>
            <ItemSlide medicens = {alryadyaa}/>
            <PopUp />
        </div>
    )
}

export default Home;
