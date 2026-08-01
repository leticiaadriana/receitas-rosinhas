import "./style.css";
import separator from "../../assets/separator.svg"

export default function SectionDivider() {
  return (
    <div className="section-divider">
      <img src={separator}/>
    </div>
  );
}
