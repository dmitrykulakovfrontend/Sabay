import { type TransactionNotification } from "@prisma/client";
import { type NextApiRequest, type NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const accessToken = "REPLACE_WITH_YOUR_ACCESS_TOKEN";
  const transaction = req.body as TransactionNotification;

  return res.json(
    fetch("https://api-m.sandbox.paypal.com/v2/checkout/orders", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        purchase_units: [
          {
            amount: {
              currency_code: "PHP",

              value: transaction.amount.toString(),
            },
            items: [
              {
                name: transaction.title,
                quantity: "1",
              },
            ],
          },
        ],

        payment_source: {
          paypal: {
            experience_context: {
              payment_method_preference: "IMMEDIATE_PAYMENT_REQUIRED",

              payment_method_selected: "PAYPAL",

              brand_name: "Sabay",

              locale: "en-US",

              landing_page: "LOGIN",

              shipping_preference: "SET_PROVIDED_ADDRESS",

              user_action: "PAY_NOW",

              return_url: "https://example.com/returnUrl",

              cancel_url: "https://example.com/cancelUrl",
            },
          },
        },
      }),
    }).then((response) => response.json()),
  );
}
