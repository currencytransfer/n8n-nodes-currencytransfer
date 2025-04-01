# n8n-nodes-currencytransfer

This is an n8n community node. It lets you use [Currencytransfer](https://www.currencytransfer.com/) in your n8n workflows.

Currencytransfer allows you to make payments in foreign currencies fast and
with competitive rates.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)
[Operations](#operations)
[Credentials](#credentials)
[Compatibility](#compatibility)
[Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

This n8n integration adds all actions needed to make a foreign payment via
Currencytransfer's API's.


Following operations are available via the node:

* [Quotation](https://stage.currencytransfer.com/api/v1/documentation.html#/Quotes);
* [Trade management](https://stage.currencytransfer.com/api/v1/documentation.html#/Trades);
* [Beneficiary management](https://stage.currencytransfer.com/api/v1/documentation.html#/Beneficiaries)
* [Payments management](https://stage.currencytransfer.com/api/v1/documentation.html#/Payments)

This is enough to cover the process of getting a price for our conversion,
booking a deal with us, creating a recipient(or multiple) and issue a payment.

Not all features of our API are available via the operations defined here, but
you can always make custom calls n8n's [custom](https://docs.n8n.io/integrations/custom-operations/) operations node.

For more details on all API features refer to our
[documentation](https://stage.currencytransfer.com/api/v1/documentation.html).

## Credentials

To use this node, you will need to first make a registration on our
[platform](https://app.currencytransfer.com/sign-up) and go through our
onboarding process.

Don't worry, it's easy to do and you can always anything from our support great
staff.

After sign-up and ideally the onboarding process, you will need to generate an
API Key pair, in order to authenticate with us:

* Go to `Account settings`(your name in the upper right corner of the screen)
* `Manage Accounts`;
* Select your account;
* `Manage API Key`;
* Click on `Generate Key`;

This will provide you with an `ACCOUNT ID` and `API KEY`;

Then in `n8n` when creating credentials select `Currencytransfer API Account`
and add your `ACCOUNT ID` and `API KEY` here.

You can also test our production using the staging environment at
`https://stage.currencytransfer.com`.

Account creation and API generation are the same, just select `Staging`, as an
environment, when setting up your credentials in n8n.

* Note: To be onboarded on staging please contact our support at `support@currencytransfer.com `.

## Compatibility

The project was tested with `node` version `v20.15.1`

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
* [CurrencytransferAPI](https://stage.currencytransfer.com/api/v1/documentation.html)

