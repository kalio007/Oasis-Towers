import { useState } from "react";
import supabase from "../config/supabaseClient";
import { useNavigate } from "react-router-dom"

const Create = () => {
  const [title, setTitle] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [formError, setFormError] = useState(null)
  const navigate = useNavigate()
  //handle the input
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title || !description || !location) {
      setFormError('please enter all fields correctly');
      return
    }
    const { data, error } = await supabase
      .from('OasisTowers')
      .insert([
        { title, description, location },
      ])
      .select()
    if (error) {
      setFormError(error)
    }
    if (data) {
      setFormError(null)
      navigate('/')
    }

  }
  return (
    //creating the input inform
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

        <button>Enlist you Real Estate</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default Create