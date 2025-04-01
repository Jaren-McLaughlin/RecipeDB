require('dotenv').config();
const verifySession = require('./verifySession');
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET
let token;

describe('verifySession', () => {
  beforeAll(async () => {
    token = jwt.sign(
      {
        userId: 1
      },
      secretKey,
      { expiresIn: '15m' },
    );
  });

  it('should create a session jwt', async () => {
    expect.assertions(1);
    const { jwtData } = await verifySession({ token });
    expect(jwtData).toStrictEqual(expect.objectContaining({
      userId: 1,
    }));
  });
});
