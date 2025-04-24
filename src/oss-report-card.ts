export function createOssReportMessageCard(
  notificationSummary: string,
  notificationColor: string,
  briefMessage: string,
  account: string
): any {
  // Convert bytes to readable format
  function formatBytes(bytes: number): string {
    if (bytes === 0) return '0 B';
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${units[i]}`;
  }

  // Format timestamp into China local time
  function formatTime(ms: number): string {
    return new Date(ms).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });
  }
  let facts: { name: string; value: string }[] = [];

  try {
    const rawDatapoints = JSON.parse(briefMessage);
    // Deduplicate based on key fields
    const map = new Map<string, any>();
    rawDatapoints.forEach((dp: any) => {
      const key = `${dp.BucketName}-${dp.storageType}-${dp.region}-${dp.userId}`;
      const existing = map.get(key);
      if (!existing || dp.timestamp > existing.timestamp) {
        map.set(key, dp);
      }
    });

    const dedupedDatapoints = Array.from(map.values());

    facts = dedupedDatapoints.map((dp: any) => ({
      name: `🪣 ${dp.BucketName}`,
      value: `📊 ${formatBytes(dp.Value)}🕒 ${formatTime(dp.timestamp)}`,
    }));
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : 'Invalid JSON';
    facts = [{ name: 'Error parsing datapoints', value: errMsg }];
  }

  const messageCard = {
    '@type': 'MessageCard',
    '@context': 'https://schema.org/extensions',
    summary: notificationSummary,
    themeColor: notificationColor,
    title: notificationSummary,
    sections: [
      {
        activityTitle: '(👥' + account + ')' + `Usage of Ali Cloud OSS`,
        // text: briefMessage,
        facts: facts,
        markdown: true,
      },
    ],
    potentialAction: [],
  };

  return messageCard;
}
