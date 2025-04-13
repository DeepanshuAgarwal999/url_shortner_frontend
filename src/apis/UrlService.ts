import { makeRequest } from "./makeRequest";

export class UrlService {
  private static readonly BASE_PATH = "/urls";

  static async createUrl(urlCredentials: any): Promise<any> {
    
      return makeRequest<string, string>(`${this.BASE_PATH}`, {
        method: "POST",
        body: urlCredentials,
      });
    
  }

  static async getUrls(): Promise<any> {
    return makeRequest<void, any>(`${this.BASE_PATH}`);
  }
}
