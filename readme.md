# MonoRepo - Multiapp

This repository is intended to deploy services possibly different between them

# Create service

To create a new service you should:
1. Create the service folder inside `packages`
2. Define the script `start` inside the created package 
3. Config the Dockerfile taking in mind that hte build context of the imagen is the root address of this repository
4. Copy the workflow of one of the existing packages in the folder (.github/workflows/)
5. Modify the workflow. The next properties should be updated:

    - name
    - run-name
    - on.push.paths
    - env.{PACKAGE_NAME,REPOSITORY_SUFFIX,CI_PROJECT_NAME}

6. Copy the folder from `k8s` from any service already existing to a new folder with the name of the service you are creting
*Modify according to the requirements*
7. Upload the changes and deploy

> To let the workflows show up in the github interface, they must exist in the default branch

# Workflow

Although the workflow file works directly, it is possible to change some environment variables or define them from a different environment
To achieve this, you should review the next steps in the workflow file:

- Job: 'set-env-pkg': This job will be used to add environment variables from another environment to which will be deployed. That's the reason why you must specify which environment corresponds to the workflow in question

    - env: it is used to define the variables to import, in this case `API_KEY`
    - output: it is used to define the job outputs (the configured variables)
    - steps[0].run: it is used to integrate the variables in the job output

- Job: 'envs-context': This job defines all the values that will be prepared as json env, which is subsequently used in the deploy

    - env: The same envs must be defined as in the previous steps, but this time, making reference to the previous job output (set-env-pkg)

Below is a sample of what was explained.

```yaml
  set-env-pkg:
    environment: ${{ (github.ref_name == 'refs/heads/main' || github.ref_name == 'refs/heads/master') && 'address-prod' || 'address-stg' }}
    runs-on:
      group: gh-runners-self-hosted
    env:
      API_KEY: ${{ vars.API_KEY }}
    outputs:
      api_key: ${{ steps.set.outputs.API_KEY }}
    steps:
      - name: Set envs
        id: set
        run: |
          echo "API_KEY=${API_KEY}" >> "$GITHUB_OUTPUT"

  envs-context:
    needs: [set-env, set-env-pkg]
    environment: ${{ (github.ref_name == 'refs/heads/main' || github.ref_name == 'refs/heads/master') && 'production' || 'staging' }}
    runs-on:
      group: gh-runners-self-hosted
    env:
      API_KEY: ${{ needs.set-env-pkg.outputs.api_key }}
    outputs:
      envs-context: ${{ steps.to-json-env.outputs.envs-context }}
    steps:
      - name: Env to JSON
        id: to-json-env
        uses: Base-Repository/actions/env-to-json@main

```
