import getConfig from 'next/config';
import AuthRepository from '../contexts/auth/domain/AuthRepository';
import ApiAuthRepository from '../contexts/auth/infrastructure/api/ApiAuthRepository';
import FixBikHttpClient from '../contexts/shared/infrastructure/http-client/FixBikHttpClient';
import AuthStore from '../contexts/auth/domain/AuthStore';
import AuthCookieStore from '../contexts/auth/infrastructure/store/AuthCookieStore';
import BikeRepository from '../contexts/bike/domain/BikeRepository';
import ApiBikeRepository from '../contexts/bike/infrastructure/api/ApiBikeRepository';

const { publicRuntimeConfig } = getConfig()

const httpClient = new FixBikHttpClient({
    baseUrl: publicRuntimeConfig.apiBaseUrl,
});

export const authStore: AuthStore = new AuthCookieStore();
export const authRepository: AuthRepository = new ApiAuthRepository(httpClient);
export const bikeRepository: BikeRepository = new ApiBikeRepository(httpClient);
