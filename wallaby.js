module.exports = function (wallaby) {
    return {
      files: [
        'src/**/*.ts'
      ],
  
      tests: [
        'test/**/*Spec.js'
      ]
    };
  };