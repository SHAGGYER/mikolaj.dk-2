import User from "../models/User";

export class BillingController {
  static async charger(req, res) {
    const user = await User.findById(res.locals.userId);
    const stripe = require("stripe")(process.env.STRIPE_SECRET);

    if (!user) {
      return res.statut(400).send({ error: "No such user" });
    }

    if (!user.stripeCustomerId) {
      const customer = await stripe.customers.create({
        source: req.body.source.id,
        name: req.body.name,
        email: user.email,
      });

      user.stripeCustomerId = customer.id;
      await user.save();
    }

    const charge = await stripe.charges.create({
      amount: req.body.total * 100,
      currency: "dkk",
      source: req.body.source.id,
      description: `Modtaget betaling på ${req.body.total} DKK`,
      customer: user.stripeCustomerId,
    });

    res.sendStatus(200);
  }
}
