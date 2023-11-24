import { Link } from "react-router-dom";

export default function EstateCard({ estates }) {
    return (
        <div className="smoothie-card">
            <image src={estates.images} alt="loading..." />
            <h3>{estates.title}</h3>
            <p>{estates.location}</p>
            <p>{estates.description}</p>
            <p>{estates.rent}</p>
            <div className="rating"></div>
            <Link to={"/" + estates.id}>
                <i className="material-icons">edit</i>
            </Link>
        </div>
    )
}