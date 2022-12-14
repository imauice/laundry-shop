import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<String>
) {

    const message = req.query.message;

    if (req.headers.secret_key != process.env.SECRET_KEY) {
        res.end("Welcome to laundry api. This is private api. Thank you.")
    }
    else {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer {"${process.env.NEXT_LINE_TOKEN}"}`);

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
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }
}
