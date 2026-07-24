import banner from '../../assets/banner.png'
import './style.css'
 
export default function Banner (){
    return(
        <div className='banner'>
            <img src={banner} alt="Banner"/>
        </div>
    );
}