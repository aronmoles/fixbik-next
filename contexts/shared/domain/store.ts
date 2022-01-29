import { Nullable } from './Nullable';

export interface StoreItemOptions {
    maxAge?: number, // expires item in seconds
}

export default interface Store {
    set(key: string, value: Nullable<string>, options?: StoreItemOptions): Promise<void>;
    get(key: string): Promise<Nullable<string>>;
}
