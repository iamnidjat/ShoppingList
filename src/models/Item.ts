import {Product} from './Product';

export type Item = {
  id?: number;
  name: string;
  category: string;
  products?: Product[];
}
