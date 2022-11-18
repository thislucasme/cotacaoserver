export declare type Fornecedor = {
    email: string;
    cnpj: string;
    razaoSocial: string;
    cnpjClienteSuccess: string;
    razaoSocialClienteSuccess: string;
    numeroContratoClienteSuccess: string;
    cotacaoHabilitado: number;
};
export declare type FornecedorCredencials = {
    email: string;
    senha: string;
};
export declare type LoginTDO = {
    email: string;
};
export declare type DadosSuccess = {
    cnpjFornecedor: string;
    contratoEmpresaSucess: string;
    numeroEmpresa: string;
    numeroCotacao: string;
};
export declare type DescontoTDO = {
    percentual: number;
    dados: CotacaoTDOPayload;
    tipoDesconto: number;
    frete: number;
    tipo: number;
    formaPagamento: number;
};
export declare type ItemCotacaoTDO = {
    codigoEmpresa: string;
    contratoEmpresa: string;
    codigo: string;
    item: string;
    codigoInterno: string;
    descricao: string;
    marca: string;
    quantidade: number;
    valorProduto: number;
    frete: number;
    st: number;
    icms: number;
    formaPagamento: string;
    formapagamento: string;
    fornecedor: string;
    ipi: number;
    mva: number;
    data: string;
    desconto: number;
    valordoproduto: number;
};
export declare type CotacaoTDOPayload = {
    codigo: string;
    codigoEmpresa: string;
    fornecedor: string;
    flag: string;
    contratoEmpresa: string;
};
export declare type ObservacaoGeralTDO = {
    codigoEmpresa: string;
    contratoEmpresa: string;
    observacao: string;
    cotacao: string;
};
export declare type HistoricoProdutosTDO = {
    icms: number;
    st: number;
    ipi: number;
    mva: number;
    fornecedor: string;
    produto6: string;
};
export declare type HistoricoProdutosParametro = {
    fornecedor: string;
    produto6: string;
    contratoEmpresa: string;
    numeroEmpresa: string;
};
export declare type FornecedorData = {
    nome: string;
    cnpj: string | null;
    email: string | null;
    url: string | null;
    codigoFornecedor: string | null;
    enviado: boolean;
};
export declare type PayloadEnvioEmail = {
    empresa: {
        contratoEmpresaSuccess: string;
        numeroCotacao: string;
        numeroEmpresa: string;
    };
    fornecedores: FornecedorData[];
};
export declare type PayloadSuccess = {
    empresa: {
        contratoEmpresaSuccess: string;
        numeroCotacao: string;
        numeroEmpresa: string;
    };
    fornecedores: {
        cnpjFornecedor: string;
    };
    validade: any | null;
};
export declare type GeneratedData = {
    array: number[];
    soma: number;
    first: number;
    last: number;
};
export declare type GenerateIdDataByArray = {
    array: number[];
    last: string;
};
