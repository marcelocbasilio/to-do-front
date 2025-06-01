import {createRoot} from "react-dom/client";
import {App} from "./App";
import React from "react";

const container = document.getElementById('root')

if (container) {
	createRoot(container).render(
		<React.StrictMode>
			<App/>
		</React.StrictMode>
	)
}