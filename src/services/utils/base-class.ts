export abstract class BaseClass {
    protected id: number

    protected constructor(id: number = 0) {
        this.id = id
    }

    public get idValue() : number {
        return this.id
    }

    protected abstract validateData(): void
}