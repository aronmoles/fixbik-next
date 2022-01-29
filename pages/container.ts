import AuthRepository from '../contexts/auth/domain/AuthRepository';
import ApiAuthRepository from '../contexts/auth/infrastructure/api/ApiAuthRepository';
import FixBikHttpClient from '../contexts/shared/infrastructure/http-client/FixBikHttpClient';
import AuthStore from '../contexts/auth/domain/AuthStore';
import AuthCookieStore from '../contexts/auth/infrastructure/store/AuthCookieStore';

// const env: Env = window as any;

const httpClient = new FixBikHttpClient({
    baseUrl: "http://localhost:3001",
    // baseUrl: env.API_PATH,
});

export const authStore: AuthStore = new AuthCookieStore();
export const authRepository: AuthRepository = new ApiAuthRepository(httpClient);
// export const bikeRepository: BikeRepository = new ApiBikeRepository(httpClient);
