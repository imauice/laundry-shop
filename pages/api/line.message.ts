import line from '@line/bot-sdk'


const client = new line.Client({
  channelAccessToken: `${process.env.NEXT_LINE_TOKEN}`
});

const message:any = {
  type: 'text',
  text: 'Hello World!'
};

client.pushMessage('<to>', message)
  .then(() => {
    
  })
  .catch((err: any) => {
    // error handling
  });