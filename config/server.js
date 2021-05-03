module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  url: "http://thinkit-mac.io:1337",
  admin: {
    auth: {
      secret: env("ADMIN_JWT_SECRET", "5ee6799087afdea6a1506ff181916455"),
    },
  },
});
