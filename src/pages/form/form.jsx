import { useState } from "react"
import './style.css'

const Form = ({ fetchData, closeIndex }) => {
    const [city, setCity] = useState(null)

    const getCity = (event) => {
        event.preventDefault()
        setCity(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchData(city)
    }


    return (
        <header>
            <form onSubmit={(event) => {handleSubmit(event); closeIndex();}}>
                <input type="text" name="city" id="city" onChange={getCity} placeholder="Busque por uma cidade:"/>
                <button type="submit" style={{ all: 'unset', cursor:'pointer'}}><i class="bi bi-search"></i></button>
            </form>
        </header>
    )
}

export default Form