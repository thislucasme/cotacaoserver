const mocha = require('mocha');
const chai = require('chai');

var assert = chai.assert;
var expect = chai.expect;

const ABNT_5891_1977 = require('../src/ABNT_5891_1977');

describe('Teste ABNT NBR 5891:1977', function(){

    describe("Arredondamento", function(){

        it('ao passar o valor 1 retorna 1.0000', function(){
            
            const abnt = new ABNT_5891_1977(4);
            let vArredondado = abnt.arredonda(1);
            assert.equal(vArredondado, "1.0000");
            
        })

        it('ao passar o valor 1.23 retorna 1.2', function(){
            const abnt = new ABNT_5891_1977(1);
            let vArredondado = abnt.arredonda(1.23);
            assert.equal(vArredondado, "1.2");
            
        })


        it('ao passar o valor 1.235 retorna 1.24', function(){
            const abnt = new ABNT_5891_1977(2);
            let vArredondado = abnt.arredonda(1.235);
            assert.equal(vArredondado, "1.24");
            
        })

        it('ao passar o valor 1.2349999... retorna 1.24', function(){
            const abnt = new ABNT_5891_1977(2);
            let vArredondado = abnt.arredonda(1.234999999999999999999999999);
            assert.equal(vArredondado, "1.24");
            
        })

        it('ao passar o valor 1.2249999... retorna 1.22', function(){
            const abnt = new ABNT_5891_1977(2);
            let vArredondado = abnt.arredonda(1.224999999999999999999999999);
            assert.equal(vArredondado, "1.22");
            
        })

        it('ao passar o valor 23.2249999... retorna 23.22', function(){
            const abnt = new ABNT_5891_1977(2);
            let vArredondado = abnt.arredonda(23.224999999999999999999999999);
            assert.equal(vArredondado, "23.22");
            
        })

        it('ao passar o valor 129.995... retorna 130.00', function(){
            const abnt = new ABNT_5891_1977(2);
            let vArredondado = abnt.arredonda(129.995);
            assert.equal(vArredondado, "130.00");
            
        })

        it("retorna 8.93 ao passar resultado de 8.925005", function(){
            const abnt = new ABNT_5891_1977(2);
            let vArredondado = abnt.arredonda(8.925005);
            assert.equal(vArredondado, "8.93");
        })

        it("retorna 8.93 ao passar resultado de 8.925000005", function(){
            const abnt = new ABNT_5891_1977(2);
            let vArredondado = abnt.arredonda(8.925000005);
            assert.equal(vArredondado, "8.93");
        })

        it("retorna 8.92 ao passar resultado de 8.925000000000001", function(){
            const abnt = new ABNT_5891_1977(2);
            let vArredondado = abnt.arredonda(8.925000000000001);
            assert.equal(vArredondado, "8.92");
        })

        
    })    
    
    describe("testes com multiplicacoes", function(){
        it("retorna 8.08 ao passar resultado de 85x0.095", function(){
            const abnt = new ABNT_5891_1977(2);
            let vArredondado = abnt.arredonda(85*0.095);
            assert.equal(vArredondado, "8.08");
        })

        it("retorna 8.92 ao passar resultado de 85x0.105", function(){
            const abnt = new ABNT_5891_1977(2);
            let vArredondado = abnt.arredonda(85*0.105);
            assert.equal(vArredondado, "8.92");
        })

        it("retorna 10.62 ao passar resultado de 85x0.125", function(){
            const abnt = new ABNT_5891_1977(2);
            let vArredondado = abnt.arredonda(85*0.125);
            assert.equal(vArredondado, "10.62");
        })

        it("retorna 25.08 ao passar resultado de 12x2.09", function(){
            const abnt = new ABNT_5891_1977(2);
            let vArredondado = abnt.arredonda(12*2.09);
            assert.equal(vArredondado, "25.08");
        })

        it("retorna 25.08 ao passar 25.083", function(){
            const abnt = new ABNT_5891_1977(2);
            let vArredondado = abnt.arredonda(25.083);
            assert.equal(vArredondado, "25.08");
        })

        it("retorna 25.01 ao passar 25.008", function(){
            const abnt = new ABNT_5891_1977(2);
            let vArredondado = abnt.arredonda(25.008);
            assert.equal(vArredondado, "25.01");
        })

        it("retorna 25.008 ao passar 25.008", function(){
            const abnt = new ABNT_5891_1977(4);
            let vArredondado = abnt.arredonda(25.008);
            assert.equal(vArredondado, "25.0080");
        })

        it("retorna 28.80 ao passar 6*4,80", function(){
            const abnt = new ABNT_5891_1977(2);
            let vArredondado = abnt.arredonda(6*4.80);
            assert.equal(vArredondado, "28.80");
        })

      
    })

  
})