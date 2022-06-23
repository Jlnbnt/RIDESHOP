const stripe = require("stripe")(process.env.STRIPE_KEY);

const stripePaiment = (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "EUR",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        console.log(stripeErr);
        res.status(500).json(stripeErr);
      } else {
        console.log("succes");
        res.status(200).json(stripeRes);
      }
    }
  );
};

module.exports = { stripePaiment };
