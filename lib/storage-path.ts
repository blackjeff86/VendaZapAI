import os from "node:os";
import path from "node:path";

function isReadOnlyDeploymentRuntime() {
  return Boolean(
    process.env.VERCEL ||
      process.env.AWS_LAMBDA_FUNCTION_NAME ||
      process.env.LAMBDA_TASK_ROOT,
  );
}

export function resolveDataFilePath(
  customPath: string | undefined,
  filename: string,
) {
  const normalizedCustomPath = customPath?.trim();

  if (normalizedCustomPath) {
    return path.resolve(normalizedCustomPath);
  }

  if (isReadOnlyDeploymentRuntime()) {
    return path.join(os.tmpdir(), "vendazap-ai", filename);
  }

  return path.join(process.cwd(), "data", filename);
}
