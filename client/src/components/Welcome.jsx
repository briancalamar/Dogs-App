import { Link } from "react-router-dom"

export default function Welcome() {


    return (
        <div className="welcome">
            <div>
                <p>“It is amazing how much love and laughter they bring into our lives and even how much closer we become with each other because of them.” – John Grogan</p>
                <Link to="/dogs">
                    <button> Click here </button>
                </Link>
            </div>
        </div>
    )
}