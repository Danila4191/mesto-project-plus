class BadRequestErr extends Error {
  constructor(message:string) {
    super(message);
    const statusCode = 400;
  }
}

export default BadRequestErr;
