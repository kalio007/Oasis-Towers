import supabase from "../config/supabaseClient"
import { useEffect, useState } from "react";

// console.log(supabase)

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
        console.log(data);
        setEstates(data);
        setFetchError(null);
      }
    }
    fetchEstate()
  }, []);

  return (
    <div className="page home">
      {fetchError && (<p>{fetchError}</p>)}
      {estates &&
        (<div className="">
          {estates.map(estate => (
            <p>{estate.title}</p>
          ))}
        </div>)}
    </div>
  )
}

export default Home