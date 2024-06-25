import {produto} from './produto';

export interface Orcamento {
  nome: string;
  numeroTelefone: string;
  produtos: produto[];
  status: string;
  created_at: Date;
  updated_at: Date;
  messageId?: string;
  closed?: boolean;
  propostaBlingId?: Number;
  propostaBlingNumber?: Number;
  wppPdfId?: string;
}
