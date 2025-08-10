export class Exception extends Error {
  public statusCode: number;
  public override message: string;
  public details: string | undefined;

  constructor(
    statusCode: number,
    message: string,
    details?: string | undefined
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.details = details;
  }
}
