// Index is the second layer in the game
// being called by cli
// its main purpose is to call app
// but in the future context providers will need to be setup
// and have an index component is perfect for that
// you could argue this should be done in cli or app
// but it just needs to be somewhere in between so this is great
// btw a context provider is how global state is stored
// things like the characters position

import React from "react";
import { App } from "./App";

import { WorldStoreProvider } from "./stores/world";
import { PlayerStoreProvider } from "./stores/player";
import { InterfaceStoreProvider } from "./stores/interface";

const Index = () => {
	return (
		<>
			<WorldStoreProvider>
				<PlayerStoreProvider>
					<InterfaceStoreProvider>
						<App />
					</InterfaceStoreProvider>
				</PlayerStoreProvider>
			</WorldStoreProvider>
		</>
	);
};

export default Index;
