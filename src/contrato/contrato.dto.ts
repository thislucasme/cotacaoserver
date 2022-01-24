export class ContratoRegistro {
  codigo: string
  status: string
  cliente: string
  cnpj: string
}
export type InfoConexao = {
  servidor: string
  banco: string
  usuario: string
  senha: string
  porta: string
}

export class Empresa {
  codigo: string
  razao: string
  empresa: string
  cnpj: string
  cidade: string
}
