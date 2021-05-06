// copied from https://github.com/brigand/ink-progress-bar
// converted from javascript to typescript
// converted from class to functional component
import React, { useState, useEffect } from 'react';
import {Text} from 'ink';
import { Props as TextProps } from "ink/build/components/Text"

export interface ProgressBarProps {
	percent?: number;
	width?: number;
	left?: number;
	right?: number;
	character?: string;
	rightPad?: boolean;
	color?: TextProps["color"]
}

export const ProgressBar = ({
	percent = 0.50,
	width = undefined,
	left = 0,
	right = 0,
	character = '█',
	rightPad = false,
	color = "white"
}: ProgressBarProps) => {

  const [bar, setBar] = useState(' ');

  useEffect(() => {
    const screen = width ?? process.stdout.columns ?? 80;
		const space = screen - right - left;
		const max = Math.floor(Math.min(space * percent, space));
		const chars = character.repeat(max);

		if (!rightPad) {
			setBar(chars);
		} else {
      setBar(chars + ' '.repeat(space - max));
    }
  }, [percent, width, left, right, character, rightPad])

  return <Text color={color}>{bar}</Text>;
};

