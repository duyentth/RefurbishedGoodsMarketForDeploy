import { loadStripe } from "@stripe/stripe-js";

const PUBLIC_KEY =
    "pk_test_51NaWkTGV84TDT8edvuF9CeakJ0spDzeixdC9aTBqaFWLLOP09o2fGa75cjErs5xzfbbLORyVVnEfl6k7p5SNz7ES00KRp6p1tW";

const stripePromise = loadStripe(PUBLIC_KEY);
export default stripePromise;
