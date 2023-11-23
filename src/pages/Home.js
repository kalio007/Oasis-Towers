import supabase from "../config/supabaseClient"
import { useEffect, useState } from "react";
import EstateCard from "../components/estateCard";

const Home = () => {
  const [fetchError, setFetchError] = useState(null);
  const [estates, setEstates] = useState(null);

  useEffect(() => {
    const fetchEstate = async () => {
      let { data, error } = await supabase
        .from('OasisTowers')
        .select('*')

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
  }, []);

  return (
    <div className="page home">
      {fetchError && (<p>{fetchError}</p>)}
      {estates && (
        <div className="smoothies">
          <div className="smoothie-grid">
            {estates.map(estate => (
              <p><EstateCard key={estate.id} estates={estate} /></p>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Home