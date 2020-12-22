export interface Environment {
    TOKEN: string;
}

export class EnvironmentHelper {
    public static toEnvironment(env: any): Environment {
        return {
            TOKEN: env.TOKEN
        }
    }
}