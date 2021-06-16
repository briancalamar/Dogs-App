
export default function CardDog({ name, temperaments, image, id }) {
    let key = 0
    return (
        <div className="cardDog">
            <h2>{name}</h2>
            <div>
            <p>Temperaments</p>
                <ul>
                    {
                        temperaments.map(e => <li key={e}> {e} </li>)
                    }
                </ul>
            </div>
        </div>
    )
}