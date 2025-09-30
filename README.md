# Conduit follow/unfollow prifile and create/read article API testing

## Table of contents

- [Description](#description)
- [Preparation](#preparation)
- [Main Task](#main-task)
- [Task Reporting](#task-reporting)

## Description

In this task you need to create tests for the [Conduit](https://conduit.mate.academy/)
- following and unfollowing user profile;
- create and read articles;

The full list is described in the [documentation](https://documenter.getpostman.com/view/48909389/2sB3QFQXfE)

## Preparation

1. Open the forked repo in VSCode.
2. Create a new branch by running `git checkout -b task_solution`.
3. Run the installation commands:

    - `npm ci`
    - `npx playwright install`


## Main Task

1. Сreate tests for the `Follow user` profile operation: 
- *Follow not existing user profile*
- *Follow existing user with empty auth token*
2. Creast folder `unfollow` under the `tests\profiles` folder.
3. Сreate tests for the `Unfollow user` profile operation: 
- *Unfollow existing user prorfile*
- *Unfollow not existing user profile*
- *Unfollow existing user with empty auth token*
4. Use the exisiting *Unfollow existing user prorfile* tests as examples.
4. Create folder `articles` under the `tests` folder.
5. Create folder `create` and `read` under the `tests\articles` folder.
6. Create tests:
- *Create article with empty tags array*  
- *Create article with empty body*  
- *Create article with empty title*  
- *Create artile by unautorized user*
- *Create article with all fields*
- *Read existing artilce by unautorized user*
- *Read artile created by user1 as authorized user2*

## Task Reporting

1. Add and commit all your updates.
2. Push the code to the origin.
3. Create a PR for your changes.
4. Keep implementing suggestions from code review until your PR is approved.
