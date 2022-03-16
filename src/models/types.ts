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
	tipoDesconto: number;
	frete: number;
	tipo: number;
	formaPagamento: number;

}
export type ItemCotacaoTDO = {
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
	fornecedor: string;
	ipi: number;
	mva: number;
	data: string;
	desconto: number;
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
	},
	fornecedores: FornecedorData[],
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
	validade: any | null;
}
export type GeneratedData = {
	array: number[];
	soma: number;
	first: number;
	last: number;
}
export type GenerateIdDataByArray = {
	array: number[];
	last: string;
}
