import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { HelmetProvider } from "react-helmet-async"
import App from "./app/App"
import { Providers } from "./app/providers"
import "./styles/globals.css"
import "./styles/reactbits.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<HelmetProvider>
			<BrowserRouter>
				<Providers>
					<App />
				</Providers>
			</BrowserRouter>
		</HelmetProvider>
	</React.StrictMode>,
)
