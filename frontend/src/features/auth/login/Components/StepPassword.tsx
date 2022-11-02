import {
  Box,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";

import { useState } from "react";
import { useMutation } from "react-query";

import { useAppDispatch, useAppSelector } from "store/hooks";
import { loginUser } from "Services";
import { setUserRefreshToken } from "features";

import { BsEye, BsEyeSlash } from "react-icons/bs";

import { AuthButton, Card } from "Components";
import LoadingButton from "Components/Button/LoadingButton";

import ErrorToast from "Utils/Toast/Error";

import { AuthStepProps } from "Types";

const StepPassword = ({ onClick }: AuthStepProps) => {
  const [passwordShow, setPasswordShow] = useState(false);
  const togglePassword = () => setPasswordShow(!passwordShow);

  const [password, setPassword] = useState("");

  const { email, mobile, authType } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handlePasswordChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPassword(event.target.value);
  };

  const handleSubmitPassword = async () => {
    if (password.length >= 6) {
      await mutation.mutateAsync();
    } else if (password.length < 6) {
      ErrorToast("Password should be greater than 6");
    } else {
      ErrorToast("Password Doesnot Match");
    }
  };

  const mutation = useMutation(
    () => loginUser(email, mobile, password, authType),
    {
      onSuccess(data) {
        dispatch(setUserRefreshToken(data.data));
      },
      onError() {
        ErrorToast("Failed");
      },
    }
  );

  return (
    <>
      <Card
        icon="password"
        title="Enter your password"
        key={"password"}
        dataTestId="login-password-card"
      >
        <Box marginTop="1.6rem" width="18rem">
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
              onChange={handlePasswordChange}
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
