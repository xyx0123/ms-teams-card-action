<p>
  <a href="https://github.com/gor918/ms-teams-card-action/actions"><img alt="ms-teams-card-action status" src="https://github.com/gor918/ms-teams-card-action/workflows/Build%20&%20Test/badge.svg"></a>
</p>

# Microsoft Teams Notification GitHub Action

This is base on gor918/ms-teams-card-action. 

This is used for after creating a pull request to master branch(this you can specify the branch), send the notifications to teams channel.

It utilizes the latest dependencies and GitHub Actions features like Node.js 20 and etc.

## Usage

To integrate this GitHub Action into your workflow, follow these steps:

Usage:
```yaml
# This is used for creating a pull request then send the teams notification
name: MS Teams Notification
on:
  pull_request:
    branches:
      - master

jobs:
  send_notification:
    runs-on: [ 'ubuntu-latest' ]

    steps:
      - uses: actions/checkout@v2
      - name: Microsoft Teams Notifications
        uses: xyx0123/ms-teams-card-action@v1.1
        env:
          PR_NUMBER: ${{ github.event.number }}
        with:
          github-token: ${{ secrets.PERSONAL_GITHUB_TOKEN }}
          ms-teams-webhook-uri: ${{ secrets.TEAMS_WEBHOOK_URL }}
          notification-summary: Pull Request Message
          notification-color: 17a2b8
          timezone: Asia/Shanghai
          github-enterprise-host: Your enterprise github host
```