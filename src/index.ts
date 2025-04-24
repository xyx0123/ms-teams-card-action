import * as core from '@actions/core';
import { Octokit } from '@octokit/rest';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import { createMessageCard } from './message-card';
import { createOssReportMessageCard } from './oss-report-card';

dayjs.extend(utc);
dayjs.extend(timezone);

async function run(): Promise<void> {
  try {
    const githubToken = core.getInput('github-token', { required: true });
    const msTeamsWebhookUri: string = core.getInput('ms-teams-webhook-uri', {
      required: true,
    });

    const notificationSummary = core.getInput('notification-summary') || 'GitHub Action Notification';
    const notificationColor = core.getInput('notification-color') || '0b93ff';
    const timezoneInput = core.getInput('timezone') || 'UTC';

    const timestamp = dayjs().tz(timezoneInput).format('dddd, MMMM D YYYY, h:mm:ss a');

    const [owner, repo] = (process.env.GITHUB_REPOSITORY ?? '').split('/');
    const sha = process.env.GITHUB_SHA ?? '';
    const runId = process.env.GITHUB_RUN_ID ?? '';
    const runNum = process.env.GITHUB_RUN_NUMBER ?? '';
    const prNum = process.env.PR_NUMBER ?? '';
    const params = { owner, repo, ref: sha };
    const repoName = `${params.owner}/${params.repo}`;

    const githubHost = core.getInput('github-enterprise-host', { required: false });

    const briefMessage = core.getInput('brief-message', { required: false });
    const account = core.getInput('account', { required: false });

    const repoUrl = `https://${githubHost}/${repoName}`;
    const baseApiUrl = `https://${githubHost}/api/v3`;

    const octokit = new Octokit({ baseUrl: baseApiUrl, auth: `token ${githubToken}` });
    const commit = await octokit.repos.getCommit(params);
    const author = commit.data.author;

    console.log(prNum);
    console.log(commit);

    // const messageCard = await createMessageCard(
    //   notificationSummary,
    //   notificationColor,
    //   commit,
    //   author,
    //   runNum,
    //   runId,
    //   repoName,
    //   sha,
    //   repoUrl,
    //   timestamp,
    //     prNum,
    // );

    const messageCard = await createOssReportMessageCard(notificationSummary, notificationColor, briefMessage, account);

    console.log(messageCard);

    const response = await fetch(msTeamsWebhookUri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(messageCard),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to send message: ${errorText}`);
    }

    const responseData = await response.json();
    console.log(responseData);
    core.debug(responseData);
  } catch (error: any) {
    console.error(error);
    core.setFailed(error.message);
  }
}

run();
