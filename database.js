import pg from "pg";
const messages = [];

const config = {
  host: "silly.db.elephantsql.com",
  database: "ugzdqgul",
  user: "ugzdqgul",
  password: "wYGe0OfoZ-9aLwBLY0cJ2Ky9aKXecA4R",
};

const showMessages = async () => {
  while (messages.length > 0) {
    messages.pop();
  }
  const client = new pg.Client(config);

  try {
    await client.connect();
    const result = await client.query("SELECT * FROM user_and_message");
    for (const row of result.rows) {
      const htmlBox = [
        `<div class="example-box modal-body py-0 text-center rounded-4 pt-3">
          <p id="example-message">${row.message}</p>
          <br />
          <p id="example-user">- ${row.username}</p>
        </div>`,
      ];
      messages.push(htmlBox);
    }
    await client.end();
  } catch (err) {
    console.error(err);
  }
};

const submitMessage = async (newMessage, newUser) => {
  const client = new pg.Client(config);
  try {
    await client.connect();
    await client.query(
      `INSERT INTO user_and_message VALUES ('${newMessage}', '${newUser}')`
    );
    await client.end();
  } catch (err) {
    console.error(err);
  }
};

export { messages, showMessages, submitMessage };
