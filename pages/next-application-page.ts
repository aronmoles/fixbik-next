import { NextPage } from 'next';

export type NextApplicationPage<P = any, IP = P> = NextPage<P, IP> & {
    requireAuth?: boolean
}
