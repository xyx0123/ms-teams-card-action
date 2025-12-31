export function createAdaptiveCard(
    notificationSummary: string,
    notificationColor: string, // AdaptiveCard 不支持主题色，保留参数但不使用
    octokitResponse: any,
    author: any,
    runNum: string,
    runId: string,
    repoName: string,
    sha: string,
    repoUrl: string,
    timestamp: string,
    prNum: string,
): any {
    const authorLogin = author?.login ?? 'unknown';

    const avatar_url = 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png';
    
    console.log("avatarUrl",avatar_url);

    const authorName = octokitResponse?.data?.commit?.author?.name ?? 'Unknown';
    const authorProfileUrl = author?.html_url ?? '';

    /** add new fields  */
    const userMessage  = octokitResponse.data.commit.message

    const authorLine = authorProfileUrl
        ? `**${authorName}** [(@${authorLogin})](${authorProfileUrl})`
        : `**${authorName}**`;

    return {
        type: 'AdaptiveCard',
        $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
        version: '1.5',
        msTeams: {
            with: 'full'
        },
        body: [
            /* ===== 标题 ===== */
            {
                type: 'TextBlock',
                text: notificationSummary,
                size: 'ExtraLarge',
                weight: 'Bolder',
                wrap: true
            },

            /* ===== 副标题 ===== */
            {
                type: 'TextBlock',
                text: `New pull request on **${repoName}**`,
                size: 'Medium',
                spacing: 'Small',
                wrap: true
            },

            /* ===== 作者 + 头像 ===== */
            {
                type: 'ColumnSet',
                spacing: 'Medium',
                columns: [
                    {
                        type: 'Column',
                        width: 'auto',
                        items: [
                            {
                                type: 'Image',
                                url: avatar_url,
                                size: 'Medium',
                                style: 'Person'
                            }
                        ]
                    },
                    {
                        type: 'Column',
                        width: 'stretch',
                        items: [
                            {
                                type: 'TextBlock',
                                text: authorLine,
                                size: 'Medium',
                                weight: 'Bolder',
                                wrap: true,
                                height: 'stretch'
                            },
                            {
                                type: 'TextBlock',
                                text: timestamp,
                                isSubtle: true,
                                spacing: 'Small',
                                wrap: true,
                                height: 'stretch'
                            }
                        ],
                        bleed: true,
                        targetWidth: 'AtLeast:Wide'
                    }
                ],
                bleed: true
            },

            /* ===== 分隔线 ===== */
            {
                type: 'TextBlock',
                text: ' ',
                separator: true
            },

            /* ===== PR 信息 ===== */
            {
                type: 'FactSet',
                facts: [
                    {
                        title: 'Repository',
                        value: repoName
                    },
                    {
                        title: 'Message',
                        value: `${userMessage}`
                    },
                    {
                        title: 'Commit',
                        value: sha.substring(0, 7)
                    }
                ],
                target: 'Wide'
            }
        ],

        /* ===== 操作按钮 ===== */
        actions: [
            {
                type: 'Action.OpenUrl',
                title: 'Go to Approve',
                url: `${repoUrl}/pull/${prNum}`,
                iconUrl: 'icon:AlertOn',
                style: 'positive'
            }
        ]
    };
}
