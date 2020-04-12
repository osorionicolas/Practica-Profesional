export class User {
    id: number;
    email: string;
    password: string;
    perfil: string;
    sexo: string;

    constructor(email:string, password:string){
        this.email = email;
        this.password = password;
        this.id = 1;
        this.perfil = "user";
        this.sexo = "undefined";
    }
}