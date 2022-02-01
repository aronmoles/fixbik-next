import Store, { StoreItemOptions } from '../../domain/store';
import { Nullable } from '../../domain/Nullable';
import { getCookie, setCookies } from 'cookies-next';

export default abstract class CookieStore implements Store {
    async get(key: string): Promise<Nullable<string>> {
        const value = getCookie(key) as string
        if (!value) {
            return null;
        }
        return value;
    }

    async set(key: string, value: Nullable<string>, storeOptions?: StoreItemOptions): Promise<void> {
        setCookies(key, value, { httpOnly: false, secure: true, sameSite: 'strict', maxAge: storeOptions?.maxAge });
    }
}
