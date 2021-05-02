import { useEffect, useState } from 'react'
import './StarwarsPlanetaryInfo.css';


function StarwarsPlanetaryInfo() {
  const [planetList, setPlanetList] = useState([])
  const [nextPage, setNextPage] = useState(1)
  const [count, setCount] = useState(0)

  useEffect(() => {
    fetch(`https://swapi.dev/api/planets/?page=${nextPage}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Apparemment il y a une perturbation dû au coté obscure de la Force ! ${response.satuts}`)
        }
        return response.json()
      })
      .then((data) => {
        //console.log(data.results)
        setPlanetList(planetList => planetList.concat(data.results))
        setCount(data.count)
      })
  }, [setPlanetList, nextPage, setCount])

  const handleClick = () => {
    setNextPage(nextPage + 1)

  }

  return (

    <section className="container py-5">
      <h1 className="mb-5 text-center">Les Planètes dans l'univers Star Wars</h1>
      <div className="row">
        {planetList.map(planetinf =>
          <div key={planetinf.name + planetinf.population} className="col-md-6 col-lg-4 col-xl-3 mb-4">
            <article className="bg-warning p-3">
              <h2 className="h5 text-center">{planetinf.name}</h2>
              <p className="mb-0"><b>Diamètre : </b>{planetinf.diameter} Km</p>
              <p className="mb-0"><b>Rotation : </b>{planetinf.rotation_period} Heures</p>
              <p className="mb-0"><b>Révolution : </b>{planetinf.orbital_period} Jours</p>
              <p className="mb-0"><b>Population : </b>{planetinf.population} Âmes</p>
              <p className="mb-0"><b>Climat : </b>{planetinf.climate}</p>
            </article>
          </div>
        )}
      </div>
      {count !== planetList.length ? <button onClick={handleClick} type="button" classeName="btn btn-dark">Planètes suivante</button> :
        <p className="bg-dark text-white p-3">Nous avons listé toutes les planètes recensées.</p>}
    </section>

  );
}

export default StarwarsPlanetaryInfo;
