#!/bin/bash
set -euo pipefail
FAILURE=1
SUCCESS=0
STARTED=-1
RUNNING=2
function print_slack_summary_build() {
    
local slack_msg_header
local slack_channel
# local SLACK_WEBHOOKURL

# SLACK_WEBHOOKURL="https://hooks.slack.com/services/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"
slack_channel="clea-deployment-alerts"
slack_msg_header="${ENVIRONMENT_NAME} : Deployment FAILED :large_red_square:"

if [[ "${EXIT_STATUS}" == "${SUCCESS}" ]]; then
    slack_msg_header="${ENVIRONMENT_NAME} : Deployment Succeeded :large_green_square:"
elif [[ "${EXIT_STATUS}" == "${STARTED}" ]]; then
    slack_msg_header="${ENVIRONMENT_NAME} : Deployment Started :large_yellow_square:"
elif [[ "${EXIT_STATUS}" == "${RUNNING}" ]]; then
    exit 0
fi

cat <<-SLACK

            {
                "blocks": [
                    {
                        "type": "header",
                        "text": {
                            "type": "plain_text",
                            "text": "${slack_msg_header}",
                            "emoji": true
                        }
                    },
                    {
                        "type": "divider"
                    },
                    {
                        "type": "section",
                        "fields": [
                            {
                                "type": "mrkdwn",
                                "text": "*Component:*\n ${COMPONENT}"
                            },
                            {
                                "type": "mrkdwn",
                                "text": "*Status:*\n${CI_JOB_STATUS}"
                            },
                            {
                                "type": "mrkdwn",
                                "text": "*Pipeline URL:*\n<${CI_PIPELINE_URL}|link>"
                            },
                            {
                                "type": "mrkdwn",
                                "text": "*Trigerred By:*\n${GITLAB_USER_EMAIL}"
                            }
                        ]
                    },
                    {
                        "type": "divider"
                    }
                ]
            }
SLACK
}
function share_slack_update_build() {
# local slack_webhook
# slack_webhook="$SLACK_WEBHOOKURL"
curl -X POST                                           \
        --data-urlencode "payload=$(print_slack_summary_build)"  \
        "https://hooks.slack.com/services/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"
}
