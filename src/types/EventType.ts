import { ICategoryType } from "./CategoryType";

interface ITicketPrices {
  tribune: number;
  annexeLoge: number;
  logeVIP: number;
  logeVVIP: number;
  serviceFee: number;
  processingFee: number;
}

interface IEventType {
  ticketPrices: ITicketPrices;
  _id: string;
  name: string;
  category: ICategoryType | null;
  date: string;
  time: string;
  location: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  image: string;
  head_to_head: string;
}

export type { IEventType };
