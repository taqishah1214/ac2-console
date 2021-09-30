export class ResponseType<T> {
  error: any;
  result: T;
  success: boolean;
  targetUrl: any;
  unAuthorizedRequest: boolean;
}
