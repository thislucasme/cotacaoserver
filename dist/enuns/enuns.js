"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoDesconto = exports.FormaPagamento = void 0;
var Tipo;
(function (Tipo) {
    Tipo[Tipo["Percentual"] = 0] = "Percentual";
    Tipo[Tipo["Valor"] = 1] = "Valor";
})(Tipo || (Tipo = {}));
var FormaPagamento;
(function (FormaPagamento) {
    FormaPagamento[FormaPagamento["BOLETO_BANCARIO"] = 0] = "BOLETO_BANCARIO";
    FormaPagamento[FormaPagamento["CARTAO_CREDITO"] = 1] = "CARTAO_CREDITO";
    FormaPagamento[FormaPagamento["DINHEIRO"] = 2] = "DINHEIRO";
    FormaPagamento[FormaPagamento["CHEQUE"] = 3] = "CHEQUE";
    FormaPagamento[FormaPagamento["OUTROS"] = 4] = "OUTROS";
})(FormaPagamento = exports.FormaPagamento || (exports.FormaPagamento = {}));
var TipoDesconto;
(function (TipoDesconto) {
    TipoDesconto[TipoDesconto["VALOR"] = 0] = "VALOR";
    TipoDesconto[TipoDesconto["PERCENTUAL"] = 1] = "PERCENTUAL";
})(TipoDesconto = exports.TipoDesconto || (exports.TipoDesconto = {}));
//# sourceMappingURL=enuns.js.map