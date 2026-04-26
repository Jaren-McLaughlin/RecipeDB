require('dotenv').config();
const createToken = require('./createToken');
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET

describe('createToken', () => {
  it('should create a jwt', async () => {
    expect.assertions(2);
    const { token } = await createToken({ userId: 1 });
    expect(token).toEqual(expect.any(String));

    const verify = jwt.verify(token, secretKey);
    expect(verify).toStrictEqual(expect.objectContaining({
      userId: 1
    }))
  })
});
