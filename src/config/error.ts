export class Exception extends Error {
  public statusCode: number;
  public message: string;
  public details: string | {} | string[];

  constructor(statusCode: number, message: string, details?: any) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.details = details;
  }
}
