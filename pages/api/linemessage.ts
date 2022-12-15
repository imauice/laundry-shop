import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<String>
) {
    
    const message = req.query.message;
    console.log("line message: ",message);
    if (req.headers.secret_key != process.env.NEXT_SECRET_KEY) {
        res.end("Welcome to laundry api. This is private api. Thank you.")
    }
    else {

        const line_token =process.env.NEXT_LINE_TOKEN;
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer {${line_token}}`);

        var raw = JSON.stringify({
            "messages": [
                {
                    "type": "text",
                    "text": `${message}`
                }

            ]
        });

        var requestOptions: RequestInit = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://api.line.me/v2/bot/message/broadcast", requestOptions)
            .then(response => {
                if(response.statusText == "OK"){

                    res.send('messages text: '+message)
                }
            })
            .catch(error => console.log('error', error));
    }
}
