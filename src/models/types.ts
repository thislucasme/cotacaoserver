export type Fornecedor = {
	email: string;
	cnpj: string;
	razaoSocial: string;
	cnpjClienteSuccess: string;
	razaoSocialClienteSuccess: string;
	numeroContratoClienteSuccess: string;
	cotacaoHabilitado: number
}
export type FornecedorCredencials = {
	email: string,
	senha: string
}
export type LoginTDO = {
	email: string;
}
export type DadosSuccess = {
	cnpjFornecedor: string;
	contratoEmpresaSucess: string;
	numeroEmpresa: string;
	numeroCotacao: string;

}
export type DescontoTDO = {
	percentual: number;
	dados: CotacaoTDOPayload
	tipo: string;

}
export type ItemCotacaoTDO = {
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
	fornecedor: string;
	ipi: number;
	mva: number;
	data: string;
}
export type CotacaoTDOPayload = {
	codigo: string;
	codigoEmpresa: string;
	fornecedor: string;
	flag: string;
	contratoEmpresa: string;

}
export type HistoricoProdutosTDO = {
	icms: number;
	st: number;
	ipi: number;
	mva: number;
	fornecedor: string;
	produto6: string;
}
export type HistoricoProdutosParametro = {
	fornecedor: string;
	produto6: string;
	contratoEmpresa: string;
	numeroEmpresa: string;
}
export type FornecedorData = {
	nome: string;
	cnpj: string | null;
	email: string | null;
	url: string | null;
	codigoFornecedor: string | null;
	enviado: boolean;
}
export type PayloadEnvioEmail = {
	empresa: {
		contratoEmpresaSuccess: string;
		numeroCotacao: string;
		numeroEmpresa: string;
	}
	fornecedores: FornecedorData[];
}

export type PayloadSuccess = {
	empresa: {
		contratoEmpresaSuccess: string;
		numeroCotacao: string;
		numeroEmpresa: string;
	}
	fornecedores: {
		cnpjFornecedor: string;
	}
}
