import { StatsType } from "@slippi/slippi-js";

import { _, makeEndpoint, SuccessPayload } from "../ipc";
import { FileLoadResult, Progress } from "./types";

// Handlers

export const loadReplayFolder = makeEndpoint.main("loadReplayFolder", <{ folderPath: string }>_, <FileLoadResult>_);

export const pruneFolders = makeEndpoint.main("pruneFolders", <{ existingFolders: string[] }>_, <SuccessPayload>_);

export const calculateGameStats = makeEndpoint.main("calculateGameStats", <{ filePath: string }>_, <StatsType>_);

// Events

export const loadProgressUpdated = makeEndpoint.renderer("replays_loadProgressUpdated", <Progress>_);
