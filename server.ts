import { Application, Router } from "https://deno.land/x/oak/mod.ts";

// Constants
const DEFAULT_PORT = 3001;
const router = new Router();

/**
 * POST /prompt
 * Request body JSON: { "q": "some instruction" }
 */
router.post("/prompt", async (context) => {
    try {
        const body = await context.request.body().value;
        const prompt = body.q;

        const DEEPSEEK_API_KEY = Deno.env.get("DEEPSEEK_API_KEY");
        console.log("DEEPSEEK_API_KEY:", DEEPSEEK_API_KEY);
        console.log("Request Body:", body);
        console.log("Prompt:", prompt);

        if (!prompt) {
            context.response.status = 400;
            context.response.body = { error: "No prompt provided" };
            return;
        }

        // Aider command
        const cmd = [
            "aider",
            "--model",
            "deepseek/deepseek-coder",
            "--no-show-model-warnings",
            "--no-browser",
            "--yes",
            "--read",
            "CONVENTIONS.md",
            "--auto-commits",
            "--message",
            prompt,
        ];

        const currentWorkingDirectory = Deno.cwd();
        console.log("CWD:", currentWorkingDirectory);

        // 1) Run Aider
        const aiderProcess = Deno.run({
            cmd,
            cwd: currentWorkingDirectory,
            stdout: "piped",
            stderr: "piped",
        });

        // Wait for Aider to finish
        const [aiderStatus, rawOutput, rawError] = await Promise.all([
            aiderProcess.status(),
            aiderProcess.output(),
            aiderProcess.stderrOutput(),
        ]);

        aiderProcess.close();

        const output = new TextDecoder().decode(rawOutput);
        const errorOutput = new TextDecoder().decode(rawError);

        // Check if Aider succeeded
        if (!aiderStatus.success) {
            context.response.status = 500;
            context.response.body = {
                success: false,
                error: `Aider process exited with code ${aiderStatus.code}`,
                logs: errorOutput || output,
            };
            return;
        }

        console.log("Aider finished successfully. Now pushing changes...");

        // 2) If Aider succeeded, run `git push origin main` (adjust if needed)
        const gitPushProcess = Deno.run({
            cmd: ["git", "push", "origin", "master"], // or your branch of choice
            cwd: currentWorkingDirectory,
            stdout: "piped",
            stderr: "piped",
        });

        const [pushStatus, pushRawOutput, pushRawError] = await Promise.all([
            gitPushProcess.status(),
            gitPushProcess.output(),
            gitPushProcess.stderrOutput(),
        ]);

        gitPushProcess.close();

        const pushOutput = new TextDecoder().decode(pushRawOutput);
        const pushErrorOutput = new TextDecoder().decode(pushRawError);

        if (!pushStatus.success) {
            context.response.status = 500;
            context.response.body = {
                success: false,
                error: `git push exited with code ${pushStatus.code}`,
                logs: pushErrorOutput || pushOutput,
            };
            return;
        }

        // All good: Aider auto-committed, then we pushed those commits to origin main
        context.response.status = 200;
        context.response.body = {
            success: true,
            output: `${output}\n\nPUSH SUCCESS:\n${pushOutput}`,
        };
    } catch (err) {
        console.error("Invocation failed:", err);
        context.response.status = 500;
        context.response.body = {
            success: false,
            error: err.message,
        };
    }
});

const app = new Application();

// Add the router to your application
app.use(router.routes());
app.use(router.allowedMethods());

// Start listening
const port = Number(Deno.env.get("PORT")) || DEFAULT_PORT;
console.log(`Server running on port ${port}`);

// Handle graceful shutdown
const signals = ["SIGINT", "SIGTERM"] as const;

for (const signal of signals) {
    Deno.addSignalListener(signal, () => {
        console.log(`Received ${signal}. Shutting down gracefully...`);
        // Place any additional cleanup logic here if needed
        Deno.exit();
    });
}

await app.listen({ port });
