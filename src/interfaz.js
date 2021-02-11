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
            }],
            memoria:0
        };
        // this.state.memoria = 0;
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

        copia[this.state.memoria]["claseid"] = "indice";
        copia[this.state.memoria].clasecancion = "cancion";
        this.state.memoria++;
        if (this.state.memoria == copia.length) {
            this.state.memoria = 0;
        }

        copia[this.state.memoria]["claseid"] = "cancionactual";

        copia[this.state.memoria].clasecancion = "cancionactual";

        
        this.setState({ fetchData: copia });

        let copia2 = [...this.state.clasesbotones]
        copia2[0].play = "fas fa-play simboloplay "
        copia2[0].stop = "fas fa-pause-circle simboloplay escondido"
        this.setState({ clasesbotones: copia2 })





    }

    atras(id) {
        let copia = [...this.state.fetchData];

        copia[this.state.memoria]["claseid"] = "indice";
        copia[this.state.memoria].clasecancion = "cancion";
        this.state.memoria--;
        if (this.state.memoria == -1) {
            this.state.memoria = copia.length - 1;
        }

        copia[this.state.memoria]["claseid"] = "cancionactual";

        copia[this.state.memoria].clasecancion = "cancionactual";

        this.setState({ fetchData: copia });

        let copia2 = [...this.state.clasesbotones]
        copia2[0].play = "fas fa-play simboloplay "
        copia2[0].stop = "fas fa-pause-circle simboloplay escondido"
        this.setState({ clasesbotones: copia2 })

        
    }

    reproducir() {
        document.getElementById("reproductor").play()
        let copia = [...this.state.clasesbotones]
        copia[0].play = "fas fa-play simboloplay escondido"
        copia[0].stop = "fas fa-pause-circle simboloplay "
        this.setState({clasesbotones:copia})
        console.log("reproducir",this.state.memoria)
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
            return (<audio id="reproductor" controls source src={"https://assets.breatheco.de/apis/sound/" + this.state.fetchData[this.state.memoria].url} type="audio/mp3" style={{ display: "none" }} >


            </audio>)
    
        }
    }
    seleccionarcancion(id){
        // document.getElementById("reproductor").pause()
        this.pausar()
        console.log(id)
       
        this.setState({ memoria:id }, () => {               //el estado no se está actualizando inmediatamente, debido a eso necesito meter la función dentro
            //callback
            console.log(this.state.memoria) // myname
            this.reproducir()
        });
     

       console.log(this.state.memoria,"113")



        let copia = [...this.state.fetchData];

        copia[this.state.memoria]["claseid"] = "indice";
        copia[this.state.memoria].clasecancion = "cancion";
        

        this.setState({ fetchData: copia });
        

        copia[id]["claseid"] = "cancionactual";

        copia[id].clasecancion = "cancionactual";

        this.setState({ fetchData: copia });

        // let copia2 = [...this.state.clasesbotones]
        // copia2[0].play = "fas fa-play simboloplay "
        // copia2[0].stop = "fas fa-pause-circle simboloplay escondido"
        // this.setState({ clasesbotones: copia2 })
    
       
    }


    render() {

       



        return (
            <div>

                {this.state.fetchData.map((song, i) => {           
                    if (this.primeravez == true) {                     //clase inicial de los div
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
                            <div className={this.state.fetchData[i].clasecancion} onClick={() => this.seleccionarcancion(i)}>
                                <div key={i}> {song.name} </div>
                            </div>
                        </div>
                    );
                })}

                <div className="bottonbar">
                    <div className="contenedorsimbolos">
                        <i
                            className="fas fa-caret-square-left simboloslado"
                            onClick={() => this.atras(this.state.memoria)}
                        ></i>

                        {<i className={this.state.clasesbotones[0].play} onClick={() => this.reproducir()}></i>}
                        <i className={this.state.clasesbotones[0].stop} onClick={()=> this.pausar()} ></i>
                        <i
                            className="fas fa-caret-square-right simboloslado"
                            onClick={() => this.adelante(this.state.memoria)}
                        ></i>
                    </div>
                </div>
               
                {this.insertaretiquetasonido()}

            </div>
        );
    }
}
