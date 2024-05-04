var mock = {
    "measurements": [
        {
            "id": "1",
            "meterId": "136a",
            "value": 55343
        },
        {
            "id": "2",
            "meterId": "136a",
            "value": 43243
        },
        {
            "id": "3",
            "meterId": "136a",
            "value": 343288
        }        
    ]
};

context.proxyResponse.content = JSON.stringify(mock);
