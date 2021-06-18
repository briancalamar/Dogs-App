
export default function CardDog({ name, temperaments, image, id }) {
    let key = 0
    return (
        <div className="cardDog" style={{backgroundImage: 'url(' + image + ')'}}>
            <h2>{name}</h2>
            <div>
            <p>Temperaments</p>
                <ul>
                    {
                        temperaments ? temperaments.map(e => <li key={e} > {e} </li>) :
                        <li>No data</li>
                    }
                </ul>
            </div>
        </div>
    )
}