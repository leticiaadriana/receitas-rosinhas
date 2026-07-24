import Banner from "../../components/banner";
import Title from "../../components/title";
import cat from "../../assets/cupcat.png"
import "./style.css"

export default function HomePage(){
    return(
        <>
            <Banner/>
            <Title/>
            <section className="purpleSection">
                <img src={cat} alt="Desenho de um gatinho"/>
                <h3>"Qualquer um pode cozinhar" - Ratatouille</h3>
            </section>
        </>
    )
}