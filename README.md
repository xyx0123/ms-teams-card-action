<p>
  <a href="https://github.com/gor918/ms-teams-card-action/actions"><img alt="ms-teams-card-action status" src="https://github.com/gor918/ms-teams-card-action/workflows/Build%20&%20Test/badge.svg"></a>
</p>

# Microsoft Teams Notification GitHub Action

This GitHub Action sends a custom notification message to a Microsoft Teams channel, including details from the GitHub repository. It utilizes the latest dependencies and GitHub Actions features like Node.js 20 and etc.

## Usage

To integrate this GitHub Action into your workflow, follow these steps:

Usage:
```yaml
- name: Microsoft Teams Notifications
  uses: gor918/ms-teams-card-action@main
  with:
    github-token: ${{ github.token }}
    ms-teams-webhook-uri: ${{ secrets.MS_TEAMS_WEBHOOK_URI }}
    notification-summary: Your custom notification message 
    notification-color: 17a2b8
    timezone: Europe/Bucharest
```