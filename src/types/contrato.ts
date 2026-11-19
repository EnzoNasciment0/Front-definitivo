import type { StatusContrato } from './enums'

/**
 * web/dto/ContratoLinhaDTO.java (resposta de GET/POST /contratos)
 * Atenção: "imovel" e "locatario" vêm como NOMES (string), não objetos.
 */
export interface ContratoLinhaDTO {
  id: number
  /** Id do imóvel do contrato */
  imovelId: number
  imovel: string
  locatario: string
  status: StatusContrato
  valor: number
  /** LocalDate "AAAA-MM-DD" (dataExpedicao + prazoMeses). Pode vir null. */
  dataValidade: string | null
}

/** Índices de reajuste oferecidos no popup "Novo contrato de aluguel". */
export const IndiceReajuste = {
  IPCA: 'IPCA',
  IGPM: 'IGPM',
  INPC: 'INPC',
} as const
export type IndiceReajuste = (typeof IndiceReajuste)[keyof typeof IndiceReajuste]

/** web/dto/ContratoRequest.java (corpo do POST /contratos) */
export interface ContratoRequest {
  /** @NotNull */
  imovelId: number
  /** @NotNull */
  locatarioId: number
  /** @NotNull @Positive */
  prazoMeses: number
  /** @NotNull @DecimalMin("0.01") */
  valorAluguel: number
  /**
   * LocalDate no formato "AAAA-MM-DD". Opcional:
   * se omitido, o backend usa a data de hoje.
   */
  dataExpedicao?: string
  /**
   * ⚠ CAMPO PROPOSTO (ainda não existe no DTO Java).
   * Enviado mesmo assim: o Spring ignora campos desconhecidos,
   * e passa a gravar quando o backend adicionar o campo.
   */
  indiceReajuste?: IndiceReajuste
}
