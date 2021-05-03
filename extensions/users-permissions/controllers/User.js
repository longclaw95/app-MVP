"use strict";

const _ = require("lodash");
const { sanitizeEntity } = require("strapi-utils");

const sanitizeUser = (user) =>
  sanitizeEntity(user, {
    model: strapi.query("user", "users-permissions").model,
  });

module.exports = {
  async updateMe(ctx) {
    const { id } = ctx.state.user;

    let updateData = {
      ...ctx.request.body,
    };

    let {
      email,
      username,
      password,
      blocked,
      FirstName,
      LastName,
      Address,
      Birthdate,
    } = ctx.request.body;

    if (_.has(ctx.request.body, "email") && (email || !email)) {
      return ctx.badRequest("cannot update email");
    }

    if (_.has(ctx.request.body, "blocked") && blocked) {
      return ctx.badRequest("user cannot block himself");
    }

    if (_.has(ctx.request.body, "username") && !username) {
      return ctx.badRequest("username must not be empty");
    }

    if (
      _.has(ctx.request.body, "password") &&
      !password &&
      user.provider === "local"
    ) {
      return ctx.badRequest("password must not be empty");
    }

    if (_.has(ctx.request.body, "FirstName") && !FirstName) {
      return ctx.badRequest("FirstName must not be empty");
    }

    if (_.has(ctx.request.body, "LastName") && !LastName) {
      return ctx.badRequest("LastName must not be empty");
    }

    if (_.has(ctx.request.body, "Address") && !Address) {
      return ctx.badRequest("Address must not be empty");
    }

    const data = await strapi.plugins["users-permissions"].services.user.edit(
      { id },
      updateData
    );

    ctx.send(sanitizeUser(data));
  },
  async randomGet(ctx, next, { populate } = {}) {
    let users;
    const { id } = ctx.state.user;
    const getRandomItem = (arr) => {
      // get random index value
      const randomIndex = Math.floor(Math.random() * arr.length);

      // get random item
      const item = arr[randomIndex];

      return item;
    };

    if (_.has(ctx.query, "_q")) {
      // use core strapi query to search for users
      users = await strapi
        .query("user", "users-permissions")
        .search(ctx.query, populate);
    } else {
      users = await strapi.plugins["users-permissions"].services.user.fetchAll(
        ctx.query,
        populate
      );
    }

    const allUsers = users.map(sanitizeUser);
    const usersExceptMe = allUsers.filter((x) => x.id !== id);
    const randomUser = getRandomItem(usersExceptMe);

    // ctx.body = randomUser;

    ctx.body = { id, randomUser };
  },
};
