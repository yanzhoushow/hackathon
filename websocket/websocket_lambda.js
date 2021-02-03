const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
    
    //const connectionId = event.requestContext.connectionId;
    
    const {
        requestContext: { connectionId, routeKey },
    } = event;
    
    if (routeKey === "$connect") {
        // handle new connection
        console.log("match routeKey $connect. connectionId: ", connectionId)
        
        return {
            statusCode: 200
        }
    }
    
    if (routeKey === "$disconnect") {
        // handle disconnection
        console.log("match routeKey $disconnect. connectionId: ", connectionId)

        return {
            statusCode: 200
        }
    }
    
    if (routeKey === "scraper") {
        console.log("match routeKey scraper. connectionId: ", connectionId)

        const request_body = JSON.parse(event.body);
    
        const username = request_body.username;
        const password = request_body.password;
    
        console.log("user: ", username);
        console.log("pswd: ", password);
        
        const apigatewayManagementApi = new  AWS.ApiGatewayManagementApi({
            apiVersion: '2018-11-29',
            endpoint: '4fp8o2tn54.execute-api.us-east-1.amazonaws.com/dev',
        });
        
        const params = {      
            ConnectionId: connectionId,      
            Data: connectionId,    
        };
        
        await apigatewayManagementApi.postToConnection(params).promise();
        
        return {
            statusCode: 200
        }
    }
    
    // $default handler
    console.log("match routeKey $default. connectionId: ", connectionId)

    return {
        statusCode: 200
    }  
};
