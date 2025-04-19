import Joi from "joi";

// Create employee validation
const employeeCreateScheme = Joi.object({
  employeeName: Joi.string().min(2).required(),
  employeeAge: Joi.number().min(20).max(99).required(),
  employeeSalary: Joi.number().min(1000),
  employeeDesignation: Joi.string(),
});

const validateCreateEmployee = (req, res, next) => {
  const { error } = employeeCreateScheme.validate(req.body);
  if (error) {
    next(error);
  } else {
    next();
  }
};

// Update employee validation
const employeeUpdateSchema = Joi.object({
  employeeAge: Joi.number(),
  employeeSalary: Joi.number(),
  employeeDesignation: Joi.string(),
});

const validateUpdateEmployee = (req, res, next) => {
  const { error } = employeeUpdateSchema.validate(req.body);
  if (error) {
    next(error);
  } else {
    next();
  }
};

export { validateCreateEmployee, validateUpdateEmployee };
