import kafka from 'kafka-node';

const Producer = kafka.Producer;
const client = new kafka.Client();
const producer = new Producer(client)
    

function showTopics() {
  client.once('connect', function () {
    client.loadMetadataForTopics([], function (error, results) {
      if (error) {
        return console.error(error);
      }
      console.log('Topics:', JSON.stringify(results, '1.metadata'));;
    });
  });
}

producer.on('ready', function () {
    console.log('Producer ready\n');
});

function sendMessage(topic, message) {
  console.log(topic, message)
    producer.send([{ topic: topic, messages: message }], function (err, data) {
        if (err) {
            return console.log(err)
        }
    });
}

export default { sendMessage, showTopics };