import React from "react";
import { HelperText, Input } from "@windmill/react-ui";


const WindmillInput = ({
    field,
    form: { touched, errors },
    ...props
  }) => (
    <>
      <Input className="mt-1" {...field} {...props} css={undefined} />
      {touched[field.name] &&
        errors[field.name] && <HelperText valid={false}>{errors[field.name]}</HelperText>}
    </>
  );

export default WindmillInput;