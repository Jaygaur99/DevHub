import {
  Box,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";

import React, { useState } from "react";

import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useMutation } from "react-query";

import { AuthButton, Card, LoadingButton } from "Components";
import { authenticateUser } from "Services";
import { useAppDispatch, useAppSelector } from "store/hooks";
import ErrorToast from "Utils/Toast/Error";

import { AuthStepProps } from "Types";
import { setAuth } from "features";

const StepPassword = ({ onClick }: AuthStepProps) => {
  const [passwordShow, setPasswordShow] = useState(false);
  const togglePassword = () => setPasswordShow(!passwordShow);
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);
  const toggleConfirmPassword = () =>
    setConfirmPasswordShow(!confirmPasswordShow);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { email, mobile, authType } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handlePasswordChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "password" | "confirm-password"
  ) => {
    const newPassword = event.target.value;

    if (type === "password") {
      setPassword(newPassword);
    } else if (type === "confirm-password") {
      setConfirmPassword(newPassword);
    }
  };

  const handleSubmitPassword = async () => {
    if (password === confirmPassword && password.length >= 6) {
      await mutation.mutateAsync();
    } else if (password.length < 6) {
      ErrorToast("Password should be greater than 6");
    } else {
      ErrorToast("Password Doesnot Match");
    }
  };

  const mutation = useMutation(
    () => authenticateUser(email, mobile, password, authType),
    {
      onSuccess(data) {
        console.log(data);
        dispatch(
          setAuth({
            _id: data.data.user._id,
            user_id: data.data.user.user_id,
          })
        );
      },
      onError() {
        console.log("Failed HERE");
        ErrorToast("Failed");
      },
    }
  );

  return (
    <>
      <Card
        icon="password"
        title="Create new password"
        key={"phone number"}
        dataTestId="authenticate-password-card"
      >
        <Box marginTop="1.6rem" width={{ ssm: "19rem", sm: "20rem" }}>
          <Text fontWeight="600" fontSize="0.95rem" marginBottom="0.2rem">
            Password
          </Text>
          <InputGroup>
            <Input
              px="2rem"
              type={passwordShow ? "text" : "password"}
              placeholder="Enter password"
              bg="main.input-bg"
              color="main.text.white"
              required={true}
              value={password}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handlePasswordChange(event, "password")
              }
              data-testid="password-input"
            />
            <InputRightElement
              width="3rem"
              color="main.text.white"
              onClick={togglePassword}
            >
              {passwordShow ? (
                <BsEye cursor="pointer" fontSize="1.3rem" />
              ) : (
                <BsEyeSlash cursor="pointer" fontSize="1.3rem" />
              )}
            </InputRightElement>
          </InputGroup>
        </Box>
        <Box marginTop="1.6rem" width={{ ssm: "19rem", sm: "20rem" }}>
          <Text fontWeight="600" fontSize="0.95rem" marginBottom="0.2rem">
            Confirm Password
          </Text>
          <InputGroup>
            <Input
              px="2rem"
              type={confirmPasswordShow ? "text" : "password"}
              placeholder="Enter password"
              bg="main.input-bg"
              color="main.text.white"
              required={true}
              value={confirmPassword}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handlePasswordChange(event, "confirm-password")
              }
              data-testid="confirm-password-input"
            />
            <InputRightElement
              width="3rem"
              color="main.text.white"
              onClick={toggleConfirmPassword}
            >
              {confirmPasswordShow ? (
                <BsEye cursor="pointer" fontSize="1.3rem" />
              ) : (
                <BsEyeSlash cursor="pointer" fontSize="1.3rem" />
              )}
            </InputRightElement>
          </InputGroup>
        </Box>
        {mutation.isLoading ? (
          <LoadingButton marginTop="1.7rem" />
        ) : (
          <AuthButton
            buttonText="Next"
            marginTop="1.7rem"
            onClick={handleSubmitPassword}
          />
        )}
      </Card>
    </>
  );
};

export default StepPassword;
