import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import reactDom from "react-dom";

export class FetchingExample extends React.Component {
    constructor() {
        super();
        this.state = {
            fetchData: [],
            clasesbotones: [{
                play: "fas fa-play simboloplay",
                stop: "fas fa-pause-circle simboloplay escondido"
            }]
        };
        this.memoria = 0;
        this.primeravez = true;

    }
    componentDidMount() {
        fetch("https://assets.breatheco.de/apis/sound/songs")
            .then((response) => response.json())
            .then((data) => {
                this.setState({ fetchData: data });
                console.log(this.state.fetchData,"dimount");
            });
    }

    adelante(id) {
    
        let copia = [...this.state.fetchData];

        copia[this.memoria]["claseid"] = "indice";
        copia[this.memoria].clasecancion = "cancion";
        this.memoria++;
        if (this.memoria == copia.length) {
            this.memoria = 0;
        }

        copia[this.memoria]["claseid"] = "cancionactual";

        copia[this.memoria].clasecancion = "cancionactual";

        this.setState({ fetchData: copia });

    }

    atras(id) {
        let copia = [...this.state.fetchData];

        copia[this.memoria]["claseid"] = "indice";
        copia[this.memoria].clasecancion = "cancion";
        this.memoria--;
        if (this.memoria == -1) {
            this.memoria = copia.length - 1;
        }

        copia[this.memoria]["claseid"] = "cancionactual";

        copia[this.memoria].clasecancion = "cancionactual";

        this.setState({ fetchData: copia });


        
    }

    reproducir() {
        document.getElementById("reproductor").play()
        let copia = [...this.state.clasesbotones]
        copia[0].play = "fas fa-play simboloplay escondido"
        copia[0].stop = "fas fa-pause-circle simboloplay "
        this.setState({clasesbotones:copia})
    }
    pausar() {
        document.getElementById("reproductor").pause()
        let copia = [...this.state.clasesbotones]
        copia[0].play = "fas fa-play simboloplay"
        copia[0].stop = "fas fa-pause-circle simboloplay escondido"
        this.setState({ clasesbotones: copia })
    }


    insertaretiquetasonido(){
        if (this.state.fetchData[0] !== undefined) {
            return (<audio id="reproductor" controls source src={"https://assets.breatheco.de/apis/sound/" + this.state.fetchData[this.memoria].url} type="audio/mp3" style={{ display: "none" }} >


            </audio>)
            console.log(this.state.fetchData[0],"flaj kfdajksfdafd")
        }
    }



    render() {

       



        return (
            <div>

                {this.state.fetchData.map((song, i) => {
                    if (this.primeravez == true) {
                        if (i == 0) {
                            var valor = "cancionactual";

                            var valor2 = "cancionactual";
                            song.claseid = valor;

                            song.clasecancion = valor2;
                        } else {
                            var valor = "indice";
                            var valor2 = "cancion";
                            song.claseid = valor;

                            song.clasecancion = valor2;
                            if (i == this.state.fetchData.length - 1) {
                                this.primeravez = false;
                            }
                        }
                    }

                    return (
                        <div className="fila text-light " key={i}>
                            <div className={this.state.fetchData[i].claseid}>{i + 1}</div>
                            <div className={this.state.fetchData[i].clasecancion}>
                                <div key={i}> {song.name} </div>
                            </div>
                        </div>
                    );
                })}

                <div className="bottonbar">
                    <div className="contenedorsimbolos">
                        <i
                            class="fas fa-caret-square-left simboloslado"
                            onClick={() => this.atras(this.memoria)}
                        ></i>

                        {<i className={this.state.clasesbotones[0].play} onClick={() => this.reproducir()}></i>}
                        <i className={this.state.clasesbotones[0].stop} onClick={()=> this.pausar()} ></i>
                        <i
                            class="fas fa-caret-square-right simboloslado"
                            onClick={() => this.adelante(this.memoria)}
                        ></i>
                    </div>
                </div>
               
                {this.insertaretiquetasonido()}

            </div>
        );
    }
}
