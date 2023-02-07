class UserCreateError extends Error {
  constructor(message:string) {
    super(message);
    const statusCode = 409;
  }
}

export default UserCreateError;
