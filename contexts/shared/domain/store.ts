import { Nullable } from './Nullable';

export interface StoreItemOptions {
    // expires item in seconds
    maxAge?: number,
}

export default interface Store {
    set(key: string, value: Nullable<string>, options?: StoreItemOptions): Promise<void>;
    get(key: string): Promise<Nullable<string>>;
}
