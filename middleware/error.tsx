export const errorHandler = (
  res: any,
  statusCode = 500,
  message = "INTERNAL SERVER ERROR"
) => {
  return res.status(statusCode).json({
    success: false,
    message: message,
  });
};

// export const AsyncErrorCatch = (passFunction: any) => (req: any, res: any) => {
//   Promise.resolve(passFunction(req, res)).catch((error) => {
//     return errorHandler(res, 500, error.message);
//   });
// };
