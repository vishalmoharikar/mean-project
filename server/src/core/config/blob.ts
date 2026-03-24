import { BlobServiceClient } from "@azure/storage-blob";
import { storageConfig } from "../../core/config/storage";

const azureApiVersion =
    process.env.AZURE_STORAGE_API_VERSION ?? "2023-08-15"; // azurite-compatible default

const blobServiceClient = BlobServiceClient.fromConnectionString(
    storageConfig.connectionString,
    {
        // StoragePipelineOptions does not expose "version" in TypeScript defs,
        // but the underlying generated client supports it as a service version override.
        // `as any` avoids the strict type issue.
        version: azureApiVersion,
    } as any
);

export const containerClient =
    blobServiceClient.getContainerClient(storageConfig.containerName);

export const initContainer = async () => {
    await containerClient.createIfNotExists();
    console.log("Blob container ready");
};