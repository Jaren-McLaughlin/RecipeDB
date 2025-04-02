require('dotenv').config();
const verifyToken = require('./verifyToken');
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET
let token;

describe('verifyToken', () => {
  beforeAll(async () => {
    token = jwt.sign(
      {
        userId: 1
      },
      secretKey,
      { expiresIn: '15m' },
    );
  });

  it('should verify a jwt', async () => {
    expect.assertions(1);
    const { jwtData } = await verifyToken({ token });
    expect(jwtData).toStrictEqual(expect.objectContaining({
      userId: 1,
    }));
  });
});
