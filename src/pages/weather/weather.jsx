import { useEffect, useState } from "react"
import Form from "../form/form"
import Lottie from "lottie-react";
import animationData from "../../assets/weathersun.json";
import './style.css'
import weatherCold from "../../assets/weatherCold.json"



const Weather = () => {

    const [list, setList] = useState(null);
    const [submit, setSubmit] = useState(false);
    const [formSend, setFormSend] = useState(false);

    const fetchData = (city) => {
        const Key = "46ad19ab2e6d3820980ecf191e44fba3";

        fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city},&appid=${Key}`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const { lat, lon } = data[0];
                return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${Key}&units=metric`);
            } else {
                throw new Error("Cidade não encontrada.");
            }
        })
        .then(response => response.json())
        .then(clima => {
            setList(clima);  // Agora você tem os dados do clima
            setSubmit(true);
            console.log(list)
        })
        .catch(console.error);
    }

    useEffect(() => {
        if (list) {
            document.body.className = list.main.temp > 25 ? 'bgSun' : 'bgCold'
        }
    },[list])
    
    const closeIndex = () => {
        setFormSend(true)
    }

    return (
        <div className="background">
            <Form fetchData={fetchData} closeIndex={closeIndex}/>
            <p style={{display: formSend ? 'none' : 'flex'}}>
                <span>Será que faz frio?</span>
                <span>Será que faz sol?</span>
                <span>Será que chove</span>
                <span>O que será?</span>
            </p>
            {submit && (list ? (
                <div className="main">
                    <h2>O clima em "{list.name}":</h2>
                    <div className="container">
                        <div className="main-img">
                            <Lottie animationData={animationData} loop={true} autoplay={true} style={{ display: list.main.temp > 25 ?'block' : 'none' }}/>
                            <Lottie animationData={weatherCold} loop={true} autoplay={true} style={{ display: list.main.temp > 25 ?'none' : 'block' }}/>
                        </div>
                        <div className="items-time">
                            <div className="item">
                                <h3>Temperatura:</h3>
                                <div className="icons">
                                    <i class="bi bi-brightness-high" style={{display: list.main.temp > 25 ? 'block' : 'none' }}></i>
                                    <i class="bi bi-cloud-snow" style={{display: list.main.temp > 25 ? 'none' : 'block' }}></i>
                                    <span>{list.main.temp}º</span>
                                </div>
                            </div>
                            <div className="item">
                                <h3>Humidade</h3>
                                <div className="icons">
                                    <i class="bi bi-water"></i>
                                    <span>{list.main.humidity}%</span>
                                </div>
                            </div>
                            <div className="item">
                                <h3>Ventos:</h3>
                                <div className="icons">
                                    <i class="bi bi-wind"></i>
                                    <span>{list.wind.speed * 1.6} Km/h</span>
                                </div>
                            </div>
                            <div className="item">
                                <div className="item-max">
                                    <i class="bi bi-caret-up-square-fill"></i>
                                    <div className="item-max-text">
                                        <small>Temp. Máx</small> 
                                        <small>{parseInt(list.main.temp_max * 1.6)}</small>
                                    </div>
                                </div>
                                <div className="item-max">
                                    <i class="bi bi-caret-down-square-fill"></i>
                                    <div className="item-max-text">
                                        <small>Temp. Min</small> 
                                        <small>{list.main.temp_min}</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <h2>Cidade não encontrada</h2>
            ))}
        </div>
    )
}

export default Weather