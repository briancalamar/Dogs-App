import { Link } from "react-router-dom"
import './Style/Welcome.css'

export default function Welcome() {


    return (
        <div className="w">
            <div className="w-t">
                <p>βIt is amazing how much love and laughter they bring into our lives and even how much closer we become with each other because of them.β β John Grogan</p>
                <Link to="/home" className="w-b">
                    Click here
                </Link>
            </div>
        </div>
    )
}