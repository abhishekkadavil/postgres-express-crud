// Centralized error handling
import { errorCodes } from "../utils/errorCodes.js";
const errorHandler = (err, req, res, next) => {
  if (err.isJoi) {
    return res
      .status(422)
      .json({ status: 422, message: err.details[0].message });
  }

  const statusCode = res.statusCode ? res.statusCode : 422;
  switch (statusCode) {
    case errorCodes.VALIDATION_ERROR:
      res.json({
        title: "Validation Failed",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case errorCodes.NOT_FOUND:
      res.json({
        title: "Not Found",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case errorCodes.UNAUTHORIZED:
      res.json({
        title: "Unauthorized",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case errorCodes.FORBIDDEN:
      res.json({
        title: "Forbidden",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case errorCodes.SERVER_ERROR:
      res.json({
        title: "Server Error",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    default:
      res.status(422).json({
        title: "Unhandled error",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
  }
};

export default errorHandler;
