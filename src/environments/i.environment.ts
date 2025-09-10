export interface IEnvironment {
  production: boolean;
  assetsPath: string;
  jwtSecret: string;
  jwtExpiresIn: string;
  dbHost?: string;
  dbName?: string;
  dbPass?: string;
  dbPort?: number | string;
  dbUser?: string;
}