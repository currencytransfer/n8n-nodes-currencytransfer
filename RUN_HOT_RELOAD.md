# Run a n8n custom node with hot reload


#### Install node

Using `nvm` just install v20.15.1

```
nvm install v20.15.1
```

Install `pnpm`:

```
nvm install -g pnpm
```

#### Install n8n from source

```
git clone https://github.com/n8n-io/n8n
cd n8n

pnpm install
pnpm build
pnpm start
```

This will start up `n8n` from source.


##### Create the your custom node

Follow the instruction on the official [site](https://docs.n8n.io/integrations/creating-nodes/build/declarative-style-node/).

##### Test the node using the build from source

Go to your `n8n` installation directory

From there go to:

```
cd /packages/nodes-base/nodes
```

Symlink your nodes from the custom node to this directory

```
ln -s /path/to/customenode/nodes/Nodename NodeName
```

We also need to symlink any credentials files defined in the project

```
cd n8n/packages/nodes-base/credentials

ln -s /path/to/customenode/credentials/credentials.file.ts
```

And lastly in order to register the custom nodes in `n8n` update `packages/nodes-base/package.json`


```
....
  "n8n": {
    "credentials": [
      "dist/credentials/ActionNetworkApi.credentials.js",
      "dist/credentials/ActiveCampaignApi.credentials.js",
      "dist/credentials/AcuitySchedulingApi.credentials.js",
      ....
      "dist/credentials/CustomeNodeCredentials.credentials.js",
	  ....
    ],
    .....
    "nodes": [
      "dist/nodes/ActionNetwork/ActionNetwork.node.js",
      "dist/nodes/ActiveCampaign/ActiveCampaign.node.js",
      "dist/nodes/ActiveCampaign/ActiveCampaignTrigger.node.js",
      "dist/nodes/AcuityScheduling/AcuitySchedulingTrigger.node.js",
      ....
      "dist/nodes/CustomeNode/CustomeNode.node.js",
      ...
    ]
....
```

#### Build and run dev hot reload for all nodes

```
cd /packages/nodes-base
pnpm build
pnpm run dev
```

This will start to track any change that will happen in directories and files
we symlinked and then compile to the `dist` folder, where we pointed `n8n` how
to find our custom nodes. Generally we would do this by creating an `npm`
package locally and add it as a dependency, but doing this will not allow us to
use hot reload.

In a separate terminal open up the local installation of `n8n`
and add this environment variable:

```
export N8N_DEV_RELOAD="true"
```
Finally run the `n8n` server:

```
pnpm start
```

This is a bit hackey, but it's the only way I found to make hot-reload, when
adding custom nodes, without directly adding them to the `n8n` project.

This way you will have your custom node definitions are separate and can be
later tested with the official way described in the [documentation](https://docs.n8n.io/integrations/creating-nodes/test/run-node-locally/).
