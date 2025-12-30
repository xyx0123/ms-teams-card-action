export function createAdaptiveCard(
    notificationSummary: string,
    notificationColor: string, // AdaptiveCard 不支持主题色，保留参数但不使用
    commit: any,
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

    const avatarUrl = "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png";
    
    console.log("avatarUrl",avatarUrl);

    const authorName = commit?.data?.commit?.author?.name ?? 'Unknown';
    const authorProfileUrl = author?.html_url ?? '';

    /** add new fields  */
    const userMessage  = commit.data.commit.message

    const authorLine = authorProfileUrl
        ? `**${authorName}** [(@${authorLogin})](${authorProfileUrl})`
        : `**${authorName}**`;

    return {
        type: 'AdaptiveCard',
        $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
        version: '1.5',
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
                                url: avatarUrl,
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
                                wrap: true
                            },
                            {
                                type: 'TextBlock',
                                text: timestamp,
                                isSubtle: true,
                                spacing: 'Small',
                                wrap: true
                            }
                        ]
                    }
                ]
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
                ]
            }
        ],

        /* ===== 操作按钮 ===== */
        actions: [
            {
                type: 'Action.OpenUrl',
                title: '🔍 View Pull Request',
                url: `${repoUrl}/pull/${prNum}`
            }
        ]
    };
}
