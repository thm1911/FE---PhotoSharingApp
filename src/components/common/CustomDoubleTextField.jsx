import { Stack, TextField, Typography } from "@mui/material";
import CustomTextField from "./CustomTextField";

export default function CustomDoubleTextField(props) {
  const { errors, register, dataFirst, dataSecond } = props;
  const firstValue = dataFirst?.value;
  const secondValue = dataSecond?.value;
  return (
    <Stack spacing={2} direction="row" alignItems={"center"}>
      <CustomTextField
        required={dataFirst?.required}
        name={firstValue}
        label={dataFirst?.label}
        id={firstValue}
        type={dataFirst?.type ? dataFirst?.type : "text"}
        register={register}
        errors={errors}
      />
      <Typography>-</Typography>
      <CustomTextField
        required={dataFirst?.required}
        name={secondValue}
        label={dataSecond?.label}
        id={secondValue}
        type={dataSecond?.type ? dataSecond?.type : "text"}
        register={register}
        errors={errors}
      />
    </Stack>
  );
};
