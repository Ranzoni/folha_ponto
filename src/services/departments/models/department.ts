export class Department {
    private id: number = 0
    private name: string

    public constructor(name: string, id: number = 0) {
        this.id = id
        this.name = name
    }

    public get idValue() : number {
        return this.id
    }

    public get nameValue() : string {
        return this.name
    }
}