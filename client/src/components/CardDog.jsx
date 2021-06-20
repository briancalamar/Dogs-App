
export default function CardDog({ name, temperaments, image}) {
    return (
        <div className="cardDog" style={{backgroundImage: 'url(' + image + ')'}}>
            <h2>{name}</h2>
            <div>
            <p>Temperaments</p>
                <ul>
                    {
                        temperaments ? temperaments.map((e, i)=> <li key={i} > {e} </li>) :
                        <li>No data</li>
                    }
                </ul>
            </div>
        </div>
    )
}