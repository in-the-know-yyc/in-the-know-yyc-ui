import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";

const client = new SecretsManagerClient({ region:'ca-central-1' });

export async function getSecret(secretId) {
  try {
    const response = await client.send(new GetSecretValueCommand({
      SecretId: secretId,
      VersionStage: 'AWSCURRENT'
    }));

    return JSON.parse(response.SecretString);
  } catch (error) {
    console.error('Error fetching secret:', error);
    throw error;
  }
}