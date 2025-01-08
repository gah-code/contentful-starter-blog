const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const chalk = require('chalk')
const contentfulManagement = require('contentful-management')
const data = require('./data-with-about-page.json') // Replace with your content models data file

const argv = require('yargs-parser')(process.argv.slice(2))

console.log(`
  To set up this project, you will need your Contentful Space ID and Management API access token.
  You can find all the needed information in your Contentful space under:
  ${chalk.yellow(
    `app.contentful.com ${chalk.red('->')} Space Settings ${chalk.red(
      '->'
    )} API keys`
  )}
  The ${chalk.green(
    'Content Management API Token'
  )} will be used to create and manage content models.
  Ready? Let's do it! 🎉
`)

const questions = [
  {
    name: 'spaceId',
    message: 'Your Space ID',
    when: !argv.spaceId && !process.env.CONTENTFUL_SPACE_ID,
    validate: (input) =>
      /^[a-z0-9]{12}$/.test(input) ||
      'Space ID must be 12 lowercase characters',
  },
  {
    name: 'managementToken',
    message: 'Your Content Management API access token',
    when: !argv.managementToken && !process.env.CONTENTFUL_MANAGEMENT_TOKEN,
  },
]

inquirer
  .prompt(questions)
  .then(async ({ spaceId, managementToken }) => {
    const { CONTENTFUL_SPACE_ID, CONTENTFUL_MANAGEMENT_TOKEN } = process.env

    // Use environment variables or user inputs
    spaceId = CONTENTFUL_SPACE_ID || argv.spaceId || spaceId
    managementToken =
      CONTENTFUL_MANAGEMENT_TOKEN || argv.managementToken || managementToken

    console.log(chalk.green('\nConnecting to Contentful...\n'))

    // Initialize Contentful Management client
    const client = contentfulManagement.createClient({
      accessToken: managementToken,
    })

    const space = await client.getSpace(spaceId)
    const environment = await space.getEnvironment('master')

    console.log(chalk.green('Fetching existing content types...\n'))

    // Fetch existing content types
    const existingContentTypes = await environment.getContentTypes()
    const existingContentTypeIds = existingContentTypes.items.map(
      (contentType) => contentType.sys.id
    )

    console.log(chalk.yellow('Checking for new content types to create...\n'))

    // Filter out content types that already exist
    const newContentTypes = data.contentTypes.filter(
      (contentType) => !existingContentTypeIds.includes(contentType.sys.id)
    )

    if (newContentTypes.length === 0) {
      console.log(
        chalk.green('All content types already exist. No changes made.')
      )
    } else {
      console.log(
        chalk.blue(
          `Creating ${newContentTypes.length} new content type(s)...\n`
        )
      )

      // Create new content types
      for (const contentType of newContentTypes) {
        try {
          await environment.createContentTypeWithId(
            contentType.sys.id,
            contentType
          )
          console.log(chalk.green(`Created content type: ${contentType.name}`))

          // Publish the content type
          const createdContentType = await environment.getContentType(
            contentType.sys.id
          )
          await createdContentType.publish()
          console.log(
            chalk.green(`Published content type: ${contentType.name}\n`)
          )
        } catch (error) {
          console.error(
            chalk.red(
              `Error creating content type ${contentType.name}: ${error.message}`
            )
          )
        }
      }
    }

    console.log(chalk.green('Content model creation completed successfully!'))
  })
  .catch((error) => {
    console.error(chalk.red('An error occurred during the setup process:'))
    console.error(error)
  })
