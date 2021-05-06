import React from "react";
import { Box } from "ink";

interface AssetProps {
  children: JSX.Element | JSX.Element[];
  x: number;
  y: number;
}

export const Asset = ({ children, x, y }: AssetProps) => {
  return (
    <Box
      paddingLeft={x}
      paddingTop={y}
      flexDirection="column"
      position="absolute"
    >
      {children}
    </Box>
  )
}