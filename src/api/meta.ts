import { Hono } from "hono"

import type { AppEnv } from "../env"
import { COMPAT } from "../shared/constants"

export const metaRoutes = new Hono<AppEnv>()

metaRoutes.get("/alive", (c) => c.json(new Date().toISOString()))
metaRoutes.get("/now", (c) => c.json(new Date().toISOString()))
metaRoutes.get("/version", (c) => c.json(COMPAT.apiVersion))

metaRoutes.get("/config", (c) => {
	const domain = c.get("config").domain
	return c.json({
		version: COMPAT.apiVersion,
		gitHash: null,
		server: {
			name: COMPAT.serverName,
			url: COMPAT.serverUrl
		},
		settings: {
			disableUserRegistration: !c.get("config").signupsAllowed
		},
		environment: {
			vault: domain,
			api: `${domain}/api`,
			identity: `${domain}/identity`,
			notifications: `${domain}/notifications`,
			sso: "",
			cloudRegion: null
		},
		push: {
			pushTechnology: 0,
			vapidPublicKey: null
		},
		featureStates: {
			"pm-19148-innovation-archive": true
		},
		object: "config"
	})
})
