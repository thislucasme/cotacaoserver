module.exports = class ABNT_5891_1977 {
    
    constructor(casasDecimais){
        this.casasDecimais = casasDecimais;
    }

    arredonda(decimal){
        var strDecimal = decimal + "";
        var arrDecimal = strDecimal.split('.');
        var parteInteira = arrDecimal[0];
        var parteDecimal = arrDecimal[1];

        var qtdZerosEsquerdaDecimal = 0;

        if(parteDecimal){
            if(parteDecimal.length == 15){
                return decimal.toFixed(this.casasDecimais);
            }
            
            for(let i=0; i< parteDecimal.length; i++){
                let numero = parteDecimal.substr(i, 1);
                if(parseInt(numero) == 0){
                    qtdZerosEsquerdaDecimal ++;
                    continue;
                } 
                break;
                
            }
        }

        // if(parteDecimal && this.casasDecimais == parteDecimal.length){
        //     return strDecimal;
        // }

        // if(parteDecimal && this.casasDecimais > parteDecimal.length){
        //     let dif = this.casasDecimais - parteDecimal.length;
        //     parteDecimal = parteDecimal * Math.pow(10, dif);
        //     return parteInteira + "." + parteDecimal;
        // }

        if(parteDecimal == undefined){
            return parseInt(parteInteira).toFixed(this.casasDecimais);
        }

        var bugNovesRegex = new RegExp(/[9]{2,}/gm)

        if(parteDecimal.length == 15){

            var bugDoUmRegex = /[0]{2,}[1]{1}\z/gm;
            if(bugNovesRegex.test(parteDecimal)){
                parteDecimal = parteDecimal.replace(bugNovesRegex, "");
                parteDecimal = (parseInt(parteDecimal) + 1) +"";
            }
            if(bugDoUmRegex.test(parteDecimal)){
                parteDecimal = parteDecimal.replace(bugDoUmRegex, "");
            }            
        }

        var diferenca = this.casasDecimais - (parteDecimal + "").length;
        //console.log('diferenca', diferenca);
        var sobe = false;
        if(diferenca >= 0){
            parteDecimal = parseInt(parteDecimal) * (Math.pow(10, diferenca));
            
            parteDecimal = parteDecimal + "";
            for(let i=0; i<qtdZerosEsquerdaDecimal; i++){
                parteDecimal = "0" + parteDecimal;
            }

        } else {
            
            var digitoDecisor = parseInt(parteDecimal.substr(this.casasDecimais,1));
            var sobra = parseInt( parteDecimal.substr(this.casasDecimais + 1));
            parteDecimal = parteDecimal.substr(0, this.casasDecimais);
            //console.log("decimal1", parteDecimal, digitoDecisor);
            if(digitoDecisor > 5){
                sobe = true;
                //console.log("decimal1", parteDecimal);
            } else if(digitoDecisor == 5){
                
                //console.log("decimal1", parteDecimal);
                if(sobra > 0 || (parteDecimal % 2 != 0)){
                    sobe=true
                    //console.log("decimal1", parteDecimal);
                }
            }
        }

      
        var retorno = parseFloat(parteInteira + "." + parteDecimal);
        if(sobe){
            //console.log("sobe", parteInteira, parteDecimal, parseFloat(parteInteira + "." + parteDecimal), Math.pow(10, (-1) * this.casasDecimais));
            retorno = retorno  + (Math.pow(10, (-1) * this.casasDecimais))
        }

        //console.log(retorno ,decimal, parteInteira, parteDecimal, this.casasDecimais);
        return retorno;       

    }

    arredondaOld(decimal){
        var auxPrecisao = 2;
        var auxComparacao = 5 * Math.pow(10, auxPrecisao-1);
        const exp = Math.pow(10,(this.casasDecimais + auxPrecisao));
        
        let numeroInteiro = parseInt((decimal.toFixed((this.casasDecimais+auxPrecisao))) * exp);

        let sobra = parseInt((numeroInteiro + "").substr(-auxPrecisao));
        let  numero = parseInt((numeroInteiro + "").substr(0, ((numeroInteiro+"").length - auxPrecisao) ));
        
        console.log("Numero ==> ", 
                    numero, 
                    (numeroInteiro+"").length, 
                    (numeroInteiro+""),
                    auxComparacao,
                    sobra,
                    decimal.toFixed((this.casasDecimais+auxPrecisao)),
                    exp,
                    (85*0.095),
                    Math.imul(((85*0.095).toFixed(this.casasDecimais+auxPrecisao))), 1000000);
        if(this.ehPar(numero)){
            if(sobra > auxComparacao){
                numero++;
            }
        } else {
            if(sobra >= auxComparacao){
                numero++;
            }
        }

        //console.log("Numero ==> ", numero);
        //console.log("sobra ===> " , sobra);
        
        numero = (numero / Math.pow(10, this.casasDecimais)).toFixed(this.casasDecimais);
        //console.log("Numero ==> ", numero);
        return numero;
    }

    ehPar(numero){
        return (numero % 2 == 0)
    }
}