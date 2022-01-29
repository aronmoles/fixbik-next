export default interface Service<D> {
    run(...args: any[]): Promise<D>
}
