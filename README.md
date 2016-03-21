npm Lab
---

## Overview

In this lab, we're going to test exports and imports. Along the way, we're going
to learn about installing packages from [npm](https://www.npmjs.com/), and we'll
even learn a bit about a technique called
"[function currying](https://en.wikipedia.org/wiki/Currying)."

## Getting Started

To start, run `npm test`. You should see an error that tests could not run, and
a warning that `node_modules` is missing. Before we talk about how to resolve
those issues, let's talk about this weird file called `package.json` and the
`npm test` command.

### `package.json`

Node.js packages typically come with a `package.json` file. This file tells
Node about the module that it contains, including (at minimum) the module's
name and version.

The `npm` command line utility provides a handy function for initializing a
basic `package.json`: `npm init`. This command will walk you through
configuring your package, and, when it's finished, it will write a
`package.json` to the current directory.

The `package.json` also keeps track of your project's `dependencies` and
`devDependencies`. npm uses [semantic versioning](https://docs.npmjs.com/getting-started/semantic-versioning) to keep
our packages up to date.

### `npm install`

We can install packages from npm using `npm install`. (You might see some
similarities with `gem install` — they're analogous.) Let's install one of the
packages that this lab needs:

```bash
npm install mocha
```

`npm` will fetch the [`mocha`](https://mochajs.org/) package from the remote
repository, and add it (and its dependencies) to a `node_modules` folder in the
current directory. Now if we run `npm test`, we should get a helpful-ish error.

But we have `node_modules` in our `.gitignore` (which is a convention in the
Node.js community and one that we'll usually try to follow), so how do we make
sure that we don't have to manually install our dependencies every time we
clone this repo?

The answer is `--save` and `--save-dev`, two options that are available to
`npm install`. Typically, you'll want to `npm install --save` packages that
you'll need in production, and `npm install --save-dev` packages that you'll
only need in development (like testing packages, linters, etc.). So if we run

```bash
npm install mocha --save-dev
```

and check our `package.json`, we should see an entry for `mocha` under
`devDependencies`. Now when we clone the package, we can just run a bare
`npm install` from the root of the package to install _all_ if its dependencies
in one go.

### `npm test`

Now we can get back to `npm test`. If you run `npm`, you should see a note about
some commands that `npm` runs by default. The `test` command looks for a `test`
entry in a `package.json`'s `scripts` section — in this lab's `scripts`, you
can see `"test": "mocha"`. This entry tells `npm test` to look for the `mocha`
command — it will look first in `./node_modules/.bin`, but then it will look
for a global command. In this case, we'll find `./node_modules/.bin/mocha`, so
we'll just use that. And _voilà_, our tests run!

## Your Turn

Take a look at `./lib/greet.js` and `./test/greet_test.js`. Your job is to
make the tests pass. You'll need to export the correct functionality from
`./lib/greet.js`, and you'll need to make sure that all dependencies are
satisfied.

We'll also check that your dependencies are set up well — that is, that the
correct dependencies are in `devDependencies` and the others are in
`dependencies` in your `package.json`.

## Postscript: Function Currying

This lab tests importing and exporting by testing that `greet.js` provides
a [_curried_](https://en.wikipedia.org/wiki/Currying) version of a greeting
function.

As the Wikipedia article above notes, "currying is the technique of translating
the evaluation of a function that takes multiple arguments (or a tuple of
arguments) into evaluating a sequence of functions, each with a single
argument." In JavaScript, it means taking a function like this:

```javascript
function curryUp(a, b, c) {
  return a + b + c;
}

const a = 1;
const b = 2;
const c = 3;

curryUp(a, b, c);
```

into something that can be called like this

```javascript
const applyA = curryUp(a);
const applyB = applyA(b);
const applyC = applyB(c);

// alternatively:

const allApplied = curryUp(a)(b)(c);
```

The library (hint hint!) [lodash](https://lodash.com) takes care of transforming
the function for us. You'll just need to make sure that `greet.js` can import
lodash (conventionally, we assign `lodash` to `_`) and that it exports the
curried version of the `greet()` function.

## Resources

- [package.json](https://docs.npmjs.com/getting-started/using-a-package.json): https://docs.npmjs.com/getting-started/using-a-package.json
- [semantic versioning](https://docs.npmjs.com/getting-started/semantic-versioning)
- [currying](https://en.wikipedia.org/wiki/Currying)
