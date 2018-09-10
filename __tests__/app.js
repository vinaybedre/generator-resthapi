'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-resthapi:app', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/app')).withPrompts({
      name: 'my-api',
      appTitle: 'my-rest-api',
      version: '1.0.0'
    });
  });

  it('creates files', () => {
    assert.file([
      'package.json',
      'README.md',
      '.env',
      '.env.example',
      '.gitignore',
      'server.js'
    ]);
  });
});
