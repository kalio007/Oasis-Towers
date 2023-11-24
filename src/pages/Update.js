import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import supabase from "../config/supabaseClient";

const Update = () => {
  const [title, setTitle] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [formError, setFormError] = useState(null)

  const navigate = useNavigate();
  const { id } = useParams()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!location || !title || !description) {
      return setFormError("please input the data correctly")
    }
    const { data, error } = await supabase
      .from('OasisTowers')
      .update({ title, description, location })
      .eq('id', id)
    if (error) {
      setFormError(error)
    }
    if (data) {
      setFormError(null)
    }
    navigate('/')
  }
  useEffect(() => {
    const fetchRecords = async () => {
      const { data, error } = await supabase
        .from('OasisTowers')
        .select()
        .eq('id', id)
        .single()

      if (error) {
        navigate('/', { replace: true })
      }
      if (data) {
        setTitle(data.title)
        setLocation(data.location)
        setDescription(data.description)
      }
    }
    fetchRecords()
  }, [id, navigate]);
  return (
    <div className="page create">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="Description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button>Update your your Estate Details</button>
      </form>
    </div>
  )
}

export default Update