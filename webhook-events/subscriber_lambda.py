def lambda_handler(event, context):
    message = event['Records'][0]['Sns']['Message']
    print("handle message: " + message)

    webhook_url = 'https://hookb.in/RZYdoJVodkcREEj72WqV'
    http = urllib3.PoolManager()
    r = http.request(
        'POST',
        webhook_url,
        body=message.encode('utf-8'),
        headers={'Content-Type': 'application/json'}
    )

    print("webhook post response: " + r.data.decode('utf-8') )

    return message
    
