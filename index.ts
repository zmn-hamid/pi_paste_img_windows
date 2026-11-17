import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { cleanupClipboardImages } from "./cleanup.ts";

export default function piClipboardCleanup(pi: ExtensionAPI): void {
	pi.registerCommand("clipboard-cleanup", {
		description: "Delete Pi clipboard images from the system temporary directory",
		handler: async (_args, ctx) => {
			try {
				const result = await cleanupClipboardImages();
				const deletedCount = result.deleted.length;
				const failedCount = result.failed.length;

				let message =
					deletedCount === 0
						? "No Pi clipboard images found."
						: `Deleted ${deletedCount} Pi clipboard image${deletedCount === 1 ? "" : "s"}.`;

				if (failedCount > 0) {
					message += ` Could not delete ${failedCount} file${failedCount === 1 ? "" : "s"}.`;
				}

				ctx.ui.notify(message, failedCount > 0 ? "warning" : "info");
			} catch (error) {
				const message = error instanceof Error ? error.message : String(error);
				ctx.ui.notify(`Clipboard cleanup failed: ${message}`, "error");
			}
		},
	});
}
