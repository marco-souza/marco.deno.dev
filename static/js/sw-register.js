async function registerServiceWorker(serviceWorkerPath = "") {
	console.log("Registering service worker");

	const canRegister = serviceWorkerPath.length && "serviceWorker" in navigator;
	if (!canRegister) {
		console.error("Service worker not supported");
		return;
	}

	try {
		const sw = await navigator.serviceWorker.register(serviceWorkerPath, {
			scope: "/",
		});

		if (sw.installing) {
			console.log("Service worker installing");
		} else if (sw.waiting) {
			console.log("Service worker installed");
		} else if (sw.active) {
			console.log("Service worker active");
		}

		await setupNotificationChannel(sw);

		// ask notification permission
	} catch (error) {
		console.error(`Registration failed with ${error}`);
	}
}

const channel = new BroadcastChannel("sw-messages");

async function setupNotificationChannel(sw) {
	const permission = await window.Notification.requestPermission();
	if (permission !== "granted") {
		throw new Error("Permission not granted for Notification");
	}

	channel.onmessage = (event) => {
		console.log("> Broadcast Channel message", event.data);
		sw.showNotification("Service Worker Message", event.data);
	};

	sw.showNotification("Service Worker Ready", {
		body: "Service Worker is ready to receive messages",
	});
}
