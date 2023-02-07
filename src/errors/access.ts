class AccessErr extends Error {
  constructor(message:string) {
    super(message);
    const statusCode = 403;
  }
}

export default AccessErr;
