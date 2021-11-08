const Chat = require('./schema/chatSchema');

export async function run() {
 
  // Create a change stream. The 'change' event gets emitted when there's a
  // change in the database
  Chat.watch().
    on('change', data => console.log(new Date(), data));

  // Insert a doc, will trigger the change stream handler above
  console.log(new Date(), 'Inserting doc');
  await Chat.create({ name: 'Test' });
}