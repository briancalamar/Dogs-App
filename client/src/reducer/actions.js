import axios from 'axios'

export async function getDogs() {
    axios.get(`localhost:3001`)
}