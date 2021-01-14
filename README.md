# DCAT-AP-NO Validator GUI

## Description

Application for validating DCAT-AP-NO data.

## Installation and Usage

- Required tools to run this project:
  - Node.js and npm to run locally on a host machine
  - Docker and Docker Compose to run locally in a container

#### Running application locally on a host machine

- Install dependencies by running `npm install`
- Run `npm start` to start local development server

#### Running application in a Docker container

- Build a Docker container using the following command:
  - `docker build -t dcat-ap-no-validator-gui .`
- Run the container using the following comand:
  - `docker run -d -p 8001:8080 -e ENV -e GRAPHQL_ENDPOINT -e VALIDATOR_API_HOST -e FDK_REGISTRATION_BASE_URI -e ADMIN_GUI_BASE_URI dcat-ap-no-validator-gui`

#### Running application using Docker Compose

- Run the application using the following command:
  - `docker-compose up -d`

## Environment Variables

- `ENV` - Environment
  - `development`
  - `production`
- `GRAPHQL_ENDPOINT` - GraphQL API endpoint
- `VALIDATOR_API_HOST` - Host of the validator API service
- `FDK_REGISTRATION_BASE_URI` - Base URI of the FDK registration application
- `ADMIN_GUI_BASE_URI` - Base URI of the FDK administration application

## Contributing

#### Branching Strategy

Whenever a new change is to be implemented, follow these steps:

- Create a new branch from the master branch
- Implement and commit changes
- Create a pull request for code review

#### Commits

This repository uses conventional commmit format. In order to commit, follow these steps:

- Stage files to be committed
- Run `npm run commit` script

Do not use `--no-verify` flag when making commits.
