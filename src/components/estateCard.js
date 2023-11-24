import { Link } from "react-router-dom";
import supabase from "../config/supabaseClient";

export default function EstateCard({ estates, onDelete }) {
    const handleDelete = async () => {
        const { data, error } = await supabase
            .from('OasisTowers')
            .delete()
            .eq('id', estates.id)
        if (error) {
            console.log(error)
        }
        if (data) {
            console.log(data)
        }
        onDelete(estates.id)

    }
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
            <i className="material-icons" onClick={handleDelete}>delete</i>
        </div>
    )
}