export interface IValidation {
  validate(schema: any, props: any): TValidationOutput;
}

export type TValidationOutput = {
  isValid: boolean;
  errorsResult?: string;
};
