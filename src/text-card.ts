export function createTextMessageCard(
    notificationSummary: string,
    notificationColor: string
): any {
    const messageCard = {
        '@type': 'MessageCard',
        '@context': 'https://schema.org/extensions',
        summary: notificationSummary,
        themeColor: notificationColor,
        title: notificationSummary,
        sections: [
            {
                activityTitle: `Usage of Ali Cloud OSS`,
                text: "oss information",
                // activityImage: avatar_url,
                // activitySubtitle: `by ${commit.data.commit.author.name} ${author_url}on ${timestamp}`,
            },
        ],
        potentialAction: [
            // {
            //     '@context': 'http://schema.org',
            //     target: [`${repoUrl}/pull/${prNum}`],
            //     '@type': 'ViewAction',
            //     name: 'Go to Approve',
            // },
        ],
    };

    return messageCard;
}
