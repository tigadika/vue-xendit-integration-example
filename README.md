# Vue Xendit Integration Example

This is application example is using Vue 3 Option API, Xendit Invoice API, and DummyJSON API. Pinia is used to store cart data, and also Swal is used as notification alert. I created a server to integrate with Xendit API as it cannot send request on client side because of cors policy.

> Disclaimer: I do not own any of the content image, title or description. All rights belong to the owner. No Copyright Infringement Intended. This application is only intended for educational purpose only and as teaching materials.

## Demo Usage

If you haven't got Xendit API Key, you can get one here: https://dashboard.xendit.co/register/1.

If you already have Xendit API-Key:

- In the `server` folder

  1. Rename the `.env-examples` to `.env` and place you api key in `API_KEY=` property
  2. Run `npm install`
  3. Run `npm run dev`

- In the `client` folder/terminal
  1. In the new terminal, run `npm install`
  2. Run `npm run dev`
  3. Open the app in your browser

## Feature/Stack

- Vue Router
- Pinia as state management
- Pagination
- Working cart with pinia
- Able to generate invoice with Xendit and redirect user to payment page
- Able to check payment status

> If you feel this application is helpful, don't forget to leave a comment or star this repo! Thanks :)
