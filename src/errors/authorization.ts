class AuthorizationErr extends Error {
  constructor(message:string) {
    super(message);
    const statusCode = 401;
  }
}
export default AuthorizationErr;
