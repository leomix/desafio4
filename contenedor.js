import _ from 'lodash';
export class Contenedor{

    constructor(){
        this.lista = []
    }

    post(objeto){
        let ultimo = this.lista.slice(-1)[0]
        objeto.id = typeof ultimo?.id === "undefined" ? 1 : ultimo.id + 1;
        this.lista.push(objeto)

        return objeto
    }

    put(objeto){
        this.lista = this.lista.map(x => (x.id == objeto.id) ? objeto : x)
        return objeto
    }
    
    getById(id){
        return this.lista.find(obj =>  obj.id == id)
    }

    getAll(){
        return this.lista
    }

    deleteById(id){
        this.lista = this.lista.filter(obj =>  obj.id != id)
        return this.lista
    }

    getRandom(){
        return this.lista[Math.floor(Math.random() * this.lista.length)];
    }

    deleteAll(){
        this.lista = []
        return this.lista
    }
    
}
