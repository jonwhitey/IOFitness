const _ = require('lodash');

// https://devdocs.io/lodash~4/index#kebabCase

const slugify = (text) => _.kebabCase(text);

// if user slug exists increment count by 1
// recursively add until original slug is found
// could take awhile
async function createUniqueSlug(Model, slug, count) {
  const user = await Model.findOne({ slug: `${slug}-${count}` }, 'id');

  if (!user) {
    return `${slug}-${count}`;
  }

  return createUniqueSlug(Model, slug, count + 1);
}

// kebabcase the name, check for user, if user does not exist, the slug is original
// else create a unique slug
async function generateSlug(Model, name, filter = {}) {
  const origSlug = slugify(name);

  const user = await Model.findOne(Object.assign({ slug: origSlug }, filter), 'id');

  if (!user) {
    return origSlug;
  }

  return createUniqueSlug(Model, origSlug, 1);
}

module.exports = generateSlug;
