import React, { useEffect } from "react";
import { Box } from "ink";
import { useWorld } from "../stores/world";

export interface AssetProps {
  children: JSX.Element | JSX.Element[];
  x: number;
  y: number;
  id: string;
  contactRadius?: number;
}

export const Asset = ({ children, x, y, id, contactRadius }: AssetProps) => {

  const { updateObjectLocation } = useWorld();

  useEffect(() => {
    updateObjectLocation({ id, x, y, contactRadius })
    return () => {
      // removeObject(id)
    }
  }, [id, x, y, contactRadius])

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