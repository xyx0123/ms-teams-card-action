export function createMessageCard(
  notificationSummary: string,
  notificationColor: string,
  commit: any,
  author: any,
  runNum: string,
  runId: string,
  repoName: string,
  sha: string,
  repoUrl: string,
  timestamp: string,
  prNum: string
): any {
  const avatar_url = author?.avatar_url ? author.avatar_url : 'https://www.cdnlogo.com/logos/g/69/github-icon.svg';

  const author_url = author?.login && author.html_url ? `[(@${author.login})](${author.html_url}) ` : '';

  const messageCard = {
    '@type': 'MessageCard',
    '@context': 'https://schema.org/extensions',
    summary: notificationSummary,
    themeColor: notificationColor,
    title: notificationSummary,
    sections: [
      {
        activityTitle: `New pull request on [${repoName}](${repoUrl})`,
        activityImage: avatar_url,
        activitySubtitle: `by ${commit.data.commit.author.name} ${author_url}on ${timestamp}`,
      },
    ],
    potentialAction: [
      {
        '@context': 'http://schema.org',
        target: [`${repoUrl}/pull/${prNum}`],
        '@type': 'ViewAction',
        name: 'Go to Approve',
      },
    ],
  };

  return messageCard;
}
