
import boto3
import json

client = boto3.client('sns')

# idempotent
topic_arn = client.create_topic(Name='EventOfInterest')['TopicArn']

message = {
    "event": "job.completed",
    "event_details":{
        "message": "Job Completed Successfully"
    }
}

resp = client.publish(
    TopicArn = topic_arn,
    Message = json.dumps(message)
)

print(f'Job.Completed event is published to event queue')
