export class HttpError extends Error {
  public errorCode;
  public data;
  public status;

  constructor(errorCode: string, status?: number, data?: any) {
    super();
    this.errorCode = errorCode;
    this.status = status;
    this.data = data;
  }
}
