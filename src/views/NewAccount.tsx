import React, { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import validator from "validator";

interface Props {
  loanResponse: { [key: string]: string | boolean } | null;
}

export const NewAccount: React.SFC<Props> = ({ loanResponse }) => {
  let history = useHistory();
  const [values, setValues] = useState<{
    [key: string]: { value: string; valid: boolean };
  }>({
    username: {
      value: "",
      valid: true
    },
    password: {
      value: "",
      valid: true
    },
    repeat: {
      value: "",
      valid: true
    }
  });

  /**
   * If user attempts to navigate here without loan
   * response data redirect them back to landing route.
   */
  if (!loanResponse) history.push("/");

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setValues({
      ...values,
      [name]: {
        value,
        valid: values[name].valid
      }
    });
  };

  const handleSubmit = () => {
    const valid = isFormValid();

    if (valid) {
      alert(
        "We probably want to handle creating an actual account in the future!"
      );
    }
  };

  const isFormValid = () => {
    const regex = /^[A-Za-z]+$/;

    /**
     * Check if passwords contain a number or special character
     * and have desired length
     */
    const validPassword =
      !regex.test(values.password.value) && values.password.value.length >= 8;
    const validRepeatPassword =
      !regex.test(values.repeat.value) &&
      values.repeat.value.length >= 8 &&
      validator.equals(values.repeat.value, values.password.value);
    setValues({
      username: {
        ...values.username,
        valid: validator.isEmail(values.username.value)
      },
      password: {
        ...values.password,
        valid: validPassword
      },
      repeat: {
        ...values.repeat,
        valid: validRepeatPassword
      }
    });
    return (
      validator.isEmail(values.username.value) &&
      validPassword &&
      validRepeatPassword
    );
  };

  return (
    <div className={"new-account-container"}>
      <Form.Group as={Col} controlId="validationCustom01">
        <Form.Label>Username (email)</Form.Label>
        <Form.Control
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            handleInputChange(e);
          }}
          isInvalid={!values.username.valid}
          type="text"
          placeholder="Username (email)"
          required
        />
        <Form.Control.Feedback type="invalid">
          Please provide a valid email.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group as={Col} controlId="validationCustom02">
        <Form.Label>Password</Form.Label>
        <Form.Control
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            handleInputChange(e);
          }}
          isInvalid={!values.password.valid}
          name={"password"}
          type="password"
          placeholder="Password"
          required
        />
        <Form.Control.Feedback type="invalid">
          Password must contain 8 or more characters and include a number or
          special character.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group as={Col} controlId="validationCustom03">
        <Form.Label>Repeat Password</Form.Label>
        <Form.Control
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            handleInputChange(e);
          }}
          isInvalid={!values.repeat.valid}
          name={"repeat"}
          type="password"
          placeholder="Repeat Password"
          required
        />
        <Form.Control.Feedback type="invalid">
          Passwords must match and contain 8 or more characters and include a
          number or special character.
        </Form.Control.Feedback>
      </Form.Group>
      <div className={"button-container password-button"}>
        <Button onClick={() => handleSubmit()} type="submit">
          Create account
        </Button>
      </div>
    </div>
  );
};
