//Deus é Fiel

class Auxiliar {

    constructor() {

       let id = localStorage.getItem('id');
        
        
        if(id == null){

            localStorage.setItem('id', 0 ); 


        }



    }

    getProximoItem() {

        let ProximoItem = localStorage.getItem('id')

        
        return parseInt(ProximoItem) + 1 ; 

    
    }

    gravar(d) {

       let gravador =  this.getProximoItem()

       localStorage.setItem(gravador , JSON.stringify(d))
        
        localStorage.setItem('id', gravador); 
    
    }


    recuperarRegistros() {

        let Recuperar = new Array() 

        let ID = localStorage.getItem('id');
        
     

         for(let x = 1; x <= ID ; x++) {


             let despesa = JSON.parse(localStorage.getItem(x))
            

             if(despesa == null) {

                continue 


             }
             
             despesa.id = x
             Recuperar.push(despesa); 

            
         }
        
         return Recuperar; 
        

    }

    filtrar(d) {

        let filtro = []; 
        
        filtro = this.recuperarRegistros()
        
        if(d.ano != '') {

            filtro = filtro.filter( a => a.ano == d.ano); 



        }

        if(d.mes != ''){

            filtro = filtro.filter( a => a.mes == d.mes); 



        }

        if(d.dia != ''){

            filtro = filtro.filter(a => a.dia == d.dia); 



        }

        if(d.tipo != ''){

            filtro = filtro.filter(a => a.tipo == d.tipo);


        }


        if(d.valor != ''){

            filtro = filtro.filter(a => a.valor == d.valor); 


        }


        if(d.descricao != ''){

            filtro = filtro.filter(a => a.descricao == d.descricao); 


        }

        

        return filtro; 

    }   



    removeItem(id) {

        localStorage.removeItem(id)


    }


}

class Despesas {

    constructor(ano, mes, dia, tipo, valor, descricao) {


        this.ano = ano ;
        this.mes = mes ;
        this.dia = dia ;
        this.tipo = tipo ;
        this.valor = valor ;
        this.descricao = descricao ;

    }

    validarDados() {

        for(let i in this) {

            if(this[i] == null || this[i] == '' || this[i] == undefined){

                return false; 

            }

           

        }
        return true; 
    }

    //Quando a aplicação cai na condição de return, a função finaliza naquele ponto.. Por isso a aplicação está dando certo. 


}

let auxiliar = new Auxiliar()



function cadastrarDespesas () {


    let ano = document.getElementById('ano'); 
    let mes = document.getElementById('mes'); 
    let dia = document.getElementById('dia'); 
    let tipo = document.getElementById('tipo'); 
    let valor = document.getElementById('valor'); 
    let descricao = document.getElementById('descricao'); 

    let despesa = new Despesas(ano.value, mes.value, dia.value, tipo.value , valor.value, descricao.value) ; 
    
    if(despesa.validarDados()) {

        auxiliar.gravar(despesa); 
       
        $('#mostrarModal').modal('show') 
        document.getElementById('botao').className = 'btn btn-success';
        document.getElementById('botao').innerHTML = 'Voltar'; 
        document.getElementById('exampleModalLabel').className = 'text-success'
        document.getElementById('exampleModalLabel').innerHTML = 'Registro cadastrado com sucesso'
        document.getElementById('body').innerHTML = 'Despesa Cadastrada com sucesso'
    
    }else{ 

        $('#mostrarModal').modal('show') 
        document.getElementById('botao').className = 'btn btn-danger';
        document.getElementById('botao').innerHTML = 'Voltar'; 
        document.getElementById('exampleModalLabel').className = 'text-danger'
        document.getElementById('exampleModalLabel').innerHTML = 'Ops!Ocorreu algum problema'
        document.getElementById('body').innerHTML = 'Erro ao cadastrar despesa'


    }

}









function mostrarConsultas(despesa = Array(), filtro = false  ) {
    if(despesa.length == 0 && filtro == false){
         despesa = auxiliar.recuperarRegistros()

    }; 
    
    let listasDespesas = document.getElementById('listasDespesas'); 
        listasDespesas.innerHTML= '' 
    despesa.forEach(R => {

      let linha = listasDespesas.insertRow(); 

        linha.insertCell(0).innerHTML = `${R.dia}/${R.mes}/${R.ano}`; 

        switch(R.tipo){
        
            case '1': 

                R.tipo = 'Alimentação'
            break

            case '2': 

            R.tipo= 'Educação' 
            break 

            case '3': 

                R.tipo = 'Lazer'
            break

            case '4': 

            R.tipo = 'Saúde'

            break


            case '5': 
            R.tipo = 'Transporte'

            break 
            




        }

        linha.insertCell(1).innerHTML = `${R.tipo}`; 
        linha.insertCell(2).innerHTML = `${R.descricao}`; 
        linha.insertCell(3).innerHTML = `${R.valor}`;    
        
       let btn = document.createElement('button'); 
       btn.className ='btn btn-danger'; 
       btn.innerHTML = '<i class="fas fa-times"> </i>'
       btn.id = `inset_${R.id}`; 

       btn.onclick = function () {

         let id = this.id.replace('inset_', ''); 

          
            auxiliar.removeItem(id); 

            window.location.reload()
       }
       linha.insertCell(4).append(btn); 
    
    
    
    })
    
   

}


function filtrandoDespesas() {
    let ano  = document.getElementById("ano")
	let mes = document.getElementById("mes")
	let dia = document.getElementById("dia")
	let tipo = document.getElementById("tipo")
	let descricao = document.getElementById("descricao")
	let valor = document.getElementById("valor")
    
    
    let despesa = new Despesas(ano.value, mes.value, dia.value, tipo.value, valor.value, descricao.value); 

    
      let despesasFiltro = auxiliar.filtrar(despesa); 

        console.log(despesasFiltro); 

    mostrarConsultas(despesasFiltro, true  ); 


};




