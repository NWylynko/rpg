#!/usr/bin/env node

// cli in the entrypoint to this game
// calling node dist/cli.js to run it
// it can take flags thanks to meow
// but since this is a game not a cli
// flags are not really needed

import "source-map-support/register";
import React from "react";
import { render } from "ink";
import meow from "meow";
import Index from "./index";

const helpText = `
Usage
	$ rpg
`;

const cli = meow(helpText, {
	flags: {
	},
});

render(<Index {...cli.flags} />);
