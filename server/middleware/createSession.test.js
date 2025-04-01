require('dotenv').config();
const createSession = require('./createSession');
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET

describe('createSession', () => {
  it('should create a session jwt', async () => {
    expect.assertions(2);
    const { token } = await createSession({ userId: 1 });
    expect(token).toEqual(expect.any(String));

    const verify = jwt.verify(token, secretKey);
    expect(verify).toStrictEqual(expect.objectContaining({
      userId: 1
    }))
  })
});
