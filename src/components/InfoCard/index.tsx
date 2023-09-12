import * as React from "react";
import { Box, Typography, Skeleton } from "@mui/material";
import * as types from "./InfoCard.types";
import * as sx from "./InfoCard.styles";

export const InfoCard: React.FC<types.CardPropsT> = (props: types.CardPropsT) => {
  if (props.isLoading) return <InfoCardSkeleton />;
  return (
    <Box sx={sx.cardBox}>
      {props?.icon && (
        <Box sx={sx.iconWrapper}>
          <props.icon />
        </Box>
      )}
      <Box sx={sx.cardBoxInner}>
        <Box sx={sx.cardBoxInner2}>
          <Typography variant='inherit' sx={sx.title}>
            {props.label}
          </Typography>
          <Typography style={{ alignItems: "center" }} variant='inherit' sx={sx.tag}>
            {props.tag}
          </Typography>
        </Box>
        <Box sx={sx.valueWrapper}>
          {props.totalValue}
          {props?.valueUnit && (
            <Typography variant='body2' fontWeight={500} component='span'>
              {props?.valueUnit}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

const InfoCardSkeleton: React.FC = () => {
  return (
    <Box sx={sx.cardBox}>
      <Box sx={sx.iconWrapper}>
        <Skeleton />
      </Box>
      <Box sx={sx.cardBoxInner}>
        <Box sx={sx.cardBoxInner2}>
          <Skeleton>
            <Typography variant='inherit' sx={sx.title}>
              loading.....
            </Typography>
          </Skeleton>
          <Skeleton>
            <Typography style={{ alignItems: "center" }} variant='inherit' sx={sx.tag}>
              loading.....
            </Typography>
          </Skeleton>
        </Box>
        <Box sx={sx.valueWrapper}>
          <Skeleton>
            <Typography variant='body2' fontWeight={500} component='span' whiteSpace='nowrap'>
              loading text.....
            </Typography>
          </Skeleton>
        </Box>
      </Box>
    </Box>
  );
};

export default InfoCard;
