export declare const codificar: (input: string) => string;
export declare const restaurar: (inp: string | null) => string;
export declare function testarSenha(hashedPassword: string, inputPassword: string): Promise<boolean>;
