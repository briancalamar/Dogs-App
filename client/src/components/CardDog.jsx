
export default function CardDog({ name, temperaments, image, id }) {
    return (
        <div className="cardDog">
            <h2>{name}</h2>
            <div>
            <p>Temperaments</p>
                <ul>
                    {
                        temperaments.map(e => <li> {e} </li>)
                    }
                </ul>
            </div>
        </div>
    )
}