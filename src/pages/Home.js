import supabase from "../config/supabaseClient"
import { useEffect, useState } from "react";
import EstateCard from "../components/estateCard";

const Home = () => {
  const [fetchError, setFetchError] = useState(null);
  const [estates, setEstates] = useState(null);
  const [orderBy, setOrderBy] = useState('created_at');
  //to update the UI after we have deleted an enlisted estate
  const handleDelete = (id) => {
    setEstates(prevEstate => {
      return prevEstate.filter(sm => sm.id !== id);
    });
  }
  useEffect(() => {
    const fetchEstate = async () => {
      let { data, error } = await supabase
        .from('OasisTowers')
        .select('*')
        .order(orderBy, { ascending: false })

      if (error) {
        setFetchError('could not fetch')
        setEstates(null);
      }
      if (data) {
        setEstates(data);
        setFetchError(null);
      }
    }
    fetchEstate()
  }, [orderBy]);

  return (
    <div className="page home">
      {fetchError && (<p>{fetchError}</p>)}
      {estates && (
        <div className="smoothies">
          <div className="order-by">
            <p>Order by:</p>
            <button onClick={() => setOrderBy('created_at')}>Time Created</button>
            <button onClick={() => setOrderBy('title')}>Title</button>
            <button onClick={() => setOrderBy('location')}>Location</button>
            {orderBy}
          </div>
          <div className="smoothie-grid">
            {estates.map(estate => (
              <p><EstateCard key={estate.id} estates={estate} onDelete={handleDelete} /></p>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Home