export default function CardDog({ name, temperaments, image, id }) {
    return (
        <div className="navBar">
            <div className="LogoName">
                <img alt="Logo"/>
                <h2> Find Your Best Friend </h2>
            </div>
            <input type="text" placeholder="Find a breed"/>
        </div>
    )
}