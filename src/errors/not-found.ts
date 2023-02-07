class NotFoundErr extends Error {
  constructor(message:string) {
    super(message);
    const statusCode = 404;
  }
}
export default NotFoundErr;
